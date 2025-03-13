'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode';
import jsCookie from 'js-cookie';
import CoursePageSkeleton from "@/components/skeletons/CoursePageSkeleton";
import Swal from 'sweetalert2';

export default function purchasedCoursePage() {
    const pathname = usePathname();
    const id = pathname.split('/').pop(); // Obtener el ID de la ruta

    const [courseData, setCourseData] = useState({
        id_curso: '',
        titulo: '',
        img_portada: '',
        descripcion: '',
        precio: '',
        estudiantes: 0,
        autor: {
            id_autor: null,
            nombre_completo: '',
            foto_perfil: '',
            biografia: '',
        },
        clases: [],
        comentarios: [],
        valoracion: 'El curso no ha sido valorado',
        totalValoraciones: 0,
        categoria: '',
        nombreCategoria: '',
    });
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null); // Estado para almacenar el ID del usuario actual
    const [isAuthor, setIsAuthor] = useState(false); // Estado para verificar si el usuario es el autor

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`/api/courses/course/${id}`);
                const data = await response.json();

                // Ordenar las clases por id_clase
                const clasesOrdenadas = data.clases.sort((a, b) => a.id_clase - b.id_clase);
                setCourseData({ ...data, clases: clasesOrdenadas });

                setIsLoading(false);
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar los datos del curso. Intenta más tarde.', 'error');
                console.error(error);
                setIsLoading(false);
            }
        }
    
        fetchCourseData();

        const token = jsCookie.get('auth-token');

        if (!token) {
            return ;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            setCurrentUserId(userId); // Almacenar el ID del usuario actual
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            jsCookie.remove('auth-token');
        }
    }, [id]);

    if (isLoading) {
        return <CoursePageSkeleton />
    }

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Bienvenid@ al curso de {courseData.titulo}</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[920px]'>{courseData.descripcion}</p>
                    <p>{courseData.nombreCategoria}</p>
                </section>
                <section className="p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                    <h3 className="text-4xl mb-10 italic text-center">¡Comienza a aprender ahora!</h3>
                    <h3 className="text-3xl text-white mb-10">Clases del curso</h3>
                    <div className="relative pl-10">
                        <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white"></div>
                        {courseData && courseData.clases && courseData.clases.length > 0 ? (
                            courseData.clases.map((clase, index) => (
                                <div key={clase.id_clase} className="flex items-center gap-5 relative mb-14">
                                    <div className="absolute -left-9 top-0 bottom-0 my-auto rounded-full bg-white size-4"></div> {/* Círculo */}
                                    <div className="relative">
                                        {clase.url_video && (
                                            <Image
                                                src={clase.previewUrl}
                                                alt={`Portada de ${clase.titulo}`}
                                                width={320}
                                                height={180}
                                                className="shadow-lg shadow-black/60"
                                            />
                                        )}
                                        <div className="absolute bg-[#cee4f1] size-14 flex justify-center items-center -top-5 -right-5 rounded-full text-xl ">
                                            <p>#{index+1}</p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-light text-white/70">¡Clase no vista!</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl text-white mb-5">Clase #{index +1}: {clase.titulo}</h4>
                                        <div className="flex items-center gap-5">
                                            <Link 
                                                href={`/user/purchasedCourses/${courseId}/class/${clase.id_clase}`}
                                                className="text-[#0D1D5F] font-medium px-5 py-1 shadow-md shadow-black/60 bg-white rounded-lg block w-fit hover:scale-110 transition duration-500"
                                            >
                                                ¡Ver ahora!
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ): (
                            <p className="text-white/60 text-xl">Este curso aún no tiene clases.</p>
                        )}
                    </div>
                </section>
                <section>
                    <h3>¡Valora el curso!</h3>
                    <div>
                        <p>Tu opinión es muy importante para nosotros. Por favor, dedica unos minutos a compartir tu experiencia con este curso. Ten encuenta para evaluar:</p>
                        <div>
                            <div>
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={34} 
                                  height={34} 
                                />
                                <p>La claridad y calidad del contenido.</p>
                            </div>
                            <div>
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={34} 
                                  height={34} 
                                />
                                <p>La utilidad de la información presentada.</p>
                            </div>
                            <div>
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={34} 
                                  height={34} 
                                />
                                <p>La habilidad del instructor para explicar los temas.</p>
                            </div>
                            <div>
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={34} 
                                  height={34} 
                                />
                                <p>La relación entre el precio y el valor que recibiste.</p>
                            </div>
                        </div>
                        <p>¡Tu retroalimentación ayudará a otros estudiantes a tomar decisiones informadas y permitirá que el instructor mejore sus futuros cursos!</p>
                        <div>
                            <form action="">
                                input estrellas
                            </form>
                        </div>
                    </div>
                </section>
                <section className="p-10 bg-[#cee4f1]">
                    <h3 className="text-3xl text-[#0D1D5F] mb-10">Mira las experiencias de otros aprendices en el curso</h3>
                    <div>
                        <div className='mb-10'>
                            <form>
                                <div className='w-full bg-white p-5 shadow-md shadow-black/25'>
                                    <h4 className='font-light text-2xl text-[#0D1D5F] mb-2'>¿Qué opinas sobre este curso?</h4>
                                    <input type="text" placeholder="Escribe aquí tu comentario..." className='block py-2 mb-2 w-full focus:outline-none' />
                                    <button type="submit" className="px-3 py-2 bg-[#cee4f1] shadow-md shadow-black/25 hover:scale-110 transition duration-500">Comentar</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {courseData.comentarios.length > 0 ? (
                                courseData.comentarios.map((comentario) => {
                                    <div key={comentario.id_comentario} className="bg-white p-5 w-full">
                                        <div className="w-[80px] h-[80px] overflow-hidden rounded-full">
                                            <Image
                                                src={comentario.usuario.foto_perfil}
                                                alt={comentario.usuario.nombre_completo}
                                                width={80}
                                                height={80}
                                                className="rounded full"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-medium">{comentario.usuario.nombre_completo}</h4>
                                            <p className="text-xl text-[#0D1D5F]">{comentario.comentario}</p>
                                            <p className="text-[#0D1D5F]/60">{comentario.fecha_comentario}</p>
                                        </div>
                                    </div>
                                })
                            ) : (
                                <p className="text-gray-600">Aún no hay comentarios para este curso.</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}