import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useInventory } from '@/context/InventoryContext';

export default function ModalScreen() {
  const { addItem } = useInventory();
  const [newLumber, setNewLumber] = useState({
    type: '',
    amount: '',
    unit: 'board feet',
    vendor: '',
    footage: '',
    comments: '',
    courses: '',
  });

  const handleAddItem = () => {
    addItem({
      id: Date.now().toString(),
      ...newLumber,
      amount: Number(newLumber.amount),
      status: 'green',
      date: new Date().toISOString().split('T')[0],
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
