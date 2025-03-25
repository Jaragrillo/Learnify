'use client'

import React, { useState } from 'react'
import categoriesData from '@/utils/categoriesData.json'
import categoriesFaqs from '@/utils/FAQs/categoriesFaqsData.json'
import Link from 'next/link'
import Image from 'next/image'

export default function page() {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
      setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
    }

  return (
    <>
        <main>
            <section className='p-10'>
                <h2 className='text-2xl sm:text-4xl text-[#0D1D5F]'>Explora Nuestras Categorías</h2>
                <p className='text-xl sm:text-2xl text-justify sm:text-left text-[#0D1D5F] font-light max-w-[600px]'>Descubre una amplia gama de cursos en diversas áreas de conocimiento.</p>
                <div className='flex flex-wrap justify-center sm:justify-between my-10'>
                    {
                        categoriesData.categories.map((categorie) => (
                            <div key={categorie.categorie}>
                                <Link href={`${categorie.link}`}>
                                    <div className='text-white w-[290px] bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] shadow-lg shadow-black/60 mb-10 py-5 px-3 hover:scale-105 transition duration-300'>
                                        <p className='text-xl'>{categorie.categorie}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </section>
            <section className='bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] px-10 py-20'>
                <h2 className='text-4xl text-white text-center mb-20'>Categorías destacadas</h2>
                <div className='flex flex-wrap gap-5 justify-center md:justify-between'>
                    <div className='w-[370px] h-[400px] sm:h-[375px] bg-white shadow-lg shadow-black/60 p-5'>
                        <div className='bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] p-5 mb-3'>
                            <Image
                                src="/svg/programming.svg"
                                alt="programming-svg"
                                width={59}
                                height={59}
                            />
                            <h3 className='text-3xl text-white'>Programación</h3>
                        </div>
                        <p className='text-lg sm:text-xl text-justify font-light text-[#0D1D5F] mb-5'>Aprende lenguajes como Python, JavaScript y más para desarrollar software, sitios web y aplicaciones móviles.</p>
                        <Link href={"/categories/programmation"} className='bg-[#0D1D5F] text-white px-2 py-3 block w-fit hover:scale-105 transition duration-300'>Explorar cursos</Link>
                    </div>
                    <div className='w-[370px] h-[400px] sm:h-[375px] bg-white shadow-lg shadow-black/60 p-5'>
                        <div className='bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] p-5 mb-3'>
                            <Image
                                src="/svg/design.svg"
                                alt="design-svg"
                                width={59}
                                height={59}
                            />
                            <h3 className='text-3xl text-white'>Diseño</h3>
                        </div>
                        <p className='text-lg sm:text-xl text-justify font-light text-[#0D1D5F] mb-5'>Explora diseño gráfico, UX/UI y herramientas creativas para transformar ideas en vivencias visuales impactantes.</p>
                        <Link href={"/categories/design"} className='bg-[#0D1D5F] text-white px-2 py-3 block w-fit hover:scale-105 transition duration-300'>Explorar cursos</Link>
                    </div>
                    <div className='w-[370px] h-[400px] sm:h-[375px] bg-white shadow-lg shadow-black/60 p-5'>
                        <div className='bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] p-5 mb-3'>
                            <Image
                                src="/svg/mathematics.svg"
                                alt="mathematics-svg"
                                width={59}
                                height={59}
                            />
                            <h3 className='text-3xl text-white'>Matemáticas</h3>
                        </div>
                        <p className='text-lg sm:text-xl text-justify font-light text-[#0D1D5F] mb-5'>Domina conceptos clave, desde álgebra básica hasta cálculo avanzado, y aplica la lógica en problemas del mundo real.</p>
                        <Link href={"/categories/mathematics"} className='bg-[#0D1D5F] text-white px-2 py-3 block w-fit hover:scale-105 transition duration-300'>Explorar cursos</Link>
                    </div>
                </div>
            </section>
            <section className='px-10 py-20'>
                <h2 className='text-4xl text-center text-[#0D1D5F] mb-10'>Preguntas frecuentes</h2>
                <div>
                    {categoriesFaqs.categories.map((faq, index) => (
                      <div key={index} className="bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] shadow-md shadow-black/60 mb-5 py-4">
                        {/* Pregunta */}
                        <div
                          className="flex items-center  cursor-pointer"
                          onClick={() => toggleFAQ(index)}
                        >
                          <Image
                            src="/svg/rightArrow.svg"
                            alt="rightArrow-svg"
                            width={30}
                            height={30}
                            className={`transform transition-transform ${activeIndex === index ? "rotate-90" : ""}`}
                          />
                          <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                        </div>
        
                        {/* Respuesta */}
                        <div className={`overflow-hidden bg-[#cee4f1] transition-all ease-linear duration-500 ${activeIndex === index ? "max-h-56" : "max-h-0"}`}>
                          <p className="m-2 text-black text-justify">{faq.answer}</p>
                        </div>
                      </div>
                    ))}
                </div>
            </section>
        </main> 
    </>
  )
}
