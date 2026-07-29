import { describe, it, expect, vi, beforeEach } from "vitest";
import canvasGraphicElementsRenderer from "./canvasGraphicElementsRenderer";
import { type GraphicElement } from "../../types";

vi.mock("./canvasShapes", () => ({
  drawSquare: vi.fn(),
  drawTriangle: vi.fn(),
  drawPentagon: vi.fn(),
  drawLine: vi.fn(),
  drawCircle: vi.fn(),
  drawHexagon: vi.fn(),
  drawTarget: vi.fn(),
  numberSide: vi.fn(),
  drawText: vi.fn(),
}));

vi.mock("../../renderer/shape/shapeProps", () => ({
  default: vi.fn((el) => ({ ...el, _processedByDefaults: true })),
}));

import {
  drawSquare,
  drawTriangle,
  drawPentagon,
  drawLine,
  drawCircle,
  drawHexagon,
  drawTarget,
  numberSide,
  drawText,
} from "./canvasShapes";
import applyShapeDefaults from "../../renderer/shape/shapeProps";

describe("canvasGraphicElementsRenderer", () => {
  let mockCtx: CanvasRenderingContext2D;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCtx = {} as unknown as CanvasRenderingContext2D;
  });

  it("should process elements through applyShapeDefaults before drawing them", () => {
    const rawElement = { id: "1", type: "square" } as unknown as GraphicElement;

    canvasGraphicElementsRenderer([rawElement], mockCtx);

    expect(applyShapeDefaults).toHaveBeenCalledWith(rawElement);
    expect(drawSquare).toHaveBeenCalledWith(mockCtx, {
      ...rawElement,
      _processedByDefaults: true,
    });
  });

  it("should sequentially loop through multiple elements and match their exact drawing routes", () => {
    const mixedElements: GraphicElement[] = [
      { id: "e1", type: "square" } as unknown as GraphicElement,
      { id: "e2", type: "triangle" } as unknown as GraphicElement,
      { id: "e3", type: "pentagon" } as unknown as GraphicElement,
      { id: "e4", type: "line" } as unknown as GraphicElement,
      { id: "e5", type: "circle" } as unknown as GraphicElement,
      { id: "e6", type: "hexagon" } as unknown as GraphicElement,
      { id: "e7", type: "target" } as unknown as GraphicElement,
      { id: "e8", type: "diceNumberedSide" } as unknown as GraphicElement,
      { id: "e9", type: "text" } as unknown as GraphicElement,
    ];

    canvasGraphicElementsRenderer(mixedElements, mockCtx);

    expect(drawSquare).toHaveBeenCalledTimes(1);
    expect(drawTriangle).toHaveBeenCalledTimes(1);
    expect(drawPentagon).toHaveBeenCalledTimes(1);
    expect(drawLine).toHaveBeenCalledTimes(1);
    expect(drawCircle).toHaveBeenCalledTimes(1);
    expect(drawHexagon).toHaveBeenCalledTimes(1);
    expect(drawTarget).toHaveBeenCalledTimes(1);
    expect(numberSide).toHaveBeenCalledTimes(1);
    expect(drawText).toHaveBeenCalledTimes(1);
  });

  it("should safely pass over execution loop if the element array is empty", () => {
    canvasGraphicElementsRenderer([], mockCtx);

    expect(applyShapeDefaults).not.toHaveBeenCalled();
    expect(drawSquare).not.toHaveBeenCalled();
  });
});
