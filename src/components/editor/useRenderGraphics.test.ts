import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useRenderGraphics from "./useRenderGraphics";
import canvasGraphicElementsRenderer from "./canvasGraphicElementsRenderer";
import { type GraphicElement } from "../../types";

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

    mockCtx = {
      beginPath: vi.fn(),
      stroke: vi.fn(),
    } as unknown as CanvasRenderingContext2D;
  });

  it("should do nothing if the canvas context is null", () => {
    const { result } = renderHook(() => useRenderGraphics());
    const render = result.current;

    render(mockElements, null);

    expect(canvasGraphicElementsRenderer).not.toHaveBeenCalled();
  });

  it("should isolate, render, and stroke each graphic element individually", () => {
    const { result } = renderHook(() => useRenderGraphics());
    const render = result.current;

    render(mockElements, mockCtx);

    expect(mockCtx.beginPath).toHaveBeenCalledTimes(2);
    expect(mockCtx.stroke).toHaveBeenCalledTimes(2);

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
