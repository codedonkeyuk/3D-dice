import type { SideGraphics } from "../types";

export interface DiceData {
  id?: string;
  name: string;
  backgroundColor: string;
  foregroundColor: string;
  diceTemplate:
    | "blank-dice-d2"
    | "blank-dice-d4"
    | "blank-dice-d6"
    | "blank-dice-d8"
    | "blank-dice-d10"
    | "blank-dice-d12"
    | "blank-dice-d20";
  sides: SideGraphics[];
}

const generateIdFromName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
};

export function initCustomDiceDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("DiceVault", 1);

    request.onupgradeneeded = (event) => {
      const target = event.target as IDBOpenDBRequest;
      const db = target.result;

      if (!db.objectStoreNames.contains("dice")) {
        db.createObjectStore("dice", { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      const target = event.target as IDBOpenDBRequest;
      resolve(target.result);
    };

    request.onerror = (event) => {
      const target = event.target as IDBOpenDBRequest;
      reject(`Failed to open Dice DB: ${target.error?.message}`);
    };
  });
}

export function saveCustomDice(
  db: IDBDatabase,
  data: DiceData,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!data.name || !data.name.trim()) {
      return reject("Cannot save custom dice: Name property is empty.");
    }

    const targetId = generateIdFromName(data.name);

    const transaction = db.transaction("dice", "readwrite");
    const store = transaction.objectStore("dice");

    if (data.id && data.id !== targetId) {
      store.delete(data.id);
    }

    const record: DiceData = { ...data, id: targetId };
    const request = store.put(record);

    request.onsuccess = () => resolve(targetId);
    request.onerror = () => reject(request.error);
  });
}

export function getCustomDice(
  db: IDBDatabase,
  id: string,
): Promise<DiceData | undefined> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("dice", "readonly");
    const store = transaction.objectStore("dice");
    const request = store.get(id);

    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result as DiceData);
      } else {
        resolve(undefined);
      }
    };

    request.onerror = () => reject(request.error);
  });
}

export function deleteDice(db: IDBDatabase, id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("dice", "readwrite");
    const store = transaction.objectStore("dice");

    const request = store.delete(id);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      reject(`Failed to delete dice with ID ${id}: ${request.error?.message}`);
    };
  });
}

export interface DiceSelectOption {
  id: string;
  name: string;
}

export function fetchDiceSelectOptions(
  db: IDBDatabase,
): Promise<DiceSelectOption[]> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("dice", "readonly");
    const store = transaction.objectStore("dice");

    const request = store.openCursor();
    const options: DiceSelectOption[] = [];

    request.onsuccess = (event) => {
      const target = event.target as IDBRequest<IDBCursorWithValue | null>;
      const cursor = target.result;

      if (cursor) {
        options.push({
          id: cursor.key as string,
          name: cursor.value.name as string,
        });
        cursor.continue();
      } else {
        resolve(options);
      }
    };

    request.onerror = () => reject(request.error);
  });
}

export function validateId(db: IDBDatabase, name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!name || !name.trim()) {
      resolve(true);
      return;
    }

    const generatedId = generateIdFromName(name);

    const transaction = db.transaction("dice", "readonly");
    const store = transaction.objectStore("dice");

    const request = store.get(generatedId);

    request.onsuccess = () => {
      const isAvailable = request.result === undefined;
      resolve(isAvailable);
    };

    request.onerror = () => {
      reject(`Error validating ID availability: ${request.error?.message}`);
    };
  });
}
