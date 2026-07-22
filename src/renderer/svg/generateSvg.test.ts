import generateSvg from "./generateSvg";

describe("generateSvg", () => {
  const dummyContent = '<circle fill="red" />';

  it("should generate a baseline SVG wrapper with XML namespaces and content", () => {
    const result = generateSvg(dummyContent);

    expect(result).toBe(
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${dummyContent}</svg>`,
    );
  });

  it("should conditionally inject width when it is specified", () => {
    const result = generateSvg(dummyContent, 500);

    expect(result).toContain('width="500"');
    expect(result).not.toContain("height=");
    expect(result).toBe(
      `<svg width="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${dummyContent}</svg>`,
    );
  });

  it("should conditionally inject height when it is specified", () => {
    const result = generateSvg(dummyContent, undefined, 400);

    expect(result).toContain('height="400"');
    expect(result).not.toContain("width=");
    expect(result).toBe(
      `<svg height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${dummyContent}</svg>`,
    );
  });

  it("should combine both width and height properties neatly when both are passed", () => {
    const result = generateSvg(dummyContent, 800, 600);

    expect(result).toBe(
      `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${dummyContent}</svg>`,
    );
  });

  it("should default to an empty string safely if content parameter resolves to null", () => {
    const result = generateSvg(null as unknown as string, 100, 100);

    expect(result).toBe(
      `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>`,
    );
  });
});
