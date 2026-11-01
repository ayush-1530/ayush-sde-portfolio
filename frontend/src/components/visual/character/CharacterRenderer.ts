import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CharacterMachine, CHARACTER_WAVE, chapters, sections } from "./characterMachine";
import type { CharacterSection } from "./characterMachine";
import { placeCharacter, safe, safeTransition } from "./characterPlacement";
import type { Placement, Rect } from "./characterPlacement";
import { createCharacterPose } from "./characterPose";

const protectedSelector = [
  ".floating-header", ".chapter-rail", ".guide-trigger", ".portfolio-guide",
  ".hero-role", ".hero-introductions", ".hero-scroll", ".avatar-hello.is-visible",
  ".section-heading", ".employers", ".statement", ".bento-tile", ".work-filters", ".filter-count",
  ".work-project-heading", ".project-bento", ".case-study-details", ".experiment-card",
  ".about-portrait", ".about-intro h3", ".principles-grid", ".journey-entry",
  ".education-entry", ".certification-card", ".list-title", ".research-card", ".stack-logos",
  ".skill-constellation", ".skill-row", ".stack-footnote", ".contact-grid",
  ".footer-identity > span", ".footer-link-groups", ".footer-credit", ".footer-wordmark",
  "main p", "main a", "main button", "main h3", "main h4", "input", "textarea", "[role='dialog']",
].join(",");

type CachedRect = Rect & { fixed: boolean };
const rectOf = (element: Element): Rect => {
  const r = element.getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height };
};

function disposeModel(model: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
  model.traverse(node => {
    if (node instanceof THREE.Mesh) {
      geometries.add(node.geometry);
      (Array.isArray(node.material) ? node.material : [node.material]).forEach(material => materials.add(material));
    }
    if (node instanceof THREE.SkinnedMesh) node.skeleton.dispose();
  });
  geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
}

