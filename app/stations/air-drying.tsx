import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link, Href } from 'expo-router';

export default function AirDryingScreen() {
  return (
    <View style={styles.container}>
      <Text>Air Drying Screen</Text>
      <Link href={'/stations/kiln-operations' as Href<string>} asChild>
        <Button 
          mode="contained"
          accessibilityLabel="Move lumber to kiln operations"
        >
          Move to Kiln Operations
        </Button>
      </Link>
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
