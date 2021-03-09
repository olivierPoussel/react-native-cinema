import React from 'react';
import { StyleSheet} from 'react-native';
import Accueil from './screen/accueil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FilmDetail from './screen/filmDetail';
import Login from './screen/login';
import { initialisation, isAdmin, isAuth } from './services/authService';
import Register from './screen/register';

export default function App() {
  initialisation()
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          isAuth() ? (
            <>
              <Stack.Screen name="Accueil" component={Accueil} />
              <Stack.Screen name="FilmDetail" component={FilmDetail} />
            </>
          ) : (
            <>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
