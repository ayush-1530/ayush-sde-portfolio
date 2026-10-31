import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PortfolioGuide from "./PortfolioGuide";

describe("Portfolio guide", () => {
  it("answers from the portfolio, links to the relevant section, and returns focus on Escape", () => {
    render(<PortfolioGuide />);
    const trigger = screen.getByRole("button", { name: "Ask about Ayush" });
    fireEvent.click(trigger);
    expect(screen.getByRole("textbox", { name: "Question about Ayush" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Contact" }));
    expect(screen.getByText(/ayushnegiuk@gmail.com/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Send a message" })).toHaveAttribute("href", "#connect");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
