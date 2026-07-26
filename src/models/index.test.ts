import { describe, it, expect } from "vitest";
import dice from "./index";

describe("Dice Model Array", () => {
  it("should have a list of dice", () => {
    expect(Array.isArray(dice)).toBe(true);
    expect(dice.length).toBeGreaterThan(0);
  });

  it("should contain exactly 15 records", () => {
    expect(dice.length).toBe(15);
  });

  it("should have valid property structure for all models", () => {
    dice.forEach((item) => {
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("category");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("form");
    });
  });
});
