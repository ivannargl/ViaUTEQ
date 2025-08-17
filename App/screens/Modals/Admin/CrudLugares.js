import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import styles from '../../../styles/crudlugarStyles';
import { API_URL } from '../../../services/apiConfig';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAXt2ksAlCGr8mGvVt-fi3GAG3cs0McqEM';

function CrudLugares({ visible, onClose }) {
  const [lugares, setLugares] = useState([]);
  const [selectedLugar, setSelectedLugar] = useState(null);
  const [nuevo, setNuevo] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 20.5888,
    longitude: -100.3899,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería para seleccionar una imagen.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setForm((prev) => ({
        ...prev,
        image_URL: selectedImage.uri, // Solo para mostrar, no se guarda en la BD directamente
      }));
    }
  };

  const [form, setForm] = useState({
    nombre: '',
    latitud: 20.5888,
    longitud: -100.3899,
    image_URL: ''
  });

  // Obtener todos los lugares
  const fetchLugares = async () => {
    try {
      const res = await axios.get(`${API_URL}/lugares`);
      setLugares(res.data);
    } catch (error) {
      console.error('Error al obtener lugares:', error);
      Alert.alert('Error', 'No se pudieron cargar los lugares');
    }
  };

  // Seleccionar un lugar para ver o editar
  const handleSelectLugar = (lugar) => {
    setSelectedLugar(lugar);
    const lat = parseFloat(lugar.latitud) || 20.5888;
    const lng = parseFloat(lugar.longitud) || -100.3899;

    setForm({
      nombre: lugar.nombre || '',
      latitud: lat,
      longitud: lng,
      image_URL: lugar.image_URL || ''
    });

    setMapRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });

    setNuevo(false);
  };

  // Agregar o actualizar lugar
  const handleSaveLugar = async () => {
    if (!form.nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('nombre', form.nombre);
      formData.append('latitud', form.latitud);
      formData.append('longitud', form.longitud);

      if (form.image_URL && form.image_URL.startsWith('file://')) {
        // Solo si es una imagen nueva del dispositivo
        formData.append('imagen', {
          uri: form.image_URL,
          name: 'imagen.jpg',
          type: 'image/jpeg'
        });
      } else {
        // Para PUT, si no se cambia la imagen
        formData.append('image_URL', form.image_URL);
      }

      if (nuevo) {
        const res = await axios.post(`${API_URL}/lugares`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Alert.alert('Éxito', res.data.message);
      } else if (selectedLugar) {
        const res = await axios.put(`${API_URL}/lugares/${selectedLugar.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Alert.alert('Éxito', res.data.message);
      }

      fetchLugares();
      resetForm();
      setSelectedLugar(null);
      setNuevo(false);

    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el lugar');
      console.error('Error al guardar lugar:', error);
    }
  };


  // Eliminar lugar
  const handleDeleteLugar = async () => {
    if (!selectedLugar) return;

    Alert.alert(
      'Confirmar',
      `¿Estás seguro de eliminar "${selectedLugar.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/lugares/${selectedLugar.id}`);
              Alert.alert('Éxito', 'Lugar eliminado correctamente');
              fetchLugares();
              setSelectedLugar(null);
              resetForm();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el lugar');
              console.error('Error al eliminar lugar:', error);
            }
          }
        }
      ]
    );
  };

  // Mover marcador y actualizar ubicación
  const handleMarkerDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log('Nueva ubicación:', latitude, longitude);
    setForm((prev) => ({
      ...prev,
      latitud: parseFloat(latitude.toFixed(7)),
      longitud: parseFloat(longitude.toFixed(7))
    }));
  };

  // Resetear formulario
  const resetForm = () => {
    setForm({
      nombre: '',
      latitud: 20.5888,
      longitud: -100.3899,
      image_URL: ''
    });
  };

  // Crear un nuevo lugar
  const handleNuevoLugar = () => {
    const defaultLat = 20.5888;
    const defaultLng = -100.3899;

    setForm({
      nombre: '',
      latitud: defaultLat,
      longitud: defaultLng,
      image_URL: ''
    });

    setMapRegion({
      latitude: defaultLat,
      longitude: defaultLng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });

    setSelectedLugar(null);
    setNuevo(true);
  };

  // Cancelar edición/creación
  const handleCancelar = () => {
    setSelectedLugar(null);
    setNuevo(false);
    resetForm();
  };

  useEffect(() => {
    if (visible) {
      fetchLugares();
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { padding: 10, flex: 1 }]}>
        {/* Header con título y botón cerrar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Gestión de Lugares</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#ff6b6b' }}>✖️</Text>
          </TouchableOpacity>
        </View>

        {/* Botón para agregar lugar */}
        <TouchableOpacity onPress={handleNuevoLugar} style={styles.button}>
          <Text style={styles.buttonText}>➕ Agregar Nuevo Lugar</Text>
        </TouchableOpacity>

        {/* Lista de lugares */}
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>
          Lugares Existentes ({lugares.length})
        </Text>

        <ScrollView style={{ maxHeight: 200, marginBottom: 20 }}>
          {lugares.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#666', padding: 20 }}>
              No hay lugares registrados
            </Text>
          ) : (
            lugares.map((lugar) => (
              <TouchableOpacity
                key={lugar.id}
                style={[
                  styles.card,
                  {
                    padding: 15,
                    marginBottom: 10,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: selectedLugar?.id === lugar.id ? '#007bff' : '#ddd',
                    backgroundColor: selectedLugar?.id === lugar.id ? '#e3f2fd' : '#fff'
                  }
                ]}
                onPress={() => handleSelectLugar(lugar)}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{lugar.nombre}</Text>

                {lugar.image_URL && (
                  <Text style={{ color: '#007bff', marginTop: 5 }} numberOfLines={1}>
                    📷 {lugar.image_URL}
                  </Text>
                )}
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Formulario y mapa */}
        {(selectedLugar || nuevo) && (
          <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 10, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 15 }}>
                {nuevo ? '📝 Agregar Lugar' : '✏️ Editar Lugar'}
              </Text>

              <TextInput
                style={[styles.input, { marginBottom: 10 }]}
                placeholder="Nombre del lugar *"
                value={form.nombre}
                onChangeText={(text) => setForm({ ...form, nombre: text })}
              />

              <TouchableOpacity onPress={pickImage} style={[styles.button, { backgroundColor: '#17a2b8', marginBottom: 10 }]}>
                <Text style={styles.buttonText}>Seleccionar Imagen</Text>
              </TouchableOpacity>

              {form.image_URL ? (
                <Image source={{ uri: form.image_URL }} style={{ width: '100%', height: 200, borderRadius: 8, marginBottom: 10 }} />
              ) : null}




              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>Latitud</Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Latitud"
                    value={form.latitud.toString()}
                    onChangeText={(text) => {
                      const lat = parseFloat(text);
                      if (!isNaN(lat) && lat >= -90 && lat <= 90) {
                        setForm({ ...form, latitud: lat });
                      }
                    }}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#666', marginBottom: 5 }}>Longitud</Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder="Longitud"
                    value={form.longitud.toString()}
                    onChangeText={(text) => {
                      const lng = parseFloat(text);
                      if (!isNaN(lng) && lng >= -180 && lng <= 180) {
                        setForm({ ...form, longitud: lng });
                      }
                    }}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Mapa */}
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
                📍 Ubicación (arrastra el marcador para cambiar)
              </Text>

              <MapView
                style={{ width: '100%', height: 250, borderRadius: 8 }}
                region={mapRegion}
                onRegionChangeComplete={setMapRegion}
                scrollEnabled={true}
                zoomEnabled={true}
                pitchEnabled={true}
                rotateEnabled={true}
                onError={(err) => {
                  console.error('Error en MapView:', err);
                }}
              >
                <Marker
                  coordinate={{
                    latitude: form.latitud,
                    longitude: form.longitud
                  }}
                  draggable={true}
                  onDragStart={() => {
                    console.log('Iniciando arrastre del marcador');
                  }}
                  onDrag={(e) => {
                    console.log('Arrastrando marcador:', e.nativeEvent.coordinate);
                  }}
                  onDragEnd={handleMarkerDrag}
                  title={form.nombre || 'Nuevo lugar'}
                  description="Arrastra para cambiar ubicación"
                />
              </MapView>

              {/* Botones de acción */}
              <View style={{ flexDirection: 'row', marginTop: 20, gap: 10 }}>
                <TouchableOpacity
                  onPress={handleSaveLugar}
                  style={[styles.button, { flex: 1, backgroundColor: '#28a745' }]}
                >
                  <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>

                {!nuevo && (
                  <TouchableOpacity
                    onPress={handleDeleteLugar}
                    style={[styles.button, { flex: 1, backgroundColor: '#dc3545' }]}
                  >
                    <Text style={styles.buttonText}>Eliminar</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={handleCancelar}
                  style={[styles.button, { flex: 1, backgroundColor: '#6c757d' }]}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

export default CrudLugares;