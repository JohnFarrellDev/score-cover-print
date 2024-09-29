import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CoverPage } from "./CoverPage";
import { describe, it, expect, vi } from "vitest";

vi.mock("qrcode.react", () => ({
  QRCodeCanvas: () => <img src="qr-code.png" alt="QR Code" />,
}));

describe("CoverPage", () => {
  it("renders correctly with all parameters", () => {
    const params = {
      songName: "Test%20Song",
      artistName: "Test%20Artist",
      scoreLink: "https%3A%2F%2Fexample.com%2Fscore",
      songLink: "https%3A%2F%2Fexample.com%2Fsong",
    };

    render(
      <MemoryRouter
        initialEntries={[
          `/cover/${params.artistName}/${params.songName}/${params.scoreLink}/${params.songLink}`,
        ]}
      >
        <Routes>
          <Route
            path="/cover/:artistName/:songName/:scoreLink/:songLink"
            element={<CoverPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("https://example.com/score")).toBeInTheDocument();
    expect(screen.getByText("https://example.com/song")).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(2); // Two QR codes
  });

  it("renders correctly with missing parameters", () => {
    render(
      <MemoryRouter initialEntries={["/cover"]}>
        <Routes>
          <Route path="/cover" element={<CoverPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
    expect(screen.queryByText("Score:")).not.toBeInTheDocument();
    expect(screen.queryByText("Spotify:")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
