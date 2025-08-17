import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import styles from '../../../styles/crudrutaStyles';
import { API_URL } from '../../../services/apiConfig';

const CrudRutas = ({ visible, onClose }) => {
  const [lugares, setLugares] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);
  const [origenId, setOrigenId] = useState(null);
  const [destinoId, setDestinoId] = useState(null);
  const [nuevaRuta, setNuevaRuta] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);

  // Obtener lugares y rutas existentes
  useEffect(() => {
    if (visible) {
      axios.get(`${API_URL}/lugares`).then(res => setLugares(res.data));
      axios.get(`${API_URL}/caminos_rute`).then(res => setRutas(res.data));
    }
  }, [visible]);

  const agregarPuntoRuta = (e) => {
    const { coordinate } = e.nativeEvent;
    setNuevaRuta([...nuevaRuta, coordinate]);
  };

  const guardarRuta = async () => {
    if (!origenId || !destinoId || nuevaRuta.length === 0) {
      Alert.alert('Error', 'Selecciona origen, destino y marca puntos en el mapa.');
      return;
    }

    try {
      await axios.post(`${API_URL}/caminos`, {
        origenId,
        destinoId,
        ruta: nuevaRuta
      });
      Alert.alert('Éxito', 'Ruta agregada');
      setNuevaRuta([]);
      setOrigenId(null);
      setDestinoId(null);
      setRutaSeleccionada(null);
      setModoEdicion(false);
      axios.get(`${API_URL}/caminos_rute`).then(res => setRutas(res.data));
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo agregar la ruta');
    }
  };

  const eliminarRuta = async () => {
    if (!rutaSeleccionada) return;

    Alert.alert('Confirmar', '¿Deseas eliminar esta ruta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/caminos/${rutaSeleccionada.origen_id}/${rutaSeleccionada.destino_id}`);
            Alert.alert('Ruta eliminada');
            setRutaSeleccionada(null);
            axios.get(`${API_URL}/caminos_rute`).then(res => setRutas(res.data));
          } catch (err) {
            Alert.alert('Error al eliminar');
          }
        }
      }
    ]);
  };

  const actualizarRuta = async () => {
    if (!rutaSeleccionada || nuevaRuta.length === 0) return;

    try {
      await axios.put(`${API_URL}/caminos/${rutaSeleccionada.origen_id}/${rutaSeleccionada.destino_id}`, {
        ruta: nuevaRuta
      });
      Alert.alert('Ruta actualizada');
      setModoEdicion(false);
      setNuevaRuta([]);
      axios.get(`${API_URL}/caminos_rute`).then(res => setRutas(res.data));
    } catch (err) {
      Alert.alert('Error al actualizar');
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Gestión de Rutas</Text>

        {/* Selección de rutas existentes */}
        <ScrollView style={{ maxHeight: 100 }}>
          {rutas.map((ruta, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setRutaSeleccionada(ruta);
                setNuevaRuta(JSON.parse(ruta.ruta)); // decodificar puntos
                setModoEdicion(false);
              }}
            >
              <Text style={styles.listItem}>
                {ruta.origen_nombre} - {ruta.destino_nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Agregar nueva ruta */}
        <Text style={styles.subtitle}>Agregar Nueva Ruta</Text>
        <Picker selectedValue={origenId} onValueChange={setOrigenId}>
          <Picker.Item label="Selecciona Origen" value={null} />
          {lugares.map((l) => (
            <Picker.Item key={l.id} label={l.nombre} value={l.id} />
          ))}
        </Picker>

        <Picker selectedValue={destinoId} onValueChange={setDestinoId}>
          <Picker.Item label="Selecciona Destino" value={null} />
          {lugares.map((l) => (
            <Picker.Item key={l.id} label={l.nombre} value={l.id} />
          ))}
        </Picker>

        <MapView
          style={{ flex: 1, marginVertical: 10 }}
          initialRegion={{
            latitude: 20.5931,
            longitude: -100.3926,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={modoEdicion || (!rutaSeleccionada && origenId && destinoId) ? agregarPuntoRuta : undefined}
        >
          {/* Mostrar puntos actuales */}
          {nuevaRuta.map((p, i) => (
            <Marker key={i} coordinate={p} />
          ))}

          {/* Mostrar ruta seleccionada */}
          {nuevaRuta.length > 1 && (
            <Polyline coordinates={nuevaRuta} strokeWidth={4} />
          )}
        </MapView>

        {/* Botones */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={styles.button} onPress={guardarRuta}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>

          {rutaSeleccionada && (
            <>
              <TouchableOpacity style={styles.button} onPress={() => setModoEdicion(true)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonDanger} onPress={eliminarRuta}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>

              {modoEdicion && (
                <TouchableOpacity style={styles.button} onPress={actualizarRuta}>
                  <Text style={styles.buttonText}>Guardar Edición</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          <TouchableOpacity style={styles.buttonSecondary} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CrudRutas;
