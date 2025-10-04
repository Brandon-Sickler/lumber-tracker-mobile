// Inventory context for managing lumber state

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';

// Lumber item type
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

type InventoryContextType = {
  inventory: LumberItem[];
  loadInventory: () => Promise<void>;
  addItem: (item: LumberItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<LumberItem>) => void;
  updateItemStatus: (id: string, newStatus: LumberItem['status'], kilnName?: string) => void;
  getItemsByStatus: (status: LumberItem['status']) => LumberItem[];
};

// Create the context with undefined as default (will be provided by InventoryProvider)
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Provider component that gives inventory data to all child components
export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to hold all lumber items in inventory
  const [inventory, setInventory] = useState<LumberItem[]>([]);

  // Load inventory data - currently uses sample data
  const loadInventory = useCallback(async () => {
    try {
      // Sample inventory data for testing
      const sampleData: LumberItem[] = [
        { id: '1', type: 'Pine', amount: 100, unit: 'board feet', status: 'green', vendor: 'Vendor A', footage: '1000', comments: '', date: '2023-05-01', courses: '10' },
        { id: '2', type: 'Oak', amount: 50, unit: 'board feet', status: 'kiln', vendor: 'Vendor B', footage: '500', comments: '', date: '2023-05-02', courses: '5', kilnName: 'Kiln 1' },
        { id: '3', type: 'Maple', amount: 75, unit: 'board feet', status: 'rip', vendor: 'Vendor C', footage: '750', comments: '', date: '2023-05-03', courses: '7' },
      ];
      setInventory(sampleData);
    } catch (error) {
      console.error('Failed to load inventory:', error);
    }
  }, []);

  // Add new lumber item to inventory
  const addItem = useCallback((item: LumberItem) => {
    setInventory(prev => [...prev, item]);
  }, []);

  // Remove lumber item from inventory
  const removeItem = useCallback((id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  }, []);

  // Update existing lumber item properties
  const updateItem = useCallback((id: string, updates: Partial<LumberItem>) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  // Change lumber processing status (green -> air-drying -> kiln -> etc.)
  const updateItemStatus = useCallback((id: string, newStatus: LumberItem['status'], kilnName?: string) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus, kilnName } : item
    ));
  }, []);

  // Get lumber items by status (green, kiln, rip, etc.)
  const getItemsByStatus = useCallback((status: LumberItem['status']) => {
    return inventory.filter(item => item.status === status);
  }, [inventory]);

  // Provide all inventory functionality to child components
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

// Hook to use inventory context in components
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

