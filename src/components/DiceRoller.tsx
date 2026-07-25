import BabylonCanvas from "./BabylonCanvas";
import "./App.css";
import SettingsButton from "./SettingsButton";

const DiceRoller: React.FC = () => {
  return (
    <>
      <BabylonCanvas />
      <SettingsButton />
    </>
  );
};

export default DiceRoller;
