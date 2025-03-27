'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image";
import jsCookie from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

export default function NavbarDashboard() {

    const [nickname, setNickname] = useState(''); // Estado para crear y manejar le nickname del usuario
    const [userData, setUserData] = useState(null); // Estado para manejar la foto de perfil
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar el skeleton en el loading
    const [error, setError] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
            <header className="h-[100px]">
                <nav className="text-white bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] flex items-center justify-between fixed w-full z-40 h-[100px]">
                    <div className="hidden lg:block">
                        <Link href={"/manage/dashboard"}>
                            <Image
                                src="/images/learnifyLogo.jpeg"
                                width={100}
                                alt="learnify-logo-image"
                                height={100}
                                className="block"
                            />
                        </Link>
                    </div>

                    {/* Botón para el desplegable */}
                    <div className="lg:hidden">
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

                    <ul className='flex items-center mr-5'>
                        <li className='hidden lg:block p-5 text-xl'>
                            <Link href={'/manage/dashboard'} className='px-3 py-2 rounded-xl hover:bg-white/10 transition duration-500'>Dashboard</Link>
                        </li>
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
                    <nav className='lg:hidden bg-[#0F5789] text-black fixed w-full z-30 mt-[100px]'>
                        <ul className='flex flex-col items-center pt-5'>
                            <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('dashboard') ? 'bg-white' : ''}`}>
                                <Link href={"/manage/dashboard"}>
                                    <div className='flex items-center gap-3 w-60'>
                                        <Image src="/svg/dashboard.svg" alt="dashboard-svg" width={24} height={24} />
                                        <p className='text-xl'>Dashboard</p>
                                    </div>
                                </Link>
                            </li>
                            <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('courses') ? 'bg-white' : ''}`}>
                                <Link href={"/manage/courses"}>
                                    <div className='flex items-center gap-3 w-60'>
                                        <Image src="/svg/classBlack.svg" alt="classBlack-svg" width={24} height={24} />
                                        <p className='text-xl'>Cursos</p>
                                    </div>
                                </Link>
                            </li>
                            <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('sells') ? 'bg-white' : ''}`}>
                                <Link href={"/manage/sells"}>
                                    <div className='flex items-center gap-3 w-60'>
                                        <Image src="/svg/moneyBlack.svg" alt="moneyBlack-svg" width={24} height={24} />
                                        <p className='text-xl'>Ventas</p>
                                    </div>
                                </Link>
                            </li>
                            <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('users') ? 'bg-white' : ''}`}>
                                <Link href={"/manage/users"}>
                                    <div className='flex items-center gap-3 w-60'>
                                        <Image src="/svg/user.svg" alt="user-svg" width={24} height={24} />
                                        <p className='text-xl'>Usuarios</p>
                                    </div>
                                </Link>
                            </li>
                            <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('messages') ? 'bg-white' : ''}`}>
                                <Link href={"/manage/messages"}>
                                    <div className='flex items-center gap-3 w-60'>
                                        <Image src="/svg/messageBlack.svg" alt="messageBlack-svg" width={24} height={24} />
                                        <p className='text-xl'>Mensajes</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
        </>
    )
}
