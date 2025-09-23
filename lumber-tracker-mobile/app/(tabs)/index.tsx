/**
 * HOME SCREEN - ACTIVE PROJECT (SDK 54)
 * 
 * This is the ACTIVE home screen file for the lumber-tracker-mobile project (SDK 54).
 * This is the file that gets used when running the app from lumber-tracker-mobile/ directory.
 * 
 * Recent changes:
 * - Fixed button centering issues by replacing React Native Paper Button with TouchableOpacity
 * - Updated package versions to SDK 54
 * - Buttons now properly centered and not cut off on screen edges
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Text as RNText } from 'react-native';
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
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
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
            <TouchableOpacity 
              key={index}
              style={styles.stationButton}
              onPress={() => router.push(station.route as any)}
              accessibilityLabel={`Navigate to ${station.title}`}
            >
              <RNText style={styles.buttonLabel}>
                {station.title}
              </RNText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  stationButton: {
    width: '100%',
    height: 60,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 140, 0, 0.8)', // Neon orange with 80% opacity
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});


