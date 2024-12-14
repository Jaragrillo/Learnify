'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode'; // Para decodificar el token
import jsCookie from 'js-cookie'; 

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = jsCookie.get('auth-token');
    
    if (!token) {
      // Si no hay token, redirigir al inicio de sesión
      router.push('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setRole(decodedToken.role);
      fetchUserData(decodedToken.id);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem('auth-token'); // Elimina el token en caso de error
      router.push('/login');
    }
  }, []);

  // Función para obtener los datos del perfil desde el backend
  const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`/api/user/${userId}`); // Llamada al API usando el id
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        const data = await response.json(); // Procesa la respuesta
        setUserData(data); // Guarda los datos del usuario
        setIsLoading(false);
    } catch (error) {
        console.error("Error al obtener datos del perfil:", error);
        setError("No se pudo cargar el perfil.");
        setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Elimina el token y redirige a la página de inicio
    jsCookie.remove('auth-token');
    router.push('/');
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Mi Perfil</h1>

      {userData && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <strong>Nombre:</strong> {userData.nombre}
          </div>
          <div className="mb-4">
            <strong>Correo electrónico:</strong> {userData.correo}
          </div>
          <div className="mb-4">
            <strong>Rol:</strong> {role === 1 ? "Administrador" : "Usuario"}
          </div>

          {/* Si el usuario quiere cambiar su información */}
          <button   
            onClick={() => router.push('/user/edit')}
            className="text-blue-500 hover:underline"
          >
            Editar perfil
          </button>

          {/* Botón para cerrar sesión */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
