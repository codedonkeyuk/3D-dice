import { StrictMode, Suspense, lazy } from "react";
import { BrowserRouter } from "react-router";
import DiceContextProvider from "../context/DiceContextProvider";
import BabylonCanvas from "./BabylonCanvas";
import SettingsDialog from "./SettingsDialog";
import "./main.css";
import Loading from "./Loading";

const SettingsForm = lazy(() => import("./SettingsForm"));

const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <DiceContextProvider>
          <SettingsDialog>
            <Suspense fallback={<Loading />}>
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
