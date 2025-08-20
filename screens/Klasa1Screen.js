import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Klasa1Screen({ navigation }) {
  const [stars, setStars] = useState(15); // przykładowa ilość gwiazdek

  // Animacja połysku dla przycisku "Przygoda"
  const shineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(shineAnim, { toValue: 0, duration: 2000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wybierz tryb:</Text>

 <TouchableOpacity onPress={() => navigation.navigate("Poziom1Klasa1")}>
  <Animated.View
    style={{
      transform: [{
        scale: shineAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.05],
        }),
      }],
      opacity: shineAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1],
      }),
    }}
  >
    <LinearGradient
      colors={['#FF8C00', '#FFB84D']}
      style={styles.button}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text style={styles.buttonText}>Przygoda</Text>
    </LinearGradient>
  </Animated.View>
</TouchableOpacity>
      {/* Słowniczek */}
      <TouchableOpacity onPress={() => alert('Słowniczek')}>
        <LinearGradient
          colors={['#A9A9A9', '#C0C0C0']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.buttonText}>Słowniczek</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Punkty */}
      <TouchableOpacity onPress={() => alert('Punkty')}>
        <LinearGradient
          colors={['#32CD32', '#7CFC00']}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.buttonText}>Punkty</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Pasek gwiazdek */}
      <View style={styles.starsContainer}>
        <Text style={styles.starsText}>⭐ Gwiazdki: {stars}</Text>
      </View>
    </View>
  );
}

export default Klasa1Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontFamily: 'SmoochSans_400Regular',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 15,
    marginVertical: 10,
    width: 250,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    fontSize: 28,
    fontFamily: 'SmoochSans_400Regular',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  starsContainer: {
    marginTop: 50,
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    shadowColor: '#B8860B',
    shadowOpacity: 0.7,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  starsText: {
    fontSize: 24,
    fontFamily: 'SmoochSans_400Regular',
    color: '#333',
  },
});
