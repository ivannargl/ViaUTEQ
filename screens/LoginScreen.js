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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showErrorAlert = (message) => {
    setErrorMsg(message);
    setShowErrorModal(true);
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
    const injectionPattern = /('|--|;|=|\/\*|\*\/|xp_)/i;
    return injectionPattern.test(input);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      showErrorAlert('Introduce un correo electrónico válido.');
      return;
    }

    if (!validatePassword(password)) {
      showErrorAlert(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.'
      );
      return;
    }

    if (hasSQLInjection(email) || hasSQLInjection(password)) {
      showErrorAlert('Entrada sospechosa detectada. Revisa tu información.');
      return;
    }

    // Simulación de credenciales
    const mockEmail = 'p@uteq.edu.mx';
    const mockPassword = 'Admin123*';

    if (email !== mockEmail || password !== mockPassword) {
      showErrorAlert('Correo o contraseña incorrecta.');
      return;
    }

    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      navigation.navigate('MenuRutas');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Carrito2.png',
          }}
          style={styles.logo}
        />
      </TouchableOpacity>

      <View style={styles.card}>
        <Ionicons name="log-in-outline" size={40} color="#0077b6" style={styles.icon} />
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          keyboardType="email-address"
          placeholderTextColor="#0077b6"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        {/* Contenedor para input de contraseña + icono */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            style={styles.passwordInput}
            placeholderTextColor="#0077b6"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#0077b6"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de error */}
      <Modal transparent visible={showErrorModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Ionicons name="alert-circle-outline" size={40} color="#d00000" />
            <Text style={styles.alertText}>{errorMsg}</Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => setShowErrorModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.alertButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de éxito */}
      <Modal transparent visible={showSuccessModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={60} color="#28a745" />
            <Text style={styles.successText}>Inicio de sesión exitoso</Text>
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
    borderRadius: 15,
    backgroundColor: '#ffffffcc',
    padding: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#e0f7fa',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#0077b6',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#0077b6',
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#00b4d8',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  link: {
    marginTop: 18,
    color: '#0077b6',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#d00000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  alertText: {
    marginTop: 18,
    fontSize: 17,
    color: '#333',
    textAlign: 'center',
  },
  alertButton: {
    marginTop: 25,
    backgroundColor: '#0077b6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  alertButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  successBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  successText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#28a745',
  },
});
