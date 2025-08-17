import React, { useState, useContext, useEffect, useCallback } from 'react';
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
import Nav from '../Client/Nav';
import { AuthContext } from '../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importing the modals
import CrudRutas from '../Modals/Admin/CrudRutas';
import CrudUsuarios from '../Modals/Admin/CrudUsuarios';
import CrudLugares from '../Modals/Admin/CrudLugares';
import { Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const InicioAdm = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalRutasVisible, setModalRutasVisible] = useState(false);
  const [modalUsuariosVisible, setModalUsuariosVisible] = useState(false);
  const [modalLugaresVisible, setModalLugaresVisible] = useState(false);

  const handleRutas = () => setModalRutasVisible(true);
  const handleConsultarUbicacion = () => setModalLugaresVisible(true);
  const handleConsultarBateria = () => { };
  const handleLlamarHome = () => { };
  const handleUsuarios = () => setModalUsuariosVisible(true);

  const screenWidth = Dimensions.get('window').width;
  const buttonWidth = (screenWidth - 100) / 2;
  const { usuario } = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState('Usuario');
  const [fotoPerfil, setFotoPerfil] = useState(
    'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true'
  );

  const navigation = useNavigation();


  //Cragar usario desde AsyncStorage
  useFocusEffect(
  useCallback(() => {
    const verificarSesion = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem('usuario');
        if (!usuarioGuardado) {
          Alert.alert(
            'Sesión cerrada',
            'Debes iniciar sesión para acceder a esta pantalla.',
            [
              {
                text: 'Ir al login',
                onPress: () => navigation.replace('LoginScreen'),
              },
            ],
            { cancelable: false }
          );
        } else {
          const usuario = JSON.parse(usuarioGuardado);
          setNombreUsuario(usuario.nombre || 'Usuario');
          setFotoPerfil(
            usuario.foto_url ||
            'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true'
          );
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      }
    };

    verificarSesion();
  }, [])
);


  return (
    <SafeAreaView style={styles.container}>
      <Nav
        nombreUsuario={nombreUsuario}
        fotoPerfil={fotoPerfil}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>al panel de administrador de</Text>
        <Text style={styles.highlight}>via uteq</Text>

        <View style={styles.buttonsGrid}>
          {/* Abrir modal CrudRutas */}
          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleRutas}>
            <Ionicons name="map-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Rutas</Text>
          </TouchableOpacity>
          {/* Abrir modal CrudLugares */}
          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleConsultarUbicacion}>
            <Ionicons name="location-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Ubicación</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleConsultarBateria}>
            <Ionicons name="battery-half-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Batería</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleLlamarHome}>
            <Ionicons name="call-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Llamar</Text>
          </TouchableOpacity> */}
          {/* Abrir modal CrudUsuarios */}
          <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={handleUsuarios}>
            <Ionicons name="people-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Usuarios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CrudRutas visible={modalRutasVisible} onClose={() => setModalRutasVisible(false)} />
      <CrudUsuarios visible={modalUsuariosVisible} onClose={() => setModalUsuariosVisible(false)} />
      <CrudLugares visible={modalLugaresVisible} onClose={() => setModalLugaresVisible(false)} />
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
