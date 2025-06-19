import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalInfo, setModalInfo] = useState({ visible: false, message: '', success: false });

  const showAlert = (message, success = false) => {
    setModalInfo({ visible: true, message, success });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const hasSQLInjection = (input) => {
    const pattern = /('|--|;|=|\/\*|\*\/|xp_)/i;
    return pattern.test(input);
  };

  const handleRegister = () => {
    if (!validateEmail(email)) {
      showAlert('Introduce un correo electrónico válido.');
      return;
    }

    if (!validatePassword(password)) {
      showAlert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.');
      return;
    }

    if (hasSQLInjection(email) || hasSQLInjection(password)) {
      showAlert('Entrada sospechosa detectada. Revisa tu información.');
      return;
    }

    // Aquí iría el registro real (ej. enviar a API)
    showAlert('Registro exitoso', true);
    // navigation.navigate('Login');
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
          keyboardType="email-address"
          placeholderTextColor="#0077b6"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#0077b6"
          value={password}
          onChangeText={setPassword}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#caf0f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#ffffffaa',
    padding: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0077b6',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#e0f7fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#0077b6',
  },
  button: {
    backgroundColor: '#00b4d8',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 15,
    color: '#0077b6',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  alertText: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  alertButton: {
    marginTop: 20,
    backgroundColor: '#0077b6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  successButton: {
    backgroundColor: '#2e7d32',
  },
  alertButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
