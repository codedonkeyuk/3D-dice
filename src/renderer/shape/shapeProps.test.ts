import { describe, it, expect } from "vitest";
import applyShapeDefaults from "./shapeProps";
import type { GraphicElement } from "../../types";

describe("applyShapeDefaults", () => {
  it("should return default values when no props are provided", () => {
    const props = {
      id: 123,
      description: "a test description",
      type: "square",
      width: 10,
      height: 10,
      rotate: 0,
    };
    const result = applyShapeDefaults(props as GraphicElement);
    expect(result).toEqual({
      x: 0,
      y: 0,
      id: 123,
      description: "a test description",
      type: "square",
      width: 10,
      height: 10,
      rotate: 0,
    });
  });

  it("should return the resuklts unchanged if all properties are provided", () => {
    const props: GraphicElement = {
      x: 10,
      y: 20,
      id: 123,
      description: "a test description",
      type: "square",
      width: 10,
      height: 10,
      rotate: 0,
    };
    const result = applyShapeDefaults(props);
    expect(result).toEqual({
      x: 10,
      y: 20,
      id: 123,
      description: "a test description",
      type: "square",
      width: 10,
      height: 10,
      rotate: 0,
    });
  });
});
