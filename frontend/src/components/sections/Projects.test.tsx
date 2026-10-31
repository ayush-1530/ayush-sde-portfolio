import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Projects from "./Projects";

describe("Project browsing", () => {
  it("filters projects by discipline and restores the complete collection", () => {
    render(<Projects />);
    expect(screen.getByRole("status")).toHaveTextContent("Showing 6 of 6 projects");
    fireEvent.click(screen.getByRole("button", { name: "Computer Vision" }));
    expect(screen.getByRole("status")).toHaveTextContent("Showing 1 of 6 projects");
    expect(screen.getByRole("heading", { name: /Real-Time Surveillance Vision/ })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /MR Review Agent/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Computer Vision" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Show all" }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("retains case studies and repository links within filtered results", () => {
    render(<Projects />);
    fireEvent.click(screen.getByRole("button", { name: "AI and Agentics" }));
    const project = screen.getByRole("heading", { name: /MR Review Agent/ }).closest("article")!;
    expect(within(project).getByRole("link", { name: "View repository: MR Review Agent" })).toHaveAttribute("href", "https://github.com/ayush-1530/MR-Review-Agent");
    fireEvent.click(within(project).getByRole("button", { name: "Read case study: MR Review Agent" }));
    expect(within(project).getByText(/agent-stage latency cut ~58%/)).toBeInTheDocument();
  });
});
