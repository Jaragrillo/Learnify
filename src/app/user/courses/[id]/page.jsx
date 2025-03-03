'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function CoursePage({ params: { id } }) {
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
                const response = await fetch(`/api/courses/course/${id}`);
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
    }, []);

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>{courseData.titulo}</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[920px]'>{courseData.descripcion}</p>
                </section>
                <section className="p-10 bg-[#cee4f1]">
                    <h3 className="text-3xl text-[#0D1D5F] mb-10">Información sobre el curso</h3>
                    <div className="flex justify-between">
                        <div className="bg-white w-[265px] h-[315px] text-center py-10 shadow-lg shadow-black/50">
                            <h4 className="text-3xl mb-3 text-[#0D1D5F]">Valoración</h4>
                            <Image
                                src="/svg/star.svg"
                                alt="star-svg"
                                width={88}
                                height={88}
                                className="block m-auto mb-3"
                            />
                            <p className="text-2xl text-[#0D1D5F] font-medium mb-3">{courseData.valoracion}</p>
                            <p className="text-[#0D1D5F]">{courseData.totalValoraciones} estudiantes votaron</p>
                        </div>
                        <div className="bg-white w-[265px] h-[315px] text-center py-10 shadow-lg shadow-black/50">
                            <h4 className="text-3xl mb-3 text-[#0D1D5F]">Estudiantes</h4>
                            <Image
                                src="/svg/studentDarkBlue.svg"
                                alt="studentDarkBlue-svg"
                                width={88}
                                height={88}
                                className="block m-auto mb-3"
                            />
                            <p className="text-2xl text-[#0D1D5F] font-medium mb-3">{courseData.estudiantes}</p>
                            <p className="text-[#0D1D5F]">{courseData.estudiantes} estudiantes activos</p>
                        </div>
                        <div className="bg-white w-[265px] h-[315px] text-center py-10 shadow-lg shadow-black/50">
                            <h4 className="text-3xl mb-3 text-[#0D1D5F]">Categoría</h4>
                            <Image
                                src="/svg/category.svg"
                                alt="category-svg"
                                width={88}
                                height={88}
                                className="block m-auto mb-3"
                            />
                            <p className="text-2xl text-[#0D1D5F] font-medium mb-3">{courseData.nombreCategoria}</p>
                            <Link href={'user/categories'} className="text-[#0D1D5F] underline">¡Más de la misma categoría!</Link>
                        </div>
                        <div className="bg-white w-[265px] h-[315px] text-center py-10 shadow-lg shadow-black/50">
                            <h4 className="text-3xl mb-3 text-[#0D1D5F]">Precio</h4>
                            <Image
                                src="/svg/money.svg"
                                alt="money-svg"
                                width={88}
                                height={88}
                                className="block m-auto mb-3"
                            />
                            <p className="text-2xl text-[#0D1D5F] font-medium mb-3">
                                ${Number(courseData.precio).toLocaleString('es-CO', { minimumFractionDigits: 0 })}
                            </p>
                            <Link href={'/user/courses'} className='text-xl text-white px-5 py-1 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Compra ahora!</Link>
                        </div>
                    </div>
                </section>
                <section className="p-10">
                    <h3 className="text-2xl text-[#0D1D5F] mb-10">¡Conoce al creador del curso!</h3>
                    <div className="p-10 flex items-center shadow-lg shadow-black/50 mx-auto w-3/4 h-[400px]">
                        <div className="w-[200px] h-[200px] overflow-hidden rounded-full">
                            <Image
                                src={courseData.autor.foto_perfil}
                                alt={courseData.autor.nombre_completo}
                                width={200}
                                height={200}
                                className="rounded full"
                            />
                        </div>
                        <div>
                            <h4 className="text-2xl text-[#0D1D5F] font-medium">{courseData.autor.nombre_completo}</h4>
                            <p className="text-xl text-[#0D1D5F]">{courseData.autor.biografia}</p>
                        </div>
                    </div>
                </section>
                <section className="h-screen bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                    <h3>Clases del curso</h3>
                    <div>CARRUSEL CLASES</div>
                    <Link href={'/user/courses'}>¡Compra el curso ahora!</Link>
                </section>
                <section className="p-10 bg-[#cee4f1]">
                    <h3 className="text-2xl text-[#0D1D5F] mb-10">Mira las experiencias de otros aprendices en el curso</h3>
                    <div>
                        {courseData.comentarios.map((comentario) => {
                            <div key={comentario.id_comentario} className="bg-white p-5">
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
                        })}
                    </div>
                </section>
                <section className="p-20">
                    <Link href={'/user/courses'} className='text-3xl text-white px-5 py-1 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Empieza a aprender ya!</Link>
                </section>
            </main>
        </>
    )
}