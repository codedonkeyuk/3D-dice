import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useLocation, useParams } from "react-router";
import { findDice } from "../models/find";
import DiceNotFoundError from "../error/DiceNotFoundError";
import { useDiceDB } from "./CustomDiceDbProvider";
import { getCustomDice } from "../storage/customDiceStore";
import type { CategoryRecord, ModelPiece, SideGraphics } from "../types";

interface DiceContextType {
  model: CategoryRecord<ModelPiece, SideGraphics> | undefined;
  refresh: () => void;
}

const DiceContext = createContext<DiceContextType | undefined>(undefined);

export const DiceContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [model, setModel] = useState<
    undefined | CategoryRecord<ModelPiece, SideGraphics>
  >(undefined);
  const location = useLocation();
  const { db, isLoading, error } = useDiceDB();
  const [errorState, setErrorState] = useState<any>(null);

  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const { diceId } = useParams<{ diceId: string }>();

  const params = new URLSearchParams(location.search);
  const backgroundColor = params.get("background-color") || "#FF0000";
  const foregroundColor = params.get("foreground-color") || "#FFFFFF";

  const activeDiceType = diceId || "poker-dice-d6";

  const refresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  if (errorState) {
    throw errorState;
  }

  useEffect(() => {
    if (db && diceId && !isLoading && !error) {
      (async () => {
        let catalogDice = findDice(activeDiceType);

        if (!catalogDice) {
          let dbDice = await getCustomDice(db, activeDiceType);
          if (!dbDice) {
            throw new DiceNotFoundError(activeDiceType);
          }
          catalogDice = findDice(dbDice.diceTemplate);
          if (!catalogDice) {
            throw new DiceNotFoundError(activeDiceType);
          }

          const sides = dbDice.sides.map((side) => ({
            ...side,
            elements: side.elements.map((element) => ({
              ...element,
              strokeColor: foregroundColor,
            })),
          }));

          setModel({
            ...catalogDice,
            form: {
              ...catalogDice?.form,
              foregroundColor,
              backgroundColor,
              sides: sides,
            },
          } as any);
          return;
        }

        setModel({
          ...catalogDice,
          form: {
            ...catalogDice?.form,
            foregroundColor,
            backgroundColor,
          },
        } as any);
      })().catch((err) => {
        setErrorState(err);
      });
    }
  }, [
    activeDiceType,
    db,
    isLoading,
    error,
    diceId,
    backgroundColor,
    foregroundColor,
    refreshTrigger,
  ]);

  return (
    <DiceContext.Provider value={{ model, refresh }}>
      {children}
    </DiceContext.Provider>
  );
};

export const useDiceEngine = (): DiceContextType => {
  const context = useContext(DiceContext);
  if (!context) throw new Error("useDiceEngine framework error");
  return context;
};

export default DiceContextProvider;