/** Owns the only WebGL context. DOM geometry and GPU animation stay outside React. */
export function mountCharacterGuide(host: HTMLDivElement, onFailure: () => void) {
  const anchor = document.querySelector<HTMLElement>(".avatar-stage");
  if (!anchor) return () => {};
  let stopped = false, ready = false, geometryDirty = true, layoutDirty = true;
  let frame = 0, lastTime = 0, lastLayout = -1, opacity = 0;
  let current: Placement | undefined, target: Placement | undefined;
  let cached: CachedRect[] = [];
  let chapterElements: { id: CharacterSection; element: HTMLElement; top: number; height: number }[] = [];
  let model: THREE.Group | undefined;
  let applyPose: ReturnType<typeof createCharacterPose> | undefined;
  let hovered = false;
  let pointer = { x: innerWidth / 2, y: innerHeight / 2, active: false };
  let pressed: { x: number; y: number; time: number } | undefined;
  const reducedPreference = matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePreference = matchMedia("(pointer: coarse)");
  const machine = new CharacterMachine();
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2, 2, 4.2, -0.4, 0.1, 30);
  camera.position.set(0, 1.95, 8); camera.lookAt(0, 1.95, 0);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.className = "character-canvas";
  host.appendChild(renderer.domElement);
  const hemisphere = new THREE.HemisphereLight(0xffffff, 0x666575, 2.3); scene.add(hemisphere);
  const key = new THREE.DirectionalLight(0xfff7ee, 3.6); key.position.set(-3, 5, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0xdce3ff, 3.5); rim.position.set(4, 3, -4); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 0.8); fill.position.set(4, 1, 5); scene.add(fill);
  const raycaster = new THREE.Raycaster();
  const rayPointer = new THREE.Vector2();
  let pixelRatio = 0, renderWidth = 0, renderHeight = 0;
  let renderedFrames = 0;
  const requestFrame = () => { if (!stopped && ready && !frame && !document.hidden) frame = requestAnimationFrame(tick); };
  const markLayout = () => { layoutDirty = true; requestFrame(); };
  const markGeometry = () => { geometryDirty = true; markLayout(); };
  const themeChanged = () => {
    const light = document.documentElement.dataset.theme === "light";
    renderer.toneMappingExposure = light ? 0.8 : 1.25;
    hemisphere.intensity = light ? 1.6 : 2.3;
    key.intensity = light ? 2.8 : 3.6;
    markGeometry();
  };
  const themeObserver = new MutationObserver(themeChanged);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  themeChanged();

  function refreshGeometry() {
    const elements = [...document.querySelectorAll<HTMLElement>(protectedSelector)];
    const selected = new Set(elements);
    const protectedElements = elements.filter(element => {
      if (element.closest(".avatar-stage") && !element.matches(".avatar-hello.is-visible")) return false;
      let ancestor = element.parentElement;
      while (ancestor) { if (selected.has(ancestor)) return false; ancestor = ancestor.parentElement; }
      return true;
    });
    // Observe changing accordion/card boxes as well as section heights. The hero can
    // rearrange inside an unchanged min-height while an introduction expands.
    protectedElements.forEach(element => {
      if (!observed.has(element)) { resize.observe(element); observed.add(element); }
    });
    observed.forEach(element => { if (!element.isConnected) { resize.unobserve(element); observed.delete(element); } });
    cached = protectedElements.flatMap(element => {
      const rect = rectOf(element), style = getComputedStyle(element);
      if (!rect.width || !rect.height || style.visibility === "hidden" || style.display === "none" || (Number(style.opacity) === 0 && !element.matches(".avatar-hello.is-visible"))) return [];
      const fixed = !!element.closest(".floating-header, .chapter-rail, .guide-trigger, .portfolio-guide, [role='dialog']");
      // Footer credits have substantial empty padding and two short text runs.
      // Protect actual text rather than denying the finale the empty center column.
      if (element.matches(".footer-credit")) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const fragments: CachedRect[] = [];
        while (walker.nextNode()) {
          if (!walker.currentNode.textContent?.trim()) continue;
          const range = document.createRange(); range.selectNodeContents(walker.currentNode);
          for (const fragment of range.getClientRects()) fragments.push({ x: fragment.x + scrollX, y: fragment.y + scrollY, width: fragment.width, height: fragment.height, fixed: false });
        }
        return fragments;
      }
      return [{ ...rect, x: rect.x + (fixed ? 0 : scrollX), y: rect.y + (fixed ? 0 : scrollY), fixed }];
    });
    chapterElements = sections.flatMap(id => {
      const element = document.getElementById(id);
      return element ? [{ id, element, top: element.getBoundingClientRect().top + scrollY, height: element.offsetHeight }] : [];
    });
    geometryDirty = false;
  }

  function viewportRect(): Rect {
    const visual = window.visualViewport;
    return { x: visual?.offsetLeft ?? 0, y: visual?.offsetTop ?? 0, width: Math.min(visual?.width ?? innerWidth, document.documentElement.clientWidth), height: visual?.height ?? innerHeight };
  }
  function obstacleRects(viewport: Rect) {
    const obstacles = cached.map(rect => ({ x: rect.x - (rect.fixed ? 0 : scrollX), y: rect.y - (rect.fixed ? 0 : scrollY), width: rect.width, height: rect.height }))
      .filter(rect => rect.y + rect.height > viewport.y - 10 && rect.y < viewport.y + viewport.height + 10);
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && focused !== document.body && !focused.closest(".avatar-stage")) obstacles.push(rectOf(focused));
    return obstacles;
  }
  function sectionTarget(viewport: Rect) {
    const focusY = scrollY + viewport.y + viewport.height * 0.43;
    let active = chapterElements.filter(section => section.top <= focusY).at(-1) ?? chapterElements[0];
    // Footer identity is meaningful even when the footer is shorter than the viewport.
    const footer = chapterElements.at(-1);
    if (footer?.id === "footer" && footer.top - scrollY < viewport.y + viewport.height * 0.65) active = footer;
    if (!active) return undefined;
    const chapter = chapters[active.id];
    const targets = [...active.element.querySelectorAll(chapter.target)].map(rectOf).filter(rect => rect.height > 0 && rect.y + rect.height > viewport.y + 120 && rect.y < viewport.y + viewport.height);
    targets.sort((a, b) => Math.abs(a.y + a.height / 2 - viewport.height * 0.45) - Math.abs(b.y + b.height / 2 - viewport.height * 0.45));
    const aim = targets[0] ?? { x: active.element.getBoundingClientRect().x, y: Math.max(viewport.y + 150, active.top - scrollY + 100), width: active.element.clientWidth, height: 32 };
    return { active, chapter, aim };
  }

  function hitCharacter(x: number, y: number) {
    if (!current?.visible || !model || opacity < 0.5 || !containsPoint(current, x, y)) return false;
    rayPointer.set((x - current.x) / current.width * 2 - 1, -(y - current.y) / current.height * 2 + 1);
    model.updateMatrixWorld(true);
    model.traverse(node => { if (node instanceof THREE.SkinnedMesh) node.computeBoundingSphere(); });
    raycaster.setFromCamera(rayPointer, camera);
    return raycaster.intersectObject(model, true).length > 0;
  }
  function containsPoint(rect: Rect, x: number, y: number) { return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height; }
  function pointerMove(event: PointerEvent) {
    if (reducedPreference.matches) return;
    pointer = { x: event.clientX, y: event.clientY, active: event.pointerType !== "touch" };
    requestFrame();
  }
  const resetPointer = () => { pointer.active = false; hovered = false; pressed = undefined; };
  const pointerDown = (event: PointerEvent) => { if (event.isPrimary && event.button === 0) pressed = { x: event.clientX, y: event.clientY, time: performance.now() }; };
  function pointerUp(event: PointerEvent) {
    const start = pressed; pressed = undefined;
    if (!start || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 7 || performance.now() - start.time > 600) return;
    if ((event.target as Element)?.closest("a,button,input,textarea,[contenteditable], [role='dialog']")) return;
    if (window.getSelection()?.toString()) return;
    if (hitCharacter(event.clientX, event.clientY)) window.dispatchEvent(new Event(CHARACTER_WAVE));
  }
  const wave = () => { machine.wave(performance.now() / 1000); markGeometry(); };
  const preferenceChanged = () => { resetPointer(); lastTime = 0; markLayout(); };
  const visibilityChanged = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; resetPointer(); } else { lastTime = 0; markGeometry(); } };
  const contextLost = (event: Event) => { event.preventDefault(); onFailure(); };

  function tick(milliseconds: number) {
    frame = 0;
    if (stopped || !ready || document.hidden || !model || !applyPose) return;
    const time = milliseconds / 1000;
    const delta = lastTime ? Math.min(0.05, time - lastTime) : 1 / 60;
    lastTime = time;
    const viewport = viewportRect();
    if (geometryDirty) refreshGeometry();
    const obstacles = obstacleRects(viewport);
    // Scroll/resize invalidates immediately; conservative viewport tests run each frame.
    if (layoutDirty || time - lastLayout > 0.18) {
      const selected = sectionTarget(viewport);
      if (!selected) return;
      machine.enter(selected.active.id, time);
      target = placeCharacter({ viewport, obstacles, section: selected.active.id, anchor: selected.active.id === "intro" ? rectOf(anchor!) : undefined, target: selected.aim, side: selected.chapter.side, previous: target });
      if (reducedPreference.matches && selected.active.id !== "intro") target.visible = false;
      layoutDirty = false; lastLayout = time;
    }
    if (!target) return;
    let moving = false;
    if (!target.visible) {
      // Never animate a fade over newly scrolled content: obstruction safety is immediate.
      opacity = 0;
      if (current) current.visible = false;
    } else {
      const canStay = current?.visible && safe(current, obstacles, viewport);
      if (!current || !canStay || !safeTransition(current, target, obstacles, viewport) || reducedPreference.matches) {
        const changed = !current || current.section !== target.section || Math.hypot(current.x - target.x, current.y - target.y) > 3;
        if (changed || !canStay) opacity = 0;
        current = { ...target };
      } else {
        const amount = 1 - Math.exp(-delta * 11);
        const before = current;
        const next = { ...target, x: THREE.MathUtils.lerp(before.x, target.x, amount), y: THREE.MathUtils.lerp(before.y, target.y, amount), width: THREE.MathUtils.lerp(before.width, target.width, amount), height: THREE.MathUtils.lerp(before.height, target.height, amount) };
        current = safe(next, obstacles, viewport) ? next : { ...target };
        moving = Math.abs(current.x - target.x) + Math.abs(current.y - target.y) + Math.abs(current.width - target.width) > 0.5;
      }
      opacity = reducedPreference.matches ? 1 : Math.min(1, opacity + delta * 4);
    }
    const visible = !!current?.visible && target.visible;
    const snapshot = machine.snapshot(time, visible, reducedPreference.matches);
    host.dataset.section = target.section; host.dataset.state = snapshot.state; host.dataset.gesture = snapshot.gesture;
    host.dataset.visible = String(visible); host.style.opacity = String(opacity);
    if (!visible || !current) return; // No off-screen animation loop or GPU work.
    host.style.transform = `translate3d(${current.x}px,${current.y}px,0)`;
    host.style.width = `${current.width}px`; host.style.height = `${current.height}px`;
    const desiredRatio = Math.min(devicePixelRatio || 1, viewport.width < 768 ? 1.35 : 1.65);
    if (Math.abs(renderWidth - current.width) > 1 || Math.abs(renderHeight - current.height) > 1 || pixelRatio !== desiredRatio) {
      pixelRatio = desiredRatio; renderWidth = current.width; renderHeight = current.height;
      renderer.setPixelRatio(pixelRatio); renderer.setSize(renderWidth, renderHeight, false);
      const halfHeight = 2.25, halfWidth = halfHeight * renderWidth / renderHeight;
      camera.left = -halfWidth; camera.right = halfWidth; camera.top = halfHeight; camera.bottom = -halfHeight; camera.updateProjectionMatrix();
    }
    const lookAtPointer = pointer.active && snapshot.section === "intro" && !reducedPreference.matches;
    const gaze = {
      x: THREE.MathUtils.clamp(((lookAtPointer ? pointer.x : target.targetX) - (current.x + current.width / 2)) / Math.max(viewport.width * 0.4, 1), -1, 1),
      y: THREE.MathUtils.clamp(((current.y + current.height * 0.28) - (lookAtPointer ? pointer.y : target.targetY)) / Math.max(viewport.height * 0.6, 1), -1, 1),
    };
    if (!reducedPreference.matches && pointer.active) {
      const hit = hitCharacter(pointer.x, pointer.y);
      if (hit && !hovered) machine.react(time);
      hovered = hit;
    }
    applyPose(snapshot, time, delta, gaze, reducedPreference.matches);
    renderer.render(scene, camera);
    // Expose bounded, non-personal diagnostics for browser verification, not UI controls.
    host.dataset.drawCalls = String(renderer.info.render.calls);
    host.dataset.triangles = String(renderer.info.render.triangles);
    host.dataset.frames = String(++renderedFrames);
    if (!reducedPreference.matches || opacity < 1 || moving) requestFrame();
  }

  const resize = new ResizeObserver(markGeometry);
  const observed = new Set<Element>();
  sections.forEach(id => { const element = document.getElementById(id); if (element) resize.observe(element); });
  resize.observe(anchor);
  const mutation = new MutationObserver(records => {
    if (records.some(record => !(record.target instanceof Element) || !record.target.closest(".character-viewport, .floating-header, .chapter-rail, .weather-background, .role-stage"))) markGeometry();
  });
  mutation.observe(document.querySelector(".portfolio")!, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "aria-pressed", "aria-expanded", "hidden"] });
  window.addEventListener("scroll", markLayout, { passive: true });
  window.addEventListener("resize", markGeometry);
  window.visualViewport?.addEventListener("resize", markGeometry);
  window.visualViewport?.addEventListener("scroll", markLayout);
  window.addEventListener("pointermove", pointerMove, { passive: true });
  window.addEventListener("pointerdown", pointerDown, { passive: true });
  window.addEventListener("pointerup", pointerUp, { passive: true });
  window.addEventListener("pointercancel", resetPointer);
  window.addEventListener("blur", resetPointer);
  document.addEventListener("pointerleave", resetPointer);
  document.addEventListener("visibilitychange", visibilityChanged);
  document.addEventListener("focusin", markLayout); document.addEventListener("focusout", markLayout);
  window.addEventListener(CHARACTER_WAVE, wave);
  reducedPreference.addEventListener("change", preferenceChanged); coarsePreference.addEventListener("change", preferenceChanged);
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  void document.fonts.ready.then(() => { if (!stopped) markGeometry(); });

  const controller = new AbortController();
  // Fetch is abortable; the GLB contains no textures or external resources.
  void fetch("/models/ayush-developer.glb", { signal: controller.signal }).then(response => {
    if (!response.ok) throw new Error("Unable to load character model"); return response.arrayBuffer();
  }).then(buffer => new GLTFLoader().parseAsync(buffer, "")).then(gltf => {
    if (stopped) { disposeModel(gltf.scene); return; }
    model = gltf.scene;
    applyPose = createCharacterPose(model);
    model.traverse(node => { node.frustumCulled = false; });
    scene.add(model); ready = true;
    anchor.dataset.characterReady = "true";
    host.dataset.ready = "true";
    requestFrame();
  }).catch(error => { if (!stopped && error.name !== "AbortError") onFailure(); });

  return () => {
    stopped = true; controller.abort(); cancelAnimationFrame(frame);
    delete anchor.dataset.characterReady;
    resize.disconnect(); mutation.disconnect(); themeObserver.disconnect();
    window.removeEventListener("scroll", markLayout); window.removeEventListener("resize", markGeometry);
    window.visualViewport?.removeEventListener("resize", markGeometry); window.visualViewport?.removeEventListener("scroll", markLayout);
    window.removeEventListener("pointermove", pointerMove); window.removeEventListener("pointerdown", pointerDown); window.removeEventListener("pointerup", pointerUp);
    window.removeEventListener("pointercancel", resetPointer); window.removeEventListener("blur", resetPointer); document.removeEventListener("pointerleave", resetPointer);
    document.removeEventListener("visibilitychange", visibilityChanged); document.removeEventListener("focusin", markLayout); document.removeEventListener("focusout", markLayout);
    window.removeEventListener(CHARACTER_WAVE, wave);
    reducedPreference.removeEventListener("change", preferenceChanged); coarsePreference.removeEventListener("change", preferenceChanged);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    if (model) disposeModel(model);
    scene.clear(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
  };
}
