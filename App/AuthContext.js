import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './services/apiConfig';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const userData = await AsyncStorage.getItem('usuario');
        const tipoData = await AsyncStorage.getItem('tipo');
        if (userData && tipoData) {
          setUsuario(JSON.parse(userData));
          setTipo(tipoData);
        }
      } catch (e) {
        console.error('Error al cargar usuario:', e);
      } finally {
        setIsLoading(false);
      }
    };

    cargarUsuario();
  }, []);

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      if (usuario?.id) {
        await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: usuario.id }),
        });
      }

      await AsyncStorage.removeItem('usuario');
      await AsyncStorage.removeItem('tipo');
      setUsuario(null);
      setTipo(null);
    } catch (e) {
      console.error('Error al cerrar sesión:', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        tipo,
        isLoading,
        setUsuario,
        setTipo,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
