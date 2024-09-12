import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, useRouter, Href } from 'expo-router';

export default function GreenLumberScreen() {
  const [lumberCompleted, setLumberCompleted] = useState(false);
  const router = useRouter();

  const completeLumber = () => {
    setLumberCompleted(true);
  };

  return (
    <View style={styles.container}>
      <Text>Green Lumber Received Screen</Text>
      <Button mode="contained" onPress={completeLumber} disabled={lumberCompleted}>
        Complete Lumber
      </Button>
      {lumberCompleted && (
        <Button mode="contained" onPress={() => router.push('/stations/air-drying' as Href<string>)}>
          Move to Air Drying
        </Button>
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
