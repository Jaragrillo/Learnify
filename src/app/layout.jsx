  'use client'

  import { Poppins } from "next/font/google";
  import "./globals.css";
  import NavbarLoggedOut from "@/components/NavbarLoggedOut";
  import Footer from "@/components/Footer";
  import { usePathname } from "next/navigation";
  import { useEffect, useState } from "react";

  // Configurar Poppins 
  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Pesos de la fuente
    variable: "--font-poppins", // Nombre de la variable CSS
  });

  export default function RootLayout({ children }) {

    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      setIsReady(true);
    }, []);

    const isUserRoute = pathname?.startsWith("/user"); // Verificar que no sea una ruta del usuario logeado
    const isAdminRoute = pathname?.startsWith("/manage"); // Verificar que no sea una ruta de administrador

    return (
      <html lang="en" className="scroll-smooth">
        <body
          className={`${poppins.variable} antialiased`} // Asignar la fuente al body
        >
        {/* Mostrar NavbarLoggedOut solo si no es ruta de usuario ni de administrador */}
        {isReady && !isUserRoute && !isAdminRoute && <NavbarLoggedOut />}
        {children}
        {/* Mostrar Footer solo si no es ruta de administrador */}
        {isReady && !isAdminRoute && <Footer />}
        </body>
      </html>
    );
  }


  