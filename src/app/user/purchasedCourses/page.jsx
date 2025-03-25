'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import MyCoursesSkeleton from '@/components/skeletons/MyCoursesSkeleton';
import Link from "next/link";

export default function purchasedCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // Estado para el filtro de cursos por progreso

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/courses?purchasedByUser=true');
                if (!response.ok) {
                    throw new Error('Error al obtener los cursos');
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Obtener el progreso del curso
    const getCourseProgress = (courseId) => {
        const progresoData = localStorage.getItem(`courseProgress_${courseId}`);
        return progresoData ? JSON.parse(progresoData) : null;
    };

    // Manejar el filtro de cursos por progreso
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filterCourses = () => {
        return courses.filter((course) => {
            const progresoGuardado = getCourseProgress(course.id_curso);
            const clasesVistas = progresoGuardado?.clasesVistas || {};
            const totalClases = course.totalClases;
            const clasesVistasCount = Object.values(clasesVistas).filter(visto => visto).length;
            const progreso = totalClases > 0 ? (clasesVistasCount / totalClases) * 100 : 0;

            if (filter === 'all') {
                return true;
            } else if (filter === 'uninitiated') {
                return progreso === 0;
            } else if (filter === 'inProgress') {
                return progreso > 0 && progreso < 100;
            } else if (filter === 'completed') {
                return progreso === 100;
            }
            return true;
        });
    };

    const filteredCourses = filterCourses();

    const getFilterMessage = () => {
        switch (filter) {
            case 'uninitiated':
                return 'sin iniciar';
            case 'inProgress':
                return 'en progreso';
            case 'completed':
                return 'completados';
            default:
                return '';
        }
    };

    const filterMessage = getFilterMessage();
    
    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-2xl sm:text-4xl text-[#0D1D5F]'>Mis Cursos Comprados</h2>
                    <p className='text-xl sm:text-2xl text-justify sm:text-left text-[#0D1D5F] font-light max-w-[600px]'>Inica, continúa o repite los cursos que has comprado.</p>
                </section>
                <section>
                    <div className="block text-center sm:text-left sm:flex items-center justify-between w-full p-10 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                        <p className="text-white text-3xl mb-2 sm:mb-0">Cursos comprados</p>
                        <div className="relative w-fit mx-auto sm:mx-0">
                            <select 
                                name="purchasedCoursesSelect" 
                                id="purchasedCoursesSelect" 
                                className="bg-transparent border border-white px-3 py-2 text-white appearance-none w-[200px] text-xl focus:outline-none"
                                value={filter}
                                onChange={handleFilterChange}
                            >
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
                        {isLoading ? (
                            <MyCoursesSkeleton />
                        ) : error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : courses.length === 0 ? (
                            <p className="text-gray-500">No tienes cursos comprados aún.</p>
                        ) : filteredCourses.length === 0 ? (
                            <p className="text-gray-500">No tienes cursos {filterMessage} aún.</p>
                        ) : (
                            <div className="flex flex-wrap justify-center md:justify-between gap-6">
                                {filteredCourses.map((course) => {
                                    const progresoGuardado = getCourseProgress(course.id_curso);
                                    const clasesVistas = progresoGuardado?.clasesVistas || {};
                                    const totalClases = course.totalClases;
                                    const clasesVistasCount = Object.values(clasesVistas).filter(visto => visto).length;
                                    const progreso = totalClases > 0 ? (clasesVistasCount / totalClases) * 100 : 0;

                                    let botonTexto = 'Iniciar curso';
                                    if (progreso > 0 && progreso < 100) {
                                        botonTexto = 'Continuar curso';
                                    } else if (progreso === 100) {
                                        botonTexto = 'Curso completado';
                                    }

                                    // Manejo del icon y las clases del Link
                                    let iconoSrc = "/svg/bookWhite.svg"; 
                                    let linkClasses = "w-11/12 flex items-center justify-center absolute bottom-2 left-0 right-0 m-auto py-3 gap-2 text-white font-light text-xl bg-[#070E2B] mt-4 hover:bg-[#0D1D5F] transition duration-200"; // Clases predeterminadas del enlace
                                
                                    if (progreso === 100) {
                                        iconoSrc = "/svg/checkDarkBlue.svg";
                                        linkClasses = "w-11/12 flex items-center justify-center absolute bottom-2 left-0 right-0 m-auto py-3 gap-2 text-[#070E2B] font-light text-xl bg-white border border-[#070E2B] mt-4 hover:bg-[#E5E7EB] transition duration-200";
                                    }

                                    return (
                                        <div key={course.id_curso} className="shadow-lg shadow-black/60 relative w-[400px] h-[420px] sm:h-[392px]">
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
                                                <p className="text-lg font-medium text-[#0D1D5F]/80">{course.autor.nombre_completo}</p>
                                                <div className="flex items-center gap-x-2 mt-2 text-gray-600">
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
                                                    <div className="flex items-center gap-1">
                                                        <Image
                                                            src="/svg/class.svg"
                                                            alt="class-svg"
                                                            width={24}
                                                            height={24}
                                                            className=""
                                                        />
                                                        {course.totalClases}
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="flex justify-between w-full">
                                                        <p className="text-[#0D1D5F]/80">Progreso</p>
                                                        <p className="text-[#0D1D5F]/80">{progreso.toFixed(2)}%</p>
                                                    </div>
                                                    <div className="bg-gray-400 rounded-full h-1">
                                                        <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${progreso}%` }}></div>
                                                    </div>
                                                </div>
                                                <Link 
                                                    href={`/user/purchasedCourses/${course.id_curso}`} 
                                                    className={linkClasses}
                                                >
                                                    <Image
                                                        src={iconoSrc}
                                                        alt="course-progress-icon"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {botonTexto}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}