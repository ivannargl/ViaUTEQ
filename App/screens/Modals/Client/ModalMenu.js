import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../../styles/styles';

function ModalMenu({
  visible,
  onClose,
  lugaresDisponibles,
  inicioSeleccionado,
  setInicioSeleccionado,
  destinoSeleccionado,
  setDestinoSeleccionado,
  onCalcularRuta,
  showAlert
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecciona tu ruta</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalLabel}>Punto de inicio:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={inicioSeleccionado?.id || ''}
                onValueChange={(itemValue) => {
                  const lugar = lugaresDisponibles.find(l => l.id === itemValue);
                  setInicioSeleccionado(lugar);
                }}
              >
                <Picker.Item label="Selecciona un punto de inicio" value="" />
                {lugaresDisponibles.map((lugar) => (
                  <Picker.Item key={lugar.id} label={lugar.nombre} value={lugar.id} />
                ))}
              </Picker>
            </View>

            <Text style={styles.modalLabel}>Destino:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={destinoSeleccionado?.id || ''}
                onValueChange={(itemValue) => {
                  const lugar = lugaresDisponibles.find(l => l.id === itemValue);
                  setDestinoSeleccionado(lugar);
                }}
              >
                <Picker.Item label="Selecciona un destino" value="" />
                {lugaresDisponibles.map((lugar) => (
                  <Picker.Item key={lugar.id} label={lugar.nombre} value={lugar.id} />
                ))}
              </Picker>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.submitButton]}
              onPress={() => {
                if (inicioSeleccionado && destinoSeleccionado) {
                  onCalcularRuta(inicioSeleccionado, destinoSeleccionado);
                  onClose();
                } else {
                  showAlert("Debes seleccionar un punto de inicio y un destino", "warning");
                }
              }}
            >
              <Text style={styles.submitButtonText}>Calcular ruta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalMenu;