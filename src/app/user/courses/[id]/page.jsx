'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function CoursePage() {
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
    const [sliderRef, setSliderRef] = useState(null);

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
    }, [id]);

    if (isLoading) {
        return <div>Cargando...</div>
    }

    // Botones del carrusel
    const PrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-[#070E2B] p-2 rounded-full shadow-md hover:bg-[#0D1D5F]"
        >
            <Image
                src="/svg/rightArrow.svg"
                alt="rightArrow-svg"
                width={24}
                height={24}
                className="rotate-180"
            />
        </button>
    );

    const NextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-[#070E2B] p-2 rounded-full shadow-md hover:bg-[#0D1D5F]"
        >
            <Image
                src="/svg/rightArrow.svg"
                alt="rightArrow-svg"
                width={24}
                height={24}
            />
        </button>
    );

    // Configuración del carrusel
    const carouselSettings = {
        dots: false,
        infinite: false, // Cambiado a false para que no sea infinito
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        beforeChange: (current, next) => {
            if (next === 0) {
                sliderRef.slickGoTo(0); // Vuelve al inicio si es el primer slide
            }
        },
    };

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
                            <p className="text-[#0D1D5F]">  
                                {courseData.totalValoraciones === 0
                                    ? "El curso aún no ha sido valorado"
                                    : `${courseData.totalValoraciones} estudiantes votaron`
                                }
                            </p>
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
                            <p className="text-[#0D1D5F]">
                                {courseData.estudiantes === 0
                                    ? "El curso aún no cuenta con estudiantes activos"
                                    : `${courseData.estudiantes} estudiantes activos`
                                }
                            </p>
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
                    <h3 className="text-3xl text-[#0D1D5F] mb-10">¡Conoce al creador del curso!</h3>
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
                <section className="h-screen p-10  bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                    <h3 className="text-3xl text-white mb-10">Clases del curso</h3>
                    <div className="relative">
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-[1px] bg-white z-0"></div> {/* Línea horizontal */}
                            <Slider {...carouselSettings} ref={setSliderRef} className={`z-10`}>
                                {courseData.clases.map((clase, index) => (
                                    <div key={clase.id_clase} className="px-10">
                                        <div className="p-4 bg-white shadow-md shadow-black/60 mx-2 relative">
                                            <Image
                                                src={clase.previewUrl}
                                                alt={`Portada de ${clase.titulo}`}
                                                width={320}
                                                height={180}
                                                className="mb-4 w-full shadow-md shadow-black/25"
                                            />
                                            <h4 className="text-xl font-semibold mb-2">{clase.titulo}</h4>
                                            <p className="text-gray-700 line-clamp-3">{clase.descripcion}</p>
                                            <div className="absolute bg-[#cee4f1] size-14 flex justify-center items-center -top-5 -right-5 rounded-full text-xl">
                                                <p>#{index+1}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    <Link href={'/user/courses'}>¡Compra el curso ahora!</Link>
                </section>
                <section className="p-10 bg-[#cee4f1]">
                    <h3 className="text-3xl text-[#0D1D5F] mb-10">Mira las experiencias de otros aprendices en el curso</h3>
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
                </section>
                <section className="p-20">
                    <Link href={'/user/courses'} className='text-3xl text-white px-5 py-1 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Empieza a aprender ya!</Link>
                </section>
            </main>
        </>
    )
}