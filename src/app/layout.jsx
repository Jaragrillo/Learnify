'use client'

import { Poppins } from "next/font/google";
import "./globals.css";
import NavbarLoggedOut from "@/components/NavbarLoggedOut";
import NavbarLoggedIn from "@/components/NavbarLoggedIn";
import NavbarDashboard from "@/components/NavbarDashboard";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Importar useRouter
import Swal from 'sweetalert2';
import jsCookie from 'js-cookie';  // Importar js-cookie

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Pesos de la fuente
  variable: "--font-poppins", // Nombre de la variable CSS
});

export default function RootLayout({ children }) {

  const [role, setRole] = useState(null); // Para almacenar el rol del usuario
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar si el token está presente en las cookies
      const token = jsCookie.get('auth-token'); // Usar js-cookie para leer la cookie

      if (!token) {
        setIsLoggedIn(false);
        setRole(null);
        return; // Si no hay token, no hay sesión
      }

      // Aquí se puede verificar si el token es válido sin necesidad de un endpoint de validación
      // Por ejemplo, podrías usar un JWT decodificado para validar el contenido del token.
      // Para propósitos de este ejemplo, asumimos que si el token está presente, la sesión es válida.
      // Si el token ha expirado o es inválido, simplemente lo eliminamos.

      const decodedToken = decodeJwt(token);  // Implementa tu función de decodificación JWT (en caso de usar JWT)
      console.log(decodedToken);
      
      if (!decodedToken) {
        jsCookie.remove('auth-token');  // Si el token es inválido, eliminamos la cookie
        setIsLoggedIn(false);
        setRole(null);
      } else {
        setIsLoggedIn(true);
        setRole(decodedToken.role);  // Establece el rol basado en el token
      }
    };

    checkAuth();
  }, [router]);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} antialiased`}>
        {/* Mostrar el navbar según el estado de autenticación y rol */}
        {isLoggedIn ? (
          role === 1 ? (
            <NavbarDashboard /> // Mostrar navbar para admin
          ) : role === 2 ? (
            <NavbarLoggedIn /> // Mostrar navbar para usuarios
          ) : null
        ) : (
          <NavbarLoggedOut /> // Mostrar navbar para no autenticados
        )}

        {children}

        {/* Mostrar Footer solo si no es ruta de administrador */}
        {(role !== 1) && <Footer />}
      </body>
    </html>
  );
}

// Función para decodificar el JWT (si usas JWT en tu token)
function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
