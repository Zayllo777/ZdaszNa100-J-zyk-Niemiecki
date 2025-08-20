// navigation/AppNavigator.js
import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SzkolaPodstawowaScreen from '../screens/SzkolaPodstawowaScreen';
import HighSchoolScreen from '../screens/HighSchoolScreen';
import AboutScreen from '../screens/AboutScreen';
import Klasa1Screen from '../screens/Klasa1Screen';
import Poziom1Klasa1 from '../screens/Poziom1Klasa1';
import Poziom2Klasa1 from '../screens/Poziom2Klasa1';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
<Stack.Navigator
  screenOptions={{
    headerTitle: 'ZdaszNa100',
    headerTitleAlign: 'center',
    headerStyle: { backgroundColor: '#fff' },
headerTitleStyle: {
  fontFamily: 'SmoochSans_400Regular',
  fontSize: 60,
  color: '#00BFFF',
  fontWeight: '600',
  paddingTop: 10, // delikatne przesunięcie w dół
},
  }}
>

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Szkoła Podstawowa" component={SzkolaPodstawowaScreen} />
      <Stack.Screen name="Szkoła Średnia" component={HighSchoolScreen} />
      <Stack.Screen name="O nas" component={AboutScreen} />
      <Stack.Screen name="Klasa 1" component={Klasa1Screen} />
      <Stack.Screen 
  name="Poziom2Klasa1" 
  component={Poziom2Klasa1} 
  options={{ headerShown: false }}
/>
      <Stack.Screen
        name="Poziom1Klasa1"
        component={Poziom1Klasa1}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
