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

describe("Opening portrait", () => {
  it("turns only the separate head layer toward the cursor within gentle limits", () => {
    const { container } = render(<section><HeroPortrait /></section>);
    const portrait = container.querySelector<HTMLElement>(".hero-portrait")!;
    const body = container.querySelector(".portrait-body")!;
    expect(container.querySelector(".portrait-head .portrait-eyes")).not.toBeNull();
    move(1400, 650);
    expect(parseFloat(portrait.style.getPropertyValue("--head-yaw"))).toBeGreaterThan(0);
    expect(parseFloat(portrait.style.getPropertyValue("--head-yaw"))).toBeLessThanOrEqual(1);
    expect(parseFloat(portrait.style.getPropertyValue("--head-pitch"))).toBeLessThan(0);
    expect(Math.abs(parseFloat(portrait.style.getPropertyValue("--head-pitch")))).toBeLessThanOrEqual(0);
    expect(parseFloat(portrait.style.getPropertyValue("--head-roll"))).toBeGreaterThan(0);
    expect(parseFloat(portrait.style.getPropertyValue("--head-roll"))).toBeLessThanOrEqual(0);
    expect(body).not.toHaveAttribute("style");
    expect(body).not.toHaveAttribute("transform");
    move(0, 0);
    expect(parseFloat(portrait.style.getPropertyValue("--head-yaw"))).toBeLessThan(0);
    expect(parseFloat(portrait.style.getPropertyValue("--head-pitch"))).toBeGreaterThan(0);
    expect(parseFloat(portrait.style.getPropertyValue("--head-roll"))).toBeLessThan(0);
  });

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
    expect(portrait.style.getPropertyValue("--head-yaw")).toBe("0deg");
    expect(portrait.style.getPropertyValue("--head-roll")).toBe("0deg");
    move(1400, 1200);
    expect(portrait.style.getPropertyValue("--gaze-y")).toBe("0px");
    expect(portrait.style.getPropertyValue("--head-pitch")).toBe("0deg");
  });

  it("keeps the eyes centered for touch input", () => {
    const { container } = render(<section><HeroPortrait /></section>);
    move(1400, 650, "touch");
    expect(container.querySelector<HTMLElement>(".hero-portrait")!.style.getPropertyValue("--gaze-x")).toBe("0px");
    expect(container.querySelector<HTMLElement>(".hero-portrait")!.style.getPropertyValue("--head-yaw")).toBe("0deg");
  });

  it("keeps the head and eyes still when reduced motion is requested", () => {
    vi.mocked(window.matchMedia).mockReturnValueOnce({ ...window.matchMedia("(prefers-reduced-motion: reduce)"), matches: true });
    const { container } = render(<section><HeroPortrait /></section>);
    move(1400, 650);
    const portrait = container.querySelector<HTMLElement>(".hero-portrait")!;
    expect(portrait.style.getPropertyValue("--head-yaw")).toBe("0deg");
    expect(portrait.style.getPropertyValue("--gaze-x")).toBe("0px");
  });
});
