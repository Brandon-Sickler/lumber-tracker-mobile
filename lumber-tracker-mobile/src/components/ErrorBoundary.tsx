/**
 * ERROR BOUNDARY COMPONENT - LUMBER TRACKER MOBILE APP (SDK 54)
 * 
 * React Error Boundary component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * 
 * Key Features:
 * - Catches errors in child components
 * - Displays user-friendly error message
 * - Logs errors to console for debugging
 * - Prevents entire app from crashing
 * 
 * Usage:
 * - Wrap components that might throw errors
 * - Provides graceful error handling
 * - Maintains app stability
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Props interface for ErrorBoundary component
 */
interface Props {
  children: ReactNode;  // Child components to wrap
}

/**
 * State interface for ErrorBoundary component
 */
interface State {
  hasError: boolean;  // Whether an error has occurred
}

/**
 * ErrorBoundary class component
 * Catches errors in child components and displays fallback UI
 */
class ErrorBoundary extends Component<Props, State> {
  // Initial state - no errors
  public state: State = {
    hasError: false
  };

  /**
   * Static method called when an error is thrown in a child component
   * Updates state to indicate an error has occurred
   * @param _ - The error that was thrown (not used in this implementation)
   * @returns State object with hasError set to true
   */
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  /**
   * Called when an error is caught by the error boundary
   * Logs the error and error info for debugging purposes
   * @param error - The error that was thrown
   * @param errorInfo - Additional error information
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  /**
   * Renders the component tree or error fallback UI
   * @returns JSX element
   */
  public render() {
    // If an error occurred, show fallback UI
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Sorry.. there was an error</Text>
        </View>
      );
    }

    // Otherwise, render child components normally
    return this.props.children;
  }
}

/**
 * Styles for the ErrorBoundary component
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Take up full screen height
    justifyContent: 'center',   // Center content vertically
    alignItems: 'center',      // Center content horizontally
  },
  text: {
    fontSize: 18,               // Readable font size
    color: 'red',              // Error color to indicate problem
  },
});

// Export the ErrorBoundary component as default
export default ErrorBoundary;
