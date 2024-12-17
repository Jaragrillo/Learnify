'use client' 

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image";
import jsCookie from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

export default function NavbarLoggedIn() {

    const [nickname, setNickname] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
  
    useEffect(() => {
      const token = jsCookie.get('auth-token');
  
      if (!token) {
        // Si no hay token, redirigir al login
        router.push('/login');
        return;
      }
  
      const fetchUserData = async () => {
        try {
          const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
          const userId = decodedToken.id;
  
          const response = await fetch(`/api/user/${userId}`);
          if (!response.ok) {
            throw new Error('Error al obtener los datos del usuario');
          }
  
          const userData = await response.json();
          const nombre = userData.nombre?.split(' ')[0] || ''; // Primera palabra del nombre
          const apellido = userData.apellidos?.charAt(0) || ''; // Primera letra del apellido
  
          setNickname(`${nombre} ${apellido}.`); // Ejemplo: "Juan P."
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          setError('Error al cargar el nickname');
        }
      };
  
      fetchUserData();
    }, [router]);
  
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

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
                    <Link href={`/user/profile/`}>
                        <div className='flex items-center gap-2'>
                            <p className='text-xl'>{nickname || 'Cargando...'}</p>
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
                    <Link href={"/user/home"} className={`hover:text-black/100 ${pathname === '/user/home' ? 'text-black/100' : ''}`}>Home</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/courses"} className={`hover:text-black/100 ${pathname === '/user/courses' ? 'text-black/100' : ''}`}>Cursos</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/categories"} className={`hover:text-black/100 ${pathname === '/user/categories' ? 'text-black/100' : ''}`}>Categorías</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/purchasedCourses"} className={`hover:text-black/100 ${pathname === '/user/purchasedCourses' ? 'text-black/100' : ''}`}>Cursos comprados</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/myCourses"} className={`hover:text-black/100 ${pathname === '/user/myCourses' ? 'text-black/100' : ''}`}>Cursos creados</Link>
                </li>
                <li>
                    <p>|</p>
                </li>
                <li className='p-3'>
                    <Link href={"/user/community"} className={`hover:text-black/100 ${pathname === '/user/community' ? 'text-black/100' : ''}`}>Comunidad</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}
