import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, useWindowDimensions, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../styles/perfilStyles';
import { API_URL } from '../../services/apiConfig';
import { AuthContext } from '../../AuthContext';

export default function EditarPerfil({ navigation }) {
  const { width } = useWindowDimensions();
  const { usuario } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState(''); 
  const [fotoUrl, setFotoUrl] = useState(null);

  

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la galería de imágenes.');
      }
    })();
  }, []);

  // Obtener datos del perfil del backend
  useEffect(() => {
    if (usuario?.id) {
      fetch(`${API_URL}/usuario/${usuario.id}`)
        .then((res) => res.json())
        .then((data) => {
          setNombre(data.nombre);  
          setApellido(data.apellido);     
          setCorreo(data.correo);
          setContrasena(data.contrasena);
          setConfirmarContrasena(data.contrasena);
          if (data.fotoUrl) setFotoUrl(data.fotoUrl || null);
        })
        .catch((err) => {
          console.error('Error al cargar perfil:', err);
        });
    }
  }, [usuario]);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoUrl(result.assets[0].uri);
    }
  };

  const handleGuardar = async () => {
    if (contrasena && contrasena !== confirmarContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    const datosActualizados = {
      nombre,
      apellido,
      correo,
      contrasena,
      foto_url: fotoUrl,
    };

    try {
      const response = await fetch(`${API_URL}/editarUsuario/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizados),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.error || 'No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el perfil');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.card}>
        <View style={styles.photoContainer}>
          <Image
            source={
              fotoUrl
                ? { uri: fotoUrl }
                : { uri: 'https://via.placeholder.com/120.png?text=Avatar' }
            }
            style={styles.photo}
          />
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Text style={styles.photoButtonText}>Cambiar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellido</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Apellido"
            placeholderTextColor="#aaa"
          />
        </View>


        <View style={styles.formGroup}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={contrasena}
            onChangeText={setContrasena}
            placeholder="Nueva contraseña (opcional)"
            secureTextEntry
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            style={styles.input}
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
            placeholder="Confirmar contraseña"
            secureTextEntry
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}