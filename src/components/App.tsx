import { useState } from "react";
import BabylonCanvas from "./BabylonCanvas";
import SettingsDialog from "./SettingsDialog";

const App = () => {
  const [foregroundColor, setForegroundColor] = useState("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("#FF0000");
  const [diceType, setDiceType] = useState("poker-dice-d6");

  return (
    <>
      <SettingsDialog>
        <h2>Settings</h2>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px",
          }}
        >
          <div>
            <label>Foreground Color:</label>
            <input
              type="color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
            />
          </div>

          <div>
            <label>Background Color:</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>

          <div>
            <label>Dice Type:</label>
            <select
              value={diceType}
              onChange={(e) => setDiceType(e.target.value)}
            >
              <option value="poker-dice-d6">Poker D6</option>
              <option value="number-dice-d2">Number Dice D2</option>
              <option value="number-dice-d4">Number Dice D4</option>
              <option value="number-dice-d6">Number Dice D6</option>
              <option value="number-dice-d8">Number Dice D8</option>
              <option value="number-dice-d10">Number Dice D10</option>
              <option value="number-dice-d12">Number Dice D12</option>
              <option value="number-dice-d20">Number Dice D20</option>
              <option value="blank-dice-d2">Blank Dice D2</option>
              <option value="blank-dice-d4">Blank Dice D4</option>
              <option value="blank-dice-d6">Blank Dice D6</option>
              <option value="blank-dice-d8">Blank Dice D8</option>
              <option value="blank-dice-d10">Blank Dice D10</option>
              <option value="blank-dice-d12">Blank Dice D12</option>
              <option value="blank-dice-d20">Blank Dice D20</option>
            </select>
          </div>
        </form>
      </SettingsDialog>
      <BabylonCanvas
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
        diceType={diceType}
      />
    </>
  );
};

export default App;
