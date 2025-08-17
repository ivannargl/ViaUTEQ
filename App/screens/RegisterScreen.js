import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,Modal,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/registerStyles';
import { API_URL } from '../services/apiConfig';

export default function RegisterScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [modalInfo, setModalInfo] = useState({ visible: false, message: '', success: false });

  const showAlert = (message, success = false) => {
    setModalInfo({ visible: true, message, success });
  };

  const validateCorreo = (correo) => {
    const correoRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return correoRegex.test(correo);
  };

  const validateContrasena = (contrasena) => {
    const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return contrasenaRegex.test(contrasena);
  };

  const hasSQLInjection = (input) => {
    const pattern = /('|--|;|=|\/\*|\*\/|xp_)/i;
    return pattern.test(input);
  };

  const handleRegister = async() => {
    if (!validateCorreo(correo)) {
      showAlert('Introduce un correo electrónico válido.');
      return;
    }

    if (!validateContrasena(contrasena)) {
      showAlert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.');
      return;
    }

    if (hasSQLInjection(correo) || hasSQLInjection(contrasena)) {
      showAlert('Entrada sospechosa detectada. Revisa tu información.');
      return;
    }

    try {
    const response = await fetch(`${API_URL}/registro/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo: correo,
        contrasena: contrasena,
      }),
    });
    console.log('Response status:', response.status);
    const data = await response.json();

    if (response.ok) {
      showAlert('Registro exitoso', true);
      setTimeout(() => {
        setModalInfo({ visible: false, message: '', success: false });
        navigation.navigate('Login');
      }, 1500);
    } else {
      showAlert(data.error || 'No se pudo registrar el usuario.');
    }
  } catch (error) {
    console.log(contrasena, correo);
    console.error('Error en el registro:', error);
    showAlert('Error de conexión. Intenta más tarde.');
  }
};


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Carrito2.png' }}
          style={styles.logo}
        />
      </TouchableOpacity>

      <View style={styles.card}>
        <Ionicons name="person-add-outline" size={40} color="#0077b6" style={styles.icon} />
        <Text style={styles.title}>Registro</Text>

        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          keyboardType="correo-address"
          placeholderTextColor="#0077b6"
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#0077b6"
          value={contrasena}
          onChangeText={setContrasena}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Crear cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalInfo.visible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            {modalInfo.success ? (
              <Ionicons name="checkmark-circle-outline" size={50} color="#2e7d32" />
            ) : (
              <Ionicons name="alert-circle-outline" size={50} color="#d00000" />
            )}
            <Text style={styles.alertText}>{modalInfo.message}</Text>
            <TouchableOpacity
              style={[styles.alertButton, modalInfo.success ? styles.successButton : null]}
              onPress={() => setModalInfo({ ...modalInfo, visible: false })}
            >
              <Text style={styles.alertButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}