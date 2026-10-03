import DiceCanvas from "./DiceCanvas";
import Copyright from "./Copyright";
import SettingsButton from "./SettingsButton";

const DiceRoller: React.FC = () => {
  return (
    <>
      <DiceCanvas />
      <SettingsButton />
      <Copyright />
    </>
  );
};

export default DiceRoller;
