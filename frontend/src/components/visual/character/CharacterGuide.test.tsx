import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CharacterGuide from "./CharacterGuide";

const { mount, release } = vi.hoisted(() => ({ mount: vi.fn(), release: vi.fn() }));
vi.mock("./CharacterRenderer", () => ({ mountCharacterGuide: mount }));
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

describe("3D lifecycle boundary", () => {
  it("leaves the original portrait usable when graphics capabilities are unavailable", async () => {
    vi.stubGlobal("WebGL2RenderingContext", undefined);
    render(<><img src="/images/ayush-avatar-mono.png" alt="Original portrait" /><CharacterGuide /></>);
    expect(screen.getByAltText("Original portrait")).toBeVisible();
    expect(mount).not.toHaveBeenCalled();
  });
  it("releases the single renderer after a graphics failure and restores the fallback boundary", async () => {
    vi.useFakeTimers(); vi.stubGlobal("WebGL2RenderingContext", class {});
    mount.mockReturnValue(release);
    const { container } = render(<CharacterGuide />);
    await act(async () => { await vi.advanceTimersByTimeAsync(400); await vi.dynamicImportSettled(); });
    expect(mount).toHaveBeenCalledOnce();
    act(() => mount.mock.calls[0][1]());
    expect(release).toHaveBeenCalledOnce();
    expect(container.querySelector(".character-viewport")).toBeNull();
  });
  it("does not start an idle renderer after the landing route unmounts", async () => {
    vi.useFakeTimers(); vi.stubGlobal("WebGL2RenderingContext", class {});
    const view = render(<CharacterGuide />); view.unmount();
    await act(async () => { vi.advanceTimersByTime(400); await Promise.resolve(); });
    expect(mount).not.toHaveBeenCalled();
  });
});
