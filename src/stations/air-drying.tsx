import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Link } from 'expo-router';
import { Href } from 'expo-router/src/link/href';

export default function AirDryingScreen() {
  return (
    <View style={styles.container}>
      <Text>Air Drying Screen</Text>
      <Link href={'/stations/kiln-operations' as Href<string>} asChild>
        <Button mode="contained">Move to Kiln Operations</Button>
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
