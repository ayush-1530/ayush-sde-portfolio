import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HeroPortrait from "./HeroPortrait";

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (this: Element) {
    return this.tagName === "SECTION" ? new DOMRect(0, 0, 1440, 1000) : new DOMRect(530, 250, 380, 380);
  });
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

const move = (x: number, y: number, pointerType = "mouse") => {
  const event = new MouseEvent("pointermove", { clientX: x, clientY: y });
  Object.defineProperty(event, "pointerType", { value: pointerType });
  fireEvent(window, event);
  act(() => vi.advanceTimersByTime(20));
};

describe("Opening portrait eyes", () => {
  it("follows the cursor in both directions with tightly bounded pupil movement", () => {
    const { container } = render(<section><HeroPortrait /></section>);
    const portrait = container.querySelector<HTMLElement>(".hero-portrait")!;
    move(1400, 650);
    expect(parseFloat(portrait.style.getPropertyValue("--gaze-x"))).toBeGreaterThan(0);
    expect(parseFloat(portrait.style.getPropertyValue("--gaze-x"))).toBeLessThanOrEqual(5.8);
    expect(parseFloat(portrait.style.getPropertyValue("--gaze-y"))).toBeLessThanOrEqual(3.8);
    move(0, 0);
    expect(parseFloat(portrait.style.getPropertyValue("--gaze-x"))).toBeLessThan(0);
    expect(parseFloat(portrait.style.getPropertyValue("--gaze-y"))).toBeLessThan(0);
  });

  it("centers the eyes on scroll and ignores pointer positions outside the hero", () => {
    const { container } = render(<section><HeroPortrait /></section>);
    const portrait = container.querySelector<HTMLElement>(".hero-portrait")!;
    move(1400, 650);
    fireEvent.scroll(window);
    expect(portrait.style.getPropertyValue("--gaze-x")).toBe("0px");
    move(1400, 1200);
    expect(portrait.style.getPropertyValue("--gaze-y")).toBe("0px");
  });

  it("keeps the eyes centered for touch input", () => {
    const { container } = render(<section><HeroPortrait /></section>);
    move(1400, 650, "touch");
    expect(container.querySelector<HTMLElement>(".hero-portrait")!.style.getPropertyValue("--gaze-x")).toBe("0px");
  });
});
