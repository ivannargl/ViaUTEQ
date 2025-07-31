import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,Image,Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyles'; 

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

    // Solo cambié aquí para redirigir según usuario
    if (email.toLowerCase() === 'admin@uteq.edu.mx' && password === 'Admin123.') {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate('InicioAdm'); // Redirige a Admin
      }, 2000);
    } else if (email.toLowerCase() === 'usuario@uteq.edu.mx' && password === 'Usuario123.') {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate('MenuRutas'); // Redirige a Usuario
      }, 2000);
    } else {
      showErrorAlert('Correo o contraseña incorrecta.');
    }
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
