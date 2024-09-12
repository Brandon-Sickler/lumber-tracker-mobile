import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { InventoryProvider } from '../context';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 140, 0)', // Neon orange
    },
  };

  return (
    <InventoryProvider>
      <PaperProvider theme={theme}>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="inventory"
            options={{
              title: 'Inventory',
              tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
            }}
          />
        </Tabs>
      </PaperProvider>
    </InventoryProvider>
  );
}
