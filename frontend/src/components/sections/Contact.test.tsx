import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
import Contact from "./Contact";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

function fillForm() {
  fireEvent.change(screen.getByLabelText("NAME"), {
    target: { value: "  Dev Example  " },
  });
  fireEvent.change(screen.getByLabelText("EMAIL"), {
    target: { value: "dev@example.com" },
  });
  fireEvent.change(screen.getByLabelText("MESSAGE"), {
    target: { value: "  I would like to collaborate.  " },
  });
  return screen.getByRole("form", { name: "Send a message" });
}

describe("Contact form", () => {
  it("posts trimmed fields to /contact and confirms success only after the API responds", async () => {
    vi.stubEnv("VITE_API_URL", "");
    const post = vi
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { message: "Message sent successfully!" } });
    render(<Contact />);
    fireEvent.submit(fillForm());
    expect(
      await screen.findByRole("heading", { name: "Message sent" }),
    ).toBeInTheDocument();
    expect(post).toHaveBeenCalledWith(
      "/contact",
      {
        name: "Dev Example",
        email: "dev@example.com",
        message: "I would like to collaborate.",
      },
      { timeout: 60000, signal: expect.any(AbortSignal) },
    );
    fireEvent.click(screen.getByRole("button", { name: "WRITE ANOTHER" }));
    expect(screen.getByLabelText("NAME")).toHaveValue("");
    expect(screen.getByLabelText("MESSAGE")).toHaveValue("");
  });

  it.each([
    { isAxiosError: true, response: { status: 503 } },
    { isAxiosError: true, code: "ERR_NETWORK" },
    { isAxiosError: true, code: "ECONNABORTED" },
    { isAxiosError: true, response: { status: 422 } },
  ])(
    "keeps the message available to retry after an API or network failure (%j)",
    async (failure) => {
      const post = vi
        .spyOn(axios, "post")
        .mockRejectedValueOnce(failure)
        .mockResolvedValueOnce({
          data: { message: "Message sent successfully!" },
        });
      render(<Contact />);
      fireEvent.submit(fillForm());
      expect(await screen.findByRole("alert")).toHaveTextContent(
        /try again|Delivery wasn’t confirmed/,
      );
      expect(
        screen.queryByRole("heading", { name: "Message sent" }),
      ).not.toBeInTheDocument();
      expect(screen.getByLabelText("MESSAGE")).toHaveValue(
        "  I would like to collaborate.  ",
      );
      fireEvent.submit(screen.getByRole("form", { name: "Send a message" }));
      expect(
        await screen.findByRole("heading", { name: "Message sent" }),
      ).toBeInTheDocument();
      expect(post).toHaveBeenCalledTimes(2);
    },
  );

  it("prevents duplicate submissions while a request is pending", async () => {
    let finish!: (value: unknown) => void;
    const post = vi.spyOn(axios, "post").mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    render(<Contact />);
    const form = fillForm();
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(
      screen.getByRole("button", { name: "SENDING MESSAGE" }),
    ).toBeDisabled();
    expect(screen.getByLabelText("NAME")).toBeDisabled();
    expect(post).toHaveBeenCalledTimes(1);
    await act(async () =>
      finish({ data: { message: "Message sent successfully!" } }),
    );
    expect(
      screen.getByRole("heading", { name: "Message sent" }),
    ).toBeInTheDocument();
  });

  it("rejects invalid email addresses and whitespace-only messages before making a request", () => {
    const post = vi.spyOn(axios, "post");
    render(<Contact />);
    const form = fillForm();
    fireEvent.change(screen.getByLabelText("EMAIL"), {
      target: { value: "invalid-email" },
    });
    fireEvent.submit(form);
    expect(screen.getByLabelText("EMAIL")).toBeInvalid();
    expect(post).not.toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText("EMAIL"), {
      target: { value: "dev@example.com" },
    });
    fireEvent.change(screen.getByLabelText("MESSAGE"), {
      target: { value: "   " },
    });
    fireEvent.submit(form);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "cannot contain only spaces",
    );
    expect(post).not.toHaveBeenCalled();
  });

  it("does not show success for an HTML fallback or a missing API confirmation", async () => {
    vi.spyOn(axios, "post").mockResolvedValue({
      data: "<!doctype html><html></html>",
    });
    render(<Contact />);
    fireEvent.submit(fillForm());
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "couldn’t be sent",
    );
    expect(
      screen.queryByRole("heading", { name: "Message sent" }),
    ).not.toBeInTheDocument();
  });

  it("uses the configured API origin without duplicating trailing slashes", async () => {
    vi.stubEnv("VITE_API_URL", "https://portfolio-api.example.test///");
    const post = vi
      .spyOn(axios, "post")
      .mockResolvedValue({ data: { message: "Message sent successfully!" } });
    render(<Contact />);
    fireEvent.submit(fillForm());
    await screen.findByRole("heading", { name: "Message sent" });
    expect(post.mock.calls[0][0]).toBe(
      "https://portfolio-api.example.test/contact",
    );
  });
});
