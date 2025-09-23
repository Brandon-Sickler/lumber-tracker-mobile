/**
 * HOME SCREEN - ROOT PROJECT (SDK 51)
 * 
 * This file is part of the root EnVtory project (SDK 51).
 * This is NOT the active project - the active project is in lumber-tracker-mobile/ directory.
 * 
 * If you're looking to make changes to the home screen, use:
 * lumber-tracker-mobile/app/(tabs)/index.tsx instead
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Title, Paragraph, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { useInventory } from '@/context/InventoryContext';
import { useRouter } from 'expo-router';

const stations = [
  { title: 'Green Lumber Received', route: '/stations/green-lumber' },
  { title: 'Kiln Operations', route: '/stations/kiln-operations' },
  { title: 'Rip Line Production', route: '/stations/rip-line' },
  { title: 'Infeed Queue', route: '/stations/infeed-queue' },
  { title: 'Air-Drying', route: '/stations/air-drying' },
];

export default function HomeScreen() {
  const { inventory, loadInventory } = useInventory();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    async function load() {
      await loadInventory();
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Inventory Overview</Title>
          <Paragraph>Total Items: {inventory.length}</Paragraph>
        </Card.Content>
      </Card>
      
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Title>Types</Title>
            <Paragraph>{new Set(inventory.map(item => item.type)).size}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.statCard}>
          <Card.Content>
            <Title>Total Amount</Title>
            <Paragraph>{inventory.reduce((sum, item) => sum + item.amount, 0)}</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.stationsContainer}>
        {stations.map((station, index) => (
          <Button 
            key={index}
            mode="contained" 
            style={styles.stationButton}
            labelStyle={styles.buttonLabel}
            onPress={() => router.push(station.route as any)}
            buttonColor="rgba(255, 140, 0, 0.8)" // Neon orange with 80% opacity
            accessibilityLabel={`Navigate to ${station.title}`}
          >
            {station.title}
          </Button>
        ))}
      </View>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width;
const buttonWidth = windowWidth - 32; // Full width minus padding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
  },
  stationsContainer: {
    marginTop: 16,
  },
  stationButton: {
    width: buttonWidth,
    height: 60, // Increased height
    marginBottom: 16,
    borderRadius: 16,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 16, // Increased font size
    color: 'white',
    textAlign: 'center',
    lineHeight: 20, // Adjusted line height
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


