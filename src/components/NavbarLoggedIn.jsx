'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image";
import jsCookie from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

export default function NavbarLoggedIn() {

    const [nickname, setNickname] = useState(''); // Estado para crear y manejar le nickname del usuario
    const [userData, setUserData] = useState(null); // Estado para manejar la foto de perfil
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar el skeleton en el loading
    const [error, setError] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de busqueda
    const [searchResults, setSearchResults] = useState([]); // Estado para manejar las respuestas del buscador
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para manejar el menú móvil

    const handleSearch = async (query) => { 
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`/api/browser?query=${query}`);
            if (!response.ok) {
                throw new Error('Error al buscar cursos');
            }
            const results = await response.json();
            setSearchResults(results);
        } catch (err) {
            console.error('Error al buscar cursos:', err);
            setSearchResults([]);
        }
    };

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

                const userDataResponse = await response.json();
                setUserData(userDataResponse); // Guardar toda la información del usuario

                const nombre = userDataResponse.nombre?.split(' ')[0] || ''; // Primera palabra del nombre
                const apellido = userDataResponse.apellidos?.charAt(0) || ''; // Primera letra del apellido

                setNickname(`${nombre} ${apellido}.`); // Ejemplo: "Juan P."
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
                setError('Error al cargar el nickname');
            } finally {
                setIsLoading(false); // Dejar de mostrar el skeleton
            }
        };

        fetchUserData();
    }, [router]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchTerm.trim()) {
                handleSearch(searchTerm);
            } else {
                setSearchResults([]);
            }
        }, 500); // Retrasa la búsqueda 500ms

        return () => clearTimeout(delaySearch); // Limpia el timeout si el componente se desmonta o searchTerm cambia
    }, [searchTerm]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
            <header className="h-[100px] sm:h-[148px]">
                <nav className="text-white bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] flex items-center justify-between fixed w-full z-40 h-[100px]">
                    {/* Logo */}
                    <div className="hidden sm:block">
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

                    {/* Input busqueda de cursos */}
                    <div className='hidden md:block'>
                        <div className='relative'>
                            <input
                                type="text"
                                name="searchCourse"
                                id="searchCourse"
                                placeholder='¿Qué te intersa aprende hoy?'
                                className='rounded-lg px-3 py-2 w-[400px] lg:w-[700px] focus:outline-none text-black'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Image
                                src="/svg/search.svg"
                                alt="search-svg"
                                width={24}
                                height={24}
                                className="absolute right-5 top-0 bottom-0 my-auto "
                            />
                            {searchResults.length > 0 ? (
                                <ul className="absolute bg-white text-black shadow-md shadow-black/50 rounded-md w-full mt-1 max-h-48 overflow-y-auto z-50">
                                    {searchResults.map((course) => (
                                        <li key={course.id_curso} className="p-2 hover:bg-gray-100 cursor-pointer">
                                            <Link href={`/user/courses/${course.id_curso}`} className="block">
                                                {course.titulo}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                searchTerm.trim() && ( // Mostrar el mensaje solo si hay un término de búsqueda
                                    <p className="absolute bg-white text-black/50 rounded-md shadow-md shadow-black/50 w-full mt-1 p-2 z-50">
                                        No se encontraron cursos relacionados.
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                    
                    {/* Botón para el desplegable */}
                    <div className="sm:hidden">
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

                    {/* Info perfil */}
                    <ul className='flex items-center mr-5'>
                        <li>
                            <Link href={`/user/profile/`}>
                                <div className='flex items-center gap-2'>
                                    {isLoading ? (
                                        <div className="animate-pulse flex items-center space-x-2">
                                            <div className="h-7 w-24 bg-gray-300 rounded"></div> {/* Skeleton para el nickname */}
                                            <div className="h-[68px] w-[68px] bg-gray-300 rounded-full"></div> {/* Skeleton para la imagen */}
                                        </div>
                                    ) : (
                                        <>
                                            <p className='text-xl'>{nickname}</p>
                                            <div className="w-[68px] h-[68px] overflow-hidden rounded-full">
                                                <Image
                                                    src={userData?.foto_perfil ?? '/images/userDefaultImage.png'}
                                                    alt={`${userData?.foto_perfil ? `${userData.nombre}-${userData.apellidos}` : 'default'}-profile-image`}
                                                    width={68}
                                                    height={68}
                                                    className="m-auto rounded-full object-cover"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* SubNavbar para el Móvil */}
                {isMobileMenuOpen && (
                    <nav className='sm:hidden bg-[#cee4f1] text-black/60 fixed w-full z-30 mt-[100px]'>
                        <ul className='flex flex-col items-center'>
                            <li className='p-3'>
                                <Link href={"/user/home"} className={`hover:text-black/100 ${pathname === '/user/home' ? 'text-black/100' : ''}`}>Home</Link>
                            </li>
                            <li className='p-3'>
                                <Link href={"/user/courses"} className={`hover:text-black/100 ${pathname.includes('courses') ? 'text-black/100' : ''}`}>Cursos</Link>
                            </li>
                            <li className='p-3'>
                                <Link href={"/user/categories"} className={`hover:text-black/100 ${pathname.includes('categories') ? 'text-black/100' : ''}`}>Categorías</Link>
                            </li>
                            <li className='p-3'>
                                <Link href={"/user/purchasedCourses"} className={`hover:text-black/100 ${pathname.includes('purchasedCourses') ? 'text-black/100' : ''}`}>Cursos comprados</Link>
                            </li>
                            <li className='p-3'>
                                <Link href={"/user/myCourses"} className={`hover:text-black/100 ${pathname.includes('myCourses') ? 'text-black/100' : ''}`}>Cursos creados</Link>
                            </li>
                            <li className='p-3'>
                                <Link href={"/user/community/forums"} className={`hover:text-black/100 ${pathname.includes('community') ? 'text-black/100' : ''}`}>Comunidad</Link>
                            </li>
                        </ul>
                    </nav>
                )}

                {/* SubNavbar para el Escritorio */}
                <nav className='hidden sm:block bg-[#cee4f1] text-black/60 fixed w-full z-30 mt-[100px]'>
                    <ul className='flex items-center'>
                        <li className='p-3'>
                            <Link href={"/user/home"} className={`text-xs md:text-base hover:text-black/100 ${pathname === '/user/home' ? 'text-black/100' : ''}`}>Home</Link>
                        </li>
                        <li>
                            <p>|</p>
                        </li>
                        <li className='p-3'>
                            <Link href={"/user/courses"} className={`text-xs md:text-base hover:text-black/100 ${pathname.includes('courses') ? 'text-black/100' : ''}`}>Cursos</Link>
                        </li>
                        <li>
                            <p>|</p>
                        </li>
                        <li className='p-3'>
                            <Link href={"/user/categories"} className={`text-xs md:text-base hover:text-black/100 ${pathname.includes('categories') ? 'text-black/100' : ''}`}>Categorías</Link>
                        </li>
                        <li>
                            <p>|</p>
                        </li>
                        <li className='p-3'>
                            <Link href={"/user/purchasedCourses"} className={`text-xs md:text-base hover:text-black/100 ${pathname.includes('purchasedCourses') ? 'text-black/100' : ''}`}>Cursos comprados</Link>
                        </li>
                        <li>
                            <p>|</p>
                        </li>
                        <li className='p-3'>
                            <Link href={"/user/myCourses"} className={`text-xs md:text-base hover:text-black/100 ${pathname.includes('myCourses') ? 'text-black/100' : ''}`}>Cursos creados</Link>
                        </li>
                        <li>
                            <p>|</p>
                        </li>
                        <li className='p-3'>
                            <Link href={"/user/community/forums"} className={`text-xs md:text-base hover:text-black/100 ${pathname.includes('community') ? 'text-black/100' : ''}`}>Comunidad</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
