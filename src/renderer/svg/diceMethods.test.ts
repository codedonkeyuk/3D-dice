import { diceSlot, diceStyle } from "./diceMethods"; // Adjust path as needed
import { type FormAttribute } from "../../types";

describe("diceSlot", () => {
  const baseSlot = {
    x: 10,
    y: 20,
    content: "<circle cx='256' cy='256' r='40' />",
    width: 100,
    height: 100,
  };

  it("should generate core SVG structural elements and inject correct dimensions", () => {
    const result = diceSlot({ ...baseSlot, rotate: 45 });

    expect(result).toContain(
      'style="transform-box: fill-box;transform-origin: center;transform: rotate(45deg) skew(0deg, 0deg);"',
    );

    expect(result).toContain(
      '<svg viewBox="0 0 512 512" x="10" y="20" width="100" height="100">',
    );

    expect(result).toContain(
      '<rect width="512" height="512" style="fill:transparent;stroke-width:10;" />',
    );

    expect(result).toContain("<circle cx='256' cy='256' r='40' />");
  });

  it("should dynamically inject scale transformations when scaling parameters are declared", () => {
    const result = diceSlot({
      ...baseSlot,
      rotate: 0,
      scaleX: 1.5,
      scaleY: 2,
    });

    expect(result).toContain(
      "transform: rotate(0deg) scale(1.5, 2) skew(0deg, 0deg);",
    );
  });

  it("should apply correct alternate fallbacks (1) if only scaleX or scaleY is defined", () => {
    const resultWithOnlyX = diceSlot({
      ...baseSlot,
      rotate: 0,
      scaleX: 1.8,
    });

    expect(resultWithOnlyX).toContain("scale(1.8, 1)");

    const resultWithOnlyY = diceSlot({
      ...baseSlot,
      rotate: 0,
      scaleY: 0.5,
    });

    expect(resultWithOnlyY).toContain("scale(1, 0.5)");
  });

  it("should completely omit the scale expression if scale properties are null or undefined", () => {
    const result = diceSlot({
      ...baseSlot,
      rotate: 90,
      scaleX: undefined,
      scaleY: undefined,
    });

    expect(result).not.toContain("scale(");
    expect(result).toContain("transform: rotate(90deg) skew(0deg, 0deg);");
  });

  it("should pass down skew angles into style rules and default to 0 if left undefined", () => {
    const resultWithSkews = diceSlot({
      ...baseSlot,
      rotate: 0,
      skewX: 15,
      skewY: -10,
    });

    expect(resultWithSkews).toContain("skew(15deg, -10deg)");
  });
});

describe("diceStyle", () => {
  it("should dynamically build valid internal CSS block injections matching specified form attributes", () => {
    const fontColor: FormAttribute = "#ffffff" as unknown as FormAttribute;
    const faceColor: FormAttribute = "red" as unknown as FormAttribute;

    const result = diceStyle(fontColor, faceColor);

    expect(result).toContain("<style>");
    expect(result).toContain("fill: #ffffff;");
    expect(result).toContain("fill: red;");

    expect(result).toContain(
      ".background {\n          fill: black;\n        }",
    );
  });
});
