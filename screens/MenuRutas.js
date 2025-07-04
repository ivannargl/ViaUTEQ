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
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener esta librería instalada

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
  const [busqueda, setBusqueda] = useState('');

  const lugaresFiltrados = lugares.filter((lugar) =>
    lugar.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.fullScreen}>
      <View style={styles.header}>
        <Text style={styles.title}>¿A dónde deseas ir?</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="person-circle-outline" size={30} color="#0077b6" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Buscar edificio..."
            placeholderTextColor="#999"
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

        {lugaresFiltrados.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Ionicons name="alert-circle-outline" size={50} color="#999" />
            <Text style={styles.noDisponible}>Edificio no disponible</Text>
          </View>
        ) : (
          <FlatList
            data={lugaresFiltrados}
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
        )}
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
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077b6',
    textAlign: 'center',
  },
  loginButton: {
    position: 'absolute',
    right: 15,
    top: 22,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
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
  noResultContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  noDisponible: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
