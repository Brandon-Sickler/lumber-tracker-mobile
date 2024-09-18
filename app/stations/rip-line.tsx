import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Provider as PaperProvider, Portal, Modal, TextInput, Button } from 'react-native-paper';
import { useLumber } from '@/context/LumberContext';
import { commonStyles } from '../styles/commonStyles';

interface Package {
  id: string;
  vendor: string;
  grade: string;
  date: string;
  comments?: string;
  // Add any other properties your package might have
}

export default function RipLineScreen() {
  const { lumber } = useLumber();
  const [infeedQueue, setInfeedQueue] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const queue = lumber.filter(item => item.status === 'infeed').slice(0, 4);
    setInfeedQueue(queue as React.SetStateAction<never[]>);
  }, [lumber]);
  const showComments = (pkg: any) => {
    setSelectedPackage(pkg);
    setModalVisible(true);
  };

  const addComment = () => {
    // Here you would update the comment in your global state
    // For now, we'll just close the modal
    setModalVisible(false);
    setNewComment('');
  };

  const renderPackageBox = (pkg, index) => (
    <TouchableOpacity onPress={() => showComments(pkg)} style={styles.box}>
      <Text style={styles.boxTitle}>{index === 0 ? 'Current Package' : `Next Package ${index}`}</Text>
      <Text>Vendor: {pkg.vendor}</Text>
      <Text>Grade: {pkg.grade}</Text>
      <Text>Date: {pkg.date}</Text>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <ScrollView style={commonStyles.container}>
        <Text style={commonStyles.title}>Rip Line Production</Text>
        {infeedQueue.length > 0 ? (
          infeedQueue.map((pkg, index) => renderPackageBox(pkg, index))
        ) : (
          <Text>No packages in the queue</Text>
        )}
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
    padding: 10,
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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