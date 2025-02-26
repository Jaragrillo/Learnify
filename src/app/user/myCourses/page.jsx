'use client'

import Image from "next/image";
import Link from "next/link";

export default function coursesPage() {
    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Mis Cursos Creados</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[600px]'>Comparte tus conocimientos y genera ingresos creando un nuevo curso. O, edita uno ya existente.</p>
                </section>
                <section>
                    <div className="flex items-center justify-between w-full p-10 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                        <p className="text-white text-xl">Todos los cursos</p>
                        <Link href={'/user/myCourses/newCourse'} className="flex items-center text-white gap-2 px-3 py-2 border border-white">
                            Crear nuevo curso
                            <Image 
                                src="/svg/addWhite.svg" 
                                alt="addWhite-svg" 
                                width={24} 
                                height={24} 
                                className=""
                            />
                        </Link>
                    </div>
                    <div className="p-10">
                        <p>query response</p>
                    </div>
                </section>
            </main>
        </>
    );
}