import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import DiceSideThumbnail from "./DiceSideThumbnail";
import stringToBlob from "../renderer/image/stringToBlob";
import generateSvg from "../renderer/svg/generateSvg";
import injectSideIntoSvg from "../renderer/svg/injectSideIntoSvg";

// 1. Mock the internal rendering pipelines
vi.mock("../renderer/image/stringToBlob", () => ({
  default: vi.fn(() => new Blob(["test"], { type: "image/svg+xml" })),
}));

vi.mock("../renderer/svg/diceMethods", () => ({
  diceStyle: vi.fn((fg, bg) => `.style { fill: ${fg}; background: ${bg}; }`),
}));

vi.mock("../renderer/svg/generateSvg", () => ({
  default: vi.fn((content) => `<svg>${content}</svg>`),
}));

vi.mock("../renderer/svg/injectSideIntoSvg", () => ({
  default: vi.fn().mockResolvedValue("<g id='mock-side'></g>"),
}));

// 2. Attach global URL environment mocks for Node/JSDOM runtime
beforeAll(() => {
  global.URL.createObjectURL = vi.fn(
    () => "blob:http://localhost/mock-url-123",
  );
  global.URL.revokeObjectURL = vi.fn();
});

describe("DiceSideThumbnail Component", () => {
  const mockSideGraphics = { id: "side-1", graphic: "dot" } as any;

  const defaultProps = {
    side: mockSideGraphics,
    alt: "Dice Face 1",
    backgroundColor: "#ffffff",
    foregroundColor: "#000000",
    width: 150,
    height: 150,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should start with an empty layout and transition cleanly once the blob resolves", async () => {
    const { container } = render(<DiceSideThumbnail {...defaultProps} />);

    // Confirms it handles the initial asynchronous paint step smoothly
    expect(container.firstChild).toBeNull();

    // Await the internal layout state updates to cleanly flush any act() cycles
    await screen.findByRole("img");
  });

  it("should successfully generate the SVG template string and render the image tag", async () => {
    render(<DiceSideThumbnail {...defaultProps} />);

    // Wait for the async IIFE inside useEffect to complete and update the DOM
    await waitFor(() => {
      const img = screen.getByRole("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "blob:http://localhost/mock-url-123");
      expect(img).toHaveAttribute("alt", "Dice Face 1");
      expect(img).toHaveAttribute("width", "150");
      expect(img).toHaveAttribute("height", "150");
    });

    // Check that our underlying render helpers were called with the correct parameters
    expect(injectSideIntoSvg).toHaveBeenCalledWith(
      "square",
      mockSideGraphics,
      500,
      500,
    );
    expect(generateSvg).toHaveBeenCalled();
    expect(stringToBlob).toHaveBeenCalled();
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });

  it("should release memory by calling revokeObjectURL on unmount", async () => {
    const { unmount } = render(<DiceSideThumbnail {...defaultProps} />);

    // Wait for it to draw so localThumbnailUrl captures the pointer reference
    await screen.findByRole("img");

    unmount();

    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(
      "blob:http://localhost/mock-url-123",
    );
  });

  it("should block asset creation if essential formatting properties are missing", () => {
    const { container } = render(
      <DiceSideThumbnail {...defaultProps} side={undefined as any} />,
    );
    expect(container.firstChild).toBeNull();
    expect(global.URL.createObjectURL).not.toHaveBeenCalled();
  });
});
