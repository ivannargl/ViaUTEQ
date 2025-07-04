import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Nav from '../Nav';

const Bateria = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [alertLevel, setAlertLevel] = useState(null); // 'red' | 'orange' | null

  const nivelBateria = 10; // Cambia para probar

  const fillAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const screenWidth = Dimensions.get('window').width;
  const batteryBarWidth = screenWidth - 100;

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: nivelBateria,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    if (nivelBateria <= 50) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      setModalVisible(true);
      setAlertLevel(nivelBateria <= 30 ? 'red' : 'orange');
    } else {
      setAlertLevel(null);
      setModalVisible(false);
    }
  }, [nivelBateria]);

  const fillWidth = fillAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, batteryBarWidth],
  });

  let colorBattery = '#4caf50';
  let iconName = 'battery-full';

  if (nivelBateria <= 30) {
    colorBattery = '#e63946'; // rojo
    iconName = 'warning';
  } else if (nivelBateria <= 70) {
    colorBattery = '#f4a261'; // naranja
    iconName = 'battery-half';
  }

  const handleActualizar = () => {
    setUpdateModalVisible(true);
    setTimeout(() => setUpdateModalVisible(false), 1800);
  };

  const alertTitles = {
    red: '¡Atención urgente!',
    orange: 'Nivel de batería medio',
  };

  const alertMessages = {
    red: 'El nivel de batería está muy bajo. Por favor, recarga pronto.',
    orange: 'El nivel de batería es medio. Considera recargar pronto.',
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
        <Text style={styles.title}>Nivel de batería</Text>
        <Text style={styles.subtitle}>Estado actual del carrito guía</Text>

        <View style={styles.batteryCard}>
          <Animated.View style={[styles.iconContainer, { transform: [{ scale: pulseAnim }] }]}>
            <Ionicons name={iconName} size={70} color={colorBattery} />
          </Animated.View>

          <View style={[styles.batteryBarContainer, { width: batteryBarWidth }]}>
            <Animated.View
              style={[
                styles.batteryBarFill,
                {
                  width: fillWidth,
                  backgroundColor: colorBattery,
                  shadowColor: colorBattery,
                  shadowOpacity: 0.7,
                  shadowRadius: 8,
                },
              ]}
            />
          </View>

          <Text style={[styles.batteryText, { color: colorBattery }]}>{nivelBateria}%</Text>
          <Text style={styles.estimateText}>Carga estimada</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleActualizar} activeOpacity={0.8}>
          <Ionicons name="refresh-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de batería baja o media */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContainer,
              alertLevel === 'red' ? styles.modalContainerRed : styles.modalContainerOrange,
            ]}
          >
            <Ionicons
              name="warning"
              size={50}
              color={alertLevel === 'red' ? '#e63946' : '#f4a261'}
            />
            <Text
              style={[
                styles.modalTitle,
                alertLevel === 'red' ? styles.modalTitleRed : styles.modalTitleOrange,
              ]}
            >
              {alertTitles[alertLevel]}
            </Text>
            <Text
              style={[
                styles.modalMessage,
                alertLevel === 'red' ? styles.modalMessageRed : styles.modalMessageOrange,
              ]}
            >
              {alertMessages[alertLevel]}
            </Text>
            <TouchableOpacity
              style={[
                styles.modalButton,
                alertLevel === 'red' ? styles.modalButtonRed : styles.modalButtonOrange,
              ]}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal actualización exitosa */}
      <Modal
        animationType="fade"
        transparent
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.updateModalBackground}>
          <View style={styles.updateModalContainer}>
            <Ionicons name="checkmark-circle" size={60} color="#fff" />
            <Text style={styles.updateModalText}>¡Actualizado con éxito!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#219ebc',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  batteryCard: { width: '100%', alignItems: 'center' },
  iconContainer: { marginBottom: 25 },
  batteryBarContainer: {
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  batteryBarFill: { height: '100%', borderRadius: 14, elevation: 8 },
  batteryText: { fontSize: 52, fontWeight: 'bold', marginBottom: 8 },
  estimateText: { fontSize: 16, color: '#888', fontWeight: '500' },
  button: {
    flexDirection: 'row',
    backgroundColor: '#219ebc',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 14,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: { marginLeft: 10, fontSize: 18, color: '#fff', fontWeight: '600' },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  modalContainerRed: {
    borderColor: '#e63946',
    borderWidth: 3,
  },
  modalContainerOrange: {
    borderColor: '#f4a261',
    borderWidth: 3,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  modalTitleRed: {
    color: '#e63946',
  },
  modalTitleOrange: {
    color: '#f4a261',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalMessageRed: {
    color: '#a00000',
  },
  modalMessageOrange: {
    color: '#a0522d',
  },
  modalButton: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 6,
  },
  modalButtonRed: {
    backgroundColor: '#e63946',
  },
  modalButtonOrange: {
    backgroundColor: '#f4a261',
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  updateModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateModalContainer: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#388e3c',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 25,
  },
  updateModalText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 15,
    letterSpacing: 0.7,
  },
});

export default Bateria;
