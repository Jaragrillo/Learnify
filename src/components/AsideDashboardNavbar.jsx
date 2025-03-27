'use client'

import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function AsideNavbarDashboard() {

    const pathname = usePathname();

    return(
        <aside className='bg-[#0F5789] h-full w-80 px-10 py-20 fixed z-30 hidden lg:block'>
            <p className='text-2xl text-center mb-10 text-white'>Learnify Management</p>
            <nav className='mx-auto'>
                <ul>
                    <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('dashboard') ? 'bg-white' : ''}`}>
                        <Link href={"/manage/dashboard"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/dashboard.svg" 
                                    alt="dashboard-svg" 
                                    width={24} 
                                    height={24} 
                                />
                                <p className='text-xl'>Dashboard</p>
                            </div>
                        </Link>
                    </li>
                    <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('courses') ? 'bg-white' : ''}`}>
                        <Link href={"/manage/courses"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/classBlack.svg" 
                                    alt="classBlack-svg" 
                                    width={24} 
                                    height={24} 
                                />
                                <p className='text-xl'>Cursos</p>
                            </div>
                        </Link>
                    </li>
                    <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('sells') ? 'bg-white' : ''}`}>
                        <Link href={"/manage/sells"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/moneyBlack.svg" 
                                    alt="moneyBlack-svg" 
                                    width={24} 
                                    height={24} 
                                />
                                <p className='text-xl'>Ventas</p>
                            </div>
                        </Link>
                    </li>
                    <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('users') ? 'bg-white' : ''}`}>
                        <Link href={"/manage/users"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/user.svg" 
                                    alt="user-svg" 
                                    width={24} 
                                    height={24} 
                                />
                                <p className='text-xl'>Usuarios</p>
                            </div>
                        </Link>
                    </li>
                    <li className={`bg-gray-300 hover:bg-white rounded-lg p-2 mb-5 ${pathname.includes('messages') ? 'bg-white' : ''}`}>
                        <Link href={"/manage/messages"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/messageBlack.svg" 
                                    alt="messageBlack-svg"
                                    width={24} 
                                    height={24} 
                                />
                                <p className='text-xl'>Mensajes</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}