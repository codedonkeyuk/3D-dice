import { StrictMode, Suspense, lazy } from "react";
import { BrowserRouter } from "react-router";
import DiceContextProvider from "../context/DiceContextProvider";
import BabylonCanvas from "./BabylonCanvas";
import SettingsDialog from "./SettingsDialog";

const SettingsForm = lazy(() => import("./SettingsForm"));

const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <DiceContextProvider>
          <SettingsDialog>
            <Suspense fallback={null}>
              <SettingsForm />
            </Suspense>
          </SettingsDialog>
          <BabylonCanvas />
        </DiceContextProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
