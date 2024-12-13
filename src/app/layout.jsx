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
    const checkAuth = () => {
      const token = jsCookie.get('auth-token');

      if (!token) {
        setIsLoggedIn(false);
        setRole(null);
        return;
      }

      const decodedToken = decodeJwt(token);
      console.log(decodedToken);
      

      if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
        // Token inválido o expirado
        jsCookie.remove('auth-token');
        setIsLoggedIn(false);
        setRole(null);

        Swal.fire({
          icon: 'warning',
          title: 'Sesión expirada',
          text: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        });
      } else {
        // Token válido
        setIsLoggedIn(true);
        setRole(decodedToken.role);
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
