'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const [isClient, setIsClient] = useState(false);
    const { isLoggedIn, role } = useAuth();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Evita la pre-renderización
    }

    const  redirectTo = !isLoggedIn
        ? "/"
        : role === 1
        ? "/manage/dashboard"
        : "/user/home"
    ;
    
    return (
        <>
            <main>
                <section className='bg-gradient-to-t from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] p-10'>
                    <h2 className='text-4xl font-light text-white mb-10'>Parece que estás perdido...</h2>
                    <div className='mx-auto w-fit text-center mb-5'>
                        <p className='text-5xl text-white/50 font-light'>404</p>
                        <p className='text-5xl text-white/50 font-light'>Página no encontrada</p>
                        <Image 
                          src="/images/notFound/notFoundAstronaut.png" 
                          alt="not-found-astronaut-image" 
                          width={470} 
                          height={550} 
                          className="mx-auto"
                        />
                    </div>
                    <div className="group text-white text-3xl sm:text-5xl text-center mb-10 m-auto block w-fit relative">
                        <Link href={redirectTo} className="relative">
                            ¡Retoma tu camino de aprendizaje!
                            <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-white transform scale-x-0 origin-left transition-transform duration-700 ease-in-out group-hover:scale-x-100"></span>
                        </Link>
                        <Image 
                          src="/images/notFound/notFoundPaperAirplane.png" 
                          alt="not-found-paper-airplane-image" 
                          width={410} 
                          height={235} 
                          className="hidden sm:block absolute right-0 -top-56"
                        />
                    </div>
                </section>
            </main>
        </>
    );
}
