import DiceCanvas from "./DiceCanvas";
import "./App.css";
import SettingsButton from "./SettingsButton";

const DiceRoller: React.FC = () => {
  return (
    <>
      <DiceCanvas />
      <SettingsButton />
    </>
  );
};

export default DiceRoller;
