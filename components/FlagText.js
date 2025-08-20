// components/FlagText.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FlagText() {
  return (
    <View style={styles.flagContainer}>
      <View style={[styles.flagStripe, styles.black]}>
        <Text style={styles.text}>Witamy w aplikacji ZdaszNa100</Text>
      </View>
      <View style={[styles.flagStripe, styles.red]}>
        <Text style={styles.text}>Edycja</Text>
      </View>
      <View style={[styles.flagStripe, styles.yellow]}>
        <Text style={styles.text}>Język Niemiecki</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flagContainer: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 40, // więcej odstępu pod flagą
  },
  flagStripe: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  black: {
    backgroundColor: '#000000',
  },
  red: {
    backgroundColor: '#DD0000',
  },
  yellow: {
    backgroundColor: '#FFCE00',
  },
  text: {
    color: 'Blue',
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'SmoochSans_400Regular', // czcionka z expo-google-fonts
  },
});
