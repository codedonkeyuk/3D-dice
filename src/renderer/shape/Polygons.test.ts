import { describe, it, expect } from "vitest";
import {
  triangleCoordinates,
  pentagonCoordinates,
  hexagonCoordinates,
} from "./Polygons";

describe("Polygons", () => {
  it("should calculate triangle coordinates correctly", () => {
    const coords = triangleCoordinates(0, 0, 100, 100);
    expect(coords).toEqual([
      { x: 50, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ]);
  });

  it("should calculate pentagon coordinates correctly", () => {
    const coords = pentagonCoordinates(0, 0, 100, 100);
    expect(coords).toEqual([
      { x: 50, y: 0 },
      { x: 100, y: 35 },
      { x: 80, y: 100 },
      { x: 20, y: 100 },
      { x: 0, y: 35 },
    ]);
  });

  it("should calculate hexagon coordinates correctly", () => {
    const coords = hexagonCoordinates(0, 0, 100, 100);
    expect(coords).toEqual([
      { x: 50, y: 0 },
      { x: 100, y: 25 },
      { x: 100, y: 75 },
      { x: 50, y: 100 },
      { x: 0, y: 75 },
      { x: 0, y: 25 },
    ]);
  });
});
