// Inventory screen - shows all lumber items in a list
import React from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { List, Text, Divider, useTheme } from 'react-native-paper';
import { useInventory } from '@/context/InventoryContext';

export default function InventoryScreen() {
  // Get inventory data from context
  const { inventory } = useInventory();
  const theme = useTheme();

  // Render each inventory item in the list
  const renderItem = ({ item }: { item: { type: string; amount: number; unit: string } }) => (
    <List.Item
      title={item.type}                    // Lumber type (Pine, Oak, Maple, etc.)
      description={`${item.amount} ${item.unit}`}  // Amount and unit (e.g., "100 board feet")
      left={(props) => <List.Icon {...props} icon="tree" />}  // Tree icon
      right={(props) => <Text {...props}>{item.type}</Text>}   // Type on the right
    />
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <FlatList
        data={inventory}                    // All lumber items from context
        renderItem={renderItem}             // How to display each item
        keyExtractor={item => item.id}     // Unique key for each item
        ItemSeparatorComponent={() => <Divider />}  // Line between items
        ListEmptyComponent={() => (        // Show when no items
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
    flex: 1,  // Take up full screen height
  },
  emptyText: {
    textAlign: 'center',  // Center the empty state message
    marginTop: 50,        // Add space from top
    fontSize: 18,         // Readable font size
  },
});
