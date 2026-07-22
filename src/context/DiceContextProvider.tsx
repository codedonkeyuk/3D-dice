import React, { createContext, useContext } from "react";
import { useLocation } from "react-router";
import { findDice } from "../models/find";

interface DiceContextType {
  model: any;
}

const DiceContext = createContext<DiceContextType | undefined>(undefined);

export const DiceContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const diceType = params.get("dice-type") || "poker-dice-d6";
  const backgroundColor = params.get("background-color") || "#FF0000";
  const foregroundColor = params.get("foreground-color") || "#FFFFFF";

  const dice = findDice(diceType);

  const model = dice
    ? {
        ...dice,
        form: {
          ...dice.form,
          foregroundColor,
          backgroundColor,
        },
      }
    : null;

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
