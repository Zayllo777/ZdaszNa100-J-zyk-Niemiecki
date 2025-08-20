import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/globalStyles';
import FlagText from '../components/FlagText';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <FlagText />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Szkoła Podstawowa')}
        >
          <Text style={styles.buttonText}>Szkoła Podstawowa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Szkoła Średnia')}
        >
          <Text style={styles.buttonText}>Szkoła Średnia</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('O nas')}
      >
        <Text style={styles.bottomButtonText}>O nas</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
