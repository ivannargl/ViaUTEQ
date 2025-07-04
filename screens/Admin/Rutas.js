import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Nav from '../Nav';

const rutasIniciales = [
  {
    id: '1',
    edificio: 'Entrada',
    descripcion: 'Acceso principal al campus',
    latitud: '20.6532215',
    longitud: '-100.4040249',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Entrada.jpg?raw=true',
  },
  {
    id: '2',
    edificio: 'Cafetería',
    descripcion: 'Zona de alimentos y descanso',
    latitud: '20.6547432',
    longitud: '-100.4050059',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Cafeteria.jpg?raw=true',
  },
  {
    id: '3',
    edificio: 'Biblioteca',
    descripcion: 'Centro de recursos académicos',
    latitud: '20.6549264',
    longitud: '-100.4040045',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Biblioteca.jpg?raw=true',
  },
  {
    id: '4',
    edificio: 'Auditorio',
    descripcion: 'Eventos, conferencias y presentaciones',
    latitud: '20.6560881',
    longitud: '-100.4060255',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Auditorio.jpeg?raw=true',
  },
  {
    id: '5',
    edificio: 'Enfermería',
    descripcion: 'Atención médica para estudiantes',
    latitud: '20.65512',
    longitud: '-100.40517',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Enfermeria.jpg?raw=true',
  },
  {
    id: '6',
    edificio: 'Edificio K',
    descripcion: 'Tecnologías de Automatización',
    latitud: '20.6543228',
    longitud: '-100.4046271',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/k.png?raw=true',
  },
  {
    id: '7',
    edificio: 'Edificio J',
    descripcion: 'Laboratorios Mecatrónica',
    latitud: '20.6551951',
    longitud: '-100.4054715',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/J.png?raw=true',
  },
  {
    id: '8',
    edificio: 'Edificio I',
    descripcion: 'Laboratorio Informática',
    latitud: '20.6549085',
    longitud: '-100.4044235',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/I.png?raw=true',
  },
  {
    id: '9',
    edificio: 'Servicios Escolares',
    descripcion: 'Trámites estudiantiles',
    latitud: '20.6540485',
    longitud: '-100.4060981',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/servicios.jpeg?raw=true',
  },
  {
    id: '10',
    edificio: 'Rectoría',
    descripcion: 'Oficinas de rectoría',
    latitud: '20.6543096',
    longitud: '-100.4054418',
    imagen: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Rectoria.png?raw=true',
  },
];

const Rutas = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [rutas, setRutas] = useState(rutasIniciales);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);
  const [edificio, setEdificio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [imagen, setImagen] = useState('');

  const abrirModalAgregar = () => {
    setEditMode(false);
    setEdificio('');
    setDescripcion('');
    setLatitud('');
    setLongitud('');
    setImagen('');
    setModalVisible(true);
  };

  const abrirModalEditar = (ruta) => {
    setEditMode(true);
    setRutaSeleccionada(ruta);
    setEdificio(ruta.edificio);
    setDescripcion(ruta.descripcion || '');
    setLatitud(ruta.latitud || '');
    setLongitud(ruta.longitud || '');
    setImagen(ruta.imagen);
    setModalVisible(true);
  };

  const guardarRuta = () => {
    if (!edificio || !descripcion || !latitud || !longitud || !imagen) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (editMode) {
      setRutas((prev) =>
        prev.map((r) =>
          r.id === rutaSeleccionada.id
            ? { ...r, edificio, descripcion, latitud, longitud, imagen }
            : r
        )
      );
    } else {
      const nuevaRuta = {
        id: Date.now().toString(),
        edificio,
        descripcion,
        latitud,
        longitud,
        imagen,
      };
      setRutas((prev) => [...prev, nuevaRuta]);
    }
    setModalVisible(false);
  };

  const eliminarRuta = (id) => {
    Alert.alert('Confirmar', '¿Eliminar esta ruta?', [
      { text: 'Cancelar' },
      {
        text: 'Eliminar',
        onPress: () => {
          setRutas((prev) => prev.filter((r) => r.id !== id));
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Nav
        nombreUsuario="Administrador"
        fotoPerfil="https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true"
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        tipoUsuario={1}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Gestión de Rutas</Text>

        <TouchableOpacity style={styles.addButton} onPress={abrirModalAgregar} activeOpacity={0.7}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
          <Text style={styles.addButtonText}>Agregar Ruta</Text>
        </TouchableOpacity>

        <ScrollView style={{ width: '100%' }}>
          {rutas.length === 0 ? (
            <Text style={styles.noRutasText}>No hay rutas disponibles</Text>
          ) : (
            rutas.map((ruta) => (
              <View key={ruta.id} style={styles.card}>
                <Image source={{ uri: ruta.imagen }} style={styles.imagen} />
                <View style={styles.info}>
                  <Text style={styles.edificio}>{ruta.edificio}</Text>
                  <Text style={styles.descripcion}>{ruta.descripcion}</Text>
                  <Text style={styles.coords}>Lat: {ruta.latitud}</Text>
                  <Text style={styles.coords}>Lng: {ruta.longitud}</Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => abrirModalEditar(ruta)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="create-outline" size={24} color="#219ebc" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => eliminarRuta(ruta.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={24} color="#e63946" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{editMode ? 'Editar Ruta' : 'Agregar Ruta'}</Text>

              <TextInput
                placeholder="Nombre del edificio"
                value={edificio}
                onChangeText={setEdificio}
                style={styles.input}
              />
              <TextInput
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                style={styles.input}
              />
              <TextInput
                placeholder="Latitud"
                value={latitud}
                onChangeText={setLatitud}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Longitud"
                value={longitud}
                onChangeText={setLongitud}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="URL de la imagen"
                value={imagen}
                onChangeText={setImagen}
                style={styles.input}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#219ebc' }]}
                  onPress={guardarRuta}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonText}>
                    {editMode ? 'Guardar cambios' : 'Agregar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#777' }]}
                  onPress={() => setModalVisible(false)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 130,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#219ebc',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#219ebc',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  noRutasText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 15,
    elevation: 4,
    padding: 12,
    alignItems: 'center',
  },
  imagen: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  edificio: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 5,
    color: '#023e8a',
  },
  descripcion: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 5,
    fontSize: 14,
  },
  coords: {
    fontSize: 12,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 25,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
    color: '#219ebc',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
    minWidth: 120,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Rutas;