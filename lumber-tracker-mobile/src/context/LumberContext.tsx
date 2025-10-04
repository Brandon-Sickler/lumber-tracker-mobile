// Context for managing lumber data throughout the app
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Structure of a lumber item
export interface Lumber {
  id: string;                    // Unique identifier
  species: string;               // Type of wood (Pine, Oak, etc.)
  grade: string;                 // Quality grade (A, B, C, D)
  vendor: string;                // Supplier name
  footage: string;               // Total footage measurement
  comments: string;              // Notes about the lumber
  date: string;                  // Date received
  courses: string;               // Number of courses/layers
  status: 'green' | 'air-drying' | 'kiln' | 'kd' | 'infeed' | 'rip';  // Current processing stage
  kilnName?: string;             // Which kiln it's in (if applicable)
  loadNumber: string;            // Load it belongs to
}

// What functions are available in the lumber context
interface LumberContextType {
  lumber: Lumber[];                                    // All lumber items
  addLumber: (newLumber: Omit<Lumber, 'id'>) => void;  // Add new lumber
  updateLumberStatus: (id: string, newStatus: Lumber['status'], kilnName?: string) => void;  // Change lumber status
  moveLumberToInfeed: (id: string) => void;             // Move lumber to infeed queue
  completeInfeedItem: (id: string) => void;             // Mark infeed item as complete
  moveLumberToAirDrying: (id: string) => void;         // Move lumber to air drying
  getInfeedQueue: () => Lumber[];                       // Get current infeed queue
  findLumberById: (id: string) => Lumber | undefined;  // Find lumber by ID
  removeFromInfeedQueue: (id: string) => void;         // Remove from infeed queue
}

const LumberContext = createContext<LumberContextType | undefined>(undefined);

export const LumberProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to hold all lumber items - starts with some sample data
  const [lumber, setLumber] = useState<Lumber[]>([
    { id: '1', status: 'infeed', vendor: 'Vendor A', grade: 'A', date: '2023-06-01', comments: 'Sample lumber 1', species: 'Pine', footage: '1000', courses: '10', loadNumber: 'L001' },
    { id: '2', status: 'infeed', vendor: 'Vendor B', grade: 'B', date: '2023-06-02', comments: 'Sample lumber 2', species: 'Oak', footage: '1500', courses: '15', loadNumber: 'L002' },
    { id: '3', status: 'infeed', vendor: 'Vendor C', grade: 'C', date: '2023-06-03', comments: 'Sample lumber 3', species: 'Maple', footage: '2000', courses: '20', loadNumber: 'L003' },
    { id: '4', status: 'infeed', vendor: 'Vendor D', grade: 'D', date: '2023-06-04', comments: 'Sample lumber 4', species: 'Cedar', footage: '2500', courses: '25', loadNumber: 'L004' },
  ]);

  // Add new lumber to the list
  const addLumber = (newLumber: Omit<Lumber, 'id'> & { id?: string }) => {
    setLumber(prevLumber => [
      ...prevLumber, 
      { 
        ...newLumber, 
        id: newLumber.id || Date.now().toString() 
      }
    ]);
  };

  // Change the status of lumber (green -> air-drying -> kiln -> etc.)
  const updateLumberStatus = (id: string, newStatus: Lumber['status'], kilnName?: string) => {
    setLumber(prevLumber =>
      prevLumber.map(item =>
        item.id === id ? { ...item, status: newStatus, kilnName } : item
      )
    );
  };

  // Move lumber to the infeed queue for processing
  const moveLumberToInfeed = (id: string) => {
    updateLumberStatus(id, 'infeed');
  };

  // Mark infeed item as completed (moves to rip status)
  const completeInfeedItem = (id: string) => {
    updateLumberStatus(id, 'rip');
  };

  // Move lumber to air drying stage
  const moveLumberToAirDrying = (id: string) => {
    updateLumberStatus(id, 'air-drying');
  };

  // Find a specific lumber item by its ID
  const findLumberById = (id: string) => {
    return lumber.find(item => item.id === id);
  };

  // Remove lumber from infeed queue (puts it back to green status)
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
      // Get the infeed queue (max 4 items, fill empty slots with null)
      getInfeedQueue: () => {
        const infeedItems = lumber.filter(item => item.status === 'infeed').slice(0, 4);
        return [...infeedItems, ...Array(4 - infeedItems.length).fill(null)];
      },
      findLumberById,
      removeFromInfeedQueue 
    }}>
      {children}
    </LumberContext.Provider>
  );
};

// Hook to use the lumber context in components
export function useLumber() {
  const context = useContext(LumberContext);
  if (context === undefined) {
    throw new Error('useLumber must be used within a LumberProvider');
  }
  return context;
}
