'use client' // Se requiere al usar ciertos hooks como el 'usePathname'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function NavbarLoggedOut() {

    const pathname = usePathname(); // Obtener la ruta actual
    // console.log('Current Path:', pathname); // Verificar la ruta 

    const isLoginOrRegisterPage = pathname === "/login" || pathname === "/register"; // Validar si se encuentra en /login o /register
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para el menú móvil

    // Función para alternar el estado del menú móvil
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

  return (
    <header className={`${isLoginOrRegisterPage ? "h-[100px] absolute right-0 w-full" : "h-[100px]"}`}>
        <nav className={`${isLoginOrRegisterPage ? "bg-transparent flex items-center text-white w-full h-[100px]" : "text-white bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] flex items-center h-[100px] fixed w-full z-40"}`}>
            <div className={`${isLoginOrRegisterPage || isMobileMenuOpen ? "h-[100px] w-[100px] hidden md:block md:mr-auto bg-transparent" : "md:mr-auto md:block hidden"}`}>
                <Link href={"/"}>
                    <Image 
                        src="/images/learnifyLogo.jpeg" 
                        alt="learnify-logo-image" 
                        width={100} 
                        height={100}
                        className={`${isLoginOrRegisterPage || isMobileMenuOpen ? "hidden" : "block"} h-[100px]`} // Ocultar logo en las páginas de login, register y 
                    />
                </Link>
            </div>

            {/* Botón de menú móvil */}
            <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="p-4">
                    {isMobileMenuOpen ? (
                        <svg className="h-12 w-12 fill-current text-white" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.829-4.828 4.829a1 1 0 0 1-1.414-1.414l4.829-4.828-4.829-4.828a1 1 0 1 1 1.414-1.414l4.828 4.828 4.829-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.829z" />
                        </svg>
                    ) : (
                        <Image
                            src="/svg/menu.svg"
                            alt="menu-icon"
                            width={50}
                            height={50}
                        />
                    )}
                </button>
            </div>

            {/* Menú escritorio */}
            <ul className='hidden md:flex items-center'>
                <li className={`${isLoginOrRegisterPage ? "block p-5 text-lg" : "hidden"}`}>
                    <Link href={"/"} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500`}>
                        Home
                    </Link>
                </li>
                <li className='p-5 text-sm lg:text-lg'>
                    <Link href={"/benefits"} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/benefits' ? 'bg-white/10' : ''}`}>
                        Beneficios
                    </Link>
                </li>
                <li className='p-5 text-sm lg:text-lg'>
                    <Link href={"/about"} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/about' ? 'bg-white/10' : ''}`}>
                        Sobre nosotros
                    </Link>
                </li>
                <li className='p-5 text-sm lg:text-lg'>
                    <Link href={"/contact"} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/contact' ? 'bg-white/10' : ''}`}>
                        Contacto
                    </Link>
                </li>
                <li className='p-5 text-sm lg:text-lg'>
                    <Link href={"/register"} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/register' ? 'bg-white/10' : ''}`}>
                        Regístrarse
                    </Link>
                </li>
                <li className='p-5 text-sm lg:text-lg'>
                    <Link href={"/login"} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/login' ? 'bg-white/10' : ''}`}>
                        Iniciar sesión
                    </Link>
                </li>
            </ul>

            {/* Menú móvil */}
            {isMobileMenuOpen && (
                <div className={`md:hidden absolute top-[100px] left-0 w-full ${isLoginOrRegisterPage ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] z-50`}>
                    <ul className="flex flex-col items-center">
                        <li className="p-5 text-lg">
                            <Link href={'/'} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/' ? 'bg-white/10' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li className="p-5 text-lg">
                            <Link href={'/benefits'} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/benefits' ? 'bg-white/10' : ''}`}>
                                Beneficios
                            </Link>
                        </li>
                        <li className="p-5 text-lg">
                            <Link href={'/about'} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/about' ? 'bg-white/10' : ''}`}>
                                Sobre nosotros
                            </Link>
                        </li>
                        <li className="p-5 text-lg">
                            <Link href={'/contact'} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/contact' ? 'bg-white/10' : ''}`}>
                                Contacto
                            </Link>
                        </li>
                        <li className="p-5 text-lg">
                            <Link href={'/register'} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/register' ? 'bg-white/10' : ''}`}>
                                Regístrarse
                            </Link>
                        </li>
                        <li className="p-5 text-lg">
                            <Link href={'/login'} className={`px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500 ${pathname === '/login' ? 'bg-white/10' : ''}`}>
                                Iniciar sesión
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    </header>
  )
}
