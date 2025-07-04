import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


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
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.card}>
        <View style={styles.photoContainer}>
          <Image
            source={
              fotoUri
                ? { uri: fotoUri }
                : { uri: 'https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/default-profile.jpg?raw=true' }
            }
            style={styles.photo}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.photoButton} onPress={pickImage} activeOpacity={0.8}>
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
            placeholderTextColor="#a0a0a0"
            keyboardAppearance="light"
            autoCapitalize="words"
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
            placeholderTextColor="#a0a0a0"
            autoCapitalize="none"
            keyboardAppearance="light"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGuardar} activeOpacity={0.9}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 25,
    backgroundColor: '#eaf4f4',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#14213d',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ccc',
    borderWidth: 3,
    borderColor: '#0077b6',
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  photoButton: {
    marginTop: 14,
    backgroundColor: '#0077b6',
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 25,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 7,
  },
  photoButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.4,
  },
  formGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    color: '#14213d',
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#0077b6',
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#219ebc',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#219ebc',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 9,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
});