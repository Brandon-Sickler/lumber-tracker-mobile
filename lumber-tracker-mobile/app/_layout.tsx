import { Stack } from 'expo-router';
import { useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
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
              <ThemeProvider value={DefaultTheme}>
                <KeyboardAvoidingView 
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{ flex: 1 }}
                >
                  <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="stations/green-lumber" options={{ headerShown: false }} />
                    <Stack.Screen name="stations/kiln-operations" options={{ headerShown: false }} />
                    <Stack.Screen name="stations/rip-line" options={{ headerShown: false }} />
                    <Stack.Screen name="stations/infeed-queue" options={{ headerShown: false }} />
                    <Stack.Screen name="stations/air-drying" options={{ headerShown: false }} />
                    <Stack.Screen name="stations/kd-lumber" options={{ headerShown: false }} />
                  </Stack>
                </KeyboardAvoidingView>
              </ThemeProvider>
            </PaperProvider>
          </LumberProcessProvider>
        </InventoryProvider>
      </LumberProvider>
    </ErrorBoundary>
  );
}
