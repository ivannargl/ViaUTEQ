import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';   
import RegisterScreen from './screens/RegisterScreen';
import MenuRutas from './screens/MenuRutas'; 
import HomeScreen from './screens/HomeScreen';        
import Mapa from './screens/Mapa';
import Perfil from './screens/Perfil';
import Nav from './screens/Nav';
import InicioAdm from './screens/Admin/InicioAdm';
import Rutas from './screens/Admin/Rutas';
import Ubicacion from './screens/Admin/Ubicacion';
import Bateria from './screens/Admin/Bateria';
import Usuarios from './screens/Admin/Usuarios';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MenuRutas" component={MenuRutas} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen name="InicioAdm" component={InicioAdm} />
        <Stack.Screen name="Rutas" component={Rutas} />
        <Stack.Screen name="Ubicacion" component={Ubicacion} />
        <Stack.Screen name="Bateria" component={Bateria} />
        <Stack.Screen name="Usuarios" component={Usuarios} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
