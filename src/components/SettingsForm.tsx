import React from "react";
import { useSearchParams } from "react-router";

type DiceConfigKey = "foreground-color" | "background-color" | "dice-type";

type DiceType =
  | "poker-dice-d6"
  | "number-dice-d2"
  | "number-dice-d4"
  | "number-dice-d6"
  | "number-dice-d8"
  | "number-dice-d10"
  | "number-dice-d12"
  | "number-dice-d20"
  | "blank-dice-d2"
  | "blank-dice-d4"
  | "blank-dice-d6"
  | "blank-dice-d8"
  | "blank-dice-d10"
  | "blank-dice-d12"
  | "blank-dice-d20";

const SettingsForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const foregroundColor: string =
    searchParams.get("foreground-color") || "#FFFFFF";
  const backgroundColor: string =
    searchParams.get("background-color") || "#FF0000";
  const diceType = (searchParams.get("dice-type") ||
    "poker-dice-d6") as DiceType;

  const updateUrlParam = (key: DiceConfigKey, value: string): void => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set(key, value);
    setSearchParams(nextParams);
  };

  return (
    <>
      <h2 className="dialog-title">Settings</h2>

      <form className="settings-form">
        <div className="form-group row-group">
          <label htmlFor="fgColorInput" className="form-label">
            Foreground Color:
          </label>
          <div className="color-picker-wrapper">
            <input
              id="fgColorInput"
              type="color"
              value={foregroundColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateUrlParam("foreground-color", e.target.value)
              }
              className="accessible-color-picker"
            />
          </div>
        </div>

        <div className="form-group row-group">
          <label htmlFor="bgColorInput" className="form-label">
            Background Color:
          </label>
          <div className="color-picker-wrapper">
            <input
              id="bgColorInput"
              type="color"
              value={backgroundColor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateUrlParam("background-color", e.target.value)
              }
              className="accessible-color-picker"
            />
          </div>
        </div>

        <div className="form-group column-group">
          <label htmlFor="diceTypeSelect" className="form-label">
            Dice Type:
          </label>
          <select
            id="diceTypeSelect"
            value={diceType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateUrlParam("dice-type", e.target.value)
            }
            className="accessible-select"
          >
            <option value="poker-dice-d6">Poker D6</option>
            <option value="number-dice-d2">Number Dice D2</option>
            <option value="number-dice-d4">Number Dice D4</option>
            <option value="number-dice-d6">Number Dice D6</option>
            <option value="number-dice-d8">Number Dice D8</option>
            <option value="number-dice-d10">Number Dice D10</option>
            <option value="number-dice-d12">Number Dice D12</option>
            <option value="number-dice-d20">Number Dice D20</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default SettingsForm;
