// diceDb.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import "fake-indexeddb/auto";
import {
  initCustomDiceDB,
  saveCustomDice,
  getCustomDice,
  deleteDice,
  fetchDiceSelectOptions,
  validateId,
  type DiceData,
} from "./customDiceStore";

describe("DiceVault Database Operations", () => {
  let db: IDBDatabase;

  beforeEach(async () => {
    db = await initCustomDiceDB();
  });

  afterEach(() => {
    if (db) {
      db.close();
    }

    indexedDB.deleteDatabase("DiceVault");
  });

  const createMockDice = (name: string): DiceData => ({
    name,
    backgroundColor: "#ff0000",
    foregroundColor: "#ffffff",
    diceTemplate: "blank-dice-d20",
    sides: [],
  });

  it("should initialize the database and create the 'dice' object store", () => {
    expect(db).toBeDefined();
    expect(db.objectStoreNames.contains("dice")).toBe(true);
  });

  it("should generate a clean slug ID internally and save a brand new die", async () => {
    const freshDice = createMockDice("  Dragon Fire D20! ");
    const expectedId = "dragon-fire-d20";

    const savedId = await saveCustomDice(db, freshDice);
    expect(savedId).toBe(expectedId);

    const fetched = await getCustomDice(db, expectedId);
    expect(fetched).toBeDefined();
    expect(fetched?.name).toBe("  Dragon Fire D20! ");
    expect(fetched?.id).toBe(expectedId);
  });

  it("should update an existing die if the name remains unchanged", async () => {
    const initialDice = createMockDice("Ice Storm");
    const id = await saveCustomDice(db, initialDice);

    const storedDice = (await getCustomDice(db, id))!;
    storedDice.backgroundColor = "#0000ff";

    const updatedId = await saveCustomDice(db, storedDice);
    expect(updatedId).toBe(id);

    const verifiedDice = (await getCustomDice(db, id))!;
    expect(verifiedDice.backgroundColor).toBe("#0000ff");
  });

  it("should successfully rename an item and delete the old ghost database record", async () => {
    const originalDice = createMockDice("Old Name D6");
    const oldId = await saveCustomDice(db, originalDice);

    const targetDice = (await getCustomDice(db, oldId))!;
    targetDice.name = "Shiny New Name D6";

    const newId = await saveCustomDice(db, targetDice);
    expect(newId).toBe("shiny-new-name-d6");

    const newRecord = await getCustomDice(db, newId);
    const oldRecord = await getCustomDice(db, oldId);

    expect(newRecord).toBeDefined();
    expect(newRecord?.id).toBe("shiny-new-name-d6");
    expect(oldRecord).toBeUndefined();
  });

  it("should reject the operation if a user attempts to save an empty name", async () => {
    const invalidDice = createMockDice("   ");
    await expect(saveCustomDice(db, invalidDice)).rejects.toMatch(
      /Name property is empty/,
    );
  });

  it("should remove a dice record permanently when delete is executed", async () => {
    const targetDice = createMockDice("Disposable D4");
    const id = await saveCustomDice(db, targetDice);

    const deleteSuccess = await deleteDice(db, id);
    expect(deleteSuccess).toBe(true);

    const checkRecord = await getCustomDice(db, id);
    expect(checkRecord).toBeUndefined();
  });

  it("should return a lightweight key-value map array for select dropdown lists", async () => {
    await saveCustomDice(db, createMockDice("Alpha"));
    await saveCustomDice(db, createMockDice("Beta"));

    const selectOptions = await fetchDiceSelectOptions(db);

    expect(selectOptions).toHaveLength(2);
    expect(selectOptions).toEqual([
      { id: "alpha", name: "Alpha" },
      { id: "beta", name: "Beta" },
    ]);
  });

  it("should return false for validateId if a duplicate generated key matches an existing record", async () => {
    await saveCustomDice(db, createMockDice("Paladin's Shield"));

    const isAvailableDuplicate = await validateId(db, "Paladin's Shield");
    expect(isAvailableDuplicate).toBe(false);

    const isAvailableCaseVariation = await validateId(db, "PALADIN'S SHIELD");
    expect(isAvailableCaseVariation).toBe(false);

    const isAvailableUnique = await validateId(db, "Rogue's Dagger");
    expect(isAvailableUnique).toBe(true);
  });
});
