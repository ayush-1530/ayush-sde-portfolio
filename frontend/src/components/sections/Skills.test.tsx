import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Skills from "./Skills";

describe("Interactive skill network", () => {
  it("reveals matching descriptions and technologies on hover, keyboard focus, and tap", () => {
    render(<Skills />);
    const details = screen.getByRole("region", { name: "Selected skill details" });
    const backend = screen.getByRole("button", { name: "Explore backend & api design" });
    fireEvent.pointerEnter(backend);
    expect(backend).toHaveAttribute("aria-pressed", "true");
    expect(within(details).getByText(/Designing clear API contracts/)).toBeInTheDocument();
    expect(within(details).getByText("FastAPI")).toBeInTheDocument();

    fireEvent.focus(screen.getByRole("button", { name: "Explore cloud & devops" }));
    expect(within(details).getByText(/Taking AI and backend services into production/)).toBeInTheDocument();
    expect(within(details).getByText("AWS")).toBeInTheDocument();
    expect(backend).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(screen.getByRole("button", { name: "Explore databases & caching" }));
    expect(within(details).getByText(/Giving applications a reliable memory/)).toBeInTheDocument();
    expect(within(details).getByText("PostgreSQL")).toBeInTheDocument();
    expect(within(details).getByRole("link", { name: "Explore this layer" })).toHaveAttribute("href", "#stack-layer-4");
  });

  it("includes AI and cloud in the banner and supports pausing and following a technology", () => {
    const { container } = render(<Skills />);
    const banner = screen.getByRole("region", { name: "Technology stack, scrolling left to right" });
    for (const technology of ["LangGraph", "RAG", "LLMs", "AWS", "OpenStack"]) {
      expect(within(banner).getByRole("link", { name: new RegExp(`^${technology} `) })).toBeInTheDocument();
    }
    fireEvent.click(screen.getByRole("button", { name: "Pause technology banner" }));
    expect(banner).toHaveClass("is-paused");
    fireEvent.click(screen.getByRole("button", { name: "Play technology banner" }));
    expect(banner).not.toHaveClass("is-paused");

    fireEvent.click(within(banner).getByRole("link", { name: /^AWS / }));
    expect(screen.getByRole("button", { name: "Explore cloud & devops" })).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelectorAll('.stack-marquee-group[aria-hidden="true"] a:not([tabindex="-1"])')).toHaveLength(0);
  });
});
