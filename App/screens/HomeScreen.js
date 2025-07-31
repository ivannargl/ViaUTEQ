import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/homeStyles';

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#0077b6', '#00b4d8']}
      style={styles.container}
    >
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/Carrito2.png'
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>VíaUTEQ</Text>
      <Text style={styles.subtitle}>Tu app de transporte inteligente</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Ionicons name="log-in-outline" size={22} color="#0077b6" />
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
        <Ionicons name="person-add-outline" size={22} color="#fff" />
        <Text style={styles.registerText}>Regístrate</Text>
      </TouchableOpacity>

      <StatusBar style="light" />
    </LinearGradient>
  );
}


 