import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function Mapa({ route }) {
  const { lugar } = route.params;

  const coordenadas = {
    'Entrada': { latitude: 20.6532215, longitude: -100.4040249 },
    'Cafetería': { latitude: 20.6547432, longitude: -100.4050059 },
    'Biblioteca': { latitude: 20.6549264, longitude: -100.4040045 },
    'Auditorio': { latitude: 20.6560881, longitude: -100.4060255 },
    'Enfermería': { latitude: 20.655120, longitude: -100.405170 },
    'Edificio K': { latitude: 20.6543228, longitude: -100.4046271 },
    'Edificio J': { latitude: 20.6551951, longitude: -100.4054715 },
    'Edificio I': { latitude: 20.6549085, longitude: -100.4044235 },
    'Servicios Escolares': { latitude: 20.6540485, longitude: -100.4060981 },
    'Rectoría': { latitude: 20.6543096, longitude: -100.4054418 },
  };

  const entrada = coordenadas['Entrada'];
  const destino = coordenadas[lugar.nombre] || entrada;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapa}
        initialRegion={{
          latitude: (entrada.latitude + destino.latitude) / 2,
          longitude: (entrada.longitude + destino.longitude) / 2,
          latitudeDelta: 0.002,
          longitudeDelta: 0.002,
        }}
      >
        {/* Marcador de entrada */}
        <Marker
          coordinate={entrada}
          title="Entrada"
          description="Punto de inicio"
          pinColor="green"
        />

        {/* Marcador del destino */}
        <Marker
          coordinate={destino}
          title={lugar.nombre}
          description={lugar.descripcion}
          pinColor="red"
        />

        {/* Ruta entre entrada y destino */}
        <Polyline
          coordinates={[entrada, destino]}
          strokeColor="#0077b6"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa: {
    flex: 1,
  },
});
