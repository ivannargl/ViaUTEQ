import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, useWindowDimensions, Platform, StatusBar } from 'react-native';
import { API_URL } from '../../services/apiConfig';
import Nav from './Nav';
import styles from '../../styles/menuStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MenuRutas({ navigation }) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 30) / 2;
  const [menuVisible, setMenuVisible] = useState(false);

  const [nombreUsuario, setNombreUsuario] = useState('Usuario');
  const [fotoPerfil, setFotoPerfil] = useState(
    'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true'
  );

  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Cragar usario desde AsyncStorage
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const usuarioGuardado = await AsyncStorage.getItem('usuario');
        if (usuarioGuardado) {
          const usuario = JSON.parse(usuarioGuardado);
          setNombreUsuario(usuario.nombre || 'Usuario');
          setFotoPerfil(
            usuario.foto_url ||
            'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true'
          );
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      }
    };

    cargarUsuario();
  }, []);

  //Llamar a la API para obtener los lugares
  useEffect(() => {
    const fetchLugares = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/lugares`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setLugares(data);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar lugares:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLugares();
  }, []);
  if (loading) {
    return <Text>Cargando lugares...</Text>;
  }
  return (
    <View style={styles.fullScreen}>
      {/* Nav flotante */}
      <Nav
        nombreUsuario={nombreUsuario}
        fotoPerfil={fotoPerfil}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
      />

      {/* Contenido debajo del Nav */}
      <View style={styles.container}>
        <Text style={styles.title}>¿A dónde deseas ir?</Text>
        <FlatList
          data={lugares}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { width: itemWidth }]}
              onPress={() => navigation.navigate('Mapa', { lugar: item })}
            >
              <Image
                source={{
                  uri: typeof item.image_URL === 'string' 
                    ? item.image_URL.replace('localhost', '10.13.4.40') 
                    : 'https://via.placeholder.com/150' 
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

