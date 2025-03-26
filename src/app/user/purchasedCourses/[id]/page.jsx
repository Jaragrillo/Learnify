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
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable'

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
    const [clasesVistas, setClasesVistas] = useState({}); // Estado para rastrear las clases vistas

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

        fetchCourseData();
    }, [id, currentUserId]);

    // Verificar si el usuario es el autor
    useEffect(() => {
        if (currentUserId && courseData) {
            setIsAuthor(courseData.autor.id_autor === currentUserId);
        }
    }, [currentUserId, courseData]);

    // Verificar compra del usuario logeado
    useEffect(() => {
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


        if (currentUserId && courseData) {
            checkPurchase();
        }
    }, [currentUserId, courseData, id]);

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
    }, [isLoading, isAuthor, isStudent, router, isPurchaseChecking, courseData]);

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
            <div className="flex items-center gap-5 sm:gap-10 mt-5">
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

    // Función para crear el pdf de la factura de la compra del curso
    const handleDownloadPurchaseInvoice = async () => {
        try {
            Swal.fire({
                title: 'Descargando factura...',
                html: 'Por favor, espera...',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                },
            });

            // Importar jspdf-autotable dinámicamente
            await import('jspdf-autotable');

            // Obtener la factura y el detalle de la factura desde la API
            const response = await fetch(`/api/invoice?userId=${currentUserId}&courseId=${id}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener la factura.');
            }
            const invoiceData = await response.json();

            // Crear el documento PDF
            const doc = new jsPDF();

            // Añadir contenido al PDF
            doc.text('Factura de Compra', 10, 10);
            doc.text(`ID Factura: ${invoiceData.factura.id_factura}`, 10, 20);
            doc.text(`Fecha: ${new Date(invoiceData.factura.fecha_factura).toLocaleDateString()}`, 10, 30);
            doc.text(`Cliente: ${invoiceData.cliente.nombre} ${invoiceData.cliente.apellidos}`, 10, 40);
            doc.text(`Curso: ${courseData.titulo}`, 10, 50);
            doc.text(`Total: ${invoiceData.factura.total}`, 10, 60);

            // Crear tabla de detalle de factura
            const columns = ['ID Detalle', 'Curso', 'Cantidad', 'Precio Unitario', 'Subtotal'];
            const rows = invoiceData.detalle.map(item => [
                item.id_detalle,
                courseData.titulo,
                item.cantidad,
                item.precio_unitario,
                item.cantidad * item.precio_unitario,
            ]);

            autoTable(doc, {
                head: [columns],
                body: rows,
                startY: 70,
            });

            // Descargar el PDF
            doc.save(`Factura_${invoiceData.factura.id_factura}.pdf`);

            Swal.close();
        } catch (error) {
            console.error('Error al generar la factura:', error);
            Swal.fire('Error', 'No se pudo generar la factura. Inténtalo de nuevo.', 'error');
        }
    };

    // Manejo del progreso del curso
    // Cargar el progreso del curso desde localStorage al montar el componente
    useEffect(() => {
        const progresoGuardado = getCourseProgress(id);
        if (progresoGuardado) {
            setClasesVistas(progresoGuardado.clasesVistas || {});
        }
    }, [id]);

    const handleMarcarVista = (claseId) => {
        const nuevasClasesVistas = { ...clasesVistas, [claseId]: !clasesVistas[claseId] };
        setClasesVistas(nuevasClasesVistas);

        // Actualizar el progreso en localStorage
        const progresoActualizado = { clasesVistas: nuevasClasesVistas };
        saveCourseProgress(id, progresoActualizado);
    };

    const calcularProgreso = () => {
        if (!courseData || !courseData.clases) return 0;

        const totalClases = courseData.clases.length;
        const clasesVistasCount = Object.values(clasesVistas).filter(visto => visto).length;
        return (clasesVistasCount / totalClases) * 100;
    };

    const getCourseProgress = (courseId) => {
        const progresoData = localStorage.getItem(`courseProgress_${courseId}`);
        return progresoData ? JSON.parse(progresoData) : null;
    };

    const saveCourseProgress = (courseId, progresoData) => {
        localStorage.setItem(`courseProgress_${courseId}`, JSON.stringify(progresoData));
    };

    if (isLoading) {
        return <CoursePageSkeleton />
    }

    return (
        <>
            <main>
                <section className="p-10 relative">
                    <h2 className='text-2xl sm:text-4xl text-justify sm:text-left text-[#0D1D5F]'>Bienvenid@ al curso de {courseData.titulo}</h2>
                    <p className='text-xl sm:text-2xl text-justify sm:text-left text-[#0D1D5F] font-light max-w-[920px]'>{courseData.descripcion}</p>
                    <p className="text-xl sm:text-2xl text-justify sm:text-left mb-5 sm:mb-0 text-[#0D1D5F]/50 italic font-light">Categoría: {courseData.nombreCategoria}</p>
                    <button 
                      className="flex items-center gap-1 group absolute bottom-1 right-1 opacity-50"
                      onClick={handleDownloadPurchaseInvoice}
                    >
                      <p className="text-lg sm:text-xl group-hover:underline text-[#0D1D5F]">Descargar factura</p>
                      <Image 
                          src="/svg/downloadDarkBlue.svg" 
                          alt="downloadDarkBlue-svg" 
                          width={50} 
                          height={50} 
                      />
                    </button>
                </section>
                <section className="p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
                    <h3 className="text-2xl sm:text-4xl mb-10 italic text-white font-medium text-center">¡Comienza a aprender ahora!</h3>
                    <h3 className="text-xl sm:text-3xl text-white mb-10">Clases del curso</h3>
                    <div className="relative pl-10">
                        <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white"></div>
                        {courseData && courseData.clases && courseData.clases.length > 0 ? (
                            courseData.clases.map((clase, index) => (
                                <div key={clase.id_clase} className={`flex flex-col lg:flex-row lg:items-center gap-7 relative mb-14 ${clasesVistas[clase.id_clase] ? 'opacity-50 transition-all duration-500' : 'opacity-100 transition-all duration-500'}`}>
                                    <div className="absolute -left-9 top-0 bottom-0 my-auto rounded-full bg-white size-4"></div> {/* Círculo */}
                                    <div className="relative">
                                        <div>
                                            <p className="text-lg sm:text-xl font-light italic text-white/70 mb-1">{clasesVistas[clase.id_clase] ? '¡Clase vista!' : '¡Clase no vista!'}</p>
                                        </div>
                                        {clase.url_video && (
                                            <div className="relative w-fit">
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
                                        <h4 className="text-lg sm:text-2xl text-white mb-5 font-light"><span className="font-normal">Clase #{index +1}:</span> {clase.titulo}</h4>
                                        <div>
                                            <Link 
                                                href={`/user/purchasedCourses/${courseData.id_curso}/class/${clase.id_clase}`}
                                                className="text-[#0D1D5F] font-medium mb-5 px-5 py-1 shadow-md shadow-black/60 bg-white rounded-lg block w-fit hover:scale-110 transition duration-500"
                                            >
                                                ¡Ver ahora!
                                            </Link>
                                            <label className="flex items-center gap-2 cursor-pointer w-fit">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-blue-600"
                                                    checked={clasesVistas[clase.id_clase] || false}
                                                    onChange={() => handleMarcarVista(clase.id_clase)}
                                                />
                                                <span className="text-white">Marcar como vista</span>
                                            </label>
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
                        <p className="text-lg sm:text-2xl text-justify">Tu opinión es muy importante para nosotros. Por favor, dedica unos minutos a compartir tu experiencia con este curso. Ten encuenta para evaluar:</p>
                        <div>
                            <div className="flex items-center gap-1 my-4">
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={40} 
                                  height={40} 
                                />
                                <p className="text-lg sm:text-2xl">La claridad y calidad del contenido.</p>
                            </div>
                            <div className="flex items-center gap-1 my-4">
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={40} 
                                  height={40} 
                                />
                                <p className="text-lg sm:text-2xl">La utilidad de la información presentada.</p>
                            </div>
                            <div className="flex items-center gap-1 my-4">
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={40} 
                                  height={40} 
                                />
                                <p className="text-lg sm:text-2xl">La habilidad del instructor para explicar los temas.</p>
                            </div>
                            <div className="flex items-center gap-1 my-4">
                                <Image 
                                  src="/svg/check.svg" 
                                  alt="check-svg" 
                                  width={40} 
                                  height={40} 
                                />
                                <p className="text-lg sm:text-2xl">La relación entre el precio y el valor que recibiste.</p>
                            </div>
                        </div>
                        <p className="text-lg sm:text-2xl text-justify">¡Tu retroalimentación ayudará a otros estudiantes a tomar decisiones informadas y permitirá que el instructor mejore sus futuros cursos!</p>
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
                    <h3 className="text-xl sm:text-3xl text-justify sm:text-left text-[#0D1D5F] mb-10">Mira las experiencias de otros aprendices en el curso. ¡Ahora puedes compartir la tuya!</h3>
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
                                courseData.comentarios.map((comentario, index) => (
                                    <div key={index} className="bg-white p-5 w-full mb-5 shadow-lg shadow-black/50">
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
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
                                                <h4 className="text-lg sm:text-2xl font-medium text-[#0D1D5F]">{`${comentario.usuario.nombre} ${comentario.usuario.apellidos}`}</h4>
                                                <p className="text-sm sm:text-xl text-justify sm:text-left text-[#0D1D5F]">{comentario.comentario}</p>
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