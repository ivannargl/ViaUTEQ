import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  button: {
    backgroundColor: '#4287f5',
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  },
  buttonDanger: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  },
  buttonSecondary: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  }
  
})
export default styles;