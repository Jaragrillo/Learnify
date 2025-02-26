import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function newCourse() {
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
                                <div className='relative'>
                                    <input 
                                        type="text"
                                        name='title'
                                        id='title' 
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
                                <div className='relative'>
                                    <input 
                                        type="text" 
                                        name='description'
                                        id='description'
                                        placeholder='Ingresa la descripción del curso'
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
                                <label htmlFor="category" className='text-4xl font-light text-white mb-2 block'>Categoría</label>
                                <div>
                                    <select name="category" id="category" className='bg-transparent border border-white px-2 py-3 text-white focus:outline-none w-full'>
                                        <option value="">Selecciona la categoría del curso</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="price" className='text-4xl font-light text-white mb-2 block'>Precio</label>
                                <div className='relative'>
                                    <input 
                                        type="number"
                                        name='price' 
                                        id='price' 
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
                        <div className='w-3/5 flex flex-col'>
                            <div className='relative h-1/2'>
                                <label htmlFor="coverImage" className='text-4xl font-light text-white mb-2 block'>Portada</label>
                                <div>
                                    <input 
                                        type="text" 
                                        name='coverImage'
                                        id='coverImage'
                                        placeholder='Sube la imagen de portada del curso'
                                        className='w-full h-full bg-transparent border focus:outline-none border-white placeholder:text-white/60'
                                    />
                                    <Image 
                                      src="/svg/image.svg" 
                                      alt="image-svg" 
                                      width={35} 
                                      height={35} 
                                      className="absolute top-0 bottom-0 right-0 left-0 m-auto"
                                    />
                                </div>
                            </div>

                            <div className='h-1/2'>
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
                                <button className='text-2xl w-fit font-light text-white flex items-center gap-2'>
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
                    </form>
                </section>
            </main>
        </>
    )
}
