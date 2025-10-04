// Rip Line Station - displays infeed queue for processing

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Provider as PaperProvider, Portal, Modal, TextInput, Button } from 'react-native-paper';
import { useLumber, Lumber } from '@/context/LumberContext';
import { commonStyles } from '@/styles/commonStyles';

/**
 * Package interface for rip line operations
 * Simplified package structure for display purposes
 */
interface Package {
  id: string;          // Package identifier
  vendor: string;      // Supplier name
  grade: string;       // Lumber grade
  date: string;        // Date received
  comments?: string;   // Optional comments
}

export default function RipLineScreen() {
  // Get infeed queue from lumber context
  const { getInfeedQueue } = useLumber();
  
  // Queue and modal state
  const [infeedQueue, setInfeedQueue] = useState<(Lumber | null)[]>([]);  // Current infeed queue
  const [modalVisible, setModalVisible] = useState(false);                // Comments modal visibility
  const [selectedPackage, setSelectedPackage] = useState<Lumber | null>(null);  // Selected package for comments
  const [newComment, setNewComment] = useState('');                       // New comment input

  useEffect(() => {
    setInfeedQueue(getInfeedQueue());
  }, [getInfeedQueue]);

  const showComments = (pkg: Lumber) => {
    setSelectedPackage(pkg);
    setModalVisible(true);
  };

  const addComment = () => {
    setModalVisible(false);
    setNewComment('');
  };

  const renderPackageBox = (pkg: Lumber | null, index: number) => (
    <TouchableOpacity 
      onPress={() => pkg && showComments(pkg)} 
      style={styles.box}
      key={pkg ? pkg.id : `empty-${index}`}
    >
      <Text style={styles.boxTitle}>{index === 0 ? 'Current Package' : `Next Package ${index}`}</Text>
      {pkg ? (
        <>
          <Text style={styles.text}>Vendor: {pkg.vendor}</Text>
          <Text style={styles.text}>Grade: {pkg.grade}</Text>
          <Text style={styles.text}>Date: {pkg.date}</Text>
          <Text style={styles.text}>Comments: {pkg.comments || 'No comments'}</Text>
        </>
      ) : (
        <Text style={styles.text}>No package</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <ScrollView style={commonStyles.container}>
        <Text style={commonStyles.title}>Rip Line Production</Text>
        {infeedQueue.map((pkg, index) => renderPackageBox(pkg, index))}
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Comments</Text>
            <Text>{selectedPackage?.comments || 'No comments available'}</Text>
            <TextInput
              label="Add new comment"
              value={newComment}
              onChangeText={setNewComment}
              style={styles.input}
            />
            <Button onPress={addComment}>Add Comment</Button>
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
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Darker color for better contrast
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