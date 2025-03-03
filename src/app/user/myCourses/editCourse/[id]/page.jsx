'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2';
import EditCourseSkeleton from '@/components/skeletons/EditCourseSkeleton'

export default function EditCourse({ params: { id } }) {
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const router = useRouter();
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
    const [originalCourseData, setOriginalCourseData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories'); // Ruta para obtener categorías
                if (!response.ok) throw new Error('Error al cargar las categorías');
                const data = await response.json();
                setCategories(data); // Guardar categorías en el estado
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar las categorías. Intenta más tarde.', 'error');
                console.error(error);
            }
        };

        const fetchCourseData = async () => {
            try {
                const response = await fetch(`/api/courses/course/${id}`);
                const data = await response.json();
                setCourseData(data);
                setOriginalCourseData(data);
                setIsLoading(false);
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar los datos del curso. Intenta más tarde.', 'error');
                console.error(error);
                setIsLoading(false);
            }
        }

        fetchCategories();
        fetchCourseData();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return; // Si no hay archivo seleccionado, salir

        // Validar el tipo de archivo (aceptar solo imágenes)
        if (!file.type.startsWith("image/")) {
            Swal.fire("Error", "Por favor, selecciona un archivo de imagen válido.", "error");
            return;
        }

        // Validar tamaño del archivo (máximo 5 MB)
        const maxSize = 5 * 1024 * 1024; // 5 MB
        if (file.size > maxSize) {
            Swal.fire("Error", "La imagen no debe superar los 5 MB.", "error");
            return;
        }

        // Mostrar vista previa de la imagen seleccionada
        const reader = new FileReader();
        reader.onload = () => {
            setCourseData((prevState) => ({
                ...prevState,
                img_portada: reader.result, // Actualizamos la vista previa con la URL del archivo local
            }));
        };
        reader.readAsDataURL(file);

        setSelectedFile(file); // Guardar el archivo para subirlo después
    };

    const uploadImage = async () => {
        if (!selectedFile) return courseData.img_portada;

        const imageData = new FormData();
        imageData.append("file", selectedFile);
        imageData.append("upload_preset", "learnify-uploads"); // Configuración de Cloudinary

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/djsrfacsx/image/upload", {
                method: "POST",
                body: imageData,
            });
            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            return courseData.img_portada;
        }
    };

    const validateForm = () => {
        if (!courseData.titulo.trim()) return 'El Título es obligatorio.';
        if (!courseData.descripcion.trim()) return 'La Descripción es obligatoria.';
        if (!courseData.categoria) return 'La Categoría es obligatoria.';
        if (!courseData.precio.trim() || parseFloat(courseData.precio) <= 0) return 'El Precio debe ser mayor a 0.';
        if (!courseData.img_portada) return 'La Portada es obligatoria.';
        return null;
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const fieldNames = {
                titulo: "Título",
                descripcion: "Descripción",
                categoria: "Categoría",
                precio: "Precio",
                img_portada: "Imagen de portada"
            };

            const fieldsChanged = Object.keys(courseData).filter(key => {
                if (key === 'categoria') {
                    return courseData[key]?.id_categoria !== originalCourseData[key]?.id_categoria;
                }
                return courseData[key] !== originalCourseData[key];
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
                        text: 'Editando el curso.',
                        allowOutsideClick: false,
                        didOpen: () => Swal.showLoading(),
                    });

                    const coverImageUrl = await uploadImage();

                    const response = await fetch(`/api/courses/course/${id}/editCourse`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...courseData,
                            categoria: { id_categoria: courseData.categoria },
                            img_portada: coverImageUrl,
                        }),
                    });

                    if (!response.ok) throw new Error('Error al editar el curso');

                    Swal.fire({
                        icon: 'success',
                        title: '¡Curso editado!',
                        text: 'Tu curso se ha editado correctamente.',
                    }).then(() => router.push('/user/myCourses'));
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
                router.push("/user/myCourses");
            }
        })
    }

    return (
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>¡Edita tu curso!</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[920px]'>Corrige erorres, o, ¡añade información relevante que hayas pasado por alto! Recuerda, si quieres añadir contenido a tu curso entra en Clases.</p>
                </section>
                <section className='p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                    {isLoading ? (
                        <EditCourseSkeleton />
                    ) : (
                        <form className='flex justify-between items-start'>
                            <div className='w-3/5'>
                                <div className='mb-10'>
                                    <label htmlFor="title" className='text-4xl font-light text-white mb-2 block'>Título</label>
                                    <div className='relative w-4/5'>
                                        <input
                                            type="text"
                                            name='title'
                                            id='title'
                                            value={courseData.titulo}
                                            onChange={(e) => setCourseData({ ...courseData, titulo: e.target.value })}
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
                                    <label htmlFor="description" className='text-4xl font-light text-white mb-2 block'>Descripción</label>
                                    <div className='relative w-4/5'>
                                        <textarea
                                            type="text"
                                            name='description'
                                            id='description'
                                            value={courseData.descripcion}
                                            onChange={(e) => setCourseData({ ...courseData, descripcion: e.target.value })}
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
                                <div className='mb-10'>
                                    <label htmlFor="category" className='text-4xl font-light text-white mb-2 block'>Categoría</label>
                                    <div className='w-4/5'>
                                        <select
                                            name="category"
                                            id="category"
                                            value={courseData.categoria}
                                            onChange={(e) => setCourseData({ ...courseData, categoria: e.target.value })}
                                            className='bg-transparent border border-white px-2 py-3 text-white focus:outline-none w-full'
                                        >
                                            <option value="" className='text-black'>Selecciona la categoría del curso</option>
                                            {categories.map((category) => (
                                                <option key={category.id_categoria} value={category.id_categoria} className='text-black'>
                                                    {category.categoria}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="price" className='text-4xl font-light text-white mb-2 block'>Precio</label>
                                    <div className='relative w-4/5'>
                                        <input
                                            type="number"
                                            name='price'
                                            id='price'
                                            value={courseData.precio}
                                            onChange={(e) => setCourseData({ ...courseData, precio: e.target.value })}
                                            onKeyDown={(e) => { // Función para evitar caracteres no numericos que no son deseados
                                                if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder='Ingresa el precio del curso en COP'
                                            className='bg-transparent border border-white px-2 py-3 text-white focus:outline-none focus:text-black w-full focus:bg-white placeholder:text-white/60 transition-all duration-300 ease-linear [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        />
                                        <Image
                                            src="/svg/moneyWhite.svg"
                                            alt="moneyWhite-svg"
                                            width={24}
                                            height={24}
                                            className="absolute top-0 bottom-0 right-5 m-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='w-3/5 h-[550px] flex flex-col'>
                                <div className='h-3/5'>
                                    <label htmlFor="coverImage" className='text-4xl font-light text-white mb-2 block'>Portada</label>
                                    <div className='h-full relative'>
                                        <label htmlFor="coverImage" className='w-full h-full bg-transparent border focus:outline-none border-white text-white/60 block px-2 py-3 relative z-10 cursor-pointer'>
                                            Sube la imagen de portada del curso
                                            {courseData.img_portada && (
                                                <Image
                                                    src={courseData.img_portada}
                                                    alt="Vista previa de la portada"
                                                    width={100}
                                                    height={100}
                                                    className="w-full h-full absolute top-0 left-0 z-0"
                                                />
                                            )}
                                        </label>
                                        <input
                                            type="file"
                                            name='coverImage'
                                            id='coverImage'
                                            onChange={handleFileChange}
                                            accept='image/*'
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
                                        <Link
                                            href={"/user/myCourses/myCourse/courseClasses"}
                                            className='w-fit text-2xl font-light text-white flex items-center gap-2'
                                        >
                                            <p className='hover:underline'>Clases</p>
                                            <Image
                                                src="/svg/classWhite.svg"
                                                alt="classWhite-svg"
                                                width={40}
                                                height={40}
                                            />
                                        </Link>
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
