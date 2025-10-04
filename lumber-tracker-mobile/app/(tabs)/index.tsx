// Home screen - main dashboard with station buttons
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Text as RNText } from 'react-native';
import { Text, Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { useInventory } from '@/context/InventoryContext';
import { useRouter } from 'expo-router';

// List of all processing stations
const stationConfig = [
  { title: 'Green Lumber Received', route: '/stations/green-lumber' },
  { title: 'Kiln Operations', route: '/stations/kiln-operations' },
  { title: 'Rip Line Production', route: '/stations/rip-line' },
  { title: 'Infeed Queue', route: '/stations/infeed-queue' },
  { title: 'Air-Drying', route: '/stations/air-drying' },
];

export default function HomeScreen() {
  // Get inventory data and loading function
  const { inventory, loadInventory } = useInventory();
  const router = useRouter();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);  // Loading state for initial data

  // Load inventory data when component mounts
  useEffect(() => {
    const initializeData = async () => {
      try {
        await loadInventory();  // Load sample inventory data
      } catch (error) {
        console.error('Error loading inventory:', error);
      } finally {
        setIsLoading(false);  // Stop loading
      }
    };

    initializeData();
  }, [loadInventory]);

  // Navigate to a station when button is pressed
  const handleStationPress = (route: string) => {
    router.push(route as any);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title style={styles.welcomeTitle}>Welcome to Lumber Tracker</Title>
            <Paragraph style={styles.welcomeText}>
              Track your lumber inventory and processing stations
            </Paragraph>
          </Card.Content>
        </Card>

        <View style={styles.stationsContainer}>
          <Text style={styles.sectionTitle}>Processing Stations</Text>
          {stationConfig.map((station, index) => (
            <TouchableOpacity
              key={index}
              style={styles.stationButton}
              onPress={() => handleStationPress(station.route)}
            >
              <RNText style={styles.buttonLabel}>{station.title}</RNText>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={styles.inventoryCard}>
          <Card.Content>
            <Title style={styles.inventoryTitle}>Current Inventory</Title>
            <Paragraph style={styles.inventoryText}>
              Total Items: {inventory.length}
            </Paragraph>
            {inventory.length > 0 && (
              <Paragraph style={styles.inventoryText}>
                Latest: {inventory[0]?.type} - {inventory[0]?.footage} ft
              </Paragraph>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 16,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
  },
  stationsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2E7D32',
    textAlign: 'center',
  },
  stationButton: {
    width: '100%',
    height: 60,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 140, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
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
  inventoryCard: {
    marginTop: 16,
    elevation: 2,
  },
  inventoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  inventoryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});