import { useState } from "react";
import BabylonCanvas from "./BabylonCanvas";
import SettingsDialog from "./SettingsDialog";

const App = () => {
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [diceType, setDiceType] = useState("d6");

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
              <option value="d4">d4</option>
              <option value="d6">d6</option>
              <option value="d8">d8</option>
              <option value="d10">d10</option>
              <option value="d12">d12</option>
              <option value="d20">d20</option>
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
