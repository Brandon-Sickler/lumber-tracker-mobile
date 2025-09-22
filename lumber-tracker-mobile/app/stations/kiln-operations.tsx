import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput as RNTextInput, Alert } from 'react-native';
import { Text, Button, Modal, Portal, List } from 'react-native-paper';
import { useLumber } from '@/context/LumberContext';
import { commonStyles } from '@/styles/commonStyles';

export default function KilnOperationsScreen() {
  const { lumber, updateLumberStatus } = useLumber();
  const [selectedKiln, setSelectedKiln] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchId, setSearchId] = useState('');

  const kilns = ['Kiln 1', 'Kiln 2', 'Kiln 3', 'Kiln 4', 'Kiln 5', 'Kiln 6', 'Kiln 7', 'Kiln 8'];

  const openKilnModal = (kiln: string) => {
    setSelectedKiln(kiln);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSearchId('');
  };

  const searchInventory = () => {
    if (!searchId.trim()) {
      Alert.alert("Invalid Input", "Please enter a valid Lumber ID.");
      return;
    }

    const foundLumber = lumber.find(item => item.id === searchId && (item.status === 'green' || item.status === 'air-drying'));
    if (foundLumber && selectedKiln) {
      try {
        updateLumberStatus(foundLumber.id, 'kiln', selectedKiln);
        closeModal();
        Alert.alert("Success", `Lumber ID ${foundLumber.id} has been moved to ${selectedKiln}.`);
      } catch (error) {
        Alert.alert("Error", "Failed to move lumber to kiln. Please try again.");
      }
    } else {
      Alert.alert("Not Found", "Lumber not found or not eligible for kiln. Please check the ID and try again.");
    }
  };

  return (
    <View style={commonStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={commonStyles.container}>
          <Text style={commonStyles.title}>Kiln Operations</Text>
          <View style={styles.kilnContainer}>
            {kilns.map((kiln) => (
              <Button
                key={kiln}
                mode="contained"
                onPress={() => openKilnModal(kiln)}
                style={styles.kilnButton}
                buttonColor="rgba(255, 140, 0, 0.8)" // Neon orange with 80% opacity
              >
                {kiln}
              </Button>
            ))}
          </View>
          <Text style={commonStyles.subtitle}>Lumber in Kilns:</Text>
          {lumber.filter(item => item.status === 'kiln').map(item => (
            <List.Item
              key={item.id}
              title={`ID: ${item.id}`}
              description={`Vendor: ${item.vendor}, Footage: ${item.footage}, Kiln: ${item.kilnName}`}
            />
          ))}
          {lumber.filter(item => item.status === 'kiln').length === 0 && (
            <Text style={styles.emptyText}>No lumber currently in kilns</Text>
          )}
          <Portal>
            <Modal visible={modalVisible} onDismiss={closeModal} contentContainerStyle={styles.modalContent}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <Text style={styles.modalTitle}>{selectedKiln}</Text>
                  <RNTextInput
                    placeholder="Search Lumber ID"
                    value={searchId}
                    onChangeText={setSearchId}
                    style={styles.input}
                  />
                  <Button 
                    mode="contained" 
                    onPress={searchInventory} 
                    style={styles.button}
                    buttonColor="rgba(255, 140, 0, 0.8)" // Neon orange with 80% opacity
                  >
                    Search
                  </Button>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </Portal>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...commonStyles,
  kilnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  kilnButton: {
    width: '48%',
    marginBottom: 16,
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
    marginBottom: 16,
    color: '#000000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
  },
  button: {
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
