import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the structure of a lumber item
type LumberItem = {
  id: string;
  type: string;
  amount: number;
  unit: string;
};

// Define the structure of our context
type InventoryContextType = {
  inventory: LumberItem[];
  addItem: (item: LumberItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, newAmount: number) => void;
};

// Create the context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Create a provider component
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<LumberItem[]>([]);

  const addItem = (item: LumberItem) => {
    setInventory([...inventory, item]);
  };

  const removeItem = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const updateItem = (id: string, newAmount: number) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...item, amount: newAmount } : item
    ));
  };

  return (
    <InventoryContext.Provider value={{ inventory, addItem, removeItem, updateItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

// Create a custom hook to use the inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

