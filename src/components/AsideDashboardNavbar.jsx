'use client'

import React from 'react'
import Link from 'next/link'
import Image from "next/image";

export default function AsideNavbarLoggedIn() {
    return(
        <aside className='bg-[#0F5789] h-full w-80 px-10 py-20 fixed z-30'>
            <p className='text-2xl text-center mb-10 text-white'>Learnify Management</p>
            <nav className='mx-auto'>
                <ul>
                    <li className='bg-gray-300 hover:bg-white rounded-lg p-2 mb-5'>
                        <Link href={"manage/dashboard"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/dashboard.svg" 
                                    alt="dashboard-svg" 
                                    width={24} 
                                    height={24} 
                                    className=""
                                />
                                <p className='text-xl'>Dashboard</p>
                            </div>
                        </Link>
                    </li>
                    <li className='bg-gray-300 hover:bg-white rounded-lg p-2 mb-5'>
                        <Link href={"manage/courses"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/class.svg" 
                                    alt="class-svg" 
                                    width={24} 
                                    height={24} 
                                    className=""
                                />
                                <p className='text-xl'>Cursos</p>
                            </div>
                        </Link>
                    </li>
                    <li className='bg-gray-300 hover:bg-white rounded-lg p-2 mb-5'>
                        <Link href={"manage/sells"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/moneyBlack.svg" 
                                    alt="moneyBlack-svg" 
                                    width={24} 
                                    height={24} 
                                    className=""
                                />
                                <p className='text-xl'>Ventas</p>
                            </div>
                        </Link>
                    </li>
                    <li className='bg-gray-300 hover:bg-white rounded-lg p-2 mb-5'>
                        <Link href={"manage/users"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/user.svg" 
                                    alt="user-svg" 
                                    width={24} 
                                    height={24} 
                                    className=""
                                />
                                <p className='text-xl'>Usuarios</p>
                            </div>
                        </Link>
                    </li>
                    <li className='bg-gray-300 hover:bg-white rounded-lg p-2 mb-5'>
                        <Link href={"manage/messages"}>
                            <div className='flex items-center gap-3 w-60'>
                                <Image 
                                    src="/svg/messageBlack.svg" 
                                    alt="messageBlack-svg"
                                    width={24} 
                                    height={24} 
                                    className=""
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