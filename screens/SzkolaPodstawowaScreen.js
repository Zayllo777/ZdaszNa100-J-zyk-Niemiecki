import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

function SzkolaPodstawowaScreen({ navigation }) {
  const klasy = ['Klasa 1', 'Klasa 2', 'Klasa 3', 'Klasa 4', 'Klasa 5', 'Klasa 6', 'Klasa 7', 'Klasa 8'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Szkoła Podstawowa</Text>
      {klasy.map((klasa, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => {
  if (klasa === 'Klasa 1') {
    navigation.navigate('Klasa 1');
  } else {
    alert(`Kliknięto ${klasa}`);
  }
}}
        >
          <Text style={styles.buttonText}>{klasa}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default SzkolaPodstawowaScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'SmoochSans_400Regular',
    marginBottom: 20,
    color: '#00BFFF',
  },
  button: {
    backgroundColor: '#00BFFF',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'SmoochSans_400Regular',
    textAlign: 'center',
  },
});
