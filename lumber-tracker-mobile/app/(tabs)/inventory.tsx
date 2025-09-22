import React from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { List, Text, Divider, useTheme } from 'react-native-paper';
import { useInventory } from '@/context/InventoryContext'; // Updated

export default function InventoryScreen() {
  const { inventory } = useInventory();
  const theme = useTheme();

  const renderItem = ({ item }: { item: { type: string; amount: number; unit: string } }) => (
    <List.Item
      title={item.type}
      description={`${item.amount} ${item.unit}`}
      left={(props) => <List.Icon {...props} icon="tree" />} 
      right={(props) => <Text {...props}>{item.type}</Text>}
    />
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <FlatList
        data={inventory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <Text style={[styles.emptyText, { color: theme.colors.secondary }]}>
            No items in inventory
          </Text>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});
