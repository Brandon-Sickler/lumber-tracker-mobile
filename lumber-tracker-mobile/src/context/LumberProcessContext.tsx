import React, { createContext, useContext, useState } from 'react';

type LumberProcessContextType = {
  completedStations: string[];
  completeStation: (station: string) => void;
  resetProcess: () => void;
};

const LumberProcessContext = createContext<LumberProcessContextType | undefined>(undefined);

export function LumberProcessProvider({ children }: { children: React.ReactNode }) {
  const [completedStations, setCompletedStations] = useState<string[]>([]);

  const completeStation = (station: string) => {
    setCompletedStations((prev) => [...prev, station]);
  };

  const resetProcess = () => {
    setCompletedStations([]);
  };

  return (
    <LumberProcessContext.Provider value={{ completedStations, completeStation, resetProcess }}>
      {children}
    </LumberProcessContext.Provider>
  );
}

export function useLumberProcess() {
  const context = useContext(LumberProcessContext);
  if (context === undefined) {
    throw new Error('useLumberProcess must be used within a LumberProcessProvider');
  }
  return context;
}
