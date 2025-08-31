import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OnScreenKeyboard = ({ onLetter, onBackspace, onSubmit, usedLetters, currentWord }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <View style={styles.keyboard}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((letter) => (
            <TouchableOpacity 
              key={letter}
              style={[
                styles.key, 
                usedLetters.has(letter.toLowerCase()) && styles.usedKey,
                currentWord && currentWord.includes(letter.toLowerCase()) && styles.correctKey
              ]}
              onPress={() => onLetter(letter)}
            >
              <Text style={styles.keyText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <TouchableOpacity style={styles.controlKey} onPress={onBackspace}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlKey} onPress={onSubmit}>
          <Text style={styles.keyText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  key: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
  keyText: {
    fontSize: 20,
  },
  usedKey: {
    backgroundColor: '#a0a0a0',
  },
  correctKey: {
    backgroundColor: '#4caf50',
  },
  controlKey: {
    backgroundColor: '#2196f3',
    padding: 10,
    margin: 3,
    borderRadius: 5,
  },
});

export default OnScreenKeyboard;
