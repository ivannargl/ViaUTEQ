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
  mapa: {
    flex: 1,
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
  
  // Nuevos estilos para el estado del carrito
  carritoStatusContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(52, 73, 94, 0.1)',
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  carritoStatusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 2,
  },
  carritoStatusSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f8c8d',
  },
  
  // Estilos adicionales para mejor UX
  mapLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(253,253,253,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  
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
  
  // Indicadores de progreso
  progressContainer: {
    position: 'absolute',
    bottom: 120,
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
    minHeight: 44, // Mínimo recomendado por Apple y Google
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Estados de carga específicos
  reconnectingIndicator: {
    position: 'absolute',
    top: 120,
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
});