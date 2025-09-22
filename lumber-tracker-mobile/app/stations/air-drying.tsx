import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useLumber } from '@/context/LumberContext';
import { commonStyles } from '@/styles/commonStyles';

export default function AirDryingScreen() {
  const { lumber, updateLumberStatus } = useLumber();
  const airDryingLumber = lumber.filter(item => item.status === 'air-drying');

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
              updateLumberStatus(id, 'kiln');
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
        {airDryingLumber.length === 0 && (
          <Text style={styles.emptyText}>No lumber currently air drying</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
