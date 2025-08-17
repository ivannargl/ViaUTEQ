import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';   
import RegisterScreen from './screens/RegisterScreen';
import MenuRutas from './screens/Client/MenuRutas'; 
import HomeScreen from './screens/HomeScreen';        
import Mapa from './screens/Client/Mapa';
import Perfil from './screens/Client/Perfil';
import Nav from './screens/Client/Nav';
import InicioAdm from './screens/Admin/InicioAdm';
import { AuthProvider } from './AuthContext'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MenuRutas" component={MenuRutas} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen name="InicioAdm" component={InicioAdm} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
