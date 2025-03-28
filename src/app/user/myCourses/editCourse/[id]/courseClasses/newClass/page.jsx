'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Swal from 'sweetalert2';

export default function NewCourse() {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const courseId = segments[segments.indexOf('editCourse') + 1]; // Obtener el Id del curso por la nueva url 
    const [selectedVideoFile, setSelectedVideoFile] = useState(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
      title: '',
      description: '',
      videoPreview: null,
    });

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
          Swal.fire("Error", "La imagen no debe superar los 100 MB.", "error");
          return;
        }
      
        // Mostrar vista previa de la imagen seleccionada
        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prevState) => ({
            ...prevState,
            videoPreview: reader.result, // Actualizamos la vista previa con la URL del archivo local
          }));
        };
        reader.readAsDataURL(file);
      
        setSelectedVideoFile(file); // Guardar el archivo para subirlo después
    };
    
    const uploadVideo = async () => { 
        if (!selectedVideoFile) return formData.videoPreview;
    
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
          const previewUrl = videoUrl.replace(/\.[\w]+$/, '.jpg'); // Obtener la URL de la imagen de vista previa
          return { videoUrl, previewUrl };
        } catch (error) {
          console.error("Error al subir el video:", error);
          return { videoUrl: formData.videoPreview, previewUrl: formData.videoPreview };
        }
    };

    const validateForm = () => {
      // Expresiones regulares de validación
      const alphanumericRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]*$/; // Alfanumérico con al menos una letra
      const scriptRegex = /<[^>]*script[^>]*>|<\/?[a-z][\s\S]*>/i; // Inyección de scripts

      // Validación del título
      if (!formData.title.trim()) return 'El Título es obligatorio.';
      if (formData.title.trim() !== formData.title) return 'El Título no debe tener espacios en blanco al inicio o al final.';
      if (formData.title.includes('  ')) return 'El Título no debe tener espacios en blanco dobles.';
      if (scriptRegex.test(formData.title)) return 'El Título no debe contener código HTML o scripts.';
      if (!alphanumericRegex.test(formData.title)) return 'El Título debe ser alfanumérico y contener al menos una letra.';

      // Validación de la descripción
      if (!formData.description.trim()) return 'La Descripción es obligatoria.';
      if (formData.description.trim() !== formData.description) return 'La Descripción no debe tener espacios en blanco al inicio o al final.';
      if (formData.description.includes('  ')) return 'La Descripción no debe tener espacios en blanco dobles.';
      if (!alphanumericRegex.test(formData.description)) return 'La Descripción debe ser alfanumérica y contener al menos una letra.';
      if (scriptRegex.test(formData.description)) return 'La Descripción no debe contener código HTML o scripts.';

      if (!selectedVideoFile) return 'El Video es obligatorio.';
      return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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

        const confirmation = await Swal.fire({
          title: 'Confirmación',
          text: `¿Seguro que quieres crear la clase "${formData.title}"?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, crear',
          cancelButtonText: 'Cancelar',
          cancelButtonColor: "red",
        });
    
        if (!confirmation.isConfirmed) {
            return; // Si el usuario cancela, no se continúa con la creación del curso
        }

        try {
          Swal.fire({
            title: 'Procesando...',
            text: 'Creando la clase.',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
          });

          const { videoUrl, previewUrl } = await uploadVideo();

          setFormData((prevState) => ({
            ...prevState,
            videoPreview: previewUrl,
          }))

          const formDataToSend = new FormData();
          formDataToSend.append('title', formData.title);
          formDataToSend.append('description', formData.description);
          formDataToSend.append('videoUrl', videoUrl);
          formDataToSend.append('courseId', courseId);

          const response = await fetch('/api/courses/course/class', {
            method: 'POST',
            body: formDataToSend,
          });

          if (!response.ok) throw new Error('Error al crear la clase');

          Swal.fire({
            icon: 'success',
            title: '¡Clase creada!',
            text: 'Tu clase se ha creado correctamente.',
          }).then(() => router.push(`/user/myCourses/editCourse/${courseId}/courseClasses`));
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error del Servidor',
            text: 'Hubo un problema al crear tu clase. Inténtalo más tarde.',
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

    return(
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-2xl sm:text-4xl text-[#0D1D5F]'>¡Crea el contenido del curso!</h2>
                    <p className='text-xl sm:text-2xl text-justify sm:text-left text-[#0D1D5F] font-light max-w-[600px]'>Crea el contenido de tu curso, ¡y añade tantas clases como quieras!</p>
                </section>
                <section className='p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                    <form action="" className='flex flex-col lg:flex-row lg:justify-between items-start gap-10'>
                        <div className='w-full lg:w-3/5'>
                            <div className='mb-10'>
                                <label htmlFor="title" className='text-2xl sm:text-4xl font-light text-white mb-2 block'>Título</label>
                                <div className='relative w-full lg:w-4/5'>
                                    <input 
                                        type="text"
                                        name='title'
                                        id='title' 
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                                        placeholder='Ingresa el título de la clase'
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
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                                        placeholder='Ingresa la descripción de la clase'
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
                                <label htmlFor="videoFile" className='text-2xl sm:text-4xl font-light text-white mb-2 block'>Video</label>
                                <div className='h-full relative'>
                                    <label htmlFor="videoFile" className='w-full h-full bg-transparent border focus:outline-none border-white text-white/60 block px-2 py-3 relative z-10 cursor-pointer'>
                                        Sube el video de la clase
                                        {formData.videoPreview && (
                                            <Image
                                                src={formData.videoPreview}
                                                alt="Vista previa del video"
                                                width={100} 
                                                height={100}
                                                className="w-full h-full object-cover absolute top-0 left-0 z-0"
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
                                      src="/svg/video.svg" 
                                      alt="video-svg" 
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
                                        onClick={handleSubmit}
                                    >
                                        <p className='hover:underline'>Crear clase</p>
                                        <Image 
                                            src="/svg/addWhite.svg" 
                                            alt="addWhite-svg" 
                                            width={40} 
                                            height={40} 
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}
