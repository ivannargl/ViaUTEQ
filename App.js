import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';   
import RegisterScreen from './screens/RegisterScreen';
import MenuRutas from './screens/MenuRutas'; 
import HomeScreen from './screens/HomeScreen';        
import Mapa from './screens/Mapa'; // ✅ AÑADIDO AQUÍ

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MenuRutas" component={MenuRutas} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Mapa" component={Mapa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
