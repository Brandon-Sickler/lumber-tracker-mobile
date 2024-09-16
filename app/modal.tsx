import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useInventory } from '../src/context/InventoryContext';

export default function ModalScreen() {
  const { addItem } = useInventory();

  const handleAddItem = () => {
    addItem({
      id: Date.now().toString(),
      type: 'New Lumber',
      amount: 100,
      unit: 'board feet'
    });
  };

  return (
    <View style={styles.container}>
      <Text>Modal Screen</Text>
      <Button onPress={handleAddItem}>Add New Lumber</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
