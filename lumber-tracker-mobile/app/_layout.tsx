/**
 * ROOT LAYOUT - ACTIVE PROJECT (SDK 54)
 * 
 * This is the ACTIVE root layout file for the lumber-tracker-mobile project (SDK 54).
 * This is the file that gets used when running the app from lumber-tracker-mobile/ directory.
 * 
 * Recent changes:
 * - Updated to SDK 54
 * - All package versions updated to latest compatible versions
 */

import { Stack } from 'expo-router';
import { useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { InventoryProvider } from '@/context/InventoryContext';
import { LumberProvider } from '@/context/LumberContext';
import { LumberProcessProvider } from '@/context/LumberProcessContext';
import ErrorBoundary from '@/components/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(255, 140, 0)', // Neon orange
    background: '#FFFFFF',
  },
};

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ErrorBoundary>
      <LumberProvider>
        <InventoryProvider>
          <LumberProcessProvider>
            <PaperProvider theme={customTheme}>
              <Stack>
                <Stack.Screen 
                  name="(tabs)" 
                  options={{ 
                    headerShown: false,
                    contentStyle: { flex: 1 }
                  }} 
                />
                <Stack.Screen 
                  name="modal" 
                  options={{ 
                    presentation: 'modal',
                    contentStyle: { flex: 1 }
                  }} 
                />
                <Stack.Screen 
                  name="stations/green-lumber" 
                  options={{ 
                    headerShown: false,
                    contentStyle: { flex: 1 }
                  }} 
                />
                <Stack.Screen 
                  name="stations/kiln-operations" 
                  options={{ 
                    headerShown: false,
                    contentStyle: { flex: 1 }
                  }} 
                />
                <Stack.Screen 
                  name="stations/rip-line" 
                  options={{ 
                    headerShown: false,
                    contentStyle: { flex: 1 }
                  }} 
                />
                <Stack.Screen 
                  name="stations/infeed-queue" 
                  options={{ 
                    headerShown: false,
                    contentStyle: { flex: 1 }
                  }} 
                />
                <Stack.Screen 
                  name="stations/air-drying" 
                  options={{ 
                    headerShown: false,
                    contentStyle: { flex: 1 }
                  }} 
                />
                <Stack.Screen 
                  name="stations/kd-lumber" 
                  options={{ 
                    headerShown: false,
                    contentStyle: { flex: 1 }
                  }} 
                />
              </Stack>
            </PaperProvider>
          </LumberProcessProvider>
        </InventoryProvider>
      </LumberProvider>
    </ErrorBoundary>
  );
}
