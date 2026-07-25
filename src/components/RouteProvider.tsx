import {
  createBrowserRouter,
  Navigate,
  Outlet,
  useNavigation,
} from "react-router";
import DiceContextProvider from "../context/DiceContextProvider";
import { Error404 } from "./Errors";
import Loading from "./Loading";

const RootLayout = () => {
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  return (
    <DiceContextProvider>
      {isPageLoading ? <Loading /> : <Outlet />}
    </DiceContextProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/poker-dice-d6" replace />,
      },
      {
        path: "/:diceId",
        lazy: () =>
          import("./DiceRoller").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "/:diceId/settings",
        lazy: () =>
          import("./Settings").then((module) => ({
            Component: module.default,
          })),
      },
      {
        path: "*",
        element: Error404(),
      },
    ],
  },
]);

export default router;
