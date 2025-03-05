'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

export default function CoursePage() {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const courseId = segments[segments.indexOf('editCourse') + 1]; // Obtener el Id del curso por la nueva url 

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

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`/api/courses/course/${courseId}`);
                const data = await response.json();
                setCourseData(data);
                setIsLoading(false);
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar los datos del curso. Intenta más tarde.', 'error');
                console.error(error);
                setIsLoading(false);
            }
        }
    
        fetchCourseData();
    }, [courseId]);

    const handleDeleteClass = async (classId) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la clase permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/courses/course/class/${classId}/deleteClass`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error al eliminar la clase');
                    }

                    Swal.fire('Eliminado', 'La clase ha sido eliminada.', 'success');
                    // Recargar los datos del curso después de eliminar la clase.
                    const responseNew = await fetch(`/api/courses/course/${courseId}`);
                    const data = await responseNew.json();
                    setCourseData(data);

                } catch (error) {
                    Swal.fire('Error', error.message, 'error');
                }
            }
        });
    };

    if (isLoading) {
        return <div>Cargando...</div>
    }

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>¡Edita tu curso!</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[920px]'>Corrige erorres, o, ¡añade información relevante que hayas pasado por alto! Recuerda, si quieres añadir contenido a tu curso entra en Clases.</p>
                </section>
                <section className="p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
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
                                    </div>
                                    <div>
                                        <h4 className="text-2xl text-white mb-5">Clase #{index +1}: {clase.titulo}</h4>
                                        <div className="flex items-center gap-5">
                                            <Link 
                                                href={`/user/myCourses/editCourse/${courseId}/courseClasses/editClass/${clase.id_clase}`}
                                                className="text-[#0D1D5F] font-medium px-5 py-1 shadow-md shadow-black/60 bg-white rounded-lg block w-fit hover:scale-110 transition duration-500"
                                            >
                                                Editar clase
                                            </Link>
                                            <button 
                                                onClick={() => handleDeleteClass(clase.id_clase)} // Pasa el ID de la clase
                                                className="text-red-700 font-medium px-5 py-1 shadow-md shadow-black/60 bg-white rounded-lg block w-fit hover:scale-110 transition duration-500"
                                            >
                                                Eliminar clase
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ): (
                            <p className="text-white/60 text-xl">Este curso aún no tiene clases. ¡Crea la primera clase haciendo clic en Agregar clase!</p>
                        )}
                    </div>

                    <div className='h-[100px] relative'>
                        <div className='absolute bottom-0 right-0 flex flex-col flex-wrap-reverse'>
                            <Link
                                href={`/user/myCourses/editCourse/${courseId}/`}
                                className='w-fit text-2xl font-light text-white flex items-center gap-2'
                            >
                                <p className='hover:underline'>Volver</p>
                                <Image
                                    src="/svg/exit.svg"
                                    alt="exit-svg"
                                    width={35}
                                    height={35}
                                />
                            </Link>

                            <Link
                                href={`/user/myCourses/editCourse/${courseId}/courseClasses/newClass`}
                                className='w-fit text-2xl font-light text-white flex items-center gap-2'
                            >
                                <p className='hover:underline'>Agregar clase</p>
                                <Image
                                    src="/svg/addWhite.svg"
                                    alt="addWhite-svg"
                                    width={40}
                                    height={40}
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}