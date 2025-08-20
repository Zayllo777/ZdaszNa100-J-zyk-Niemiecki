import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.pageText}>To jest aplikacja do nauki języka niemieckiego ZdaszNa100.</Text>
    </View>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageText: {
    fontSize: 24,
    color: '#00BFFF',
    fontFamily: 'SmoochSans_400Regular',
    textAlign: 'center',
  },
});
