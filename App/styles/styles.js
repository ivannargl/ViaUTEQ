import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 18,
    color: '#34495e',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  // PROBLEMA PRINCIPAL: El mapa tenía height: '80%' que causaba conflictos
  mapa: {
    flex: 1, // Solo flex: 1 es suficiente
    width: '100%', // Asegurar que ocupe todo el ancho
  },
  // PROBLEMA: infoRuta estaba superpuesta y mal posicionada
  infoRuta: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 40,
  },
  backButton: {
    backgroundColor: '#34495e',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 20,
    color: '#e74c3c',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },

  // Estilos mejorados para modales
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  alertBox: {
    backgroundColor: 'white',
    padding: 36,
    borderRadius: 24,
    alignItems: 'center',
    minWidth: 280,
    maxWidth: 340,
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },
  alertText: {
    fontSize: 18,
    marginBottom: 24,
    color: '#34495e',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 26,
  },
  alertButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    minWidth: 120,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  alertButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },

  // POSICIÓN AJUSTADA: Carrito status menos intrusivo
  carritoStatusContainer: {
    position: 'absolute',
    top: 50, // Reducido de 60 a 50
    left: 15,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12, // Reducido de 16 a 12
    padding: 12, // Reducido de 16 a 12
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 3 }, // Reducido
    shadowOpacity: 0.1, // Reducido
    shadowRadius: 6, // Reducido
    elevation: 6, // Reducido
    borderWidth: 1,
    borderColor: 'rgba(52, 73, 94, 0.1)',
    maxHeight: 60, // Límite de altura
  },
  statusIndicator: {
    width: 12, // Reducido de 14 a 12
    height: 12,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  carritoStatusTitle: {
    fontSize: 14, // Reducido de 16 a 14
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 2,
  },
  carritoStatusSubtitle: {
    fontSize: 12, // Reducido de 14 a 12
    fontWeight: '500',
    color: '#7f8c8d',
  },

  // ELIMINADO: mapLoadingOverlay que podría estar interfiriendo
  // Este overlay podría estar cubriendo el mapa

  // Mejorar el contraste y la legibilidad
  markerCallout: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    minWidth: 150,
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  // Indicadores de progreso - POSICIÓN AJUSTADA
  progressContainer: {
    position: 'absolute',
    bottom: 80, // Ajustado para no interferir con infoRuta
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#0477BF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },

  progressText: {
    fontSize: 14,
    color: '#34495e',
    fontWeight: '600',
    textAlign: 'center',
  },

  // Mejoras de accesibilidad
  accessibleButton: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Estados de carga específicos - POSICIÓN AJUSTADA
  reconnectingIndicator: {
    position: 'absolute',
    top: 120, // Ajustado para no superponerse
    left: 20,
    right: 20,
    backgroundColor: '#f39c12',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  reconnectingText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },

  // MODAL STYLES - Sin cambios significativos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalLabel: {
    marginTop: 10,
    fontWeight: '600',
  },
  dropdown: {
    marginVertical: 6,
    maxHeight: 100,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#d6eaf8',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#0077b6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  openModalButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  openModalText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  changeRouteButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 10, // Reducido
    paddingVertical: 6, // Reducido
    borderRadius: 6, // Reducido
    marginLeft: 8,
  },
  changeRouteButtonText: {
    color: 'white',
    fontSize: 11, // Reducido
    fontWeight: '600',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00b4d8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    maxHeight: 400,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10
  },

  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  selectedItemText: {
    color: 'blue',
    fontWeight: '600',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 10,
    overflow: 'hidden',
  }
});