import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  StatusBar,
} from 'react-native';
import Nav from '../screens/Nav'; // Ajusta la ruta si es necesario

const lugares = [
  { id: '1', nombre: 'Entrada', descripcion: 'Acceso principal al campus', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Entrada.jpg?raw=true' },
  { id: '2', nombre: 'Cafetería', descripcion: 'Zona de alimentos y descanso', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Cafeteria.jpg?raw=true' },
  { id: '3', nombre: 'Biblioteca', descripcion: 'Centro de recursos académicos', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Biblioteca.jpg?raw=true' },
  { id: '4', nombre: 'Auditorio', descripcion: 'Eventos, conferencias y presentaciones', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Auditorio.jpeg?raw=true' },
  { id: '5', nombre: 'Enfermería', descripcion: 'Atención médica para estudiantes', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Enfermeria.jpg?raw=true' },
  { id: '6', nombre: 'Edificio K', descripcion: 'Tecnologías de Automatización', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/k.png?raw=true' },
  { id: '7', nombre: 'Edificio J', descripcion: 'Laboratorios Mecatrónica', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/J.png?raw=true' },
  { id: '8', nombre: 'Edificio I', descripcion: 'Laboratorio Informática', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/I.png?raw=true' },
  { id: '9', nombre: 'Servicios Escolares', descripcion: 'Trámites estudiantiles', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/servicios.jpeg?raw=true' },
  { id: '10', nombre: 'Rectoría', descripcion: 'Oficinas de rectoría', imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Rectoria.png?raw=true' },
];

export default function MenuRutas({ navigation }) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 30) / 2;
  const [menuVisible, setMenuVisible] = useState(false);

  // Datos de usuario simulados
  const nombreUsuario = 'Prueba';
  const fotoPerfil = 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true';

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

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingTop: 110, // Espacio para que no choque con el Nav
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0077b6',
    textAlign: 'center',
    marginBottom: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  nombre: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#023e8a',
    marginTop: 8,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
});
