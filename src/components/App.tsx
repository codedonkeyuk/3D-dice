import BabylonCanvas from "./BabylonCanvas";
import SettingsDialog from "./SettingsDialog";

const App = () => {
  return (
    <>
      <SettingsDialog>
        <h2>Settings</h2>
      </SettingsDialog>
      <BabylonCanvas />
    </>
  );
};

export default App;
