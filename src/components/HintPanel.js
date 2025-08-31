import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HintPanel = ({ word, onRevealLetter, onShowDefinition, onAddTime, onSkipWord, isHelpUsed, coins }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hints</Text>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.button}
          onPress={onRevealLetter}
          disabled={isHelpUsed('reveal-letter')}
        >
          <Text style={styles.buttonText}>Reveal Letter (5 coins)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={onShowDefinition}
          disabled={isHelpUsed('hint-definition')}
        >
          <Text style={styles.buttonText}>Show Definition (10 coins)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={onAddTime}
          disabled={isHelpUsed('extra-time')}
        >
          <Text style={styles.buttonText}>Add Time (15 coins)</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={onSkipWord}
          disabled={isHelpUsed('skip-word')}
        >
          <Text style={styles.buttonText}>Skip Word (20 coins)</Text>
        </TouchableOpacity>
      </View>
      <Text>Coins: {coins}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: '45%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default HintPanel;
