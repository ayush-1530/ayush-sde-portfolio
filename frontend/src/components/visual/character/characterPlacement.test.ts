import { describe, expect, it } from "vitest";
import { placeCharacter, safe, safeTransition } from "./characterPlacement";
import type { Rect } from "./characterPlacement";

const viewport = { x: 0, y: 0, width: 1440, height: 1000 };
const heading = { x: 166, y: 180, width: 1100, height: 55 };
describe("character collision safety", () => {
  it("uses measured empty hero space without changing its original footprint", () => {
    const anchor = { x: 530, y: 370, width: 380, height: 380 };
    const obstacles = [{ x: 118, y: 350, width: 300, height: 400 }, { x: 970, y: 350, width: 330, height: 400 }, { x: 240, y: 24, width: 950, height: 55 }];
    const result = placeCharacter({ viewport, obstacles, section: "intro", anchor, target: obstacles[1], side: "right" });
    expect(result.visible).toBe(true); expect(result.width).toBe(anchor.width);
    expect(result.height).toBeGreaterThan(anchor.height); expect(safe(result, obstacles, viewport)).toBe(true);
  });
  it("hides on a crowded mobile viewport rather than covering reading or the contact form", () => {
    const mobile = { x: 0, y: 0, width: 390, height: 844 };
    const content = [{ x: 20, y: 0, width: 350, height: 844 }];
    expect(placeCharacter({ viewport: mobile, obstacles: content, section: "connect", target: content[0], side: "left" }).visible).toBe(false);
  });
  it("keeps a hero wave visible below the existing click greeting", () => {
    const anchor = { x: 530, y: 360, width: 380, height: 380 };
    const greeting = { x: 600, y: 325, width: 240, height: 38 };
    const result = placeCharacter({ viewport, obstacles: [greeting, { x: 650, y: 950, width: 140, height: 20 }], section: "intro", anchor, target: heading, side: "right" });
    expect(result.visible).toBe(true); expect(result.y).toBeGreaterThan(greeting.y + greeting.height);
  });
  it("clears the chapter rail, chat trigger, and complete project cards", () => {
    const obstacles = [heading, { x: 166, y: 300, width: 1100, height: 700 }, { x: 10, y: 440, width: 50, height: 130 }, { x: 1365, y: 930, width: 55, height: 55 }];
    const result = placeCharacter({ viewport, obstacles, section: "built", target: heading, side: "right" });
    expect(result.visible).toBe(true); expect(safe(result, obstacles, viewport)).toBe(true);
    expect(result.x).toBeGreaterThan(1266);
  });
  it("rejects transitions whose endpoints are safe but whose path crosses content", () => {
    const card = [{ x: 400, y: 300, width: 600, height: 500 }];
    const left = { x: 100, y: 400, width: 120, height: 200 }, right = { x: 1200, y: 400, width: 120, height: 200 };
    expect(safe(left, card, viewport)).toBe(true); expect(safe(right, card, viewport)).toBe(true);
    expect(safeTransition(left, right, card, viewport)).toBe(false);
  });
  it("recalculates after a project expansion occupies a previously safe position", () => {
    const before: Rect[] = [heading];
    const initial = placeCharacter({ viewport, obstacles: before, section: "built", target: heading, side: "right" });
    const after = [heading, { x: 0, y: 280, width: 1440, height: 720 }];
    const result = placeCharacter({ viewport, obstacles: after, section: "built", target: heading, side: "right", previous: initial });
    if (result.visible) expect(safe(result, after, viewport)).toBe(true);
  });
});
