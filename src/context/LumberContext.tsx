import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Lumber {
  id: string;
  species: string;
  grade: string;
  vendor: string;
  footage: string;
  comments: string;
  date: string;
  courses: string;
  status: 'green' | 'air-drying' | 'kiln' | 'kd' | 'infeed' | 'rip';
  kilnName?: string;
  loadNumber: string;
}

interface LumberContextType {
  lumber: Lumber[];
  addLumber: (newLumber: Omit<Lumber, 'id'>) => void;
  updateLumberStatus: (id: string, newStatus: Lumber['status'], kilnName?: string) => void;
  moveLumberToInfeed: (id: string) => void;
  completeInfeedItem: (id: string) => void;
  moveLumberToAirDrying: (id: string) => void;
}

const LumberContext = createContext<LumberContextType | undefined>(undefined);

export function LumberProvider({ children }: { children: ReactNode }) {
  const [lumber, setLumber] = useState<Lumber[]>([]);

  const addLumber = (newLumber: Omit<Lumber, 'id'>) => {
    setLumber(prevLumber => [...prevLumber, { ...newLumber, id: Date.now().toString() }]);
  };

  const updateLumberStatus = (id: string, newStatus: Lumber['status'], kilnName?: string) => {
    setLumber(prevLumber =>
      prevLumber.map(item =>
        item.id === id ? { ...item, status: newStatus, kilnName } : item
      )
    );
  };

  const moveLumberToInfeed = (id: string) => {
    updateLumberStatus(id, 'infeed');
  };

  const completeInfeedItem = (id: string) => {
    updateLumberStatus(id, 'rip');
  };

  const moveLumberToAirDrying = (id: string) => {
    updateLumberStatus(id, 'air-drying');
  };

  return (
    <LumberContext.Provider value={{ 
      lumber, 
      addLumber, 
      updateLumberStatus, 
      moveLumberToInfeed,
      completeInfeedItem,
      moveLumberToAirDrying
    }}>
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
