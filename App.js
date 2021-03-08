import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Accueil from './screen/accueil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FilmDetail from './screen/filmDetail';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
