import type { CharacterSection } from "./characterMachine";

export type Rect = { x: number; y: number; width: number; height: number };
export type Placement = Rect & { visible: boolean; section: CharacterSection; targetX: number; targetY: number };
export const intersects = (a: Rect, b: Rect, clearance = 0) => a.x < b.x + b.width + clearance && a.x + a.width > b.x - clearance && a.y < b.y + b.height + clearance && a.y + a.height > b.y - clearance;
export const contains = (outer: Rect, inner: Rect) => inner.x >= outer.x && inner.y >= outer.y && inner.x + inner.width <= outer.x + outer.width && inner.y + inner.height <= outer.y + outer.height;
export const safe = (rect: Rect, obstacles: Rect[], viewport: Rect, clearance = 8) => contains(viewport, rect) && obstacles.every(obstacle => !intersects(rect, obstacle, clearance));

/** Protect the swept viewport, not just the two endpoints: hands cannot cross text. */
export function safeTransition(from: Rect, to: Rect, obstacles: Rect[], viewport: Rect) {
  const swept = { x: Math.min(from.x, to.x), y: Math.min(from.y, to.y), width: Math.max(from.x + from.width, to.x + to.width) - Math.min(from.x, to.x), height: Math.max(from.y + from.height, to.y + to.height) - Math.min(from.y, to.y) };
  return safe(swept, obstacles, viewport);
}

export function placeCharacter({ viewport, obstacles, section, anchor, target, side, previous }: {
  viewport: Rect; obstacles: Rect[]; section: CharacterSection; anchor?: Rect;
  target: Rect; side: "left" | "right"; previous?: Placement;
}): Placement {
  const targetX = target.x + target.width / 2, targetY = target.y + target.height / 2;
  const hidden: Placement = { x: 0, y: 0, width: 0, height: 0, visible: false, section, targetX, targetY };
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
  if (section === "intro" && anchor) {
    // Expand only into verified empty hero space. The original grid footprint stays intact.
    for (const scale of [1.7, 1.4, 1.22, 1]) {
      const height = anchor.height * scale;
      const width = anchor.width;
      const centered = anchor.y + (anchor.height - height) / 2;
      const ys = [centered, ...obstacles.filter(obstacle => obstacle.x < anchor.x + width && obstacle.x + obstacle.width > anchor.x && obstacle.y < anchor.y + anchor.height).map(obstacle => obstacle.y + obstacle.height + 10)];
      for (const y of ys) {
        const candidate = { x: anchor.x, y, width, height };
        if (safe(candidate, obstacles, viewport)) return { ...candidate, visible: true, section, targetX, targetY };
      }
    }
    return hidden;
  }
  const mobile = viewport.width < 768;
  const widths = mobile ? [112, 92, 72] : section === "footer" ? [300, 264, 224, 176, 144, 116, 92] : [176, 144, 116, 92];
  const candidates: { rect: Rect; score: number }[] = [];
  const centerY = clamp(targetY, viewport.y + 180, viewport.y + viewport.height - 130);
  for (const width of widths) {
    const height = width * 1.65;
    if (height > viewport.height - 24) continue;
    const xs = [viewport.x + 12, viewport.x + viewport.width - width - 12];
    const ys = [centerY - height / 2, viewport.y + viewport.height - height - 18, viewport.y + 150];
    // Candidate edges come from the current content, so sparse areas can host a peek.
    for (const rect of obstacles) {
      xs.push(rect.x - width - 10, rect.x + rect.width + 10);
      ys.push(rect.y - height - 10, rect.y + rect.height + 10);
    }
    const uniqueX = [...new Set(xs.map(x => Math.round(x)))].filter(x => x >= viewport.x && x + width <= viewport.x + viewport.width)
      .sort((a, b) => Math.abs(a - (side === "left" ? viewport.x : viewport.x + viewport.width - width)) - Math.abs(b - (side === "left" ? viewport.x : viewport.x + viewport.width - width))).slice(0, 12);
    const uniqueY = [...new Set(ys.map(y => Math.round(y)))].filter(y => y >= viewport.y && y + height <= viewport.y + viewport.height)
      .sort((a, b) => Math.abs(a + height / 2 - centerY) - Math.abs(b + height / 2 - centerY)).slice(0, 24);
    for (const x of uniqueX) for (const y of uniqueY) {
      const rect = { x, y, width, height };
      if (!safe(rect, obstacles, viewport)) continue;
      const candidateSide = x + width / 2 < viewport.x + viewport.width / 2 ? "left" : "right";
      const distance = Math.abs(y + height / 2 - centerY);
      // Prefer the chapter's side and proximity to its content. Larger safe figures win.
      const score = width * 5 - distance * 0.35 - (candidateSide === side ? 0 : 100);
      candidates.push({ rect, score });
    }
  }
  candidates.sort((a, b) => b.score - a.score);
  if (!candidates.length) return hidden;
  let selected = candidates[0].rect;
  // Stay in an existing safe space until the target meaningfully changes.
  if (previous?.visible && previous.section === section && safe(previous, obstacles, viewport) && Math.abs(previous.targetY - targetY) < 110) selected = previous;
  return { ...selected, visible: true, section, targetX, targetY };
}
