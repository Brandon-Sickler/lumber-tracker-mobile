import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { useInventory } from '@/context/InventoryContext'; // Updated
import { useRouter } from 'expo-router';

const stations = [
  { title: 'Green Lumber Received', route: '/stations/green-lumber' },
  { title: 'Kiln Operations', route: '/stations/kiln-operations' },
  { title: 'Rip Line Production', route: '/stations/rip-line' },
  { title: 'Infeed Queue', route: '/stations/infeed-queue' },
  { title: 'Air-Drying', route: '/stations/air-drying' },
];

export default function HomeScreen() {
  const { inventory } = useInventory();
  const router = useRouter();
  const theme = useTheme();

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
            style={[
              styles.stationButton,
              index > 2 ? styles.bottomRowButton : null
            ]}
            labelStyle={styles.buttonLabel}
            onPress={() => router.push(station.route as any)}
            buttonColor="rgba(255, 140, 0, 0.8)" // Neon orange with 80% opacity
          >
            {station.title}
          </Button>
        ))}
      </View>
    </ScrollView>
  );
}

const windowWidth = Dimensions.get('window').width;
const buttonSize = (windowWidth - 64) / 3; // 64 = 16 * 4 (padding left, right, and spaces between buttons)

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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  stationButton: {
    width: buttonSize,
    height: buttonSize,
    marginBottom: 16,
    borderRadius: 16,
    justifyContent: 'center',
  },
  bottomRowButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonLabel: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

// Assuming styles is already defined in your original file
