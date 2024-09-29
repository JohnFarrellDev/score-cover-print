import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SongForm } from "./SongForm";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SongForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(
      <MemoryRouter>
        <SongForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Song Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Artist Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Link to Score:")).toBeInTheDocument();
    expect(screen.getByLabelText("Link to Song:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Generate Cover Page" })
    ).toBeInTheDocument();
  });

  it("navigates to cover page on form submission", () => {
    render(
      <MemoryRouter>
        <SongForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Song Name:"), {
      target: { value: "Test Song" },
    });
    fireEvent.change(screen.getByLabelText("Artist Name:"), {
      target: { value: "Test Artist" },
    });
    fireEvent.change(screen.getByLabelText("Link to Score:"), {
      target: { value: "https://example.com/score" },
    });
    fireEvent.change(screen.getByLabelText("Link to Song:"), {
      target: { value: "https://example.com/song" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Generate Cover Page" })
    );

    expect(mockNavigate).toBeCalledWith(
      "/cover/Test%20Song/Test%20Artist/https%3A%2F%2Fexample.com%2Fscore/https%3A%2F%2Fexample.com%2Fsong"
    );
  });
});
