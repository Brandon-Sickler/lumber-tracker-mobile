// Air Drying Station - manages lumber in air drying process

import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useLumber } from '@/context/LumberContext';
import { commonStyles } from '@/styles/commonStyles';

export default function AirDryingScreen() {
  // Get lumber data and update function from context
  const { lumber, updateLumberStatus } = useLumber();
  
  // Filter lumber items that are currently air drying
  const airDryingLumber = lumber.filter(item => item.status === 'air-drying');

  // Move lumber from air drying to kiln operations
  const moveToKiln = (id: string) => {
    Alert.alert(
      "Confirm Move",
      "Are you sure you want to move this lumber to kiln operations?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK", 
          onPress: () => {
            try {
              updateLumberStatus(id, 'kiln');  // Change status to kiln
              Alert.alert("Success", "Lumber has been moved to kiln operations.");
            } catch (error) {
              Alert.alert("Error", "Failed to move lumber. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.container}>
        <Text style={commonStyles.title}>Air Drying Lumber</Text>
        {/* Render each air drying lumber item as a card */}
        {airDryingLumber.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>ID: {item.id}</Text>
              <Text>Vendor: {item.vendor}</Text>
              <Text>Footage: {item.footage}</Text>
              <Text>Comments: {item.comments}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => moveToKiln(item.id)}>Move to Kiln</Button>
            </Card.Actions>
          </Card>
        ))}
        {/* Show empty state when no lumber is air drying */}
        {airDryingLumber.length === 0 && (
          <Text style={styles.emptyText}>No lumber currently air drying</Text>
        )}
      </ScrollView>
    </View>
  );
}

/**
 * Styles for the Air Drying station screen
 */
const styles = StyleSheet.create({
  card: {
    marginBottom: 16,  // Space between cards
  },
  cardTitle: {
    fontSize: 18,       // Larger font for item ID
    fontWeight: 'bold', // Bold text for emphasis
    marginBottom: 8,    // Space below title
  },
  emptyText: {
    fontSize: 16,       // Readable font size
    textAlign: 'center', // Center the empty state message
    marginTop: 20,      // Space from top
    color: '#666',      // Muted color for empty state
  },
});
