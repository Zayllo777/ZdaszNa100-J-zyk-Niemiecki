import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Poziom2Klasa1({ navigation }) {
  useEffect(() => {
    StatusBar.setHidden(true);
    return () => StatusBar.setHidden(false);
  }, []);

  const DEV_SKIP_LEVEL = true;

  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [stars, setStars] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [showWrongAnswerAlert, setShowWrongAnswerAlert] = useState(false);

  const starAnim = useRef(new Animated.Value(0)).current;
  const lostStarAnim = useRef(new Animated.Value(0)).current;

  const animals = [
    { pl: "pies", de: "der Hund", img: require("../assets/animals/derHund.png") },
    { pl: "kot", de: "die Katze", img: require("../assets/animals/dieKatze.png") },
    { pl: "koń", de: "das Pferd", img: require("../assets/animals/dasPferd.png") },
    { pl: "krowa", de: "die Kuh", img: require("../assets/animals/dieKuh.png") },
    { pl: "owca", de: "das Schaf", img: require("../assets/animals/dasSchaf.png") },
    { pl: "koza", de: "die Ziege", img: require("../assets/animals/dieZiege.png") },
    { pl: "świnia", de: "das Schwein", img: require("../assets/animals/dasSchwein.png") },
    { pl: "ptak", de: "der Vogel", img: require("../assets/animals/derVogel.png") },
    { pl: "mysz", de: "die Maus", img: require("../assets/animals/dieMaus.png") },
    { pl: "ryba", de: "der Fisch", img: require("../assets/animals/derFisch.png") },
    { pl: "wąż", de: "die Schlange", img: require("../assets/animals/dieSchlange.png") },
    { pl: "lew", de: "der Löwe", img: require("../assets/animals/derLowe.png") },
    { pl: "słoń", de: "der Elefant", img: require("../assets/animals/derElefant.png") },
    { pl: "królik", de: "das Kaninchen", img: require("../assets/animals/dasKaninchen.png") },
    { pl: "świnka morska", de: "das Meerschweinchen", img: require("../assets/animals/dasMeerschweinchen.png") },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const getOptions = (index) => {
    const correct = animals[index].de;
    let options = [correct];
    const otherNames = animals.map(a => a.de).filter(name => name !== correct);

    for (let i = 0; i < 3; i++) {
      const randIndex = Math.floor(Math.random() * otherNames.length);
      options.push(otherNames[randIndex]);
      otherNames.splice(randIndex, 1);
    }

    return options.sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState(getOptions(0));

  const handleOptionPress = (selected) => {
    if (selected === animals[currentIndex].de) {
      setEarnedStars(5);
      setStars(prev => prev + 5);
      setShowSuccess(true);
      starAnim.setValue(0);
      Animated.timing(starAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      setStars(prev => Math.max(prev - 2, 0));

      lostStarAnim.setValue(0);
      Animated.timing(lostStarAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      setShowWrongAnswerAlert(true);
      setTimeout(() => setShowWrongAnswerAlert(false), 1200);
    }
  };

  const handleSuccessPress = () => {
    setShowSuccess(false);
    if (currentIndex + 1 < animals.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setOptions(getOptions(nextIndex));
    } else {
      setShowLevelComplete(true);
    }
  };

  const handleLevelCompletePress = () => {
    alert("Przechodzisz do następnego poziomu!");
    setShowLevelComplete(false);
    // navigation.navigate("Poziom3Klasa1")
  };

  if (step === 0) {
    return (
      <TouchableOpacity style={styles.fullScreen} onPress={() => setStep(1)}>
        <Image
          source={require("../assets/zdjecia/swietnie.png")}
          style={styles.startImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }

  if (showLevelComplete) {
    return (
      <View style={styles.successContainer}>
        <Image
          source={require("../assets/zdjecia/swietnie.png")}
          style={styles.successBackground}
          resizeMode="cover"
        />
        <View style={styles.overlayBox}>
          <Text style={styles.successText}>Brawo, udało ci się zaliczyć poziom 2!</Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FFA500", marginBottom: 15 }]}
            onPress={handleLevelCompletePress}
          >
            <Text style={[styles.buttonText, { color: "#000" }]}>Przejdź do następnego poziomu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ccc" }]}
            onPress={() => {
              setShowLevelComplete(false);
              setCurrentIndex(0);
              setOptions(getOptions(0));
              setStars(0);
            }}
          >
            <Text style={[styles.buttonText, { color: "#000" }]}>Powtórz poziom ⟲</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (showSuccess) {
    return (
      <TouchableOpacity style={styles.successContainer} onPress={handleSuccessPress}>
        <Image
          source={require("../assets/zdjecia/swietnie.png")}
          style={styles.successBackground}
          resizeMode="cover"
        />
        <View style={styles.overlayBox}>
          <Text style={styles.successText}>Świetnie ci idzie!</Text>

          <Animated.Text
            style={[
              styles.earnedStarsText,
              {
                opacity: starAnim,
                transform: [
                  { translateY: starAnim.interpolate({ inputRange: [0, 1], outputRange: [20, -30] }) },
                  { scale: starAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 1.5, 1] }) },
                ],
              },
            ]}
          >
            ⭐ +{earnedStars}
          </Animated.Text>

          <Text style={styles.successHint}>(Kliknij, aby przejść dalej)</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <LinearGradient
      colors={['rgba(255, 165, 0, 0.3)', 'rgba(255, 255, 255, 0.3)']}
      style={styles.container}
    >
      {/* Gwiazdki */}
      <View style={styles.starsContainer}>
        <Text style={styles.starsText}>⭐ {stars}</Text>

        <Animated.Text
          style={{
            position: 'absolute',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#FF0000',
            transform: [
              { translateY: lostStarAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -30] }) },
              { translateX: lostStarAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) },
              { scale: lostStarAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5] }) },
            ],
            opacity: lostStarAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
          }}
        >
          -2⭐
        </Animated.Text>
      </View>

      {/* Skip level */}
      {DEV_SKIP_LEVEL && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => setShowLevelComplete(true)}
        >
          <Text style={styles.skipButtonText}>Skip Level</Text>
        </TouchableOpacity>
      )}

      {/* Alert przy błędnej odpowiedzi */}
      {showWrongAnswerAlert && (
        <View style={styles.customAlert}>
          <Text style={styles.customAlertText}>Niestety, zła odpowiedź</Text>
        </View>
      )}

      {/* Tytuł */}
      <Text style={styles.title}>Dopasuj nazwę do zwierzęcia</Text>

      {/* Obrazek */}
      <Image
        source={animals[currentIndex].img}
        style={styles.animalImage}
        resizeMode="contain"
      />

      {/* Opcje */}
      <View style={styles.optionsContainer}>
        {options.map((option, i) => (
          <TouchableOpacity key={i} style={styles.optionButton} onPress={() => handleOptionPress(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, justifyContent: "center", alignItems: "center" },
  startImage: { width: "80%", height: "50%" },
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  starsContainer: { position: "absolute", top: 40, right: 20, backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, elevation: 3 },
  starsText: { fontSize: 18, fontWeight: "bold" },
  skipButton: { position: "absolute", top: 40, left: 20, backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, elevation: 3 },
  skipButtonText: { fontSize: 14, fontWeight: "bold", color: "#000" },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 20 },
  animalImage: { width: 200, height: 300, marginBottom: 20, borderRadius: 10, borderWidth: 2, borderColor: "#000", resizeMode: "contain", backgroundColor: "#fff" },
  optionsContainer: { width: "100%" },
  optionButton: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginVertical: 5 },
  optionText: { fontSize: 18, textAlign: "center", color: "#000" },
  successContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  successBackground: { width: "100%", height: "100%", position: "absolute" },
  overlayBox: { backgroundColor: "rgba(255,255,255,0.85)", padding: 30, borderRadius: 20, alignItems: "center" },
  successText: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  earnedStarsText: { fontSize: 36, fontWeight: "bold", marginBottom: 10, color: "#FFD700" },
  successHint: { fontSize: 14, color: "#333", marginTop: 10 },
  button: { paddingVertical: 15, paddingHorizontal: 20, borderRadius: 15 },
  buttonText: 
  { 
  fontSize: 18, 
  fontWeight: "bold" },
  customAlert: {
    position: "absolute",
    top: "40%",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 10,
  },
  customAlertText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
