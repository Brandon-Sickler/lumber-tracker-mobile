import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Lumber {
  id: string;
  status: 'green' | 'air-drying' | 'kiln' | 'kd';
  // Add more properties as needed
}

interface LumberContextType {
  lumber: Lumber[];
  addLumber: (newLumber: Lumber) => void;
  updateLumberStatus: (id: string, newStatus: Lumber['status']) => void;
}

const LumberContext = createContext<LumberContextType | undefined>(undefined);

export function LumberProvider({ children }: { children: ReactNode }) {
  const [lumber, setLumber] = useState<Lumber[]>([]);

  const addLumber = (newLumber: Lumber) => {
    setLumber(prevLumber => [...prevLumber, newLumber]);
  };

  const updateLumberStatus = (id: string, newStatus: Lumber['status']) => {
    setLumber(prevLumber =>
      prevLumber.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <LumberContext.Provider value={{ lumber, addLumber, updateLumberStatus }}>
      {children}
    </LumberContext.Provider>
  );
}

export function useLumber() {
  const context = useContext(LumberContext);
  if (context === undefined) {
    throw new Error('useLumber must be used within a LumberProvider');
  }
  return context;
}
