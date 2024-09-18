import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, Modal, Portal, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { useLumber } from '@/context/LumberContext';
import { commonStyles } from '../styles/commonStyles';

export default function InfeedQueueScreen() {
  const { lumber, moveLumberToInfeed, completeInfeedItem } = useLumber();
  const [queue, setQueue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);

  useEffect(() => {
    updateQueue();
  }, [lumber]);

  const updateQueue = () => {
    const infeedItems = lumber.filter(item => item.status === 'infeed').slice(0, 4);
    setQueue(infeedItems as React.SetStateAction<never[]>);
  };

  const showModal = (index) => {
    setSelectedBoxIndex(index);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setSearchId('');
  };

  const searchInventory = () => {
    const foundLumber = lumber.find(item => item.id === searchId && item.status === 'kiln');
    if (foundLumber) {
      Alert.alert(
        "Confirm Package",
        `Add package ${foundLumber.id} to infeed queue?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Confirm", onPress: () => addToQueue(foundLumber) }
        ]
      );
    } else {
      Alert.alert("Not Found", "Package not found or not in kiln.");
    }
  };

  const addToQueue = (pkg) => {
    moveLumberToInfeed(pkg.id);
    hideModal();
    updateQueue();
  };

  const completeFirstItem = () => {
    if (queue.length > 0) {
      Alert.alert(
        "Confirm Completion",
        "Are you sure you want to mark this package as finished?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Confirm", 
            onPress: () => {
              if (queue.length > 0 && queue[0]) {
                completeInfeedItem((queue[0] as { id: string }).id);
                updateQueue();
              } else {
                console.error('Queue is empty');
              }
            }
          }
        ]
      );
    }
  };

  const renderPackageBox = (pkg, index) => (
    <TouchableOpacity 
      onPress={() => !pkg && showModal(index)} 
      style={styles.box}
    >
      {pkg ? (
        <>
          <Text>Vendor: {pkg.vendor}</Text>
          <Text>Grade: {pkg.grade}</Text>
          <Text>Date: {pkg.date}</Text>
          <Text>Comments: {pkg.comments}</Text>
        </>
      ) : (
        <Text>Tap to add package</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <ScrollView style={commonStyles.container}>
        <Text style={commonStyles.title}>Infeed Queue</Text>
        {queue.length > 0 ? (
          queue.map((pkg, index) => (
            <View key={index}>
              {renderPackageBox(pkg, index)}
              {index === 0 && (
                <Button onPress={completeFirstItem}>Finished</Button>
              )}
            </View>
          ))
        ) : (
          <Text>No packages in the queue</Text>
        )}
        <Portal>
          <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Package</Text>
            <TextInput
              label="Package ID"
              value={searchId}
              onChangeText={setSearchId}
              style={styles.input}
            />
            <Button onPress={searchInventory}>Search</Button>
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
    padding: 10,
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
});
