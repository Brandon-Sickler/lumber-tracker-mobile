import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

// Define the structure of a lumber item
type LumberItem = {
  id: string;
  type: string;
  amount: number;
  unit: string;
  status: 'green' | 'air-drying' | 'kiln' | 'kd' | 'infeed' | 'rip';
  vendor: string;
  footage: string;
  comments: string;
  date: string;
  courses: string;
  kilnName?: string;
};

// Define the structure of our context
type InventoryContextType = {
  inventory: LumberItem[];
  loadInventory: () => Promise<void>;
  addItem: (item: LumberItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<LumberItem>) => void;
  updateItemStatus: (id: string, newStatus: LumberItem['status'], kilnName?: string) => void;
  getItemsByStatus: (status: LumberItem['status']) => LumberItem[];
};

// Create the context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Create a provider component
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<LumberItem[]>([]);

  const loadInventory = useCallback(async () => {
    try {
      // Here you would typically fetch data from an API or local storage
      // For this example, we'll just set some dummy data
      const dummyData: LumberItem[] = [
        { id: '1', type: 'Pine', amount: 100, unit: 'board feet', status: 'green', vendor: 'Vendor A', footage: '1000', comments: '', date: '2023-05-01', courses: '10' },
        { id: '2', type: 'Oak', amount: 50, unit: 'board feet', status: 'kiln', vendor: 'Vendor B', footage: '500', comments: '', date: '2023-05-02', courses: '5', kilnName: 'Kiln 1' },
        { id: '3', type: 'Maple', amount: 75, unit: 'board feet', status: 'rip', vendor: 'Vendor C', footage: '750', comments: '', date: '2023-05-03', courses: '7' },
      ];
      setInventory(dummyData);
    } catch (error) {
      console.error('Failed to load inventory:', error);
      // You might want to set an error state here or throw the error
    }
  }, []);

  const addItem = useCallback((item: LumberItem) => {
    setInventory(prev => [...prev, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<LumberItem>) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  const updateItemStatus = useCallback((id: string, newStatus: LumberItem['status'], kilnName?: string) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus, kilnName } : item
    ));
  }, []);

  const getItemsByStatus = useCallback((status: LumberItem['status']) => {
    return inventory.filter(item => item.status === status);
  }, [inventory]);

  return (
    <InventoryContext.Provider value={{ 
      inventory, 
      loadInventory, 
      addItem, 
      removeItem, 
      updateItem,
      updateItemStatus,
      getItemsByStatus
    }}>
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

