import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 125,
    height: 125,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: '#ffffffaa',
    padding: 10,
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#0006',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#e0f7fa',
    marginBottom: 50,
    fontStyle: 'italic',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#0077b6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    borderColor: '#fff',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  registerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
