import getDice from "./diceRenderer";

jest.mock("./dicePlaneRenderer3D", () => ({
  _default: { name: "mock-plane" },
}));
jest.mock("./dicePolygonRenderer3D", () => ({
  _default: { name: "mock-polygon" },
}));

import dicePlaneRenderer3D from "./dicePlaneRenderer3D";
import dicePolygonRenderer3D from "./dicePolygonRenderer3D";

describe("getDice Unit Test", () => {
  const polygonKeys = ["D4", "D6", "D8", "D10", "D12", "D20"];

  test.each(polygonKeys)(
    "should return dicePolygonRenderer3D when subCategory is %s",
    async (key) => {
      const mockData = { subCategory: key } as any;
      const result = await getDice(mockData);

      expect(result).toBe(dicePolygonRenderer3D);
    },
  );

  test("should return dicePlaneRenderer3D when subCategory is D2", async () => {
    const mockData = { subCategory: "D2" } as any;
    const result = await getDice(mockData);

    expect(result).toBe(dicePlaneRenderer3D);
  });

  test("should throw error for invalid/missing subCategory", async () => {
    const mockDataUnknown = { subCategory: "D100" } as any;
    await expect(getDice(mockDataUnknown)).rejects.toThrow(
      "Cannot find 3D renderer for dice D100",
    );

    const mockDataNull = { subCategory: null } as any;
    await expect(getDice(mockDataNull)).rejects.toThrow();
  });
});
