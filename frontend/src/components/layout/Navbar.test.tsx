import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

afterEach(() => localStorage.removeItem("portfolio-theme"));

describe("Theme navigation", () => {
  it("switches themes, persists the choice, and restores it when reopened", () => {
    localStorage.removeItem("portfolio-theme");
    const view = render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem("portfolio-theme")).toBe("light");
    view.unmount();
    render(<Navbar />);
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "CONTACT ME" })).toHaveAttribute("href", "#connect");
  });
});
