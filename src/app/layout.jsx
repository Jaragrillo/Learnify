'use client';

import { Poppins } from 'next/font/google';
import './globals.css';
import NavbarLoggedOut from '@/components/NavbarLoggedOut';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';
import NavbarDashboard from '@/components/NavbarDashboard';
import Footer from '@/components/Footer';
import GlobalMiddlewareWrapper from '@/components/GlobalMiddlewareWrapper';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

// Configurar Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Pesos de la fuente
  variable: '--font-poppins', // Nombre de la variable CSS
});

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="icon" href="/icon.jpeg" sizes="any" />
          <title>Learnify</title>
        </head>
        <body className={`${poppins.variable} antialiased`}>
          <GlobalMiddlewareWrapper>
            <NavbarComponent />
            {children}
            <FooterComponent />
          </GlobalMiddlewareWrapper>
        </body>
      </html>
    </AuthProvider>
  );
}

// Componente para manejar el Navbar según estado de autenticación
const NavbarComponent = () => {
  const { isLoggedIn, role } = useAuth();
  const [navbar, setNavbar] = useState(<NavbarLoggedOut />);

  useEffect(() => {
    console.log("NavbarComponent: isLoggedIn:", isLoggedIn, "role:", role); // Debugging
      if (isLoggedIn) {
          setNavbar(role === 1 ? <NavbarDashboard /> : <NavbarLoggedIn />);
      } else {
          setNavbar(<NavbarLoggedOut />);
      }
  }, [isLoggedIn, role]);

  return navbar;
};

// Componente para manejar el Footer según estado de autenticación
const FooterComponent = () => {
  const { role } = useAuth();
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    console.log("FooterComponent: role:", role); // Debugging
    setFooter(role !== 1 ? <Footer /> : null);
  }, [role]);

  return footer;
};
