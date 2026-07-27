import { describe, it, expect, vi } from "vitest";
import getDice from "./diceRenderer";
import dicePlaneRenderer3D from "./dicePlaneRenderer3D";
import dicePolygonRenderer3D from "./dicePolygonRenderer3D";

vi.mock("./dicePlaneRenderer3D", () => ({
  default: { name: "plane_renderer" },
}));

vi.mock("./dicePolygonRenderer3D", () => ({
  default: { name: "polygon_renderer" },
}));

describe("getDice", () => {
  it("should return dicePolygonRenderer3D for standard polyhedrons (e.g., D6)", async () => {
    const result = await getDice({
      subCategory: "D6",
    } as any);
    expect(result).toBe(dicePolygonRenderer3D);
  });

  it("should return dicePlaneRenderer3D for D2", async () => {
    const result = await getDice({
      subCategory: "D2",
    } as any);
    expect(result).toBe(dicePlaneRenderer3D);
  });

  it("should throw an error for unknown subCategories", async () => {
    await expect(
      getDice({
        subCategory: "Unknown",
      } as any)
    ).rejects.toThrow("Cannot find 3D renderer for dice Unknown");
  });

  it("should throw an error when subCategory is null/undefined (as empty string)", async () => {
    await expect(
      getDice({
        subCategory: null,
      } as any)
    ).rejects.toThrow("Cannot find 3D renderer for dice null");
  });
});
