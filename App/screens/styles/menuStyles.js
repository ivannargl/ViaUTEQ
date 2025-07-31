import { StyleSheet } from 'react-native';
import {Platform,StatusBar} from 'react-native';

export default StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        paddingTop: 110, // Espacio para que no choque con el Nav
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0077b6',
        textAlign: 'center',
        marginBottom: 10,
    },
    flatListContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    nombre: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#023e8a',
        marginTop: 8,
        textAlign: 'center',
    },
    descripcion: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        marginTop: 4,
    },
});
