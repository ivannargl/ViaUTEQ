import { StyleSheet } from 'react-native';
import {Platform} from 'react-native';

export default StyleSheet.create({
    navContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 55 : 30,
        left: 12,
        right: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 12,
        zIndex: 15000,
    },
    navTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        borderRadius: 100,
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    nombreUsuario: {
        fontWeight: '700',
        color: '#34495e',
    },
    infoRutaText: {
        fontWeight: '700',
        color: '#34495e',
    },
    distanciaRow: {
        alignItems: 'center',
        paddingTop: 4,
    },
    distanciaText: {
        color: '#34495e',
        fontWeight: '600',
        textAlign: 'center',
    },
    menuButton: {
        backgroundColor: '#dfe6e9',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#34495e',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        marginLeft: 'auto',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'ios' ? 95 : 75,
        paddingHorizontal: 30,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 18,
        paddingVertical: 20,
        paddingHorizontal: 30,
        shadowColor: '#34495e',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 14,
        alignSelf: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomColor: '#ecf0f1',
        borderBottomWidth: 1,
    },
    menuIcon: {
        marginRight: 18,
    },
    menuItemText: {
        fontSize: 19,
        color: '#34495e',
        fontWeight: '700',
    },
});
