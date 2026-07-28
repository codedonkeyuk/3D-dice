import { describe, it, expect } from "vitest";

import { type DragXyType } from "./types";
import generateDrawGraphics from "./draw";

describe("generateDrawGraphics", () => {
  const strokeColor = "#ff0000";
  const strokeWidth = 5;

  it("should correctly calculate dimensions and normalize coordinates relative to the top-left minimums", () => {
    const mockXy: DragXyType[] = [
      {
        touchOne: { x: 10, y: 50 },
        cntrl: false,
        touchTwo: undefined,
      },
      {
        touchOne: { x: 30, y: 20 },
        cntrl: false,
        touchTwo: undefined,
      },
      {
        touchOne: { x: 50, y: 70 },
        cntrl: false,
        touchTwo: undefined,
      },
    ];

    const result = generateDrawGraphics(mockXy, strokeColor, strokeWidth);

    expect(result.x).toBe(10);
    expect(result.y).toBe(20);
    expect(result.width).toBe(40);
    expect(result.height).toBe(50);

    expect(result.id).toBe(0);
    expect(result.type).toBe("line");
    expect(result.rotate).toBe(0);
    expect(result.strokeColor).toBe(strokeColor);
    expect(result.strokeWidth).toBe(strokeWidth);

    expect(result.coOrds).toEqual([
      { x: 0, y: 30 },
      { x: 20, y: 0 },
      { x: 40, y: 50 },
    ]);
  });

  it("should handle a single coordinate point correctly", () => {
    const singlePointXy: DragXyType[] = [
      {
        touchOne: { x: 15, y: 25 },
        cntrl: false,
        touchTwo: undefined,
      },
    ];

    const result = generateDrawGraphics(
      singlePointXy,
      strokeColor,
      strokeWidth,
    );

    expect(result.x).toBe(15);
    expect(result.y).toBe(25);
    expect(result.width).toBe(0);
    expect(result.height).toBe(0);
    expect(result.coOrds).toEqual([{ x: 0, y: 0 }]);
  });

  it("should safely handle negative coordinate values", () => {
    const negativeXy: DragXyType[] = [
      {
        touchOne: { x: -10, y: -20 },
        cntrl: false,
        touchTwo: undefined,
      },
      {
        touchOne: { x: 10, y: 10 },
        cntrl: false,
        touchTwo: undefined,
      },
    ];

    const result = generateDrawGraphics(negativeXy, strokeColor, strokeWidth);

    expect(result.x).toBe(-10);
    expect(result.y).toBe(-20);
    expect(result.width).toBe(20);
    expect(result.height).toBe(30);
    expect(result.coOrds).toEqual([
      { x: 0, y: 0 },
      { x: 20, y: 30 },
    ]);
  });
});
