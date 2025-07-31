import React from 'react';
import {View, Text, TouchableOpacity, Modal,Pressable,Platform,Image,useWindowDimensions} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles/navStyles';

export default function Nav({
  infoRuta,
  distancia,
  menuVisible,
  setMenuVisible,
  nombreUsuario,
  fotoPerfil,
}) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const navigation = useNavigation();
  const route = useRoute();

  const esPantallaMapa = route.name === 'Mapa';

  const manejarOpcionMenu = (opcion) => {
    setMenuVisible(false);
    switch (opcion) {
      case 'Editar perfil':
        navigation.navigate('Perfil');
        break;
      case 'Cerrar sesión':
        navigation.navigate('HomeScreen');
        break;
      case 'Menú':
        navigation.navigate('MenuRutas');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <View
        style={[
          styles.navContainer,
          {
            paddingHorizontal: isTablet ? 30 : width * 0.06,
            height: isTablet ? 90 : 75,
            maxWidth: isTablet ? 720 : '100%',
            justifyContent: 'center',
          },
        ]}
      >
        {/* Fila superior: foto, nombre y menú */}
        <View style={[styles.navTopRow, { justifyContent: 'space-between' }]}>
          <View style={styles.userInfoContainer}>
            <Image
              source={
                fotoPerfil
                  ? { uri: fotoPerfil }
                  : { uri: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/default-profile.jpg?raw=true' }
              }
              style={[
                styles.profileImage,
                { width: isTablet ? 42 : 36, height: isTablet ? 42 : 36 },
              ]}
            />
            <Text style={[styles.nombreUsuario, { fontSize: isTablet ? 18 : 16 }]}>
              {nombreUsuario}
            </Text>
          </View>

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

        {/* Info ruta y distancia (solo en pantalla Mapa) */}
        {esPantallaMapa && (
          <>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.infoRutaText,
                {
                  fontSize: isTablet ? 18 : 15,
                  marginTop: 6,
                  textAlign: 'center',
                },
              ]}
            >
              {infoRuta}
            </Text>
            <View style={styles.distanciaRow}>
              <Text style={[styles.distanciaText, { fontSize: isTablet ? 16 : 14 }]}>
                Distancia: <Text style={{ fontWeight: '700' }}>{distancia} m</Text>
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Modal menú */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={[styles.modalView, { width: isTablet ? 420 : width * 0.9 }]}>
            {[
              { icon: 'logout', text: 'Cerrar sesión' },
              { icon: 'edit', text: 'Editar perfil' },
              { icon: 'menu', text: 'Menú' },
            ].map(({ icon, text }) => (
              <TouchableOpacity
                key={text}
                style={styles.menuItem}
                onPress={() => manejarOpcionMenu(text)}
                activeOpacity={0.75}
              >
                <MaterialIcons name={icon} size={24} color="#34495e" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>{text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}