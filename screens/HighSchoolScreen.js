import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, ImageBackground } from 'react-native';

function SzkolaSredniaScreen({ navigation }) {
  const klasy = ['Klasa 1', 'Klasa 2', 'Klasa 3', 'Klasa 4'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Szkoła Średnia</Text>
      {/* Przyciski dla klas */}
      {klasy.map((klasa, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => alert(`Kliknięto ${klasa}`)} // tymczasowo
        >
          <Text style={styles.buttonText}>{klasa}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default SzkolaSredniaScreen;

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
