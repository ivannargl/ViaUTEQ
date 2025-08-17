import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#eaf4f4',
        flexGrow: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#14213d',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ccc',
        borderWidth: 2,
        borderColor: '#0077b6',
    },
    photoButton: {
        marginTop: 10,
        backgroundColor: '#0077b6',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 20,
    },
    photoButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        color: '#14213d',
        marginBottom: 6,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 15,
    },
    button: {
        backgroundColor: '#219ebc',
        padding: 15,
        borderRadius: 12,
        marginTop: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});