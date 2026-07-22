import { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import DiceContextProvider from "../context/DiceContextProvider";
import SettingsForm from "./SettingsForm";
import BabylonCanvas from "./BabylonCanvas";

const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <DiceContextProvider>
          <SettingsForm />
          <BabylonCanvas />
        </DiceContextProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
