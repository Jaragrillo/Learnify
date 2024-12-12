'use client' // Se requiere al usar ciertos hooks como el 'usePathname'

import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function NavbarLoggedOut() {

    const pathname = usePathname(); // Obtener la ruta actual
    console.log('Current Path:', pathname); // Verificar la ruta 

    const isLoginOrRegisterPage = pathname === "/login" || pathname === "/register"; // Validar si se encuentra en /login o /register
    // isLoginOrRegisterPage ? "trueCondition" : "falseCondition" ---> Es el condicional de la validación de la ruta

  return (
    <header className={`${isLoginOrRegisterPage ? "h-0 absolute right-0" : "h-[100px]"}`}>
        <nav className={`${isLoginOrRegisterPage ? "bg-transparent flex items-center text-white" : "text-white bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] flex items-center fixed w-full z-40"}`}>
            <div className={`${isLoginOrRegisterPage ? "h-[100px] w-[100px] mr-auto bg-transparent" : "mr-auto block"}`}>
                <Link href={"/"}>
                    <Image 
                        src="/images/learnifyLogo.jpeg" 
                        alt="learnify-logo-image" 
                        width={100} 
                        height={100}
                        className={`${isLoginOrRegisterPage ? "hidden" : "block"}`}
                    />
                </Link>
            </div>

            <ul className='flex items-center'>
                <li className={`${isLoginOrRegisterPage ? "block p-5 text-lg" : "hidden"}`}>
                    <Link href={"/"} className='px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500'>
                        Home
                    </Link>
                </li>
                <li className='p-5 text-lg'>
                    <Link href={"/benefits"} className='px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500'>
                        Beneficios
                    </Link>
                </li>
                <li className='p-5 text-lg'>
                    <Link href={"/about"} className='px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500'>
                        Sobre nosotros
                    </Link>
                </li>
                <li className='p-5 text-lg'>
                    <Link href={"/contact"} className='px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500'>
                        Contacto
                    </Link>
                </li>
                <li className='p-5 text-lg'>
                    <Link href={"/register"} className='px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500'>
                        Regístrarse
                    </Link>
                </li>
                <li className='p-5 text-lg'>
                    <Link href={"/login"} className='px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500'>
                        Iniciar sesión
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
