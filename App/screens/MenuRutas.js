import React, { useState, useEffect } from 'react';
import {View,Text,FlatList,Image,TouchableOpacity,useWindowDimensions,Platform,StatusBar} from 'react-native';
import { API_URL } from '../services/apiConfig';
import Nav from '../screens/Nav';
import styles from './styles/menuStyles';


export default function MenuRutas({ navigation }) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 30) / 2;
  const [menuVisible, setMenuVisible] = useState(false);

  // Datos de usuario simulados
  const nombreUsuario = 'Prueba';
  const fotoPerfil = 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true';
  
const [lugares, setLugares] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
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
                source={{ uri: item.imagen }}
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

