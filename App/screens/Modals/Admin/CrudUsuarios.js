import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import styles from '../../../styles/cruduserStyles';
import { API_URL } from '../../../services/apiConfig';

function CrudUsuarios({ visible, onClose }) {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipo, setTipo] = useState('user');
  const [activo, setActivo] = useState(1);
  const [editandoId, setEditandoId] = useState(null);

  // Obtener todos los usuarios
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    if (visible) {
      obtenerUsuarios();
    }
  }, [visible]);

  const guardarUsuario = async () => {
    if (!nombre || !apellido || !correo || !contrasena) {
      return Alert.alert('Error', 'Todos los campos son obligatorios.');
    }

    try {
      if (editandoId) {
        // Actualizar usuario
        await axios.put(`${API_URL}/editarUsuario/${editandoId}`, {
          nombre,
          apellido,
          correo,
          contrasena,
          foto_url: '', // o elimina este campo si no lo usas
        });
        Alert.alert('Éxito', 'Usuario actualizado.');
      } else {
        // Crear usuario
        await axios.post(`${API_URL}/altaUsuario`, {
          nombre,
          apellido,
          correo,
          contrasena,
          tipo,
          activo,
        });
        Alert.alert('Éxito', 'Usuario creado.');
      }

      limpiarFormulario();
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setApellido('');
    setCorreo('');
    setContrasena('');
    setTipo('user');
    setActivo(1);
    setEditandoId(null);
  };

  const editarUsuario = (usuario) => {
    setEditandoId(usuario.id);
    setNombre(usuario.nombre);
    setApellido(usuario.apellido);
    setCorreo(usuario.correo);
    setContrasena(usuario.contrasena);
  };

  const eliminarUsuario = async (id) => {
    Alert.alert('Confirmar', '¿Seguro que deseas eliminar este usuario?', [
      { text: 'Cancelar' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/usuario/${id}`);
            Alert.alert('Eliminado', 'Usuario eliminado.');
            obtenerUsuarios();
          } catch (error) {
            console.error('Error al eliminar usuario:', error);
          }
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>{editandoId ? 'Editar Usuario' : 'Agregar Usuario'}</Text>

          <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
          <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} style={styles.input} />
          <TextInput placeholder="Correo" value={correo} onChangeText={setCorreo} style={styles.input} />
          <TextInput placeholder="Contraseña" value={contrasena} onChangeText={setContrasena} style={styles.input} secureTextEntry />

          {!editandoId && (
            <>
              <Picker selectedValue={tipo} onValueChange={(itemValue) => setTipo(itemValue)} style={styles.input}>
                <Picker.Item label="Usuario" value="user" />
                <Picker.Item label="Administrador" value="admin" />
              </Picker>

              <Picker selectedValue={activo} onValueChange={(itemValue) => setActivo(itemValue)} style={styles.input}>
                <Picker.Item label="Activo" value={1} />
                <Picker.Item label="Inactivo" value={0} />
              </Picker>
            </>
          )}

          <TouchableOpacity onPress={guardarUsuario} style={styles.botonPrimario}>
            <Text style={styles.botonTexto}>{editandoId ? 'Actualizar' : 'Registrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={limpiarFormulario} style={styles.botonSecundario}>
            <Text style={styles.botonTexto}>Limpiar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.botonCerrar}>
            <Text style={styles.botonTexto}>Cerrar</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Lista de Usuarios</Text>
          {usuarios.map((u) => (
            <View key={u.id} style={styles.usuarioItem}>
              <Text>{u.nombre} {u.apellido} ({u.correo})</Text>
              <View style={styles.accionesUsuario}>
                <TouchableOpacity onPress={() => editarUsuario(u)} style={styles.botonAccion}>
                  <Text>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => eliminarUsuario(u.id)} style={styles.botonAccion}>
                  <Text>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

export default CrudUsuarios;
