import dice from "./index";

describe("Dice Configuration", () => {
  test("dice should be an array", () => {
    expect(Array.isArray(dice)).toBe(true);
  });

  test("should contain exactly 15 dice types", () => {
    expect(dice).toHaveLength(15);
  });

  test("all dice items should be defined and not null", () => {
    dice.forEach((die) => {
      expect(die).toBeDefined();
      expect(die).not.toBeNull();
    });
  });

  test("should not contain duplicate objects in the list", () => {
    const uniqueDice = new Set(dice);
    expect(uniqueDice.size).toBe(dice.length);
  });
});
