'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MyCoursesSkeleton from '@/components/skeletons/MyCoursesSkeleton';

export default function createdCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses?createdByUser=true');
                if (!response.ok) {
                    throw new Error('Error al obtener los cursos');
                }
                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Mis Cursos Creados</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[600px]'>Comparte tus conocimientos y genera ingresos creando un nuevo curso. O, edita uno ya existente.</p>
                </section>
                <section>
                    <div className="flex items-center justify-between w-full p-10 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                        <p className="text-white text-3xl">Todos los cursos</p>
                        <Link href={'/user/myCourses/newCourse'} className="group flex text-2xl items-center text-white gap-2 px-3 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300 ease-linear">
                            Crear nuevo curso
                            <Image 
                                src="/svg/addWhite.svg" 
                                alt="addWhite-svg" 
                                width={30} 
                                height={30} 
                                className="block group-hover:hidden"
                            />
                            <Image 
                                src="/svg/add.svg" 
                                alt="add-svg" 
                                width={30} 
                                height={30} 
                                className="hidden group-hover:block"
                            />
                        </Link>
                    </div>
                    <div className="p-10">
                    {isLoading ? (
                            <MyCoursesSkeleton />
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : courses.length === 0 ? (
                            <p className="text-gray-500">No tienes cursos creados aún.</p>
                        ) : (
                            <div className="flex flex-wrap justify-between gap-6">
                                {courses.map((course) => (
                                    <div key={course.id_curso} className="shadow-lg shadow-black/60 relative w-[400px] h-[392px]">
                                        <div className="w-full h-40">
                                            <Image
                                                src={course.img_portada}
                                                alt={`Portada de ${course.titulo}`}
                                                width={300}
                                                height={160}
                                                className="w-full h-full "
                                            />
                                        </div>
                                        <div className="mt-4 p-2">
                                            <h3 className="text-2xl font-medium">{course.titulo}</h3>
                                            <div className="flex items-center gap-x-2 mt-2 text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Image 
                                                        src="/svg/star.svg" 
                                                        alt="star-svg" 
                                                        width={24} 
                                                        height={24} 
                                                    />
                                                    {course.valoracion || 'El curso no ha sido valorado'}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Image 
                                                        src="/svg/studentDarkBlue.svg" 
                                                        alt="studentDarkBlue-svg" 
                                                        width={24} 
                                                        height={24} 
                                                        className=""
                                                    />
                                                    {course.estudiantes}
                                                </div>
                                            </div>
                                            <p className="text-2xl mt-2"> {/* Formatear el precio para mostrarlo más agradable al usuario en COP ↓ */}
                                                ${Number(course.precio).toLocaleString('es-CO', { minimumFractionDigits: 0 })} COP 
                                            </p>
                                            <Link href={`/user/myCourses/editCourse/${course.id_curso}`} className="w-11/12 flex items-center justify-center absolute bottom-2 left-0 right-0 m-auto py-3 gap-2 text-white bg-[#070E2B] mt-4 hover:bg-[#0D1D5F] transition duration-200">
                                                <Image 
                                                    src="/svg/edit.svg" 
                                                    alt="edit-svg" 
                                                    width={24} 
                                                    height={24} 
                                                />
                                                Editar curso
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}