import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Nav from '../Nav';

const InicioAdm = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleRutas = () => {};
  const handleConsultarUbicacion = () => {};
  const handleConsultarBateria = () => {};
  const handleLlamarHome = () => {};
  const handleUsuarios = () => {};

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth - 100) / 2;

  return (
    <SafeAreaView style={styles.container}>
      <Nav
        nombreUsuario="Administrador"
        fotoPerfil="https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true"
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>al panel de administrador de</Text>
        <Text style={styles.highlight}>via uteq</Text>

        <View style={styles.buttonsGrid}>
          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleRutas}>
            <Ionicons name="map-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Rutas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleConsultarUbicacion}>
            <Ionicons name="location-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Ubicación</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleConsultarBateria}>
            <Ionicons name="battery-half-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Batería</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleLlamarHome}>
            <Ionicons name="call-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Llamar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleUsuarios}>
            <Ionicons name="people-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Usuarios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
  },
  highlight: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 30,
    color: '#219ebc',
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#219ebc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    margin: 10,
    elevation: 2,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default InicioAdm;
