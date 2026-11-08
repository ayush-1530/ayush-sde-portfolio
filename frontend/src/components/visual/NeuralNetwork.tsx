import { useEffect, useRef } from "react";

export const skillPositions = [
  { x: 25, y: 17 }, { x: 69, y: 13 }, { x: 87, y: 36 }, { x: 86, y: 67 },
  { x: 67, y: 84 }, { x: 28, y: 83 }, { x: 13, y: 64 }, { x: 13, y: 34 },
];

// Two interwoven shells give the connections real depth as the network turns.
const neurons = Array.from({ length: 112 }, (_, index) => {
  const inner = index >= 80;
  const count = inner ? 32 : 80;
  const offset = inner ? index - 80 : index;
  const y = 1 - (offset / (count - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = offset * Math.PI * (3 - Math.sqrt(5));
  const shell = inner ? 0.55 : 1;
  return { x: Math.cos(angle) * radius * shell, y: y * shell, z: Math.sin(angle) * radius * shell };
});

const connections = neurons.flatMap((neuron, index) => neurons
  .map((other, target) => ({ target, distance: Math.hypot(neuron.x - other.x, neuron.y - other.y, neuron.z - other.z) }))
  .filter(other => other.target !== index)
  .sort((a, b) => a.distance - b.distance)
  .slice(0, 5)
  .filter(other => other.target > index)
  .map(other => ({ from: index, to: other.target })));

export default function NeuralNetwork({ active }: { active: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const activeLayer = useRef(active);
  const redraw = useRef<(() => void) | null>(null);

  useEffect(() => { activeLayer.current = active; redraw.current?.(); }, [active]);

  useEffect(() => {
    if (typeof CanvasRenderingContext2D === "undefined") return;
    const element = canvas.current;
    const context = element?.getContext("2d");
    const scene = element?.parentElement;
    if (!element || !context || !scene) return;

    let width = 0, height = 0, frame = 0, elapsed = 0, previous = 0, visible = false, disposed = false;
    let pointerX = 0, pointerY = 0, tiltX = 0, tiltY = 0;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = preference.matches;
    let light = document.documentElement.dataset.theme === "light";

    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;
      tiltX += ((reducedMotion ? 0 : pointerX) - tiltX) * 0.045;
      tiltY += ((reducedMotion ? 0 : pointerY) - tiltY) * 0.045;
      const yaw = elapsed * 0.065 + tiltX * 0.24 + 0.3;
      const pitch = -0.16 + tiltY * 0.18;
      const radius = Math.min(width * 0.275, height * 0.36);
      const centerX = width * 0.5, centerY = height * 0.47;
      const projected = neurons.map(neuron => {
        const x = neuron.x * Math.cos(yaw) + neuron.z * Math.sin(yaw);
        const depth = -neuron.x * Math.sin(yaw) + neuron.z * Math.cos(yaw);
        const y = neuron.y * Math.cos(pitch) - depth * Math.sin(pitch);
        const z = neuron.y * Math.sin(pitch) + depth * Math.cos(pitch);
        const scale = 3.5 / (3.5 - z);
        return { x: centerX + x * radius * scale, y: centerY + y * radius * scale, z, scale };
      });
      const neutral = light ? "77,90,112" : "163,180,209";
      const accent = light ? "68,98,192" : "145,172,255";
      const anchor = skillPositions[activeLayer.current];
      const direction = Math.atan2(anchor.y / 100 * height - centerY, anchor.x / 100 * width - centerX);
      const isLit = (point: typeof projected[number]) => Math.cos(Math.atan2(point.y - centerY, point.x - centerX) - direction) > 0.82 && point.z > -0.4;

      const halo = context.createRadialGradient(centerX, centerY, radius * 0.15, centerX, centerY, radius * 1.25);
      halo.addColorStop(0, `rgba(${accent},${light ? 0.055 : 0.07})`);
      halo.addColorStop(1, `rgba(${accent},0)`);
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);

      connections.forEach(({ from, to }, index) => {
        const a = projected[from], b = projected[to];
        const depth = (a.z + b.z + 2) / 4;
        const lit = isLit(a) && isLit(b);
        context.strokeStyle = `rgba(${lit ? accent : neutral},${lit ? 0.34 + depth * 0.3 : 0.06 + depth * 0.17})`;
        context.lineWidth = lit ? 0.95 : 0.65;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
        if (lit && index % 4 === 0 && !reducedMotion) {
          const progress = (elapsed * 0.24 + index * 0.137) % 1;
          context.fillStyle = `rgba(${accent},.85)`;
          context.beginPath();
          context.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 1.4, 0, Math.PI * 2);
          context.fill();
        }
      });

      skillPositions.forEach((position, index) => {
        const x = Math.max(50, Math.min(width - 50, position.x / 100 * width));
        const y = position.y / 100 * height - 21;
        const nearest = projected.reduce((best, point) => Math.hypot(point.x - x, point.y - y) < Math.hypot(best.x - x, best.y - y) ? point : best);
        const selected = index === activeLayer.current;
        context.strokeStyle = `rgba(${selected ? accent : neutral},${selected ? 0.6 : 0.17})`;
        context.lineWidth = selected ? 1.1 : 0.65;
        context.beginPath();
        context.moveTo(x, y);
        context.bezierCurveTo(x, (y + nearest.y) / 2, nearest.x, y, nearest.x, nearest.y);
        context.stroke();
      });

      [...projected].sort((a, b) => a.z - b.z).forEach(point => {
        const lit = isLit(point);
        const opacity = 0.24 + (point.z + 1) * 0.3;
        const size = (lit ? 2.4 : 1.7) * point.scale;
        if (lit || point.z > 0.6) {
          const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, size * 4);
          glow.addColorStop(0, `rgba(${lit ? accent : neutral},.25)`);
          glow.addColorStop(1, `rgba(${lit ? accent : neutral},0)`);
          context.fillStyle = glow;
          context.beginPath();
          context.arc(point.x, point.y, size * 4, 0, Math.PI * 2);
          context.fill();
        }
        context.fillStyle = `rgba(${lit ? accent : neutral},${opacity})`;
        context.beginPath();
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fill();
      });
    };

    const animate = (now: number) => {
      if (disposed || !visible || reducedMotion || document.hidden) { frame = 0; return; }
      if (previous) elapsed += Math.min((now - previous) / 1000, 0.05);
      previous = now;
      draw();
      frame = requestAnimationFrame(animate);
    };
    const update = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      draw();
      if (visible && !reducedMotion && !document.hidden) frame = requestAnimationFrame(animate);
    };
    redraw.current = () => { if (!frame) draw(); };
    const resize = () => {
      ({ width, height } = scene.getBoundingClientRect());
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = scene.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / width * 2 - 1;
      pointerY = (event.clientY - bounds.top) / height * 2 - 1;
    };
    const leave = () => { pointerX = 0; pointerY = 0; };
    const motionChange = () => { reducedMotion = preference.matches; update(); };
    const themeObserver = new MutationObserver(() => { light = document.documentElement.dataset.theme === "light"; draw(); });
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    resizeObserver.observe(scene);
    visibilityObserver.observe(scene);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    scene.addEventListener("pointermove", move);
    scene.addEventListener("pointerleave", leave);
    preference.addEventListener("change", motionChange);
    document.addEventListener("visibilitychange", update);
    resize();
    const bounds = scene.getBoundingClientRect();
    visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
    update();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      redraw.current = null;
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      scene.removeEventListener("pointermove", move);
      scene.removeEventListener("pointerleave", leave);
      preference.removeEventListener("change", motionChange);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return <canvas ref={canvas} className="neural-canvas" aria-hidden="true" />;
}
