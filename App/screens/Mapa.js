import React, { useState, useEffect } from 'react';
import {View,Text,Modal,Pressable,SafeAreaView,useWindowDimensions,ActivityIndicator, Animated} from 'react-native';
import { API_URL } from '../services/apiConfig';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Nav from './Nav';
import { ref, onValue } from 'firebase/database';
import { database } from '../services/FirebaseConfig';
import MapViewDirections from 'react-native-maps-directions';
import styles from './styles/styles';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAFIvqUXlqzOqOzWFIIGii7fn-WMUg19Z8';

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

// Componente de carga mejorado
function LoadingScreen({ message = "Preparando tu ruta..." }) {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#34495e" style={{ marginBottom: 20 }} />
      <Text style={styles.loadingText}>{message}{dots}</Text>
      <Text style={[styles.loadingText, { fontSize: 14, marginTop: 8, opacity: 0.7 }]}>
        Esto tomará solo unos segundos
      </Text>
    </View>
  );
}

// Modal de alerta mejorado con animaciones
function AlertModal({ visible, onClose, message, type = 'info' }) {
  const scaleValue = new Animated.Value(0);
  
  useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [visible]);

  const getIconAndColor = () => {
    switch (type) {
      case 'error':
        return { icon: '⚠️', color: '#e74c3c' };
      case 'success':
        return { icon: '✅', color: '#27ae60' };
      case 'warning':
        return { icon: '⚡', color: '#f39c12' };
      default:
        return { icon: 'ℹ️', color: '#3498db' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.alertOverlay} onPress={onClose}>
        <Animated.View style={[styles.alertBox, { transform: [{ scale: scaleValue }] }]}>
          <Text style={{ fontSize: 32, marginBottom: 16 }}>{icon}</Text>
          <Text style={[styles.alertText, { color }]}>{message}</Text>
          <Pressable style={[styles.alertButton, { backgroundColor: color }]} onPress={onClose}>
            <Text style={[styles.alertButtonText, { color: 'white' }]}>Entendido</Text>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

// Componente de estado del carrito
function CarritoStatus({ carritoPosition, destino }) {
  const [isConnected, setIsConnected] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    setIsConnected(!!carritoPosition);
    
    if (carritoPosition && destino) {
      // Estimación básica: 1 metro por segundo de velocidad promedio
      const distance = calcularDistancia(
        carritoPosition.latitude,
        carritoPosition.longitude,
        destino.latitud,
        destino.longitud
      );
      const timeMinutes = Math.ceil(distance / 60); // Aprox 1 m/s = 60 m/min
      setEstimatedTime(timeMinutes);
    }
  }, [carritoPosition, destino]);

  return (
    <View style={styles.carritoStatusContainer}>
      <View style={[styles.statusIndicator, { backgroundColor: isConnected ? '#27ae60' : '#e74c3c' }]} />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.carritoStatusTitle}>
          {isConnected ? '🚐 Carrito conectado' : '🚫 Carrito desconectado'}
        </Text>
        {isConnected && estimatedTime && (
          <Text style={styles.carritoStatusSubtitle}>
            Tiempo estimado: ~{estimatedTime} min
          </Text>
        )}
      </View>
    </View>
  );
}

