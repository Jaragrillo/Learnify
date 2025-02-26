'use client'

import Image from "next/image";

export default function coursesPage() {
    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Mis Cursos Comprados</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[600px]'>Inica, continúa o repite los cursos que has comprado.</p>
                </section>
                <section>
                    <div className="flex items-center justify-between w-full p-10 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                        <p className="text-white text-xl">Todos los cursos</p>
                        <div className="relative">
                            <select name="purchasedCoursesSelect" id="purchasedCoursesSelect" className="bg-transparent border border-white px-3 py-2 text-white appearance-none focus:outline-none">
                                <option className="text-black" value="all">Todos</option>
                                <option className="text-black" value="uninitiated">No iniciados</option>
                                <option className="text-black" value="inProgress">En progreso</option>
                                <option className="text-black" value="completed">Completados</option>
                            </select>

                            <Image
                                src="/svg/rightArrow.svg"
                                alt="rightArrow-svg"
                                width={30}
                                height={30}
                                className="transform transition-transform rotate-90 absolute right-3 top-0 bottom-0 my-auto"
                            />
                        </div>
                    </div>
                    <div className="p-10">
                        <p>query response</p>
                    </div>
                </section>
            </main>
        </>
    );
}