// Infeed Queue Station - manages processing queue

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Pressable } from 'react-native';
import { Text, Button, Modal, Portal, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { useLumber, Lumber } from '@/context/LumberContext';
import { commonStyles } from '@/styles/commonStyles';

export default function InfeedQueueScreen() {
  // Get all lumber context functions
  const { lumber, moveLumberToInfeed, completeInfeedItem, getInfeedQueue, findLumberById, removeFromInfeedQueue } = useLumber();
  
  // Queue management state
  const [queue, setQueue] = useState<(Lumber | null)[]>([]);  // Current infeed queue (max 4 items)
  const [modalVisible, setModalVisible] = useState(false);  // Whether add package modal is open
  const [searchId, setSearchId] = useState('');            // Package ID being searched

  // Update queue when lumber data changes
  useEffect(() => {
    updateQueue();
  }, [lumber]);

  // Refresh the queue display
  const updateQueue = () => {
    setQueue(getInfeedQueue());
  };

  // Open/close the add package modal
  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSearchId('');
  };

  // Search for lumber by ID and add to infeed queue
  const handleSearch = () => {
    const foundLumber = findLumberById(searchId);
    if (foundLumber) {
      Alert.alert(
        "Package Found",
        `Do you want to move package ${foundLumber.id} to infeed?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Yes", 
            onPress: () => {
              moveLumberToInfeed(foundLumber.id);  // Move to infeed status
              updateQueue();  // Refresh queue display
            }
          }
        ]
      );
    } else {
      Alert.alert("Not Found", "No package found with this ID.");
    }
  };

  // Remove package from queue (long press to delete)
  const handleLongPress = (pkg: Lumber) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to remove package ${pkg.id} from the queue?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => {
            Alert.alert(
              "Final Confirmation",
              "Are you absolutely sure? This action cannot be undone.",
              [
                { text: "Cancel", style: "cancel" },
                { 
                  text: "Yes, Delete", 
                  onPress: () => {
                    removeFromInfeedQueue(pkg.id);  // Remove from queue
                    updateQueue();  // Refresh display
                    Alert.alert("Success", "Package has been removed from the queue.");
                  },
                  style: "destructive"
                }
              ]
            );
          }
        }
      ]
    );
  };

  // Complete the first item in the queue (moves to rip status)
  const completeFirstItem = () => {
    if (queue.length > 0 && queue[0]) {
      Alert.alert(
        "Confirm Completion",
        "Are you sure you want to mark this package as finished?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Confirm", 
            onPress: () => {
              completeInfeedItem(queue[0]!.id);  // Mark as complete
              updateQueue();  // Refresh display
            }
          }
        ]
      );
    }
  };

  const renderPackageBox = (pkg: Lumber | null, index: number) => (
    <Pressable
      onLongPress={() => index > 0 && pkg && handleLongPress(pkg)}
      delayLongPress={1000} // 1 second long press
      style={styles.box}
    >
      {pkg ? (
        <>
          <Text style={styles.text}>Vendor: {pkg.vendor}</Text>
          <Text style={styles.text}>Grade: {pkg.grade}</Text>
          <Text style={styles.text}>Date: {pkg.date}</Text>
          <Text style={styles.text}>Comments: {pkg.comments || 'No comments'}</Text>
        </>
      ) : (
        <Button onPress={showModal}>Add New</Button>
      )}
    </Pressable>
  );

  return (
    <PaperProvider>
      <ScrollView style={commonStyles.container}>
        <Text style={commonStyles.title}>Infeed Queue</Text>
        {queue.map((pkg, index) => (
          <View key={index}>
            {renderPackageBox(pkg, index)}
            {index === 0 && pkg && (
              <Button onPress={completeFirstItem}>Finished</Button>
            )}
          </View>
        ))}
        <Portal>
          <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Package</Text>
            <TextInput
              label="Package ID"
              value={searchId}
              onChangeText={setSearchId}
              style={styles.input}
            />
            <Button onPress={handleSearch}>Search</Button>
          </Modal>
        </Portal>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  ...commonStyles,
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    minHeight: 150, // Increase box size
  },
  text: {
    fontSize: 16,
    color: '#333', // Darker color for better contrast
    marginBottom: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Darker color for better contrast
  },
  input: {
    marginBottom: 10,
  },
});
