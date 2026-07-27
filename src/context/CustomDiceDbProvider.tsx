import React, { createContext, useContext, useEffect, useState } from "react";
import { initCustomDiceDB } from "../storage/customDiceStore";

interface CustomDiceDbContextType {
  db: IDBDatabase | null;
  isLoading: boolean;
  error: string | null;
}

const CustomDiceDbContext = createContext<CustomDiceDbContextType | undefined>(
  undefined,
);

export const CustomDiceDbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activeDb: IDBDatabase | null = null;

    initCustomDiceDB()
      .then((database) => {
        activeDb = database;
        setDb(database);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setIsLoading(false);
      });

    return () => {
      if (activeDb) {
        activeDb.close();
      }
    };
  }, []);

  return (
    <CustomDiceDbContext.Provider value={{ db, isLoading, error }}>
      {children}
    </CustomDiceDbContext.Provider>
  );
};

export const useDiceDB = () => {
  const context = useContext(CustomDiceDbContext);
  if (context === undefined) {
    throw new Error("useDiceDB must be used within a DiceDBProvider");
  }
  return context;
};
