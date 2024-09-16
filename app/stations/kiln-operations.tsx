import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, Href } from 'expo-router';

export default function KilnOperationsScreen() {
  const [operationCompleted, setOperationCompleted] = useState(false);

  const completeOperation = () => {
    setOperationCompleted(true);
  };

  return (
    <View style={styles.container}>
      <Text>Kiln Operations Screen</Text>
      <Button 
        mode="contained" 
        onPress={completeOperation} 
        disabled={operationCompleted}
        accessibilityLabel="Complete kiln operation"
      >
        Complete Kiln Operation
      </Button>
      {operationCompleted && (
        <Link href={'/stations/kd-lumber' as Href<string>} asChild>
          <Button 
            mode="contained"
            accessibilityLabel="Move lumber to KD lumber"
          >
            Move to KD Lumber
          </Button>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
