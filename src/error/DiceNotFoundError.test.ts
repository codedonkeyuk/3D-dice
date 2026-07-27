import { describe, it, expect } from "vitest";
import DiceNotFoundError from "./DiceNotFoundError";

describe("DiceNotFoundError", () => {
  it("should set the correct message and properties when instantiated", () => {
    const fakeDiceType = "cosmic-d20";

    const error = new DiceNotFoundError(fakeDiceType);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(DiceNotFoundError);
    expect(error.name).toBe("DiceNotFoundError");
    expect(error.message).toBe('The dice type "cosmic-d20" does not exist.');
  });

  it("should preserve the JavaScript stack trace", () => {
    const error = new DiceNotFoundError("faulty-d6");

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain("DiceNotFoundError");
  });
});
