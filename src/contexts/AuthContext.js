'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import jsCookie from 'js-cookie';
import Swal from 'sweetalert2';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
  const [userData, setUserData] = useState(null); // Información del usuario
  const [role, setRole] = useState(null); // Para almacenar el rol del usuario

  // Función de login
  const login = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
    setRole(data.role); // Asignar rol desde los datos del usuario
  };

  // Función de logout
  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setRole(null);
  };

  // Función para actualizar la foto de perfil
  const refreshNav = () => {
    setIsLoggedIn(false);
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1);
  };

  // Efecto para verificar la autenticación al cargar el contexto
  useEffect(() => {
    if (typeof window !== 'undefined') { // Verificar si es el cliente
      const checkAuth = () => {
        const token = jsCookie.get('auth-token');

        if (!token) {
          setIsLoggedIn(false);
          setRole(null);
          return;
        }

        const decodedToken = decodeJwt(token);

        if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
          jsCookie.remove('auth-token');
          setIsLoggedIn(false);
          setRole(null);

          Swal.fire({
            icon: 'warning',
            title: 'Sesión expirada',
            text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
          });
        } else {
          setIsLoggedIn(true);
          setRole(decodedToken.role);
          login(decodedToken); // Actualizar contexto con el rol
        }
      };

      checkAuth();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, role, login, logout, refreshNav }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de AuthProvider");
  }
  return context;
};

// Función para decodificar el JWT (si usas JWT en tu token)
function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}