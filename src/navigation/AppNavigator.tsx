import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { InventoryProvider } from '@/context/InventoryContext'; // Updated
import { LumberProvider } from '@/context/LumberContext'; // Updated

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide the splash screen once the layout is ready
    SplashScreen.hideAsync();
  }, []);

  const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <LumberProvider>
      <InventoryProvider>
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
      </InventoryProvider>
    </LumberProvider>
  );
}
