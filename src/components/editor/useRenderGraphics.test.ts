import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useRenderGraphics from "./useRenderGraphics";
import canvasGraphicElementsRenderer from "./canvasGraphicElementsRenderer";
import { type GraphicElement } from "../../types";

// Mock the external renderer function
vi.mock("./canvasGraphicElementsRenderer", () => ({
  default: vi.fn(),
}));

describe("useRenderGraphics", () => {
  let mockCtx: CanvasRenderingContext2D;
  const mockElements: GraphicElement[] = [
    { id: "1", type: "rect" } as unknown as GraphicElement,
    { id: "2", type: "circle" } as unknown as GraphicElement,
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    // Create a mocked canvas context with chained methods
    mockCtx = {
      beginPath: vi.fn(),
      stroke: vi.fn(),
    } as unknown as CanvasRenderingContext2D;
  });

  it("should do nothing if the canvas context is null", () => {
    const { result } = renderHook(() => useRenderGraphics());
    const render = result.current;

    // Execute with null context
    render(mockElements, null);

    // Verify internal drawing methods and renderer were never called
    expect(canvasGraphicElementsRenderer).not.toHaveBeenCalled();
  });

  it("should isolate, render, and stroke each graphic element individually", () => {
    const { result } = renderHook(() => useRenderGraphics());
    const render = result.current;

    // Execute with valid elements and context
    render(mockElements, mockCtx);

    // Verify context lifecycle methods were called for each element
    expect(mockCtx.beginPath).toHaveBeenCalledTimes(2);
    expect(mockCtx.stroke).toHaveBeenCalledTimes(2);

    // Verify the renderer was called separately for each individual item
    expect(canvasGraphicElementsRenderer).toHaveBeenNthCalledWith(
      1,
      [mockElements[0]],
      mockCtx,
    );
    expect(canvasGraphicElementsRenderer).toHaveBeenNthCalledWith(
      2,
      [mockElements[1]],
      mockCtx,
    );
  });
});
