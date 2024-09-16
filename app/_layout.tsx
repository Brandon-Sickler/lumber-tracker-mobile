import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { InventoryProvider } from '@/context/InventoryContext';
import { LumberProvider } from '@/context/LumberContext';
import { LumberProcessProvider } from '@/context/LumberProcessContext';
import ErrorBoundary from '@/components/ErrorBoundary';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ErrorBoundary>
      <LumberProvider>
        <InventoryProvider>
          <LumberProcessProvider>
            <PaperProvider theme={paperTheme}>
              <ThemeProvider value={navigationTheme}>
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
              </ThemeProvider>
            </PaperProvider>
          </LumberProcessProvider>
        </InventoryProvider>
      </LumberProvider>
    </ErrorBoundary>
  );
}
