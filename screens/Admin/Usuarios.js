import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Nav from '../Nav'; 

const CustomAlert = ({ visible, title, message, onClose, onConfirm, confirmText = 'Aceptar', cancelText, onCancel }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.alertOverlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>

          <View style={styles.alertButtons}>
            {cancelText && (
              <TouchableOpacity style={[styles.alertButton, styles.alertCancelButton]} onPress={onCancel}>
                <Text style={styles.alertCancelText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.alertButton, styles.alertConfirmButton]} onPress={onConfirm}>
              <Text style={styles.alertConfirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Usuarios = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const [usuarios, setUsuarios] = useState([
    {
      id: '1',
      nombre: 'Juan Pérez',
      correo: 'juan.perez@email.com',
      imagen: 'https://randomuser.me/api/portraits/men/1.jpg',
      activo: true,
    },
    {
      id: '2',
      nombre: 'Ana Gómez',
      correo: 'ana.gomez@email.com',
      imagen: 'https://randomuser.me/api/portraits/women/2.jpg',
      activo: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState(null);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [imagen, setImagen] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    onConfirm: null,
    confirmText: 'Aceptar',
    cancelText: null,
    onCancel: null,
  });

  const abrirModal = (usuario = null) => {
    if (usuario) {
      setEditandoUsuario(usuario);
      setNombre(usuario.nombre);
      setCorreo(usuario.correo);
      setImagen(usuario.imagen);
    } else {
      setEditandoUsuario(null);
      setNombre('');
      setCorreo('');
      setImagen('');
    }
    setModalVisible(true);
  };

  const guardarUsuario = () => {
    if (!nombre.trim() || !correo.trim()) {
      setAlertData({
        title: 'Error',
        message: 'Nombre y correo son obligatorios',
        onConfirm: () => setAlertVisible(false),
        confirmText: 'Cerrar',
      });
      setAlertVisible(true);
      return;
    }

    if (editandoUsuario) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === editandoUsuario.id
            ? { ...u, nombre, correo, imagen }
            : u
        )
      );
    } else {
      const nuevo = {
        id: Date.now().toString(),
        nombre,
        correo,
        imagen: imagen || 'https://via.placeholder.com/100',
        activo: true,
      };
      setUsuarios((prev) => [...prev, nuevo]);
    }

    setModalVisible(false);
  };

  const eliminarUsuario = (id) => {
    setAlertData({
      title: 'Confirmar',
      message: '¿Deseas eliminar este usuario?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
        setAlertVisible(false);
      },
      onCancel: () => setAlertVisible(false),
    });
    setAlertVisible(true);
  };

  const toggleActivo = (id) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, activo: !u.activo } : u
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.usuarioItem}>
      <Image
        source={{ uri: item.imagen }}
        style={[styles.usuarioImagen, !item.activo && { opacity: 0.5 }]}
      />
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={[styles.usuarioNombre, !item.activo && { color: '#999' }]}>{item.nombre}</Text>
        <Text style={[styles.usuarioCorreo, !item.activo && { color: '#bbb' }]}>{item.correo}</Text>
      </View>

      <TouchableOpacity onPress={() => toggleActivo(item.id)} style={styles.statusIcon}>
        {item.activo ? (
          <Ionicons name="checkmark-circle" size={32} color="#4caf50" />
        ) : (
          <Ionicons name="close-circle" size={32} color="#f44336" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => abrirModal(item)} style={styles.iconButton}>
        <Ionicons name="pencil-outline" size={26} color="#219ebc" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => eliminarUsuario(item.id)} style={styles.iconButton}>
        <Ionicons name="trash-outline" size={26} color="red" />
      </TouchableOpacity>
    </View>
  );

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <Nav
        nombreUsuario="Administrador"
        fotoPerfil="https://raw.githubusercontent.com/FerRosas22/V-aUTEQ/main/profile.jpg?raw=true"
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        tipoUsuario={1}
      />

      <View style={[styles.content, { marginTop: 130, width: screenWidth - 40 }]}>
        <Text style={styles.title}>Usuarios</Text>
        <TouchableOpacity style={styles.agregarButton} onPress={() => abrirModal()}>
          <Ionicons name="add-circle-outline" size={28} color="#fff" />
          <Text style={styles.agregarText}>Agregar Usuario</Text>
        </TouchableOpacity>

        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color:'#555' }}>
              No hay usuarios registrados.
            </Text>
          }
          style={{ marginTop: 10 }}
        />
      </View>

      {/* Modal agregar/editar */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.modalTitle}>
                {editandoUsuario ? 'Editar Usuario' : 'Agregar Usuario'}
              </Text>

              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Nombre completo"
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.input}
                value={correo}
                onChangeText={setCorreo}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>URL Imagen (opcional)</Text>
              <TextInput
                style={styles.input}
                value={imagen}
                onChangeText={setImagen}
                placeholder="https://ejemplo.com/imagen.jpg"
                placeholderTextColor="#999"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalSaveButton]}
                  onPress={guardarUsuario}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonText}>
                    {editandoUsuario ? 'Guardar' : 'Agregar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancelButton]}
                  onPress={() => setModalVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Alerta personalizada */}
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onConfirm={alertData.onConfirm}
        confirmText={alertData.confirmText}
        cancelText={alertData.cancelText}
        onCancel={alertData.onCancel}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#219ebc',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  agregarButton: {
    flexDirection: 'row',
    backgroundColor: '#219ebc',
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#219ebc',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 5,
  },
  agregarText: {
    color: '#fff',
    fontSize: 19,
    marginLeft: 10,
    fontWeight: '700',
  },
  usuarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  usuarioImagen: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  usuarioNombre: {
    fontSize: 19,
    fontWeight: '700',
  },
  usuarioCorreo: {
    fontSize: 15,
    color: '#666',
    marginTop: 3,
  },
  statusIcon: {
    marginHorizontal: 14,
  },
  iconButton: {
    marginHorizontal: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 22,
    color: '#219ebc',
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 17,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 15,
    minWidth: 130,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  modalSaveButton: {
    backgroundColor: '#219ebc',
  },
  modalCancelButton: {
    backgroundColor: '#888',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  /* Alerta personalizada */
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  alertContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#219ebc',
    marginBottom: 14,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 17,
    color: '#444',
    marginBottom: 28,
    textAlign: 'center',
  },
  alertButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  alertButton: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 16,
    marginLeft: 14,
    minWidth: 100,
    alignItems: 'center',
  },
  alertConfirmButton: {
    backgroundColor: '#219ebc',
  },
  alertConfirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  alertCancelButton: {
    backgroundColor: '#bbb',
  },
  alertCancelText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Usuarios;
