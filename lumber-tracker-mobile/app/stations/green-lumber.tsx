// Green Lumber Station - handles new lumber intake

import React, { useState, useEffect, SetStateAction } from 'react';
import { View, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard, TextInput as RNTextInput, Alert, SectionList, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Text, Button, Modal, Portal, Provider as PaperProvider, List } from 'react-native-paper';
import { useLumber } from '@/context/LumberContext';
import { commonStyles } from '@/styles/commonStyles';
import { Lumber, Load } from '../types';


// Modal for showing search results
const SearchResultsModal = ({ visible, onDismiss, searchResults, onEditPackage }) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContent}>
      <Text style={styles.modalTitle}>Search Results</Text>
      <ScrollView style={styles.searchResultsContainer}>
        {/* Render each search result as a selectable button */}
        {searchResults.map((pkg, index) => (
          <Button
            key={index}
            mode="outlined"
            onPress={() => onEditPackage(pkg)}  // Select package for editing
            style={styles.searchResultButton}
          >
            {`ID: ${pkg.id} - Species: ${pkg.species} - Grade: ${pkg.grade}`}
          </Button>
        ))}
      </ScrollView>
      <Button mode="contained" onPress={onDismiss} style={styles.button}>
        Close
      </Button>
    </Modal>
  );
};

