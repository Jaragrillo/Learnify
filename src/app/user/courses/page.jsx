'use client'

import Image from "next/image";

export default function coursesPage() {
    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Explora Nuestros Cursos</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[600px]'>Descubre una amplia variedad de cursos impartidos por expertos en sus campos.</p>
                    
                    <h3 className="mt-10 text-2xl text-[#0D1D5F]">Cursos destacados</h3>
                    <p>COURSES CAROUSEL</p>
                </section>
                <section>
                    <div className="flex items-center justify-between w-full p-10 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                        <p className="text-white text-xl">Todos los cursos</p>
                        <div className="relative">
                            <select name="coursesCategoriesSelect" id="coursesCategoriesSelect" className="bg-transparent border border-white px-3 py-2 text-white appearance-none focus:outline-none">
                                <option className="text-black" value="all">Todos</option>
                                <option className="text-black" value="programmation">Programación</option>
                                <option className="text-black" value="design">Diseño</option>
                                <option className="text-black" value="mathematics">Matemáticas</option>
                                <option className="text-black" value="languages">Idiomas</option>
                                <option className="text-black" value="music">Música</option>
                                <option className="text-black" value="fitness">Fitness</option>
                                <option className="text-black" value="sciences">Ciencias</option>
                                <option className="text-black" value="literature">Literatura</option>
                                <option className="text-black" value="photography">Fotografía</option>
                                <option className="text-black" value="business">Negocios</option>
                                <option className="text-black" value="gastronomy">Gastronomía</option>
                                <option className="text-black" value="travels">Viajes</option>
                                <option className="text-black" value="health">Salud</option>
                                <option className="text-black" value="cinema">Cine</option>
                                <option className="text-black" value="gardening">Jardinería</option>
                                <option className="text-black" value="finances">Finanzas</option>
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