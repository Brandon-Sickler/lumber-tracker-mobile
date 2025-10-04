/**
 * TYPE DEFINITIONS - LUMBER TRACKER MOBILE APP (SDK 54)
 * 
 * This module contains all TypeScript type definitions used throughout the application.
 * It serves as a central location for type definitions to ensure consistency and type safety.
 * 
 * Key Features:
 * - Centralized type definitions
 * - Re-exports from context files
 * - Navigation type safety
 * - API response types
 * - Form data types
 * - Business logic types
 */

// Re-export types from context files for convenience
export type { Lumber } from '@/context/LumberContext';

/**
 * Station interface
 * Represents a processing station in the lumber workflow
 */
export interface Station {
  id: string;          // Unique identifier for the station
  name: string;         // Display name of the station
  route: string;        // Navigation route to the station
  description: string;  // Detailed description of the station's purpose
}

/**
 * Vendor interface
 * Represents a lumber supplier/vendor
 */
export interface Vendor {
  id: string;          // Unique identifier for the vendor
  name: string;        // Vendor company name
  contact: string;     // Contact information (phone, email, etc.)
  rating?: number;     // Optional quality rating (1-5 stars)
}

/**
 * Kiln interface
 * Represents a kiln used for drying lumber
 */
export interface Kiln {
  id: string;          // Unique identifier for the kiln
  name: string;        // Kiln name (e.g., "Kiln 1", "Kiln A")
  capacity: number;    // Maximum capacity in board feet
  status: 'active' | 'maintenance' | 'inactive';  // Current operational status
}

/**
 * ProcessStep interface
 * Represents a step in the lumber processing workflow
 */
export interface ProcessStep {
  id: string;                    // Unique identifier for the step
  name: string;                  // Step name (e.g., "Stacking", "Drying")
  description: string;           // Detailed description of the step
  estimatedDuration: number;     // Estimated time in hours
  required: boolean;             // Whether this step is mandatory
}

/**
 * LumberFormData interface
 * Represents form data for creating/editing lumber entries
 */
export interface LumberFormData {
  species: string;      // Lumber species (Pine, Oak, Maple, etc.)
  grade: string;         // Lumber grade (A, B, C, etc.)
  vendor: string;        // Supplier/vendor name
  footage: string;       // Total footage measurement
  courses: string;       // Number of courses (layers)
  comments: string;      // Additional notes or comments
  loadNumber: string;    // Load number for tracking
}

/**
 * ApiResponse interface
 * Generic API response wrapper for consistent error handling
 * @template T - The type of data being returned
 */
export interface ApiResponse<T> {
  success: boolean;      // Whether the request was successful
  data?: T;             // The actual response data (if successful)
  error?: string;       // Error message (if failed)
  message?: string;     // General message or status
}

/**
 * RootStackParamList type
 * Defines the navigation structure and parameters for the app
 * Used for type-safe navigation throughout the application
 */
export type RootStackParamList = {
  Home: undefined;                    // Home screen (no parameters)
  Inventory: undefined;               // Inventory screen (no parameters)
  Modal: undefined;                   // Modal screen (no parameters)
  'stations/green-lumber': undefined;      // Green lumber station
  'stations/kiln-operations': undefined;   // Kiln operations station
  'stations/rip-line': undefined;          // Rip line station
  'stations/infeed-queue': undefined;     // Infeed queue station
  'stations/air-drying': undefined;      // Air drying station
  'stations/kd-lumber': undefined;        // KD lumber station
};