export default function GreenLumberScreen() {
  // Get lumber context functions
  const { addLumber, lumber } = useLumber();
  
  // Modal and form state
  const [modalVisible, setModalVisible] = useState(false);        // Whether the main modal is open
  const [loadNumber, setLoadNumber] = useState('');                // Current load number being entered
  const [currentLoad, setCurrentLoad] = useState<Load | null>(null); // The load being built
  
  // Form data for new lumber package
  const [currentPackage, setCurrentPackage] = useState<Lumber>({
    id: '',           // Package ID
    species: '',      // Type of wood
    grade: '',        // Quality grade
    footage: '',      // Total footage
    courses: '',      // Number of courses
    vendor: '',       // Supplier name
    date: '',         // Date received
    comments: '',     // Additional notes
    loadNumber: '',   // Which load this belongs to
    status: 'green',  // Always starts as green
    kilnName: ''      // Not used for green lumber
  });
  
  // Search functionality state
  const [searchModalVisible, setSearchModalVisible] = useState(false);  // Search modal open/closed
  const [searchLoadNumber, setSearchLoadNumber] = useState('');          // Load number to search for
  const [searchResults, setSearchResults] = useState<Lumber[]>([]);      // Found packages
  const [searchResultsVisible, setSearchResultsVisible] = useState(false); // Results modal open/closed

  useEffect(() => {
    if (currentLoad) {
      setLoadNumber(currentLoad.loadNumber);
    }
  }, [currentLoad]);

  // Open the main modal for creating loads
  const showModal = () => setModalVisible(true);
  
  // Close modal and reset all form data
  const hideModal = () => {
    setModalVisible(false);
    setCurrentLoad(null);
    setCurrentPackage({
      id: '',
      species: '',
      grade: '',
      footage: '',
      courses: '',
      vendor: '',
      date: '',
      comments: '',
      loadNumber: '',
      status: 'green',
      kilnName: ''
    });
  };

  // Add a package to the current load
  const handleAddPackage = () => {
    if (!currentLoad) {
      Alert.alert("Error", "Please create a load first.");
      return;
    }
    if (!currentPackage.id || !currentPackage.species || !currentPackage.grade || !currentPackage.footage) {
      Alert.alert("Invalid Input", "Please fill in at least ID, Species, Grade, and Footage fields.");
      return;
    }
    
    // Show confirmation dialog with package details
    Alert.alert(
      "Confirm Package Details",
      `ID: ${currentPackage.id}\nSpecies: ${currentPackage.species}\nGrade: ${currentPackage.grade}\nFootage: ${currentPackage.footage}\nCourses: ${currentPackage.courses}\nVendor: ${currentPackage.vendor}\nDate: ${currentPackage.date}\nComments: ${currentPackage.comments}`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            // Add package to current load and reset form
            setCurrentLoad({
              ...currentLoad,
              packages: [...currentLoad.packages, {...currentPackage, id: currentPackage.id}]
            });
            setCurrentPackage({
              id: '',
              species: '',
              grade: '',
              footage: '',
              courses: '',
              vendor: '',
              date: '',
              comments: '',
              loadNumber: currentLoad.loadNumber,
              status: 'green',
              kilnName: ''
            });
          }
        }
      ]
    );
  };

  // Submit the complete load to the lumber system
  const handleSubmitLoad = () => {
    if (!currentLoad || currentLoad.packages.length === 0) {
      Alert.alert("Error", "Please add at least one package to the load.");
      return;
    }
    Alert.alert(
      "Confirm Submission",
      "Are you sure you want to submit this load?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: () => {
            // Add all packages in the load to the lumber system
            currentLoad.packages.forEach(pkg => {
              addLumber({
                ...pkg,
                status: 'green',
                loadNumber: currentLoad.loadNumber
              });
            });
            Alert.alert("Success", `Load ${currentLoad.loadNumber} has been added to inventory.`);
            hideModal();
          }
        }
      ]
    );
  };

  // Create a new load with the entered load number
  const handleCreateLoad = () => {
    if (!loadNumber) {
      Alert.alert("Invalid Input", "Please enter a load number.");
      return;
    }
    const loadExists = lumber.some(item => item.loadNumber === loadNumber);
    if (loadExists) {
      Alert.alert("Error", "This load number already exists. Please choose a different one.");
      return;
    }
    setCurrentLoad({ loadNumber, packages: [] });
  };

  // Open/close search modal
  const showSearchModal = () => setSearchModalVisible(true);
  const hideSearchModal = () => setSearchModalVisible(false);

  // Search for lumber by load number
  const handleSearchLoad = () => {
    const foundLoad = lumber.filter(item => item.loadNumber === searchLoadNumber);
    if (foundLoad.length > 0) {
      setSearchResults(foundLoad);
      setSearchResultsVisible(true);
      hideSearchModal();
    } else {
      Alert.alert("Not Found", "No load found with this number.");
    }
  };

  // Edit an existing package (from search results)
  const handleEditPackage = (pkg: Lumber) => {
    setCurrentLoad({
      loadNumber: pkg.loadNumber,
      packages: [pkg]
    });
    setCurrentPackage(pkg);
    setSearchResultsVisible(false);
    showModal();
  };

  return (
    <PaperProvider>
      <View style={commonStyles.safeArea}>
        <SectionList<Lumber | string>
          sections={[
            {
              title: 'Header',
              data: ['header'] as string[],
              renderItem: () => (
                <>
                  <Text style={commonStyles.title}>Green Lumber Received</Text>
                  <Button 
                    mode="contained" 
                    onPress={showModal}
                    style={styles.button}
                    buttonColor="rgba(255, 140, 0, 0.8)"
                  >
                    New Load
                  </Button>
                  <Button 
                    mode="contained" 
                    onPress={showSearchModal}
                    style={styles.button}
                    buttonColor="rgba(255, 140, 0, 0.8)"
                  >
                    Search Load
                  </Button>
                </>
              ),
            },
            {
              title: 'Packages',
              data: currentLoad ? currentLoad.packages : [],
            },
          ]}
          renderItem={({ item, section }) => {
            if (section.title === 'Packages' && typeof item !== 'string') {
              return (
                <List.Item
                  title={`ID: ${item.id}`}
                  description={`Species: ${item.species}, Grade: ${item.grade}, Footage: ${item.footage}`}
                />
              );
            }
            return null;
          }}
          keyExtractor={(item, index) => typeof item === 'string' ? index.toString() : item.id}
          contentContainerStyle={commonStyles.container}
        />

        <Portal>
          <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalContainer}
            >
              <SectionList<Lumber | string>
                sections={[
                  {
                    title: 'Header',
                    data: ['header'] as string[],
                    renderItem: () => (
                      <>
                        <Text style={styles.modalTitle}>Build New Load</Text>
                        {!currentLoad ? (
                          <>
                            <RNTextInput
                              placeholder="Load Number"
                              value={loadNumber}
                              onChangeText={setLoadNumber}
                              style={styles.input}
                            />
                            <Button 
                              mode="contained" 
                              onPress={handleCreateLoad}
                              style={styles.button}
                              buttonColor="rgba(255, 140, 0, 0.8)"
                            >
                              Create Load
                            </Button>
                          </>
                        ) : (
                          <>
                            <Text>Load Number: {currentLoad.loadNumber}</Text>
                            <RNTextInput
                              placeholder="ID"
                              value={currentPackage.id}
                              onChangeText={(text) => setCurrentPackage({...currentPackage, id: text})}
                              style={styles.input}
                            />
                            <RNTextInput
                              placeholder="Species"
                              value={currentPackage.species}
                              onChangeText={(text) => setCurrentPackage({...currentPackage, species: text})}
                              style={styles.input}
                            />
                            <RNTextInput
                              placeholder="Grade"
                              value={currentPackage.grade}
                              onChangeText={(text) => setCurrentPackage({...currentPackage, grade: text})}
                              style={styles.input}
                            />
                            <RNTextInput
                              placeholder="Footage"
                              value={currentPackage.footage}
                              onChangeText={(text) => setCurrentPackage({...currentPackage, footage: text})}
                              keyboardType="numeric"
                              style={styles.input}
                            />
                            <RNTextInput
                              placeholder="Courses"
                              value={currentPackage.courses}
                              onChangeText={(text) => setCurrentPackage({...currentPackage, courses: text})}
                              keyboardType="numeric"
                              style={styles.input}
                            />
                            <RNTextInput
                              placeholder="Vendor"
                              value={currentPackage.vendor}
                              onChangeText={(text) => setCurrentPackage({...currentPackage, vendor: text})}
                              style={styles.input}
                            />
                            <RNTextInput
                              placeholder="Date"
                              value={currentPackage.date}
                              onChangeText={(text) => setCurrentPackage({...currentPackage, date: text})}
                              style={styles.input}
                            />
                            <RNTextInput
                              placeholder="Comments"
                              value={currentPackage.comments}
                              onChangeText={(text) => setCurrentPackage({...currentPackage, comments: text})}
                              multiline
                              style={styles.input}
                            />
                            <View style={styles.buttonContainer}>
                              <Button 
                                mode="contained" 
                                onPress={handleAddPackage}
                                style={[styles.button, styles.halfButton]}
                                buttonColor="rgba(255, 140, 0.8)"
                              >
                                Submit Package
                              </Button>
                              <Button 
                                mode="contained" 
                                onPress={handleSubmitLoad}
                                style={[styles.button, styles.halfButton]}
                                buttonColor="rgba(255, 140, 0.8)"
                              >
                                Submit Load
                              </Button>
                            </View>
                            <Text style={styles.subtitle}>Packages in this load:</Text>
                          </>
                        )}
                      </>
                    ),
                  },
                  {
                    title: 'Packages',
                    data: currentLoad ? currentLoad.packages : [],
                  },
                ]}
                renderItem={({ item, section }) => {
                  if (section.title === 'Packages' && typeof item !== 'string') {
                    return (
                      <List.Item
                        key={item.id}
                        title={`ID: ${item.id}`}
                        description={`Species: ${item.species}, Grade: ${item.grade}, Footage: ${item.footage}`}
                      />
                    );
                  }
                  return null;
                }}
                keyExtractor={(item, index) => typeof item === 'string' ? index.toString() : item.id}
                contentContainerStyle={styles.modalScrollContent}
              />
            </KeyboardAvoidingView>
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={searchModalVisible} onDismiss={hideSearchModal} contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Search Load</Text>
            <RNTextInput
              placeholder="Load Number"
              value={searchLoadNumber}
              onChangeText={setSearchLoadNumber}
              style={styles.input}
            />
            <Button 
              mode="contained" 
              onPress={handleSearchLoad}
              style={styles.button}
              buttonColor="rgba(255, 140, 0.8)"
            >
              Search
            </Button>
          </Modal>
        </Portal>

        <SearchResultsModal
          visible={searchResultsVisible}
          onDismiss={() => setSearchResultsVisible(false)}
          searchResults={searchResults}
          onEditPackage={handleEditPackage}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  ...commonStyles,
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    height: '80%',
    width: '90%',
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
  },
  modalScrollContent: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 24,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfButton: {
    flex: 0.48,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  searchResultsContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  searchResultButton: {
    marginBottom: 10,
  },
});