export default function Mapa({ route }) {
  const navigation = useNavigation();
  const { lugar } = route.params || {};
  const [menuVisible, setMenuVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [carritoPosition, setCarritoPosition] = useState(null);
  const [entrada, setEntrada] = useState(null);
  const [destino, setDestino] = useState(null);
  const [ruta, setRuta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Preparando tu ruta...');
  const [mapReady, setMapReady] = useState(false);
  const { width } = useWindowDimensions();

  // Función para mostrar alertas mejoradas
  const showAlert = (message, type = 'info') => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  // Obtener entrada (id fija = 1)
  useEffect(() => {
    const obtenerPuntos = async () => {
      try {
        setLoadingMessage('Obteniendo puntos de referencia...');
        
        const resEntrada = await fetch(`${API_URL}/lugares/1`);
        const entradaData = await resEntrada.json();

        if (!entradaData) throw new Error('Entrada no encontrada');

        const entradaParsed = {
          id: entradaData.id,
          latitud: parseFloat(entradaData.latitud),
          longitud: parseFloat(entradaData.longitud),
        };

        const destinoParsed = {
          id: lugar.id,
          latitud: parseFloat(lugar.latitud),
          longitud: parseFloat(lugar.longitud),
        };

        setEntrada(entradaParsed);
        setDestino(destinoParsed);
      } catch (err) {
        console.error('Error al obtener puntos:', err);
        showAlert('No se pudieron cargar los puntos de referencia. Verifica tu conexión.', 'error');
        setIsLoading(false);
      }
    };

    if (lugar) {
      obtenerPuntos();
    }
  }, [lugar]);

  // Obtener ruta entre entrada y destino
  useEffect(() => {
    const ObtenerRuta = async () => {
      try {
        setLoadingMessage('Calculando la mejor ruta...');
        
        console.log('Entrada:', entrada);
        console.log('Destino:', destino);

        const getRuta = await fetch(`${API_URL}/caminos/${entrada.id}/${destino.id}`);
        console.log('URL llamada:', `${API_URL}/caminos/${entrada.id}/${destino.id}`);

        if (!getRuta.ok) throw new Error('Ruta no encontrada');
        const rutaData = await getRuta.json();

        if (Array.isArray(rutaData)) {
          const rutaParsed = rutaData.map((punto) => ({
            latitude: parseFloat(punto.latitude),
            longitude: parseFloat(punto.longitude),
          }));
          setRuta(rutaParsed);
          console.log('Ruta procesada en frontend:', rutaParsed);
          
          // Pequeño delay para mejor UX
          setTimeout(() => {
            setIsLoading(false);
            showAlert(`¡Ruta calculada exitosamente hacia ${lugar.nombre}!`, 'success');
          }, 800);
        }
      } catch (err) {
        console.error('Error al obtener ruta:', err);
        setIsLoading(false);
        showAlert('No se pudo calcular la ruta. Inténtalo más tarde.', 'error');
      }
    };

    if (entrada?.id && destino?.id) {
      ObtenerRuta();
    }
  }, [entrada, destino, lugar.nombre]);

  // Posición del carrito (Firebase) con mejor manejo de estados
  useEffect(() => {
    setLoadingMessage('Conectando con el carrito...');
    
    const carritoRef = ref(database, 'carrito');
    const unsubscribe = onValue(carritoRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.latitude && data?.longitude) {
        setCarritoPosition({
          latitude: data.latitude,
          longitude: data.longitude,
        });
        
        // Solo mostrar alerta si el carrito se reconecta después de estar desconectado
        if (!carritoPosition) {
          showAlert('¡Carrito conectado! Ya puedes ver su ubicación en tiempo real.', 'success');
        }
      } else {
        const wasConnected = !!carritoPosition;
        setCarritoPosition(null);
        
        if (wasConnected) {
          showAlert('El carrito se ha desconectado temporalmente. Reintentando...', 'warning');
        }
      }
    }, (error) => {
      console.error('Error conectando con Firebase:', error);
      showAlert('Error de conexión. Verifica tu internet.', 'error');
    });
    
    return () => unsubscribe();
  }, []);

  // Manejo de errores de carga
  if (isLoading) {
    return <LoadingScreen message={loadingMessage} />;
  }

  if (!entrada || !destino) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No se pudieron cargar los datos necesarios
        </Text>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver atrás</Text>
        </Pressable>
      </View>
    );
  }

  const distancia = calcularDistancia(
    entrada.latitud,
    entrada.longitud,
    destino.latitud,
    destino.longitud
  );

  const infoRuta = `Desde la Entrada hasta ${lugar.nombre} (${distancia} m)`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: (entrada.latitud + destino.latitud) / 2,
            longitude: (entrada.longitud + destino.longitud) / 2,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          showsUserLocation
          showsMyLocationButton
          onMapReady={() => setMapReady(true)}
          loadingEnabled
          loadingIndicatorColor="#34495e"
          loadingBackgroundColor="#fdfdfd"
        >
          {/* Marcador de entrada con descripción mejorada */}
          <Marker 
            coordinate={{ latitude: entrada.latitud, longitude: entrada.longitud }} 
            title="🚪 Punto de Inicio" 
            description="Entrada principal del campus"
            pinColor="#2ecc71" 
          />
          
          {/* Marcador de destino con descripción mejorada */}
          <Marker 
            coordinate={{ latitude: destino.latitud, longitude: destino.longitud }} 
            title={`📍 ${lugar.nombre}`}
            description="Tu destino seleccionado"
            pinColor="#e74c3c" 
          />
          
          {/* Ruta principal */}
          {ruta.length > 0 && (
            <Polyline 
              coordinates={ruta} 
              strokeColor="#0477BF" 
              strokeWidth={5}
              lineDashPattern={[0]} // Línea sólida
            />
          )}

          {/* Carrito y ruta dinámica */}
          {carritoPosition && (
            <>
              <Marker 
                coordinate={carritoPosition} 
                title="🚐 Carrito ViaUTEQ" 
                description="Ubicación en tiempo real"
                pinColor="#1c3d53"
              />
              <MapViewDirections
                origin={carritoPosition}
                destination={{
                  latitude: destino.latitud,
                  longitude: destino.longitud,
                }}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="#1c3d53"
                lineDashPattern={[10, 5]} // Línea punteada para diferenciar
              />
            </>
          )}
        </MapView>

        {/* Estado del carrito */}
        <CarritoStatus carritoPosition={carritoPosition} destino={destino} />

        <Nav
          infoRuta={infoRuta}
          distancia={distancia}
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          nombreUsuario={'Prueba'}
          fotoPerfil={'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true'}
        />

        <AlertModal
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
          message={alertMessage}
          type={alertType}
        />
      </View>
    </SafeAreaView>
  );
}