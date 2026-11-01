import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WeatherScene from "./WeatherScene";

beforeEach(() => {
  vi.useFakeTimers();
  vi.mocked(window.matchMedia).mockReturnValue({
    matches: false,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
});
afterEach(() => vi.useRealTimers());

describe("Hero weather", () => {
  it("cycles sunny, rainy, and snowy every five seconds without visible controls", () => {
    const { container } = render(<WeatherScene />);
    const background = container.querySelector(".weather-background");
    expect(container.querySelector("button")).toBeNull();
    expect(background).toHaveAttribute("data-weather", "sunny");
    act(() => vi.advanceTimersByTime(4999));
    expect(background).toHaveAttribute("data-weather", "sunny");
    act(() => vi.advanceTimersByTime(1));
    expect(background).toHaveAttribute("data-weather", "rainy");
    act(() => vi.advanceTimersByTime(5000));
    expect(background).toHaveAttribute("data-weather", "snowy");
    act(() => vi.advanceTimersByTime(5000));
    expect(background).toHaveAttribute("data-weather", "sunny");
  });

  it("clears the weather timer on unmount", () => {
    const { unmount } = render(<WeatherScene />);
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("keeps the background static when reduced motion is requested", () => {
    vi.mocked(window.matchMedia).mockReturnValue({ ...window.matchMedia("(prefers-reduced-motion: reduce)"), matches: true });
    const { container } = render(<WeatherScene />);
    act(() => vi.advanceTimersByTime(36000));
    expect(container.querySelector(".weather-background")).toHaveAttribute("data-weather", "sunny");
  });

  it("stops cycling immediately when the device motion preference changes", () => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const { container } = render(<WeatherScene />);
    const update = vi.mocked(preference.addEventListener).mock.calls[0][1] as () => void;
    act(() => {
      Object.defineProperty(preference, "matches", { value: true });
      update();
    });
    act(() => vi.advanceTimersByTime(36000));
    expect(container.querySelector(".weather-background")).toHaveAttribute("data-weather", "sunny");
  });
});
