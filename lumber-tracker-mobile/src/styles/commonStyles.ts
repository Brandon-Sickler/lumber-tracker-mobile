import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';

export const commonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' 
      ? Constants.statusBarHeight + 10 // Add 10 more pixels for iOS
      : Constants.statusBarHeight + 20, // Add 20 more pixels for Android
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  subtitle: {  // Add this new style
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#000000',
  },
});
