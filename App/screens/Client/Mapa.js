import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, SafeAreaView, useWindowDimensions, ActivityIndicator, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { API_URL } from '../../services/apiConfig';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue, get, set } from 'firebase/database';
import { database } from '../../services/FirebaseConfig';
import MapViewDirections from 'react-native-maps-directions';
import styles from '../../styles/styles';
import ModalMenu from '../Modals/Client/ModalMenu';
import * as Location from 'expo-location';
import MapaWeb from './MapaWeb';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAXt2ksAlCGr8mGvVt-fi3GAG3cs0McqEM';

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


function decodePolyline(encoded) {
  let points = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
}

// Componente de carga 
function LoadingScreen({ message = "Preparando tu ruta..." }) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
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

// Modal de alerta con animaciones
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
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.alertOverlay} onPress={onClose}>
        <Animated.View style={[styles.alertBox, { transform: [{ scale: scaleValue }] }]}>
          <Text style={{ fontSize: 32, marginBottom: 16 }}>{icon}</Text>
          <Text style={[styles.alertText, { color }]}>{message}</Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

// Componente de estado del carrito corregido
function CarritoStatus({ carritoPosition, destino, onOpenModal }) {
  const [isConnected, setIsConnected] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    setIsConnected(!!carritoPosition);

    if (carritoPosition && destino) {
      const distance = calcularDistancia(
        carritoPosition.latitude,
        carritoPosition.longitude,
        destino.latitud,
        destino.longitud
      );
      const timeMinutes = Math.ceil(distance / 60);
      setEstimatedTime(timeMinutes);
    }
  }, [carritoPosition, destino]);

  return (
    <View style={styles.carritoStatusContainer}>
      <View style={[styles.statusIndicator, { backgroundColor: isConnected ? '#27ae60' : '#e74c3c' }]} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.carritoStatusTitle}>
          {isConnected ? '🚐 Carrito conectado' : '🚫 Carrito desconectado'}
        </Text>
        {isConnected && estimatedTime && (
          <Text style={styles.carritoStatusSubtitle}>
            Tiempo estimado: ~{estimatedTime} min
          </Text>
        )}
        {/* Debug info - puedes eliminar esto después */}
        {carritoPosition && (
          <Text style={[styles.carritoStatusSubtitle, { fontSize: 10, opacity: 0.6 }]}>
            Lat: {carritoPosition.latitude.toFixed(6)}, Lng: {carritoPosition.longitude.toFixed(6)}
          </Text>
        )}
      </View>
      <TouchableOpacity style={styles.changeRouteButton} onPress={onOpenModal}>
        <Text style={styles.changeRouteButtonText}>🔄 Cambiar Ruta</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Mapa({ route }) {
  const navigation = useNavigation();
  const { lugar } = route.params || {};
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

  const [modalMenuVisible, setModalMenuVisible] = useState(false);
  const [inicioSeleccionado, setInicioSeleccionado] = useState(null);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(null);
  const [lugaresDisponibles, setLugaresDisponibles] = useState([]);
  const [usarRutaGoogle, setUsarRutaGoogle] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  // Configuración de conexión a FIREBASE
  useEffect(() => {
    let unsubscribe = null;
    const setupFirebaseListener = async () => {
      try {
        console.log('🔗 Intentando conectar con Firebase...');
        //ruta especificada en la bd de firebase
        const carritoRef = ref(database, '1/carrito');

        // Probar conexión inicial
        try {
          const snapshot = await get(carritoRef);
          console.log('📊 Datos iniciales de Firebase:', snapshot.val());
        } catch (testError) {
          console.error('❌ Error en prueba inicial:', testError);
        }

        unsubscribe = onValue(carritoRef, (snapshot) => {
          console.log('🔄 Datos recibidos de Firebase:', snapshot.val());

          const data = snapshot.val();
          if (data && data.latitud && data.longitud) {
            console.log('✅ Posición del carrito actualizada:', {
              latitude: data.latitud,
              longitude: data.longitud,
              altitud: data.altitud
            });

            setCarritoPosition({
              latitude: data.latitud,
              longitude: data.longitud,
              altitud: data.altitud || null
            });
          } else {
            console.log('⚠️ Datos del carrito no válidos:', data);
            setCarritoPosition(null);
          }
        }, (error) => {
          console.error('❌ Error de Firebase:', error);
          showAlert(`Error de Firebase: ${error.message}`, 'error');
          setCarritoPosition(null);
        });

        console.log('✅ Listener de Firebase configurado exitosamente');

      } catch (error) {
        console.error('❌ Error al configurar Firebase:', error);
        showAlert(`Error al configurar Firebase: ${error.message}`, 'error');
        setCarritoPosition(null);
      }
    };

    setupFirebaseListener();

    return () => {
      if (unsubscribe) {
        console.log('🔌 Desconectando listener de Firebase');
        unsubscribe();
      }
    };
  }, []);

  // Función para enviar ubicación a Firebase
const enviarUbicacionFirebase = (latitude, longitude, altitude) => {
  const usuarioRef = ref(database, '1/usuario'); // nodo donde guardas ubicación del usuario
  set(usuarioRef, {
    latitud: latitude,
    longitud: longitude,
    altitud: altitude || 0
  })
  .then(() => {
    console.log('📍 Ubicación del usuario enviada a Firebase');
  })
  .catch((err) => {
    console.error('❌ Error al enviar ubicación:', err);
  });
};

// Sustituir el useEffect actual que obtiene ubicación del usuario
useEffect(() => {
  let locationSubscription;

  const startWatchingUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permiso de ubicación denegado');
      return;
    }

    locationSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // cada 5 segundos
        distanceInterval: 5 // cada 5 metros
      },
      (location) => {
        const { latitude, longitude, altitude } = location.coords;
        setUserLocation({ latitude, longitude, altitude });
        enviarUbicacionFirebase(latitude, longitude, altitude);
      }
    );
  };

  startWatchingUserLocation();

  return () => {
    if (locationSubscription) {
      locationSubscription.remove();
    }
  };
}, []);

  // Obtener ubicación del usuario
  useEffect(() => {
    const obtenerUbicacionUsuario = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permiso de ubicación denegado');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
      }
    };

    obtenerUbicacionUsuario();
  }, []);

  // Obtener lugares disponibles
  useEffect(() => {
    const obtenerLugares = async () => {
      try {
        const res = await fetch(`${API_URL}/lugares`);
        if (res.ok) {
          const data = await res.json();
          setLugaresDisponibles(data);
        }
      } catch (err) {
        console.error('Error al obtener lugares:', err);
      }
    };

    obtenerLugares();
  }, []);

  // Función para calcular nueva ruta
  const calcularNuevaRuta = async (inicioSelec, destinoSelec) => {
    try {
      setIsLoading(true);
      setLoadingMessage('Calculando nueva ruta...');

      const entradaParsed = {
        id: inicioSelec.id,
        latitud: parseFloat(inicioSelec.latitud),
        longitud: parseFloat(inicioSelec.longitud),
      };

      const destinoParsed = {
        id: destinoSelec.id,
        latitud: parseFloat(destinoSelec.latitud),
        longitud: parseFloat(destinoSelec.longitud),
      };

      setEntrada(entradaParsed);
      setDestino(destinoParsed);

      // Verificar si es la misma ubicación
      if (entradaParsed.id === destinoParsed.id) {
        setRuta([]);
        setUsarRutaGoogle(false);
        setIsLoading(false);
        showAlert('El punto de inicio y destino son iguales', 'warning');
        return;
      }

      // 1. Intentar ruta desde base de datos
      try {
        const getRuta = await fetch(`${API_URL}/caminos/${entradaParsed.id}/${destinoParsed.id}`);

        if (getRuta.ok) {
          const rutaData = await getRuta.json();
          if (Array.isArray(rutaData) && rutaData.length > 0) {
            const rutaParsed = rutaData.map((punto) => ({
              latitude: parseFloat(punto.latitude),
              longitude: parseFloat(punto.longitude),
            }));
            setRuta(rutaParsed);
            setUsarRutaGoogle(false);
            setTimeout(() => {
              setIsLoading(false);
              showAlert('Ruta desde la base de datos cargada con éxito', 'success');
            }, 800);
            return;
          }
        }
      } catch (rutaError) {
        // Si no hay ruta en BD, usar Google Maps
        console.log('Ruta no encontrada en BD, usando Google Maps Directions');
        setUsarRutaGoogle(true);

        // Obtener ruta desde Google Maps Directions API
        const googleRes = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${entrada.latitud},${entrada.longitud}&destination=${destino.latitud},${destino.longitud}&key=${GOOGLE_MAPS_APIKEY}`
        );
      }

      // 2. Si falla o no existe, usar Google Maps Directions
      // 2. Si falla o no existe, usar Google Maps Directions
      setUsarRutaGoogle(true);

      // Obtener ruta desde Google Maps Directions API
      const googleRes = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${entradaParsed.latitud},${entradaParsed.longitud}&destination=${destinoParsed.latitud},${destinoParsed.longitud}&key=${GOOGLE_MAPS_APIKEY}`
      );

      const googleData = await googleRes.json();
      if (googleData.routes.length > 0) {
        const points = decodePolyline(googleData.routes[0].overview_polyline.points);
        setRuta(points.map(([lat, lng]) => ({ latitude: lat, longitude: lng })));
      } else {
        console.error("No se encontró ruta en Google Maps");
      }

      setTimeout(() => {
        setIsLoading(false);
        showAlert('Ruta generada con Google Maps', 'success');
      }, 800);


    } catch (err) {
      console.error('Error al calcular ruta:', err);
      setIsLoading(false);
      showAlert('Error al calcular ruta. Intenta nuevamente.', 'error');
    }
  };

  // Obtener entrada (id fija = 1) y configurar destino
  useEffect(() => {
    const obtenerPuntos = async () => {
      try {
        setLoadingMessage('Obteniendo puntos de referencia...');

        const resEntrada = await fetch(`${API_URL}/lugares/1`);
        if (!resEntrada.ok) {
          throw new Error('No se pudo obtener el punto de entrada');
        }

        const entradaData = await resEntrada.json();

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

        console.log('Configurando entrada:', entradaParsed);
        console.log('Configurando destino:', destinoParsed);

        setEntrada(entradaParsed);
        setDestino(destinoParsed);

      } catch (err) {
        console.error('Error al obtener puntos:', err);
        setIsLoading(false);
        showAlert('No se pudieron cargar los puntos de referencia. Verifica tu conexión.', 'error');
      }
    };

    if (lugar) {
      obtenerPuntos();
    }
  }, [lugar]);

  //Debug temporal
  const testFirebaseManually = async () => {
  try {
    console.log('🔧 Prueba manual de Firebase...');
    
    const carritoRef = ref(database, 'carrito/1');
    const snapshot = await get(carritoRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('✅ Datos encontrados:', data);
      showAlert(`Datos Firebase: Lat ${data.latitud}, Lng ${data.longitud}`, 'success');
      
      // Actualizar manualmente para probar
      setCarritoPosition({
        latitude: data.latitud,
        longitude: data.longitud,
        altitud: data.altitud || null
      });
    } else {
      console.log('❌ No se encontraron datos');
      showAlert('No hay datos en Firebase', 'error');
    }
  } catch (error) {
    console.error('❌ Error en prueba manual:', error);
    showAlert(`Error: ${error.message}`, 'error');
  }
};

  // Obtener ruta entre entrada y destino
  useEffect(() => {
    const ObtenerRuta = async () => {
      if (!entrada?.id || !destino?.id) return;

      // Si el punto de entrada y destino son iguales
      if (entrada.id === destino.id) {
        setRuta([]);
        setUsarRutaGoogle(false);
        setIsLoading(false);
        showAlert('Ya estás en tu destino', 'info');
        return;
      }

      try {
        setLoadingMessage('Calculando la mejor ruta...');

        const getRuta = await fetch(`${API_URL}/caminos/${entrada.id}/${destino.id}`);

        if (getRuta.ok) {
          const rutaData = await getRuta.json();

          if (Array.isArray(rutaData) && rutaData.length > 0) {
            const rutaParsed = rutaData.map((punto) => ({
              latitude: parseFloat(punto.latitude),
              longitude: parseFloat(punto.longitude),
            }));
            setRuta(rutaParsed);
            setUsarRutaGoogle(false);

            setTimeout(() => {
              setIsLoading(false);
              showAlert('¡Ruta calculada exitosamente!', 'success');
            }, 800);
            return;
          }
        }

        // Si no hay ruta en BD, usar Google Maps
        console.log('Ruta no encontrada en BD, usando Google Maps Directions');
        setUsarRutaGoogle(true);
        setRuta([]);
        setTimeout(() => {
          setIsLoading(false);
          showAlert('Ruta generada con Google Maps', 'success');
        }, 800);

      } catch (err) {
        console.error('Error al obtener ruta:', err);
        // Fallback a Google Maps en caso de error
        setUsarRutaGoogle(true);
        setRuta([]);
        setTimeout(() => {
          setIsLoading(false);
          showAlert('Usando ruta alternativa de Google Maps', 'warning');
        }, 800);
      }
    };

    ObtenerRuta();
  }, [entrada, destino]);

  // Manejo mejorado de Firebase (sin mostrar errores hasta que esté configurado)
  //   useEffect(() => {
  //   let unsubscribe = null;

  //   const setupFirebaseListener = async () => {
  //     try {
  //       console.log('Intentando conectar con Firebase...');

  //       // Cambiar la referencia para que coincida con tu estructura JSON
  //       const carritoRef = ref(database, 'carrito/1'); // Específicamente el nodo "1"

  //       unsubscribe = onValue(carritoRef, (snapshot) => {
  //         console.log('Datos recibidos de Firebase:', snapshot.val());

  //         const data = snapshot.val();
  //         if (data && data.latitud && data.longitud) {
  //           console.log('Posición del carrito actualizada:', {
  //             latitude: data.latitud,
  //             longitude: data.longitud,
  //             altitud: data.altitud
  //           });

  //           setCarritoPosition({
  //             latitude: data.latitud,
  //             longitude: data.longitud,
  //             altitud: data.altitud || null
  //           });
  //         } else {
  //           console.log('Datos del carrito no válidos o inexistentes');
  //           setCarritoPosition(null);
  //         }
  //       }, (error) => {
  //         console.error('Error de Firebase:', error);
  //         // Mostrar el error específico para debugging
  //         showAlert(`Error de conexión Firebase: ${error.message}`, 'error');
  //         setCarritoPosition(null);
  //       });

  //       console.log('Listener de Firebase configurado exitosamente');

  //     } catch (error) {
  //       console.error('Error al configurar Firebase:', error);
  //       showAlert(`Error al configurar Firebase: ${error.message}`, 'error');
  //       setCarritoPosition(null);
  //     }
  //   };

  //   setupFirebaseListener();

  //   return () => {
  //     if (unsubscribe) {
  //       console.log('Desconectando listener de Firebase');
  //       unsubscribe();
  //     }
  //   };
  // }, []);

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

  const infoRuta = <Text style={styles.infoRuta}>Distancia Calculada: {distancia}m</Text>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MapaWeb
          entrada={entrada}
          destino={destino}
          ruta={ruta}
          carritoPosition={carritoPosition}
          userLocation={userLocation}
        />

        <Text style={styles.infoRuta}>
          {infoRuta}
        </Text>

        <CarritoStatus
          carritoPosition={carritoPosition}
          destino={destino}
          onOpenModal={() => setModalMenuVisible(true)}
        />
       

        <ModalMenu
          visible={modalMenuVisible}
          onClose={() => setModalMenuVisible(false)}
          lugaresDisponibles={lugaresDisponibles}
          inicioSeleccionado={inicioSeleccionado}
          setInicioSeleccionado={setInicioSeleccionado}
          destinoSeleccionado={destinoSeleccionado}
          setDestinoSeleccionado={setDestinoSeleccionado}
          onCalcularRuta={calcularNuevaRuta}
          showAlert={showAlert}
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