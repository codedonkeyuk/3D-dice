import { describe, it, expect } from "vitest";
import { generateFaceUV } from "./canvasCommon";
import { Vector4 } from "@babylonjs/core/Maths/math";

describe("generateFaceUV", () => {
  it("should return the correct number of UV coordinates", () => {
    const columns = 3;
    const w = 100;
    const result = generateFaceUV(columns, w);
    expect(result).toHaveLength(columns);
  });

  it("should generate correct UV values for a given input", () => {
    const columns = 2;
    const w = 1.0;
    const result = generateFaceUV(columns, w);

    expect(result[0]).toEqual(new Vector4(0, 0, 0.5, 1));
    expect(result[1]).toEqual(new Vector4(0.5, 0, 1, 1));
  });

  it("should handle zero columns correctly", () => {
    const columns = 0;
    const w = 100;
    const result = generateFaceUV(columns, w);
    expect(result).toHaveLength(0);
  });
});
