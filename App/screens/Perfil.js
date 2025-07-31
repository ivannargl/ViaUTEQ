import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,useWindowDimensions,ScrollView,Image,Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles/perfilStyles';

export default function EditarPerfil({ navigation }) {
  const { width } = useWindowDimensions();
  const [nombre, setNombre] = useState('prueba');
  const [correo, setCorreo] = useState('prueba@example.com');
  const [fotoUri, setFotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la galería de imágenes.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const handleGuardar = () => {
    console.log('Perfil actualizado:', { nombre, correo, fotoUri });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.card}>
        <View style={styles.photoContainer}>
          <Image
            source={
              fotoUri
                ? { uri: fotoUri }
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
            placeholder="Nombre completo"
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

        <TouchableOpacity style={styles.button} onPress={handleGuardar}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}