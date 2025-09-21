import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Lumber {
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
  getInfeedQueue: () => Lumber[]; // Add this line
  findLumberById: (id: string) => Lumber | undefined; // Add this line
  removeFromInfeedQueue: (id: string) => void;
}

const LumberContext = createContext<LumberContextType | undefined>(undefined);

export const LumberProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lumber, setLumber] = useState<Lumber[]>([
    { id: '1', status: 'infeed', vendor: 'Vendor A', grade: 'A', date: '2023-06-01', comments: 'Test comment 1', species: 'Pine', footage: '1000', courses: '10', loadNumber: 'L001' },
    { id: '2', status: 'infeed', vendor: 'Vendor B', grade: 'B', date: '2023-06-02', comments: 'Test comment 2', species: 'Oak', footage: '1500', courses: '15', loadNumber: 'L002' },
    { id: '3', status: 'infeed', vendor: 'Vendor C', grade: 'C', date: '2023-06-03', comments: 'Test comment 3', species: 'Maple', footage: '2000', courses: '20', loadNumber: 'L003' },
    { id: '4', status: 'infeed', vendor: 'Vendor D', grade: 'D', date: '2023-06-04', comments: 'Test comment 4', species: 'Cedar', footage: '2500', courses: '25', loadNumber: 'L004' },
  ]);

  const addLumber = (newLumber: Omit<Lumber, 'id'> & { id?: string }) => {
    setLumber(prevLumber => [
      ...prevLumber, 
      { 
        ...newLumber, 
        id: newLumber.id || Date.now().toString() 
      }
    ]);
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

  const findLumberById = (id: string) => {
    return lumber.find(item => item.id === id);
  };

  const removeFromInfeedQueue = (id: string) => {
    setLumber(prevLumber =>
      prevLumber.map(item =>
        item.id === id && item.status === 'infeed' ? { ...item, status: 'green' } : item
      )
    );
  };

  return (
    <LumberContext.Provider value={{ 
      lumber, 
      addLumber, 
      updateLumberStatus, 
      moveLumberToInfeed, 
      completeInfeedItem,
      moveLumberToAirDrying,
      getInfeedQueue: () => {
        const infeedItems = lumber.filter(item => item.status === 'infeed').slice(0, 4);
        return [...infeedItems, ...Array(4 - infeedItems.length).fill(null)];
      },
      findLumberById,
      removeFromInfeedQueue // Add this line
    }}>
      {children}
    </LumberContext.Provider>
  );
};

export function useLumber() {
  const context = useContext(LumberContext);
  if (context === undefined) {
    throw new Error('useLumber must be used within a LumberProvider');
  }
  return context;
}
