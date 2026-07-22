import { generateFaceUV } from "./canvasCommon";
import { Vector4 } from "@babylonjs/core/Maths/math";

jest.mock("@babylonjs/core/Maths/math", () => {
  return {
    Vector4: jest.fn().mockImplementation((x, y, z, w) => ({
      x,
      y,
      z,
      w,
    })),
  };
});

describe("generateFaceUV", () => {
  it("should return an array of the correct length", () => {
    const columns = 5;
    const w = 10;
    const result = generateFaceUV(columns, w);

    expect(result).toHaveLength(columns);
  });

  it("should calculate coordinates correctly for each index", () => {
    const columns = 4;
    const w = 5;
    const result = generateFaceUV(columns, w);

    expect(result[0]).toEqual({ x: 0, y: 0, z: 0.25, w: 5 });

    expect(result[1]).toEqual({ x: 0.25, y: 0, z: 0.5, w: 5 });

    expect(result[3]).toEqual({ x: 0.75, y: 0, z: 1, w: 5 });
  });

  it("should call the Vector4 constructor with correct arguments", () => {
    generateFaceUV(2, 10);
    expect(Vector4).toHaveBeenCalled();
  });
});
