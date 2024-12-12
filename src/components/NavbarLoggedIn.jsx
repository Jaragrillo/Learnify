'use client' // Se requiere al usar ciertos hooks como el 'usePathname'

import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function NavbarLoggedIn() {

    // const pathname = usePathname(); // Obtener la ruta actual
    // console.log('Current Path:', pathname); // Verificar la ruta 

    // const isLoginOrRegisterPage = pathname === "/login" || pathname === "/register";  // Validar si se encuentra en /login o /register
    // // isLoginOrRegisterPage ? "trueCondition" : "falseCondition" ---> Es el condicional de la validación de la ruta

  return (
    <header className="h-[148px]">
        <nav className="text-white bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] flex items-center justify-between fixed w-full z-40">
            <div className="block">
                <Link href={"/user/home"}>
                    <Image 
                        src="/images/learnifyLogo.jpeg" 
                        width={100} 
                        alt="learnify-logo-image" 
                        height={100}
                        className="block"
                    />
                </Link>
            </div>

            <div>
                <form action="">
                    <div className='relative'>
                        <input type="text" name="searchCourse" id="searchCourse" placeholder='¿Qué te intersa aprende hoy?' className='rounded-lg px-3 py-2 w-[700px] focus:outline-none text-black'/>
                        <button type="submit">
                            <Image 
                            src="/svg/search.svg" 
                            alt="search-svg" 
                            width={24} 
                            height={24} 
                            className="absolute right-5 top-0 bottom-0 my-auto "
                            />
                        </button>
                    </div>
                </form>
            </div>

            <ul className='flex items-center mr-5'>
                <li>
                    <Link href={"/user/profile"}>
                        <div className='flex items-center gap-2'>
                            <p className='text-xl'>Username</p>
                            <Image 
                                src="/images/benefits/testimony1.png" 
                                alt="testimony-1-image" 
                                width={68} 
                                height={68} 
                                className="m-auto"
                            />
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
        <nav className='bg-[#cee4f1] text-black/60 fixed w-full z-40 mt-[100px]'>
            <ul className='flex items-center'>
                <li className='p-3'>
                    <Link href={"/user/home"} className='hover:text-black/100'>Home</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/courses"} className='hover:text-black/100'>Cursos</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/categories"} className='hover:text-black/100'>Categorías</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/purchasedCourses"} className='hover:text-black/100'>Cursos comprados</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/myCourses"} className='hover:text-black/100'>Cursos creados</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/community"} className='hover:text-black/100'>Comunidad</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
