import { describe, it, expect, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders the navbar", () => {
    render(<App />);
    const navigation = screen.getByRole("navigation", {
      name: "Main navigation",
    });
    expect(
      within(navigation).getByRole("link", { name: "WORK" }),
    ).toHaveAttribute("href", "#built");
  });

  it("renders the hero section", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Ayush Negi" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /VIEW MY WORK/ })).toHaveAttribute(
      "href",
      "#built",
    );
  });

  it("expands a case study without opening the project repository", async () => {
    const openRepository = vi
      .spyOn(window, "open")
      .mockImplementation(() => null);
    render(<App />);
    const expand = screen.getByRole("button", {
      name: "Read case study: MR Review Agent",
    });
    fireEvent.click(expand);
    expect(expand).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("PROBLEM")).toBeInTheDocument();
    expect(openRepository).not.toHaveBeenCalled();
    fireEvent.click(
      screen.getByRole("button", {
        name: "Collapse case study: MR Review Agent",
      }),
    );
    await waitFor(() =>
      expect(screen.queryByText("PROBLEM")).not.toBeInTheDocument(),
    );
    openRepository.mockRestore();
  });
});
