import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import Nav from '../Nav';

const Ubicacion = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const ubicacion = {
    latitude: 20.6539445,
    longitude: -100.4060938,
    latitudeDelta: 0.0015,
    longitudeDelta: 0.0015,
  };

  const screenWidth = Dimensions.get('window').width;
  const markerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(markerOpacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(markerOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleActualizar = () => {
    setModalVisible(true);
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

      <View style={[styles.content, { marginTop: 130, width: screenWidth - 40 }]}>
        <Text style={styles.title}>Ubicación del carrito</Text>
        <Text style={styles.subtitle}>Carrito actualmente en UTEQ</Text>

        <MapView
          style={styles.mapa}
          region={ubicacion}
          loadingEnabled={true}
          mapType="satellite"
        >
          <Marker coordinate={ubicacion} title="Carrito guía" description="Ubicado en la UTEQ">
            <Animated.View style={{ opacity: markerOpacity }}>
              <Ionicons name="location-sharp" size={36} color="red" />
            </Animated.View>
          </Marker>
        </MapView>

        <View style={styles.coordenadas}>
          <Text style={styles.coordText}>
            <Ionicons name="navigate-outline" size={18} color="#219ebc" /> Latitud: {ubicacion.latitude}
          </Text>
          <Text style={styles.coordText}>
            <Ionicons name="navigate-outline" size={18} color="#219ebc" /> Longitud: {ubicacion.longitude}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleActualizar}>
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Actualizar ubicación</Text>
        </TouchableOpacity>
      </View>

      {/* Modal lindo */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle-outline" size={60} color="#38b000" />
            <Text style={styles.modalTitle}>Ubicación actualizada</Text>
            <Text style={styles.modalMessage}>La ubicación fue actualizada correctamente (simulada).</Text>

            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#219ebc',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  mapa: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
  },
  coordenadas: {
    marginBottom: 25,
  },
  coordText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#219ebc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38b000',
    marginTop: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#38b000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Ubicacion;
