import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigation';
import { useFonts, SmoochSans_400Regular } from '@expo-google-fonts/smooch-sans';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

enableScreens(); // Włączenie react-native-screens

export default function App() {
  const [fontsLoaded] = useFonts({
    SmoochSans_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Ładowanie czcionki...</Text>;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
