import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, Href } from 'expo-router';

export default function GreenLumberScreen() {
  const [lumberCompleted, setLumberCompleted] = useState(false);

  const completeLumber = () => {
    setLumberCompleted(true);
  };

  return (
    <View style={styles.container}>
      <Text>Green Lumber Received Screen</Text>
      <Button 
        mode="contained" 
        onPress={completeLumber} 
        disabled={lumberCompleted}
        accessibilityLabel="Complete lumber processing"
      >
        Complete Lumber
      </Button>
      {lumberCompleted && (
        <Link href={'/stations/air-drying' as Href<string>} asChild>
          <Button 
            mode="contained"
            accessibilityLabel="Move lumber to air drying"
          >
            Move to Air Drying
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
