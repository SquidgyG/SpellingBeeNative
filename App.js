import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from './src/screens/GameScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen 
          name="Game" 
          component={GameScreen} 
          options={{ title: 'Spelling Bee Game' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
