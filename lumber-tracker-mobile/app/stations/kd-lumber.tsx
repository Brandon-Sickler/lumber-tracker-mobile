// KD Lumber Station - shows kiln-dried lumber inventory

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { commonStyles } from '@/styles/commonStyles';
import { useLumber } from '@/context/LumberContext';

export default function KDLumberScreen() {
  // Get lumber data from context
  const { lumber } = useLumber();
  // Filter lumber items that have completed kiln drying (kd status)
  const kdLumber = lumber.filter(item => item.status === 'kd');

  return (
    <View style={commonStyles.safeArea}>
      <ScrollView style={commonStyles.container}>
        <Text style={commonStyles.title}>KD Lumber Inventory</Text>
        {kdLumber.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>ID: {item.id}</Text>
              <Text>Vendor: {item.vendor}</Text>
              <Text>Footage: {item.footage}</Text>
              <Text>Comments: {item.comments}</Text>
            </Card.Content>
          </Card>
        ))}
        {kdLumber.length === 0 && (
          <Text style={styles.emptyText}>No KD lumber in inventory</Text>
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
