import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Sound from 'react-native-sound';
import OnScreenKeyboard from '../components/OnScreenKeyboard';
import HintPanel from '../components/HintPanel';

const GameScreen = ({ config, onEndGame }) => {
  const [state, setState] = useState({
    participants: [
      { name: 'Player 1', score: 0, maxScore: 100 },
    ],
    currentParticipantIndex: 0,
    currentWordIndex: 0,
    timeLeft: 60,
  });
  
  const timerRef = useRef(null);
  
  useEffect(() => {
    Sound.setCategory('Playback');
    
    const correctSound = new Sound('correct.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load correct sound', error);
      }
    });
    
    const wrongSound = new Sound('wrong.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load wrong sound', error);
      }
    });
    
    const letterCorrectSound = new Sound('letterCorrect.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load letter correct sound', error);
      }
    });
    
    const letterWrongSound = new Sound('letterWrong.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to load letter wrong sound', error);
      }
    });
    
    return () => {
      correctSound.release();
      wrongSound.release();
      letterCorrectSound.release();
      letterWrongSound.release();
    };
  }, []);
  
  useEffect(() => {
    if (state.timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else {
      handleSpellingSubmit(false);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [state.timeLeft]);
  
  const playSound = (soundFile) => {
    const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error('Failed to play sound', error);
        return;
      }
      sound.play();
    });
  };
  
  const handleSpellingSubmit = (isCorrect) => {
    if (isCorrect) {
      playSound('correct.mp3');
    } else {
      playSound('wrong.mp3');
    }
  };

  const [letters, setLetters] = useState([]);
  const [usedLetters, setUsedLetters] = useState(new Set());
  
  const typeLetter = (letter) => {
    // Placeholder for letter typing logic
    setLetters([...letters, letter]);
    setUsedLetters(new Set([...usedLetters, letter.toLowerCase()]));
  };
  
  const handleBackspace = () => {
    setLetters(letters.slice(0, -1));
  };
  
  const [coins, setCoins] = useState(100);
  const [usedHints, setUsedHints] = useState({
    'reveal-letter': false,
    'hint-definition': false,
    'extra-time': false,
    'skip-word': false,
  });
  
  const isHelpUsed = (hintType) => usedHints[hintType];
  
  const handleRevealLetter = () => {
    // Placeholder for reveal letter logic
    setUsedHints({ ...usedHints, 'reveal-letter': true });
    setCoins(coins - 5);
  };
  
  const handleShowDefinition = () => {
    // Placeholder for show definition logic
    setUsedHints({ ...usedHints, 'hint-definition': true });
    setCoins(coins - 10);
  };
  
  const handleAddTime = () => {
    // Placeholder for add time logic
    setUsedHints({ ...usedHints, 'extra-time': true });
    setCoins(coins - 15);
    setState(prev => ({ ...prev, timeLeft: prev.timeLeft + 30 }));
  };
  
  const handleSkipWord = () => {
    // Placeholder for skip word logic
    setUsedHints({ ...usedHints, 'skip-word': true });
    setCoins(coins - 20);
    handleNextWord();
  };
  
  const currentParticipant = state.participants[state.currentParticipantIndex];
  const currentWord = null; // Assuming currentWord is null for now

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spelling Bee Game</Text>
      <Text>Current Participant: {currentParticipant.name}</Text>
      <Text>Score: {currentParticipant.score}/{currentParticipant.maxScore}</Text>
      
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentParticipant.score / currentParticipant.maxScore) * 100}%` }]} />
      </View>
      
      <Text>Timer: {state.timeLeft}s</Text>
      
      <Text style={styles.wordDisplay}>_ _ _ _ _</Text>
      
      <HintPanel 
        word={currentWord?.word}
        onRevealLetter={handleRevealLetter}
        onShowDefinition={handleShowDefinition}
        onAddTime={handleAddTime}
        onSkipWord={handleSkipWord}
        isHelpUsed={isHelpUsed}
        coins={coins}
      />
      <OnScreenKeyboard 
        onLetter={typeLetter}
        onBackspace={handleBackspace}
        onSubmit={() => handleSpellingSubmit(true)}
        usedLetters={usedLetters}
        currentWord={currentWord?.word}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  wordDisplay: {
    fontSize: 32,
    letterSpacing: 10,
    marginVertical: 20,
  },
});

export default GameScreen;
