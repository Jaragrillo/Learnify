'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Swal from 'sweetalert2';
import EditClassSkeleton from '@/components/skeletons/EditClassSkeleton'
import { jwtDecode } from 'jwt-decode'
import jsCookie from 'js-cookie';

export default function EditClass() {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const courseId = segments[segments.indexOf('editCourse') + 1]; // Obtener el Id del curso por la URL 
    const classId = segments[segments.indexOf('editClass') + 1]; // Obtener el Id de la clase por la URL

    const [selectedVideoFile, setSelectedVideoFile] = useState(null);
    const router = useRouter();
    const [classData, setClassData] = useState({
        id_autor: '',
        id_clase: '',
        titulo: '',
        url_video: '',
        descripcion: '',
        duracion: 0,
        previewUrl: null,
    });
    const [originalClassData, setOriginalClassData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null); // Estado para almacenar el ID del usuario actual

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await fetch(`/api/courses/course/${courseId}`);
                const data = await response.json();
                const clase = data.clases.find(c => c.id_clase === parseInt(classId));
                if (clase) {
                    setClassData(clase);
                    setOriginalClassData(clase);
                } else {
                    Swal.fire('Error', 'Clase no encontrada.', 'error');
                    router.push(`/user/myCourses/editCourse/${courseId}/courseClasses`);
                }
                setIsLoading(false);
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar los datos de la clase. Intenta más tarde.', 'error');
                console.error(error);
                setIsLoading(false);
            }
        }

        fetchClassData();

        const token = jsCookie.get('auth-token');

        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            setCurrentUserId(userId); // Almacenar el ID del usuario actual
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            jsCookie.remove('auth-token');
            router.push('/login');
        }
    }, [courseId, classId, router]);

    const validateUserIsAuthor = () => {
        try {
            const courseAuthorId = originalClassData.id_autor;

            if (currentUserId !== courseAuthorId) {
                Swal.fire('Error', 'No tienes permiso para modificar esta clase.', 'error');
                router.push('/user/myCourses');
                return false;
            }

            return true;
        } catch (error) {
            Swal.fire('Error', 'Error de validación.', 'error');
            return false;
        }
    };

    const handleVideoFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return; // Si no hay archivo seleccionado, salir

        // Validar el tipo de archivo (aceptar solo imágenes)
        if (!file.type.startsWith("video/")) {
            Swal.fire("Error", "Por favor, selecciona un archivo de video válido.", "error");
            return;
        }

        // Validar tamaño del archivo (máximo 100 MB)
        const maxSize = 100 * 1024 * 1024; // 100 MB
        if (file.size > maxSize) {
            Swal.fire("Error", "El video no debe superar los 100 MB.", "error");
            return;
        }

        // Mostrar vista previa de la imagen seleccionada
        const reader = new FileReader();
        reader.onload = () => {
            setClassData((prevState) => ({
                ...prevState,
                previewUrl: reader.result, // Actualizamos la vista previa con la URL del archivo local
            }));
        };
        reader.readAsDataURL(file);

        setSelectedVideoFile(file); // Guardar el archivo para subirlo después
    };

    const uploadVideo = async () => {
        if (!selectedVideoFile) return { videoUrl: classData.url_video, previewUrl: classData.previewUrl };

        const videoData = new FormData();
        videoData.append("file", selectedVideoFile);
        videoData.append("upload_preset", "learnify-uploads"); // Configuración de Cloudinary

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/djsrfacsx/video/upload", {
                method: "POST",
                body: videoData,
            });
            const data = await response.json();
            const videoUrl = data.secure_url;
            const previewUrl = videoUrl.replace(/\.[\w]+$/, '.jpg');
            return { videoUrl, previewUrl }
        } catch (error) {
            console.error("Error al subir el video:", error);
            return { videoUrl: classData.url_video, previewUrl: classData.previewUrl };
        }
    };

    const validateForm = () => {
        // Expresiones regulares de validación
        const notOnlyNumbersRegex = /^(?!^\d+$).*$/;
        const scriptRegex = /<[^>]*script[^>]*>|<\/?[a-z][\s\S]*>/i; // Inyección de scripts

        // Validación del título
        if (!classData.titulo.trim()) return 'El Título es obligatorio.';
        if (classData.titulo.trim() !== classData.titulo) return 'El Título no debe tener espacios en blanco al inicio o al final.';
        if (classData.titulo.includes('  ')) return 'El Título no debe tener espacios en blanco dobles.';
        if (scriptRegex.test(classData.titulo)) return 'El Título no debe contener código HTML o scripts.';
        if (!notOnlyNumbersRegex.test(classData.titulo)) return 'El Título no puede contener solo números.';

        // Validación de la descripción
        if (!classData.descripcion.trim()) return 'La Descripción es obligatoria.';
        if (classData.descripcion.trim() !== classData.descripcion) return 'La Descripción no debe tener espacios en blanco al inicio o al final.';
        if (classData.descripcion.includes('  ')) return 'La Descripción no debe tener espacios en blanco dobles.';
        if (scriptRegex.test(classData.descripcion)) return 'La Descripción no debe contener código HTML o scripts.';
        if (!notOnlyNumbersRegex.test(classData.descripcion)) return 'La Descripción no puede contener solo números.';

        if (!classData.url_video && !selectedVideoFile) return 'El Video es obligatorio.';
        return null;
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        if (!validateUserIsAuthor()) {
            return; // Detener la función si la validación falla
        }

        try {
            const fieldNames = {
                titulo: "Título",
                descripcion: "Descripción",
                previewUrl: "Video de la clase"
            };

            const fieldsChanged = Object.keys(classData).filter(key => {
                return classData[key] !== originalClassData[key];
            });

            const changesMessage = fieldsChanged.map(field => `• ${fieldNames[field] || field}`).join("\n");

            if (fieldsChanged.length === 0) {
                Swal.fire("Sin cambios", "Debes realizar algún cambio antes de guardar.", "info");
                return;
            }

            const error = validateForm();
            if (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Validación',
                    text: error,
                    confirmButtonText: 'Entendido',
                });
                return;
            }

            Swal.fire({
                title: "¿Estás seguro?",
                text: `Estás realizando cambios en los siguientes campos: \n${changesMessage}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Guardar cambios",
                cancelButtonText: "Cancelar",
                cancelButtonColor: "red",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Procesando...',
                        text: 'Editando la clase.',
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading(),
                    });

                    const { videoUrl, previewUrl } = await uploadVideo();

                    const response = await fetch(`/api/courses/course/class/${classId}/editClass`, {
                        method: 'PUT',
                        headers: {  
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...classData,
                            url_video: videoUrl,
                            previewUrl: previewUrl,
                        }),
                    });

                    if (!response.ok) {
                        // Manejar errores de la API
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Error al editar la clase');
                    }

                    Swal.fire({
                        icon: 'success',
                        title: '¡Clase editada!',
                        text: 'Tu clase se ha editado correctamente.',
                    }).then(() => router.push(`/user/myCourses/editCourse/${courseId}/courseClasses`));
                }
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error del Servidor',
                text: error,
            });
        }
    };

    const handleGoBack = () => {
        Swal.fire({
            title: "¿Estás seguro de volver?",
            text: "Los cambios realizados no se guardarán si vuelves.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Volver",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "red",
        }).then((result) => {
            if (result.isConfirmed) {
                router.push(`/user/myCourses/editCourse/${courseId}/courseClasses`);
            }
        })
    }

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-2xl sm:text-4xl text-[#0D1D5F]'>¡Edita el contenido de tu curso!</h2>
                    <p className='text-xl sm:text-2xl text-justify sm:text-left text-[#0D1D5F] font-light max-w-[920px]'>Edita esta clase, cambia su título, descripción o video.</p>
                </section>
                <section className='p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                    {isLoading ? (
                        <EditClassSkeleton />
                    ) : (
                        <form className='flex flex-col lg:flex-row lg:justify-between items-start gap-10'>
                            <div className='w-full lg:w-3/5'>
                                <div className='mb-10'>
                                    <label htmlFor="title" className='text-2xl sm:text-4xl font-light text-white mb-2 block'>Título</label>
                                    <div className='relative w-full lg:w-4/5'>
                                        <input
                                            type="text"
                                            name='title'
                                            id='title'
                                            value={classData.titulo}
                                            onChange={(e) => setClassData({ ...classData, titulo: e.target.value })}
                                            placeholder='Ingresa el título del curso'
                                            className='bg-transparent border border-white px-2 py-3 text-white focus:outline-none focus:text-black w-full focus:bg-white placeholder:text-white/60 transition-all duration-300 ease-linear'
                                        />
                                        <Image
                                            src="/svg/write.svg"
                                            alt="write-svg"
                                            width={24}
                                            height={24}
                                            className="absolute top-0 bottom-0 right-5 m-auto"
                                        />
                                    </div>
                                </div>
                                <div className='mb-10'>
                                    <label htmlFor="description" className='text-2xl sm:text-4xl font-light text-white mb-2 block'>Descripción</label>
                                    <div className='relative w-full lg:w-4/5'>
                                        <textarea
                                            type="text"
                                            name='description'
                                            id='description'
                                            value={classData.descripcion}
                                            onChange={(e) => setClassData({ ...classData, descripcion: e.target.value })}
                                            placeholder='Ingresa la descripción del curso'
                                            className='bg-transparent border border-white px-2 py-3 max-h-20 min-h-20 resize-none text-white focus:outline-none focus:text-black w-full focus:bg-white placeholder:text-white/60 transition-all duration-300 ease-linear'
                                        />
                                        <Image
                                            src="/svg/write.svg"
                                            alt="write-svg"
                                            width={24}
                                            height={24}
                                            className="absolute top-3 right-5 m-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full lg:w-3/5 h-[550px] flex flex-col'>
                                <div className='h-3/5'>
                                    <label htmlFor="videoFile" className='text-2xl sm:text-4xl font-light text-white mb-2 block'>Portada</label>
                                    <div className='h-full relative'>
                                        <label htmlFor="videoFile" className='w-full h-full bg-transparent border focus:outline-none border-white text-white/60 block px-2 py-3 relative z-10 cursor-pointer'>
                                            Sube el video de la clase
                                            {classData.previewUrl && (
                                                <Image
                                                    src={classData.previewUrl}
                                                    alt="Vista previa de la portada"
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-full absolute top-0 left-0 z-0"
                                                />
                                            )}
                                        </label>
                                        <input
                                            type="file"
                                            name='videoFile'
                                            id='videoFile'
                                            onChange={handleVideoFileChange}
                                            accept='video/*'
                                            className='hidden'
                                        />

                                        <Image
                                            src="/svg/image.svg"
                                            alt="image-svg"
                                            width={219}
                                            height={219}
                                            className="absolute top-0 bottom-0 right-0 left-0 m-auto opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className='h-2/5 relative'>
                                    <div className='absolute bottom-0 right-0 flex flex-col flex-wrap-reverse'>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleGoBack();
                                            }}
                                            className='w-fit text-2xl font-light text-white flex items-center gap-2'
                                        >
                                            <p className='hover:underline'>Volver</p>
                                            <Image
                                                src="/svg/exit.svg"
                                                alt="exit-svg"
                                                width={35}
                                                height={35}
                                            />
                                        </button>
                                        <button
                                            className='w-fit text-2xl font-light text-white flex items-center gap-2'
                                            onClick={handleSaveChanges}
                                        >
                                            <p className='hover:underline'>Guardar cambios</p>
                                            <Image
                                                src="/svg/edit.svg"
                                                alt="edit-svg"
                                                width={40}
                                                height={40}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </section>
            </main>
        </>
    )
}
