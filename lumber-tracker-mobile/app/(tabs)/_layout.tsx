/**
 * TAB LAYOUT - ACTIVE PROJECT (SDK 54)
 * 
 * This is the ACTIVE tab layout file for the lumber-tracker-mobile project (SDK 54).
 * This is the file that gets used when running the app from lumber-tracker-mobile/ directory.
 * 
 * Recent changes:
 * - Updated to SDK 54
 * - All package versions updated to latest compatible versions
 */

import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
