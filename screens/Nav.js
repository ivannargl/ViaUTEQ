import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Modal,
  Pressable,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const scaleSize = (size, min = 12, max = 24) => {
  const { width } = useWindowDimensions();
  const scaled = (size * width) / 375;
  return Math.min(Math.max(scaled, min), max);
};

export default function Nav({
  lugar,
  distancia,
  menuVisible,
  setMenuVisible,
  nombreUsuario,
  fotoPerfil,
  tipoUsuario = 0,
}) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const navigation = useNavigation();
  const route = useRoute();

  const esPantallaMapa = route.name === 'Mapa';
  const esPantallaInicioAdmin = route.name === 'InicioAdm';
  const esAdmin = tipoUsuario === 1;

  const manejarOpcionMenu = (opcion) => {
    setMenuVisible(false);
    switch (opcion) {
      case 'Cerrar sesión':
        navigation.navigate('HomeScreen');
        break;
      case 'Menú':
        navigation.navigate(esAdmin ? 'InicioAdm' : 'MenuRutas');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 15000 }}>
        {esPantallaMapa ? (
          <View
            style={[
              styles.navContainer,
              {
                paddingHorizontal: isTablet ? 36 : width * 0.06,
                height: isTablet ? 90 : 80,
                maxWidth: isTablet ? 720 : '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: Platform.OS === 'ios' ? 12 : 0,
              },
            ]}
          >
            <View style={styles.navTopRow}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.infoRutaText,
                  { maxWidth: isTablet ? width * 0.68 : width * 0.58, fontSize: isTablet ? 20 : 17 },
                ]}
              >
                Desde: Entrada  |  Hacia: {lugar?.nombre ?? 'Destino'}
              </Text>

              <TouchableOpacity
                style={[styles.menuButton, { padding: isTablet ? 16 : 12, borderRadius: isTablet ? 16 : 14 }]}
                onPress={() => navigation.navigate('MenuRutas')}
                activeOpacity={0.75}
                accessibilityLabel="Volver"
              >
                <MaterialIcons name="arrow-back" size={isTablet ? 32 : 28} color="#555" />
              </TouchableOpacity>
            </View>

            <View style={styles.distanciaRow}>
              <Text style={[styles.distanciaText, { fontSize: isTablet ? 19 : 16 }]}>
                Distancia: {distancia} m
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.navContainer,
              {
                paddingHorizontal: isTablet ? 36 : width * 0.06,
                height: isTablet ? 90 : 80,
                maxWidth: isTablet ? 720 : '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: Platform.OS === 'ios' ? 12 : 0,
              },
            ]}
          >
            <View style={[styles.navTopRow, { justifyContent: 'space-between' }]}>
              {/* Usuario (imagen y nombre) */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Perfil')}
                style={styles.userInfoContainer}
              >
                <Image
                  source={
                    fotoPerfil
                      ? { uri: fotoPerfil }
                      : {
                          uri:
                            'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/default-profile.jpg?raw=true',
                        }
                  }
                  style={[
                    styles.profileImage,
                    { width: isTablet ? 42 : 36, height: isTablet ? 42 : 36 },
                  ]}
                />
                <Text
                  style={[
                    styles.nombreUsuario,
                    { fontSize: scaleSize(isTablet ? 18 : 16, 14, 22), maxWidth: width * 0.4 },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {nombreUsuario}
                </Text>
              </TouchableOpacity>

              {/* Botón derecho según pantalla */}
              {esPantallaInicioAdmin ? (
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => navigation.navigate('HomeScreen')}
                >
                  <MaterialIcons name="logout" size={scaleSize(28)} color="#34495e" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => setMenuVisible(true)}
                >
                  <FontAwesome name="bars" size={scaleSize(28)} color="#34495e" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </SafeAreaView>

      {/* MODAL para otras pantallas (excepto Mapa y InicioAdmin) */}
      {!esPantallaInicioAdmin && !esPantallaMapa && (
        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
            <View style={[styles.modalView, { width: isTablet ? 420 : width * 0.9 }]}>
              {[
                { icon: 'menu', text: 'Menú' },
                { icon: 'logout', text: 'Cerrar sesión' },
              ].map(({ icon, text }) => (
                <TouchableOpacity
                  key={text}
                  style={styles.menuItem}
                  onPress={() => manejarOpcionMenu(text)}
                  activeOpacity={0.75}
                >
                  <MaterialIcons
                    name={icon}
                    size={scaleSize(24, 20, 28)}
                    color="#34495e"
                    style={styles.menuIcon}
                  />
                  <Text style={[styles.menuItemText, { fontSize: scaleSize(19, 16, 22) }]}>{text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 55 : 30,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  navTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '70%',
  },
  profileImage: {
    borderRadius: 100,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  nombreUsuario: {
    fontWeight: '700',
    color: '#34495e',
  },
  infoRutaText: {
    fontWeight: '700',
    color: '#34495e',
    flexShrink: 1,
  },
  distanciaRow: {
    alignItems: 'center',
    paddingTop: 4,
  },
  distanciaText: {
    color: '#34495e',
    fontWeight: '600',
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: '#dfe6e9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
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
    fontWeight: '700',
    color: '#34495e',
  },
});
