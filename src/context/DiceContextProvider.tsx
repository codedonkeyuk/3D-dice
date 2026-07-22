import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router";
import getDice from "../renderer/diceRenderer";
import { findDice } from "../dice/find";

interface DiceContextType {
  dType: string;
  bColor: string;
  fColor: string;
  template: string;
  renderModel: ((scene: any) => Promise<void>) | null;
  isLoading: boolean;
  error: string | null;
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
  const template = params.get("custom-template") || "default";

  const [renderModel, setRenderModel] = useState<
    ((scene: any) => Promise<void>) | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrentRequest = true;
    setIsLoading(true);
    setError(null);

    const loadDiceAssets = async () => {
      try {
        const dice = findDice(diceType);
        if (dice === undefined) {
          throw new Error(
            `The dice "${diceType}" is not in collection this should never happen`,
          );
        }

        const renderer = await getDice(dice);

        const dynamicBuilderTask = async (scene: any) => {
          await renderer(scene, {
            ...dice,
            form: {
              ...dice.form,
              foregroundColor,
              backgroundColor,
            },
          });
        };

        if (isCurrentRequest) {
          setRenderModel(() => dynamicBuilderTask);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isCurrentRequest) {
          setError(err.message || "Failed to compile dice engine asset.");
          setIsLoading(false);
        }
      }
    };

    loadDiceAssets();

    return () => {
      isCurrentRequest = false;
    };
  }, [diceType, backgroundColor, foregroundColor]);

  const contextValue: DiceContextType = {
    dType: diceType,
    bColor: backgroundColor,
    fColor: foregroundColor,
    template,
    renderModel,
    isLoading,
    error,
  };

  return (
    <DiceContext.Provider value={contextValue}>{children}</DiceContext.Provider>
  );
};

export const useDiceEngine = (): DiceContextType => {
  const context = useContext(DiceContext);
  if (!context) {
    throw new Error(
      "useDiceEngine must be executed within a DiceContextProvider framework",
    );
  }
  return context;
};

export default DiceContextProvider;
