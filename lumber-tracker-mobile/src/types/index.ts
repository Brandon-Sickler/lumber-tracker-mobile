/**
 * Type definitions for the lumber tracker app
 * 
 * This module contains all TypeScript type definitions used throughout the application.
 * It serves as a central location for type definitions to ensure consistency.
 */

// Re-export types from context files for convenience
export type { Lumber } from '@/context/LumberContext';

// Additional type definitions
export interface Station {
  id: string;
  name: string;
  route: string;
  description: string;
}

export interface Vendor {
  id: string;
  name: string;
  contact: string;
  rating?: number;
}

export interface Kiln {
  id: string;
  name: string;
  capacity: number;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface ProcessStep {
  id: string;
  name: string;
  description: string;
  estimatedDuration: number; // in hours
  required: boolean;
}

// Form types
export interface LumberFormData {
  species: string;
  grade: string;
  vendor: string;
  footage: string;
  courses: string;
  comments: string;
  loadNumber: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Inventory: undefined;
  Modal: undefined;
  'stations/green-lumber': undefined;
  'stations/kiln-operations': undefined;
  'stations/rip-line': undefined;
  'stations/infeed-queue': undefined;
  'stations/air-drying': undefined;
  'stations/kd-lumber': undefined;
};
