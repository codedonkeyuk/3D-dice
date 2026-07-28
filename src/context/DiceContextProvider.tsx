import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { findDice } from "../models/find";
import DiceNotFoundError from "../error/DiceNotFoundError";
import { useDiceDB } from "./CustomDiceDbProvider";
import { getCustomDice } from "../storage/customDiceStore";
import type { CategoryRecord, ModelPiece, SideGraphics } from "../types";

interface DiceContextType {
  model: any;
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

  const { diceId } = useParams<{ diceId: string }>();

  const params = new URLSearchParams(location.search);
  const backgroundColor = params.get("background-color") || "#FF0000";
  const foregroundColor = params.get("foreground-color") || "#FFFFFF";

  const activeDiceType = diceId || "poker-dice-d6";

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
          setModel({
            ...catalogDice,
            form: {
              ...catalogDice?.form,
              foregroundColor,
              backgroundColor,
              sides: dbDice.sides,
            },
          } as any);
          return; // Don't run the outer setModel if this matches
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
        // 1. FIXED: Safely intercept the background promise failure
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
  ]);

  return (
    <DiceContext.Provider value={{ model }}>{children}</DiceContext.Provider>
  );
};

export const useDiceEngine = (): DiceContextType => {
  const context = useContext(DiceContext);
  if (!context) throw new Error("useDiceEngine framework error");
  return context;
};

export default DiceContextProvider;
