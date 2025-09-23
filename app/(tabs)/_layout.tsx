/**
 * TAB LAYOUT - ROOT PROJECT (SDK 51)
 * 
 * This file is part of the root EnVtory project (SDK 51).
 * This is NOT the active project - the active project is in lumber-tracker-mobile/ directory.
 * 
 * If you're looking to make changes to the tab layout, use:
 * lumber-tracker-mobile/app/(tabs)/_layout.tsx instead
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
