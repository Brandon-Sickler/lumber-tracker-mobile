import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Text } from 'react-native-paper';
import { useInventory } from '@/context/InventoryContext';

export default function ExploreScreen() {
  const { inventory } = useInventory();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="leaf" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Lumber Processing Guide</ThemedText>
      </ThemedView>
      <ThemedText>Learn about the lumber processing workflow and how to use this app effectively.</ThemedText>
      
      <Collapsible title="Processing Stations">
        <ThemedText>
          The lumber processing workflow includes these key stations:
        </ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">Green Lumber</ThemedText> - Initial receipt and logging</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">Infeed Queue</ThemedText> - Queue management for processing</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">Rip Line</ThemedText> - Production line operations</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">Air-Drying</ThemedText> - Natural drying process</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">Kiln Operations</ThemedText> - Kiln-drying management</ThemedText>
        <ThemedText>• <ThemedText type="defaultSemiBold">KD Lumber</ThemedText> - Finished product tracking</ThemedText>
      </Collapsible>

      <Collapsible title="Current Inventory">
        <ThemedText>
          You currently have <ThemedText type="defaultSemiBold">{inventory.length}</ThemedText> items in your inventory.
        </ThemedText>
        <ThemedText>
          Total footage: <ThemedText type="defaultSemiBold">
            {inventory.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} board feet
          </ThemedText>
        </ThemedText>
      </Collapsible>

      <Collapsible title="Best Practices">
        <ThemedText>
          • Always verify lumber IDs before processing
        </ThemedText>
        <ThemedText>
          • Update status promptly when moving lumber between stations
        </ThemedText>
        <ThemedText>
          • Add detailed comments for quality control
        </ThemedText>
        <ThemedText>
          • Regularly review inventory for accuracy
        </ThemedText>
      </Collapsible>

      <Collapsible title="Mobile Features">
        <ThemedText>
          This app is optimized for mobile use with:
        </ThemedText>
        <ThemedText>• Touch-friendly interface</ThemedText>
        <ThemedText>• Offline capability</ThemedText>
        <ThemedText>• Cross-platform support (iOS, Android, Web)</ThemedText>
        <ThemedText>• Real-time data synchronization</ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
