import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CoverPage } from "./CoverPage";
import { describe, it, expect, vi } from "vitest";

vi.mock("qrcode.react", () => ({
  QRCodeCanvas: () => <img src="qr-code.png" alt="QR Code" />,
}));

describe("CoverPage", () => {
  const params = {
    songName: "Test Song",
    artistName: "Test Artist",
    scoreLink: "https://example.com/score",
    songLink: "https://example.com/song",
  };

  const pathWithParams = `/cover?${new URLSearchParams(params)}`;
  const route = "/cover";

  it("renders correctly with all parameters", () => {
    render(
      <MemoryRouter initialEntries={[pathWithParams]}>
        <Routes>
          <Route path={route} element={<CoverPage />} />
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
      <MemoryRouter>
        <Routes>
          <Route path={route} element={<CoverPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
    expect(screen.queryByText("Score:")).not.toBeInTheDocument();
    expect(screen.queryByText("Spotify:")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("handles share button click correctly when navigator.share is available", async () => {
    const mockShare = vi.fn();
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };

    Object.assign(navigator, {
      share: mockShare,
      clipboard: mockClipboard,
    });

    render(
      <MemoryRouter initialEntries={[pathWithParams]}>
        <Routes>
          <Route path={route} element={<CoverPage />} />
        </Routes>
      </MemoryRouter>
    );

    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);

    const expectedUrl = window.location.href;

    expect(mockShare).toHaveBeenCalledWith({
      title: `${params.artistName} - ${params.songName}`,
      text: `Check out this cover page for ${params.songName} by ${params.artistName}`,
      url: expectedUrl,
    });
    expect(mockClipboard.writeText).not.toHaveBeenCalled();
  });

  it("handles share button click correctly when navigator.share is not available", async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };

    Object.assign(navigator, {
      share: undefined,
      clipboard: mockClipboard,
    });

    render(
      <MemoryRouter initialEntries={[pathWithParams]}>
        <Routes>
          <Route path={route} element={<CoverPage />} />
        </Routes>
      </MemoryRouter>
    );

    const shareButton = screen.getByText("Share");
    fireEvent.click(shareButton);

    const expectedUrl = window.location.href;

    expect(mockClipboard.writeText).toHaveBeenCalledWith(expectedUrl);
  });
});
