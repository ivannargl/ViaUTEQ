import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/loginStyles';
import { API_URL } from '../services/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showContrasena, setShowContrasena] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUsuario, setTipo } = useContext(AuthContext);

  const showErrorAlert = (message) => {
    setErrorMsg(message);
    setShowErrorModal(true);
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
    const injectionPattern = /('|--|;|=|\/\*|\*\/|xp_)/i;
    return injectionPattern.test(input);
  };

  // Función para intentar login como usuario
  const tryUserLogin = async (correo, contrasena) => {
    try {
      const response = await fetch(`${API_URL}/login/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          contrasena: contrasena,
        }),
      });


      // Verificar si la respuesta es JSON válida
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('Respuesta no es JSON:', textResponse);
        return { success: false, error: 'El servidor no respondió con JSON válido' };
      }

      const data = await response.json();

      if (response.ok) {
        return { success: true, usuario: data.usuario, tipo: 'user' };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error en login de usuario:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  };

  // Función para intentar login como admin
  const tryAdminLogin = async (correo, contrasena) => {
    try {
      
      const response = await fetch(`${API_URL}/login/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          contrasena: contrasena,
        }),
      });


      // Verificar si la respuesta es JSON válida
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('Respuesta no es JSON:', textResponse);
        return { success: false, error: 'El servidor no respondió con JSON válido' };
      }

      const data = await response.json();

      if (response.ok) {
        return { success: true, usuario: data.usuario, tipo: 'admin' };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Error en login de admin:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  };

  const handleLogin = async () => {
    // Validaciones básicas del frontend
    if (!correo.trim()) {
      showErrorAlert('Introduce un correo electrónico.');
      return;
    }

    if (!contrasena.trim()) {
      showErrorAlert('Introduce una contraseña.');
      return;
    }

     //Validación opcional de formato de correo (comentada para pruebas)
     if (!validateCorreo(correo)) {
       showErrorAlert('Introduce un correo electrónico válido.');
       return;
     }

     //Validación opcional de complejidad de contraseña (comentada para pruebas)
     if (!validateContrasena(contrasena)) {
       showErrorAlert(
         'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.'
       );
       return;
     }

    if (hasSQLInjection(correo) || hasSQLInjection(contrasena)) {
      showErrorAlert('Entrada sospechosa detectada. Revisa tu información.');
      return;
    }

    setIsLoading(true);

    try {
      // Primero intentar login como usuario
      const userResult = await tryUserLogin(correo, contrasena);
      
      if (userResult.success) {
        // Login exitoso como usuario
        await AsyncStorage.setItem('usuario', JSON.stringify(userResult.usuario));
        await AsyncStorage.setItem('tipo', userResult.tipo);
        console.log('Login exitoso como usuario:', userResult.usuario);

        await AsyncStorage.setItem('usuario', JSON.stringify(userResult.usuario));
        await AsyncStorage.setItem('tipo', userResult.tipo);

        setUsuario(userResult.usuario);
        setTipo(userResult.tipo);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.navigate('MenuRutas');
        }, 2000);
        return;
      }

      // Si falla como usuario, intentar como admin
      const adminResult = await tryAdminLogin(correo, contrasena);
      
      if (adminResult.success) {
        // Login exitoso como admin
        await AsyncStorage.setItem('usuario', JSON.stringify(adminResult.usuario));
        await AsyncStorage.setItem('tipo', adminResult.tipo);
        console.log('Login exitoso como admin:', adminResult.usuario);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigation.navigate('InicioAdm');
        }, 2000);
        return;
      }

      // Si ambos fallan, mostrar error
      showErrorAlert('Correo o contraseña incorrecta.');

    } catch (error) {
      console.error('Error general en login:', error);
      showErrorAlert('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
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
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
          editable={!isLoading}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Contraseña"
            style={styles.passwordInput}
            placeholderTextColor="#0077b6"
            secureTextEntry={!showContrasena}
            value={contrasena}
            onChangeText={setContrasena}
            autoCapitalize="none"
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={() => setShowContrasena(!showContrasena)}
            style={styles.eyeIcon}
            activeOpacity={0.7}
            disabled={isLoading}
          >
            <Ionicons
              name={showContrasena ? 'eye-off' : 'eye'}
              size={24}
              color="#0077b6"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.button, isLoading && { opacity: 0.6 }]} 
          onPress={handleLogin} 
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Iniciando sesión...' : 'Entrar'}
          </Text>
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