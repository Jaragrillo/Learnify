'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2';

export default function NewCourse() {
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: '',
      price: '',
      coverImage: null,
    });

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

        fetchCategories();
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
          setFormData((prevState) => ({
            ...prevState,
            coverImage: reader.result, // Actualizamos la vista previa con la URL del archivo local
          }));
        };
        reader.readAsDataURL(file);
      
        setSelectedFile(file); // Guardar el archivo para subirlo después
    };
    
    const uploadImage = async () => { 
        if (!selectedFile) return formData.coverImage;
    
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
          return formData.coverImage;
        }
    };

    const validateForm = () => {
        if (!formData.title.trim()) return 'El Título es obligatorio.';
        if (!formData.description.trim()) return 'La Descripción es obligatoria.';
        if (!formData.category) return 'La Categoría es obligatoria.';
        if (!formData.price.trim() || parseFloat(formData.price) <= 0) return 'El Precio debe ser mayor a 0.';
        if (!formData.coverImage) return 'La Portada es obligatoria.';
        return true;
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

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('coverImage', formData.coverImage);

      try {
        Swal.fire({
          title: 'Procesando...',
          text: 'Creando el curso.',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const response = await fetch('/api/course', {
          method: 'POST',
          body: formDataToSend,
        });

        if (!response.ok) throw new Error('Error al crear el curso');
        
        Swal.fire({
          icon: 'success',
          title: '¡Curso creado!',
          text: 'Tu curso se ha creado correctamente.',
        }).then(() => router.push('/user/myCourses'));
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error del Servidor',
          text: 'Hubo un problema al crear tu curso. Inténtalo más tarde.',
        });
      }
    };

    return(
        <>
            <main>
                <section className="p-10">
                    <h2 className='text-4xl text-[#0D1D5F]'>¡Crea un nuevo curso!</h2>
                    <p className='text-2xl text-[#0D1D5F] font-light max-w-[600px]'>Comparte tus conocimientos y genera ingresos creando un nuevo curso.</p>
                </section>
                <section className='p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
                    <form action="" className='flex justify-between items-start'>
                        <div className='w-3/5'>
                            <div className='mb-10'>
                                <label htmlFor="title" className='text-4xl font-light text-white mb-2 block'>Título</label>
                                <div className='relative w-4/5'>
                                    <input 
                                        type="text"
                                        name='title'
                                        id='title' 
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
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
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
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
                                        value={formData.category} 
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                                        className='bg-transparent border border-white px-2 py-3 text-white focus:outline-none w-full'
                                    >
                                        <option value="">Selecciona la categoría del curso</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
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
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
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
                                    <label htmlFor="coverImage" className='w-full h-full bg-transparent border focus:outline-none border-white text-white/60 block px-2 py-3 relative z-10 cursor-pointer'>Sube la imagen de portada del curso</label>
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
                                    <Link href={'/user/myCourses'} className='w-fit text-2xl font-light text-white flex items-center gap-2'>
                                        Volver
                                        <Image 
                                        src="/svg/exit.svg" 
                                        alt="exit-svg" 
                                        width={35} 
                                        height={35} 
                                        className=""
                                        />
                                    </Link>
                                    <button 
                                        className='w-fit text-2xl font-light text-white flex items-center gap-2'
                                        onClick={handleSubmit}
                                    >
                                        Crear curso
                                        <Image 
                                            src="/svg/addWhite.svg" 
                                            alt="addWhite-svg" 
                                            width={40} 
                                            height={40} 
                                            className=""
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
