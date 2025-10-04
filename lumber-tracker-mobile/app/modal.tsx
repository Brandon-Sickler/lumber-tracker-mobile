// Modal for adding new lumber items

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useInventory } from '@/context/InventoryContext';

export default function ModalScreen() {
  // Get addItem function from inventory context
  const { addItem } = useInventory();
  
  // Form data for new lumber item
  const [newLumber, setNewLumber] = useState({
    type: '',              // Lumber type/species
    amount: '',            // Quantity (will be converted to number)
    unit: 'board feet',    // Unit of measurement
    vendor: '',            // Supplier name
    footage: '',           // Total footage
    comments: '',          // Additional notes
    courses: '',           // Number of courses
  });

  // Add new lumber item to inventory
  const handleAddItem = () => {
    addItem({
      id: Date.now().toString(),                    // Generate unique ID
      ...newLumber,                                 // All form data
      amount: Number(newLumber.amount),            // Convert to number
      status: 'green',                             // Start as green lumber
      date: new Date().toISOString().split('T')[0], // Current date
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Lumber</Text>
      <TextInput
        label="Type"
        value={newLumber.type}
        onChangeText={(text) => setNewLumber({ ...newLumber, type: text })}
      />
      <TextInput
        label="Amount"
        value={newLumber.amount}
        onChangeText={(text) => setNewLumber({ ...newLumber, amount: text })}
        keyboardType="numeric"
      />
      <TextInput
        label="Vendor"
        value={newLumber.vendor}
        onChangeText={(text) => setNewLumber({ ...newLumber, vendor: text })}
      />
      <TextInput
        label="Footage"
        value={newLumber.footage}
        onChangeText={(text) => setNewLumber({ ...newLumber, footage: text })}
      />
      <TextInput
        label="Courses"
        value={newLumber.courses}
        onChangeText={(text) => setNewLumber({ ...newLumber, courses: text })}
      />
      <TextInput
        label="Comments"
        value={newLumber.comments}
        onChangeText={(text) => setNewLumber({ ...newLumber, comments: text })}
        multiline
      />
      <Button onPress={handleAddItem}>Add New Lumber</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
