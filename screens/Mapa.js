import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  SafeAreaView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

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
          <TouchableOpacity onPress={onClose} style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

export default function Mapa({ route }) {
  const { lugar } = route.params || { lugar: { nombre: 'Entrada', descripcion: '' } };
  const [menuVisible, setMenuVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

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

  function mostrarAlerta(mensaje) {
    setAlertMessage(mensaje);
    setAlertVisible(true);
    setMenuVisible(false);
  }

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

        {/* NAV */}
        <View
          style={[
            styles.navContainer,
            {
              paddingHorizontal: isTablet ? 30 : width * 0.06,
              height: isTablet ? 75 : 65,
              maxWidth: isTablet ? 720 : '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            },
          ]}
        >
          <View style={styles.navTopRow}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.infoRutaText,
                { maxWidth: isTablet ? width * 0.68 : width * 0.58, fontSize: isTablet ? 19 : 16 },
              ]}
            >
              {infoRuta}
            </Text>

            <TouchableOpacity
              style={[
                styles.menuButton,
                { padding: isTablet ? 15 : 12, borderRadius: isTablet ? 15 : 13 },
              ]}
              onPress={() => setMenuVisible(true)}
              activeOpacity={0.75}
              accessibilityLabel="Abrir menú"
            >
              <FontAwesome name="bars" size={isTablet ? 32 : 28} color="#34495e" />
            </TouchableOpacity>
          </View>

          <View style={styles.distanciaRow}>
            <Text style={[styles.distanciaText, { fontSize: isTablet ? 16 : 14 }]}>
              Distancia: <Text style={{ fontWeight: '700' }}>{distancia} m</Text>
            </Text>
          </View>
        </View>

        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
            <View style={[styles.modalView, { width: isTablet ? 420 : width * 0.9 }]}>
              {[
                { icon: 'logout', text: 'Cerrar sesión', alert: 'Has cerrado sesión correctamente.' },
                { icon: 'edit', text: 'Editar perfil', alert: 'Aquí puedes editar tu perfil.' },
                { icon: 'menu', text: 'Menú', alert: 'Accede al menú principal.' },
              ].map(({ icon, text, alert }) => (
                <TouchableOpacity
                  key={text}
                  style={styles.menuItem}
                  onPress={() => mostrarAlerta(alert)}
                  activeOpacity={0.75}
                >
                  <MaterialIcons name={icon} size={24} color="#34495e" style={styles.menuIcon} />
                  <Text style={styles.menuItemText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>

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
  container: { flex: 1 },
  mapa: { flex: 1 },

  navContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 35,
    left: 10,
    right: 10,
    backgroundColor: '#E1E1E1',
    borderRadius: 18,
    paddingVertical: 10,

    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 15000,
  },

  navTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  infoRutaText: {
    fontWeight: '700',
    color: '#34495e',
  },

  distanciaRow: {
    borderTopColor: '#ecf0f1',
    borderTopWidth: 1,
    paddingTop: 4,
    alignItems: 'center',
    addingBottom: 9,
  },

  distanciaText: {
    color: '#34495e',
    fontWeight: '600',
    textAlign: "center",
  },

  menuButton: {
    backgroundColor: '#dfe6e9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 95 : 75,
    paddingHorizontal: 30,
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 14,
    alignSelf: 'center',
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 1,
  },

  menuIcon: {
    marginRight: 18,
  },

  menuItemText: {
    fontSize: 19,
    color: '#34495e',
    fontWeight: '700',
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
