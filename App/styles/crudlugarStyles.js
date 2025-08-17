import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  // Botones principales
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonDelete: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonCancel: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonSuccess: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    marginVertical: 5,
  },

  inputFocused: {
    borderColor: '#007bff',
    borderWidth: 2,
  },

  // Cards para la lista de lugares
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },

  cardSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#007bff',
    borderWidth: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },

  cardSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 3,
  },

  cardDescription: {
    fontSize: 12,
    color: '#007bff',
  },

  // Header del modal
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },

  closeButton: {
    padding: 5,
  },

  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },

  // Secciones
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginTop: 20,
    marginBottom: 10,
  },

  sectionContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },

  // Lista de lugares
  lugaresContainer: {
    maxHeight: 220,
    marginBottom: 20,
  },

  emptyListText: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: 14,
    fontStyle: 'italic',
    padding: 20,
  },

  // Formulario
  formContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 15,
    textAlign: 'center',
  },

  formRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  formColumn: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 5,
    fontWeight: '500',
  },

  // Mapa
  mapContainer: {
    marginVertical: 15,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  mapTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 10,
    textAlign: 'center',
  },

  map: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },

  // Botones de acción
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  // Estados de loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },

  // Contador
  counterText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },

  // Mensajes de error/éxito
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },

  errorMessage: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
    borderWidth: 1,
  },

  successMessage: {
    backgroundColor: '#d1edff',
    borderColor: '#007bff',
    borderWidth: 1,
  },

  messageText: {
    fontSize: 14,
    textAlign: 'center',
  },

  errorText: {
    color: '#721c24',
  },

  successText: {
    color: '#004085',
  },

  // Separadores
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 15,
  },

  // Espaciado
  spacer: {
    height: 10,
  },

  spacerLarge: {
    height: 20,
  },
});

export default styles;