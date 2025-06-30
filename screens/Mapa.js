import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Nav from './Nav';

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function AlertModal({ visible, onClose, message, width }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.alertOverlay} onPress={onClose}>
        <View style={[styles.alertBox, { width: width * 0.85 }]}>
          <Text style={styles.alertText}>{message}</Text>
          <Pressable onPress={onClose} style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

export default function Mapa({ route }) {
  const navigation = useNavigation();
  const { lugar } = route.params || { lugar: { nombre: 'Entrada', descripcion: '' } };
  const [menuVisible, setMenuVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { width } = useWindowDimensions();

  const coordenadas = {
    Entrada: { latitude: 20.6532215, longitude: -100.4040249 },
    Cafetería: { latitude: 20.6547432, longitude: -100.4050059 },
    Biblioteca: { latitude: 20.6549264, longitude: -100.4040045 },
    Auditorio: { latitude: 20.6560881, longitude: -100.4060255 },
    Enfermería: { latitude: 20.65512, longitude: -100.40517 },
    'Edificio K': { latitude: 20.6543228, longitude: -100.4046271 },
    'Edificio J': { latitude: 20.6551951, longitude: -100.4054715 },
    'Edificio I': { latitude: 20.6549085, longitude: -100.4044235 },
    'Servicios Escolares': { latitude: 20.6540485, longitude: -100.4060981 },
    Rectoría: { latitude: 20.6543096, longitude: -100.4054418 },
  };

  const entrada = coordenadas['Entrada'];
  const destino = coordenadas[lugar?.nombre] || entrada;

  const distancia = calcularDistancia(
    entrada.latitude,
    entrada.longitude,
    destino.latitude,
    destino.longitude
  );

  const infoRuta = `Inicio: Entrada → Fin: ${lugar.nombre}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: (entrada.latitude + destino.latitude) / 2,
            longitude: (entrada.longitude + destino.longitude) / 2,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={entrada}
            title="Entrada"
            description="Punto de inicio"
            pinColor="#2ecc71"
          />
          <Marker
            coordinate={destino}
            title={lugar.nombre}
            description={lugar.descripcion}
            pinColor="#e74c3c"
          />
          <Polyline
            coordinates={[entrada, destino]}
            strokeColor="#34495e"
            strokeWidth={5}
            lineCap="round"
            lineJoin="round"
          />
        </MapView>

        {/* Nav encima del mapa */}
        <Nav
          infoRuta={infoRuta}
          distancia={distancia}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          nombreUsuario={'Prueba'}
          fotoPerfil={'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true'}
        />

        {/* Modal alerta */}
        <AlertModal
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
          message={alertMessage}
          width={width}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  container: {
    flex: 1,
    position: 'relative', // para posicionar el Nav absoluto
  },
  mapa: {
    flex: 1,
  },
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.28)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  alertBox: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 18,
    alignItems: 'center',
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 16,
  },
  alertText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#34495e',
    fontWeight: '700',
    textAlign: 'center',
  },
  alertButton: {
    backgroundColor: '#dfe6e9',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  alertButtonText: {
    color: '#34495e',
    fontWeight: '800',
    fontSize: 17,
  },
});
