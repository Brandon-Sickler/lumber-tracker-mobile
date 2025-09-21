/**
 * Utility functions for the lumber tracker app
 * 
 * This module contains helper functions and utilities used throughout the application.
 */

/**
 * Formats a date string for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formats board footage for display
 */
export const formatFootage = (footage: string | number): string => {
  const num = typeof footage === 'string' ? parseFloat(footage) : footage;
  return `${num.toLocaleString()} BF`;
};

/**
 * Generates a unique ID for lumber items
 */
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

/**
 * Validates lumber data before saving
 */
export const validateLumberData = (data: any): boolean => {
  return !!(
    data.species &&
    data.grade &&
    data.vendor &&
    data.footage &&
    data.courses
  );
};

/**
 * Calculates total footage from an array of lumber items
 */
export const calculateTotalFootage = (lumber: Array<{ footage: string }>): number => {
  return lumber.reduce((total, item) => {
    const footage = parseFloat(item.footage) || 0;
    return total + footage;
  }, 0);
};
