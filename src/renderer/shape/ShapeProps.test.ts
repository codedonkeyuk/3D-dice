import applyShapeDefaults from "./shapeProps";
import { type GraphicElement } from "../../types";

describe("applyShapeDefaults", () => {
  it("should apply default values when x and y are missing", () => {
    const inputProps = {
      id: "element-1",
      type: "circle",
    } as unknown as GraphicElement;

    const result = applyShapeDefaults(inputProps);

    expect(result).toEqual({
      id: "element-1",
      type: "circle",
      x: 0,
      y: 0,
    });
  });

  it("should preserve original x and y coordinates if they are provided", () => {
    const inputProps = {
      id: "element-2",
      type: "rect",
      x: 15,
      y: 30,
    } as unknown as GraphicElement;

    const result = applyShapeDefaults(inputProps);

    expect(result.x).toBe(15);
    expect(result.y).toBe(30);
  });

  it("should handle partial overrides (e.g., providing only x or only y)", () => {
    const inputProps = { x: 50 } as unknown as GraphicElement;

    const result = applyShapeDefaults(inputProps);

    expect(result.x).toBe(50);
    expect(result.y).toBe(0);
  });

  it("should return a new object instance and not mutate the original input", () => {
    const inputProps = { x: 10, y: 20 } as unknown as GraphicElement;

    const result = applyShapeDefaults(inputProps);

    expect(result).not.toBe(inputProps);
  });
});
