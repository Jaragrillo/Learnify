'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode';
import jsCookie from 'js-cookie';
import CoursePageSkeleton from "@/components/skeletons/CoursePageSkeleton";
import Swal from 'sweetalert2';
import fullStar from '../../../../../public/svg/star.svg'
import emptyStar from '../../../../../public/svg/emptyStar.svg'

export default function purchasedCoursePage() {
    const pathname = usePathname();
    const id = pathname.split('/').pop(); // Obtener el ID de la ruta
    const router = useRouter();

    const [courseData, setCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null); // Estado para almacenar el ID del usuario actual
    const [isAuthor, setIsAuthor] = useState(false); // Estado para verificar si el usuario es el autor
    const [isStudent, setIsStudent] = useState(false); // Estado para verificar si el usuario es estudiante del curso
    const [isPurchaseChecking, setIsPurchaseChecking] = useState(true);
    const [comentario, setComentario] = useState('');
    const [rating, setRating] = useState(0); // Valoración seleccionada
    const [hoverRating, setHoverRating] = useState(0); // Valoración al pasar el mouse
    const [hasRated, setHasRated] = useState(false); // Estado para verificar si el usuario ya valoró el curso

    // Cargar información del curso
    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await fetch(`/api/courses/course/${id}?userId=${currentUserId}`);
                const data = await response.json();

                // Verificar si el usuario ya valoró el curso
                const userRating = data.valoraciones.length > 0 ? data.valoraciones[0].puntuacion : null;
                if (userRating) {
                    setRating(userRating);
                    setHasRated(true);
                }

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

        // Verificar compra del usuario logeado
        const checkPurchase = async () => {
            if (!currentUserId || !id || !courseData) {
                setIsPurchaseChecking(false);
                return;
            }

            try {
                const response = await fetch(`/api/courses/purchased?courseId=${id}&userId=${currentUserId}`);
                const data = await response.json();
                setIsStudent(data.purchased);
                console.log(isStudent);
            } catch (error) {
                console.error('Error checking purchase:', error);
            } finally {
                setIsPurchaseChecking(false);
            }
        };

        fetchCourseData();  

        if (currentUserId && courseData) {
            setIsAuthor(courseData.autor.id_autor === currentUserId);
            checkPurchase();
        }
    }, [id, currentUserId]);

    const reloadData = async () => {
        try {
            const response = await fetch(`/api/courses/course/${id}?userId=${currentUserId}`);
            if (response.ok) {
                const data = await response.json();

                // Verificar si el usuario ya valoró el curso
                const userRating = data.valoraciones.length > 0 ? data.valoraciones[0].puntuacion : null;
                if (userRating) {
                    setRating(userRating);
                    setHasRated(true);
                }

                const clasesOrdenadas = data.clases.sort((a, b) => a.id_clase - b.id_clase);
                setCourseData({ ...data, clases: clasesOrdenadas });
                setIsLoading(false);
            } else {
                Swal.fire('Error', 'No se pudieron cargar los datos del curso. Intenta más tarde.', 'error');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener datos del curso:', error);
            Swal.fire('Error', 'Ocurrió un error al cargar los datos del curso.', 'error');
            setIsLoading(false);
        }
    };

    // Alertas usuario no permitido
    useEffect(() => {
        if (!isLoading && courseData && !isPurchaseChecking) {
            if (isAuthor) {
                Swal.fire({
                    title: 'Acceso denegado',
                    text: 'Eres el autor de este curso.',
                    icon: 'warning',
                    confirmButtonText: 'Mis cursos',
                }).then(() => {
                    router.push('/user/myCourses');
                });
            } else if (!isStudent) {
                Swal.fire({
                    title: 'Acceso denegado',
                    text: 'Debes comprar el curso para ver su contenido.',
                    icon: 'warning',
                    confirmButtonText: 'Cursos comprados',
                }).then(() => {
                    router.push('/user/purchasedCourses');
                });
            }
        }
    }, [isLoading, isAuthor, isStudent, router, isPurchaseChecking]);

    // Manejo de la creación de comentarios
    const handleComentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const handleSubmitComentario = async (e) => {
        e.preventDefault();

        if (!comentario.trim()) {
            Swal.fire('Error', 'Por favor, escribe un comentario.', 'error');
            return;
        }

        Swal.fire({
            title: '¿Seguro que quieres publicar este comentario?',
            text: "Tu comentario será visible para otros usuarios.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, publicar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Publicando comentario...',
                    html: 'Por favor, espera...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    willOpen: () => {
                        Swal.showLoading(); 
                    },
                    didOpen: async () => {
                        try {
                            const response = await fetch('/api/comment', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    comentario: comentario,
                                    id_curso: id,
                                    id_usuario: currentUserId,
                                }),
                            });

                            if (response.ok) {
                                Swal.fire('Comentario publicado', 'Tu comentario ha sido publicado con éxito.', 'success');
                                setComentario(''); // Limpiar el campo de comentario
                                // Recargar los datos del curso para mostrar el nuevo comentario
                                reloadData();
                            } else {
                                Swal.fire('Error', 'No se pudo publicar el comentario. Inténtalo de nuevo.', 'error');
                            }
                        } catch (error) {
                            console.error('Error al publicar el comentario:', error);
                            Swal.fire('Error', 'Ocurrió un error al publicar el comentario.', 'error');
                        }
                    }
                });
            }
        });
    };

    // Manejo de la valoración
    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };
    
    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleRatingClick = async (value) => {
        setRating(value);
    
        Swal.fire({
            title: 'Valorando curso...',
            html: 'Por favor, espera...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
            didOpen: async () => {
                try {
                    const response = await fetch('/api/rating', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id_curso: id,
                            id_usuario: currentUserId,
                            valoracion: value,
                        }),
                    });
    
                    if (response.ok) {
                        Swal.fire('Curso valorado', 'Tu valoración ha sido registrada con éxito.', 'success');
                        setHasRated(true); // Actualizar el estado para indicar que el usuario ya valoró
                        reloadData(); // Recargar los datos del curso para reflejar la valoración
                    } else {
                        Swal.fire('Error', 'No se pudo registrar la valoración. Inténtalo de nuevo.', 'error');
                    }
                } catch (error) {
                    console.error('Error al registrar la valoración:', error);
                    Swal.fire('Error', 'Ocurrió un error al registrar la valoración.', 'error');
                }
            }
        });
    };

    const StarRating = ({ rating, hoverRating, onClick, onMouseEnter, onMouseLeave, disabled }) => {
        return (
            <div className="flex items-center gap-10 mt-5">
                {[...Array(5)].map((_, index) => {
                    const value = index + 1;
                    return (
                        <Image
                            key={value}
                            src={value <= (hoverRating || rating) ? fullStar : emptyStar}
                            alt="star"  
                            width={50}
                            height={50}
                            className={`cursor-pointer drop-shadow-star ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
                            onClick={() => !disabled && onClick(value)}
                            onMouseEnter={() => !disabled && onMouseEnter(value)}
                            onMouseLeave={() => !disabled && onMouseLeave()}
                        />
                    );
                })}
            </div>
        );
    };

    if (isLoading) {
        return <CoursePageSkeleton />
    }

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>Bienvenid@ al curso de {courseData.titulo}</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[920px]'>{courseData.descripcion}</p>
                    <p className="text-2xl text-[#0D1D5F]/50 italic font-light">Categoría: {courseData.nombreCategoria}</p>
                </section>
                <section className="p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                    <h3 className="text-4xl mb-10 italic text-white font-medium text-center">¡Comienza a aprender ahora!</h3>
                    <h3 className="text-3xl text-white mb-10">Clases del curso</h3>
                    <div className="relative pl-10">
                        <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white"></div>
                        {courseData && courseData.clases && courseData.clases.length > 0 ? (
                            courseData.clases.map((clase, index) => (
                                <div key={clase.id_clase} className="flex items-center gap-5 relative mb-14">
                                    <div className="absolute -left-9 top-0 bottom-0 my-auto rounded-full bg-white size-4"></div> {/* Círculo */}
                                    <div className="relative">
                                        <div>
                                            <p className="text-xl font-light italic text-white/70 mb-1">¡Clase no vista!</p>
                                        </div>
                                        {clase.url_video && (
                                            <div className="relative">
                                                <Image
                                                    src={clase.previewUrl}
                                                    alt={`Portada de ${clase.titulo}`}
                                                    width={350}
                                                    height={210}
                                                    className="shadow-lg shadow-black/60"
                                                />
                                                <div className="absolute bg-[#cee4f1] size-14 flex justify-center items-center -top-5 -right-5 rounded-full text-xl ">
                                                    <p>#{index+1}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl text-white mb-5 font-light"><span className="font-normal">Clase #{index +1}:</span> {clase.titulo}</h4>
                                        <div className="flex items-center gap-5">
                                            <Link 
                                                href={`/user/purchasedCourses/${courseData.id_curso}/class/${clase.id_clase}`}
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
                <section className="p-10">
                    <h3 className="text-3xl text-[#0D1D5F] mb-10">¡Valora el curso!</h3>
                    <div className="mx-auto shadow-lg shadow-black/60 p-5 text-white font-extralight bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                        <p className="text-2xl test-justify">Tu opinión es muy importante para nosotros. Por favor, dedica unos minutos a compartir tu experiencia con este curso. Ten encuenta para evaluar:</p>
                        <div>
                            <div className="flex items-center gap-1 my-4">
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={40} 
                                  height={40} 
                                />
                                <p className="text-2xl">La claridad y calidad del contenido.</p>
                            </div>
                            <div className="flex items-center gap-1 my-4">
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={40} 
                                  height={40} 
                                />
                                <p className="text-2xl">La utilidad de la información presentada.</p>
                            </div>
                            <div className="flex items-center gap-1 my-4">
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={40} 
                                  height={40} 
                                />
                                <p className="text-2xl">La habilidad del instructor para explicar los temas.</p>
                            </div>
                            <div className="flex items-center gap-1 my-4">
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={40} 
                                  height={40} 
                                />
                                <p className="text-2xl">La relación entre el precio y el valor que recibiste.</p>
                            </div>
                        </div>
                        <p className="text-2xl text-justify">¡Tu retroalimentación ayudará a otros estudiantes a tomar decisiones informadas y permitirá que el instructor mejore sus futuros cursos!</p>
                        <div>
                            <form>
                                <StarRating
                                    rating={rating}
                                    hoverRating={hoverRating}
                                    onClick={handleRatingClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    disabled={hasRated}
                                />
                            </form>
                        </div>
                    </div>
                </section>
                <section className="p-10 bg-[#cee4f1]">
                    <h3 className="text-3xl text-[#0D1D5F] mb-10">Mira las experiencias de otros aprendices en el curso</h3>
                    <div>
                        <div className='mb-10'>
                            <form onSubmit={handleSubmitComentario}>
                                <div className='w-full bg-white p-5 shadow-md shadow-black/25'>
                                    <h4 className='font-light text-2xl text-[#0D1D5F] mb-2'>¿Qué opinas sobre este curso?</h4>
                                    <input 
                                        type="text" 
                                        placeholder="Escribe aquí tu comentario..." 
                                        className='block py-2 mb-2 w-full focus:outline-none' 
                                        value={comentario}
                                        onChange={handleComentarioChange}
                                    />
                                    <button type="submit" className="px-3 py-2 bg-[#cee4f1] shadow-md shadow-black/25 hover:scale-110 transition duration-500">Comentar</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            {courseData.comentarios.length > 0 ? (
                                courseData.comentarios.map((comentario) => (
                                    <div key={comentario.id_comentario} className="bg-white p-5 w-full mb-5 shadow-lg shadow-black/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-[100px] h-[100px] overflow-hidden rounded-full">
                                                <Image
                                                    src={comentario.usuario.foto_perfil}
                                                    alt={`${comentario.usuario.nombre}-${comentario.usuario.apellidos}-ProfileImage`}
                                                    width={100}
                                                    height={100}
                                                    className="rounded full"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-medium text-[#0D1D5F]">{`${comentario.usuario.nombre} ${comentario.usuario.apellidos}`}</h4>
                                                <p className="text-xl text-[#0D1D5F]">{comentario.comentario}</p>
                                                <p className="text-[#0D1D5F]/60">{comentario.fecha_comentario}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
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