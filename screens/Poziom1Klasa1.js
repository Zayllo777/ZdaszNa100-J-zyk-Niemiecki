import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Poziom1Klasa1({ navigation }) { // <-- dodany navigation
  useEffect(() => {
    StatusBar.setHidden(true);
    return () => StatusBar.setHidden(false);
  }, []);

  const DEV_SKIP_LEVEL = true; // ustaw na true, aby włączyć przycisk skip

  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [stars, setStars] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);

  const starAnim = useRef(new Animated.Value(0)).current;

  const colors = [
    { pl: "żółty", de: "gelb", hex: "#FFD700" },
    { pl: "zielony", de: "grün", hex: "#00FF00" },
    { pl: "czerwony", de: "rot", hex: "#FF0000" },
    { pl: "niebieski", de: "blau", hex: "#0000FF" },
    { pl: "czarny", de: "schwarz", hex: "#000000" },
    { pl: "brązowy", de: "braun", hex: "#A52A2A" },
    { pl: "różowy", de: "rosa", hex: "#FFC0CB" },
    { pl: "fioletowy", de: "violett", hex: "#8A2BE2" },
    { pl: "szary", de: "grau", hex: "#808080" },
    { pl: "biały", de: "weiß", hex: "#FFFFFF" },
    { pl: "pomarańczowy", de: "orange", hex: "#FFA500" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const getOptions = (index) => {
    const correct = colors[index].de;
    let options = [correct];
    const otherNames = colors.map(c => c.de).filter(name => name !== correct);

    for (let i = 0; i < 3; i++) {
      const randIndex = Math.floor(Math.random() * otherNames.length);
      options.push(otherNames[randIndex]);
      otherNames.splice(randIndex, 1);
    }

    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    return options;
  };

  const [options, setOptions] = useState(getOptions(0));

  const handleOptionPress = (selected) => {
    if (selected === colors[currentIndex].de) {
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
      alert("❌ Spróbuj ponownie!");
    }
  };

  const handleSuccessPress = () => {
    setShowSuccess(false);
    if (currentIndex + 1 < colors.length) {
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
    navigation.navigate("Poziom2Klasa1"); // <-- tu następuje przejście do następnego poziomu
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
          <Text style={styles.successText}>Brawo, udało ci się zaliczyć poziom 1!</Text>

          {/* Pomarańczowy przycisk */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FFA500", marginBottom: 15 }]}
            onPress={handleLevelCompletePress}
          >
            <Text style={[styles.buttonText, { color: "#000", textAlign: "center" }]}>
              Przejdź do następnego poziomu
            </Text>
          </TouchableOpacity>

          {/* Szary przycisk */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ccc" }]}
            onPress={() => {
              setShowLevelComplete(false);
              setCurrentIndex(0);
              setOptions(getOptions(0));
              setStars(0);
            }}
          >
            <Text style={[styles.buttonText, { color: "#000", textAlign: 'center' }]}>
              Powtórz poziom ⟲
            </Text>
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
                  {
                    translateY: starAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, -30],
                    }),
                  },
                  {
                    scale: starAnim.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.5, 1.5, 1],
                    }),
                  },
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
      {DEV_SKIP_LEVEL && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 40,
            left: 20,
            backgroundColor: 'rgba(255,0,0,0.2)',
            padding: 10,
            borderRadius: 10,
            zIndex: 1000,
          }}
          onPress={() => {
            setStars(colors.length * 5); // wszystkie gwiazdki z poziomu
            setCurrentIndex(colors.length - 1);
            setShowLevelComplete(true);
          }}
        >
          <Text style={{color:'red', fontWeight:'bold'}}>Skip Level</Text>
        </TouchableOpacity>
      )}

      <View style={styles.starsContainer}>
        <Text style={styles.starsText}>⭐ {stars}</Text>
      </View>

      <Text style={styles.title}>Dopasuj nazwę do koloru</Text>

      <View
        style={[styles.colorBox, { backgroundColor: colors[currentIndex].hex }]}
      />

      <View style={styles.optionsContainer}>
        {options.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={styles.optionButton}
            onPress={() => handleOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  startImage: {
    width: "80%",
    height: "50%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  starsContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    elevation: 3,
  },
  starsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  colorBox: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
  },
  optionsContainer: {
    width: "100%",
  },
  optionButton: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  successBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlayBox: {
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  successText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  earnedStarsText: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFD700",
  },
  successHint: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
