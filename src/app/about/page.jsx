'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function AboutPage() {

  const [isExpanded, setIsExpanded] = useState(false);
  const [active, setActive] = useState("educadores");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  const handleSwitch = (type) => {
    setActive(type);
  }

  return (
    <>
      <main>
        <section className='p-10 sm:p-20'>
          <h2 className='text-3xl md:text-4xl text-[#0D1D5F] text-center font-medium'>Learnify</h2>
          <h3 className='text-xl sm:text-3xl md:text-4xl text-[#0D1D5F] text-center font-medium italic mb-5'>Potenciando educadores y aprendices en la era digital.</h3>
          <Link href={"/register"} className='text-xl md:text-2xl text-white px-5 py-1 mb-10 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Únete a Learnify hoy!</Link>
          <p className='text-lg sm:text-xl md:text-2xl font-light max-w-7xl m-auto text-justify'>Learnify es una plataforma de aprendizaje virtual donde los usuarios pueden crear y vender sus propios cursos, o comprar contenido educativo creado por otros. Es un espacio que conecta a creadores y aprendices, ofreciendo una experiencia flexible para adquirir o compartir conocimientos en diversas áreas.</p>
        </section>
        <section className='bg-gradient-to-t from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] py-20 px-10 relative'>
          <Image 
            src="/images/learnifyLogoTransparent.png" 
            alt="learnify-logo-transparent-image" 
            width={800} 
            height={800} 
            className="m-auto absolute top-0 bottom-0 left-0 right-0"
          />
          <h2 className='text-white text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-20 italic'>La identidad de Learnify</h2>

          {/* <!-- timeline component --> */}
          <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden h-full">
              <div className="hidden md:block border-2-2 absolute border-opacity-20 h-full border" style={{left: '50%'}}></div>
              {/* <!-- first component content div / right timeline --> */}
              <div className="mb-8 flex justify-center md:justify-between items-center w-full md:right-timeline">
                <div className="hidden md:block order-1 w-full md:w-5/12"></div>
                <div className="hidden md:flex z-20 items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
                  {/* first point */}
                </div>
                <div className="order-1 bg-white rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-medium text-3xl md:text-4xl bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text">Misión</h3>
                  <p className="text-lg md:text-xl font-light text-justify tracking-wid text-opacity-90">La misión de Learnify es ayudar a las personas a vivir de sus pasiones. Esto se logra proporcionando un ecosistema completo de soluciones seguras e integradas que permiten a los creadores de contenido crear, vender y escalar sus cursos en línea.</p>
                </div>
              </div>

              {/* <!-- second component content div / left timeline --> */}
              <div className="mb-8 flex justify-center md:justify-between flex-row-reverse items-center w-full md:left-timeline">
                <div className="hidden md:block order-1 w-full md:w-5/12"></div>
                <div className="md:flex hidden z-20 items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
                  {/* second point */}
                </div>
                <div className="order-1 relative bg-white rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-medium text-3xl md:text-4xl bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text">Camino</h3>
                  <p className="text-lg md:text-xl font-light text-justify tracking-wide text-opacity-90">El camino de Learnify se basa en varios pilares fundamentales que le permitirán crecer y consolidarse como una plataforma clave para la educación en línea.</p>
                
                  {isExpanded && (
                    <ul className="mt-4">
                      <li className='text-lg md:text-xl font-light text-justify mb-3'>
                        <strong>Cultura empresarial fuerte:</strong> Promovemos valores como la libertad, la autonomía y el amor, que se reflejan en nuestra comunicación interna y externa.
                      </li>
                      <li className='text-lg md:text-xl font-light text-justify mb-3'>
                        <strong>Producto excelente:</strong> Ofrecemos recursos tecnológicos avanzados para la creación y gestión de cursos en línea.
                      </li>
                      <li className='text-lg md:text-xl font-light text-justify mb-3'>
                        <strong>Conocimiento y colaboración:</strong> Nos enfocamos en compartir conocimientos y establecer alianzas estratégicas para el crecimiento mutuo.
                      </li>
                    </ul>
                  )}

                  <button 
                    type="button"
                    onClick={toggleExpand}
                    className='mt-4 absolute bottom-2 right-6 text-lg font-medium text-[#0D1D5F] hover:underline'
                  >
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                  </button>
                </div>
              </div>
              
              {/* <!-- third component content div / right timeline --> */}
              <div className="mb-8 flex justify-center md:justify-between items-center w-full md:right-timeline">
                <div className="hidden md:block order-1 w-full md:w-5/12"></div>
                <div className="hidden md:flex z-20 items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
                  {/* third point */}
                </div>
                <div className="order-1 bg-white rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-medium text-3xl md:text-4xl bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text">Visión</h3>
                  <p className="text-lg md:text-xl font-light text-justify tracking-wide text-opacity-90">La visión de Learnify es ser una plataforma accesible y confiable para la creación y distribución de cursos en línea. Buscamos ofrecer herramientas intuitivas y eficaces para que cualquier persona pueda compartir su conocimiento y alcanzar a su audiencia.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='py-24 px-10' id='ourDifferentiators'>
          <h2 className='text-4xl text-[#0D1D5F] text-center font-medium mb-10'>¿Por qué elegir Learnify?</h2>
          <div className='flex flex-wrap justify-around mb-10 gap-10'>
            <div className='bg-gradient-to-b from-[#5AC8EC] via-30% via-[#3AA5D8] to-[#0A355A] text-white rounded-lg shadow-lg shadow-black/60 w-[525px] h-fit sm:h-[350px] p-5'>
              <div className='flex items-center gap-2'>
                <Image 
                  src="/svg/bookWhite.svg" 
                  alt="book-white-svg" 
                  width={50} 
                  height={50} 
                />
                <h3 className='text-2xl'>Contenido Diverso</h3>
              </div>
              <p className='font-light text-lg sm:text-xl my-5 text-justify'>Accede a una amplia gama de temas y conocimientos impartidos por expertos de todo el mundo.</p>
              <div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Cursos en más de 100 temas</p>
                </div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Nuevo contenido semanalmente</p>
                </div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Aprende de profesionales del sector</p>
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-b from-[#5AC8EC] via-30% via-[#3AA5D8] to-[#0A355A] text-white rounded-lg shadow-lg shadow-black/60 w-[525px] h-fit sm:h-[350px] p-5'>
              <div className='flex items-center gap-2'>
                <Image 
                  src="/svg/communityWhite.svg" 
                  alt="community-white-svg" 
                  width={50} 
                  height={50} 
                />
                <h3 className='text-2xl'>Impulsado por la Comunidad</h3>
              </div>
              <p className='font-light text-lg sm:text-xl my-5 text-justify'>Únete a una vibrante comunidad de estudiantes y educadores que fomenta la colaboración y el crecimiento.</p>
              <div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Participa en foros de discusión</p>
                </div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Involúcrate en el aprendizaje entre iguales </p>
                </div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Relaciónate con personas de ideas afines</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap justify-around gap-10'>
            <div className='bg-gradient-to-b from-[#5AC8EC] via-30% via-[#3AA5D8] to-[#0A355A] text-white rounded-lg shadow-lg shadow-black/60 w-[525px] h-fit sm:h-[350px] p-5'>
              <div className='flex items-center gap-2'>
                <Image 
                  src="/svg/moneyWhite.svg" 
                  alt="money-white-svg" 
                  width={50} 
                  height={50} 
                />
                <h3 className='text-2xl'>Monetiza tu Conocimiento</h3>
              </div>
              <p className='font-light text-lg sm:text-xl my-5 text-justify'>Crea y vende tus propios, convirtiendo tu experiencia en un negocio rentable.</p>
              <div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Establece tus propios precios</p>
                </div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Obtén ingresos de las matrículas de tus aprendices</p>
                </div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Recibe soporte en la creación y publicitación de cursos</p>
                </div>
              </div>
            </div>
            <div className='bg-gradient-to-b from-[#5AC8EC] via-30% via-[#3AA5D8] to-[#0A355A] text-white rounded-lg shadow-lg shadow-black/60 w-[525px] h-fit sm:h-[350px] p-5'>
              <div className='flex items-center gap-2'>
                <Image 
                  src="/svg/qualityWhite.svg" 
                  alt="quality-white-svg" 
                  width={50} 
                  height={50} 
                />
                <h3 className='text-2xl'>Garantía de calidad</h3>
              </div>
              <p className='font-light text-lg sm:text-xl my-5 text-justify'>Nuestro proceso de revisión garantiza que todos los contenidos cumplen normas educativas exigentes.</p>
              <div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Riguroso proceso de revisión de contenidos</p>
                </div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Actualizaciones periódicas para mantener todo al día</p>
                </div>
                <div className='flex items-center gap-1'>
                  <Image 
                    src="/svg/check.svg" 
                    alt="check-svg" 
                    width={34} 
                    height={34} 
                  />
                  <p className='text-lg sm:text-xl'>Contenidos certificados en alta calidad</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-medium text-white mb-6">¿Cómo funciona Learnify?</h2>

            {/* Switch */}
            <div className="relative w-[300px] sm:w-[500px] mx-auto bg-white rounded-full p-1 flex items-center justify-between">
              <button
                className={`w-1/2 text-center py-2 rounded-full transition-all text-xl z-20 ${
                  active === "educadores" ? " text-white" : "text-gray-600"
                }`}
                onClick={() => handleSwitch("educadores")}
              >
                Educadores
              </button>
              <button
                className={`w-1/2 text-center py-2 rounded-full transition-all text-xl z-20 ${
                  active === "aprendices" ? " text-white" : "text-gray-600"
                }`}
                onClick={() => handleSwitch("aprendices")}
              >
                Aprendices
              </button>
              
              {/* Animation line */}
              <div
                className={`absolute top-1 bottom-1 rounded-full w-1/2  bg-blue-500 transition duration-300 ease-linear`}
                style={{
                  transform: active === "educadores" ? "translateX(0%)" : "translateX(97%)",
                }}
              ></div>
            </div>

            {/* Content */}
            <div className="mt-8 transition-transform duration-500">
              {active === "educadores" && (
                <div className="bg-white p-5 py-10 rounded-lg shadow-md shadow-white/60 text-left text-[#070E2B] w-[300px] sm:w-[510px] mx-auto">
                  <h3 className="text-3xl mb-5">Para Creadores de Contenido</h3>
                  <div className='flex items-center mb-5 gap-2'>
                    <Image 
                      src="/svg/user.svg" 
                      alt="user-svg" 
                      width={46} 
                      height={46} 
                      className="bg-blue-500/50 p-1 rounded-xl"
                    />
                    <p className='text-lg sm:text-xl'>Regístrate en Learnify.</p>
                  </div>
                  <div className='flex items-center mb-5 gap-2'>
                    <Image 
                      src="/svg/upload.svg" 
                      alt="upload-svg" 
                      width={46} 
                      height={46} 
                      className="bg-blue-500/50 p-1 rounded-xl"
                    />
                    <p className='text-lg sm:text-xl'>Crea y sube tu contenido.</p>
                  </div>
                  <div className='flex items-center mb-5 gap-2'>
                    <Image 
                      src="/svg/tagPrice.svg" 
                      alt="tagPrice-svg" 
                      width={46} 
                      height={46} 
                      className="bg-blue-500/50 p-1 rounded-xl"
                    />
                    <p className='text-lg sm:text-xl'>Establece el precio y pública tu curso.</p>
                  </div>
                  <div className='flex items-center mb-5 gap-2'>
                    <Image 
                      src="/svg/teacher.svg" 
                      alt="teacher-svg" 
                      width={46} 
                      height={46} 
                      className="bg-blue-500/50 p-1 rounded-xl"
                    />
                    <p className='text-lg sm:text-xl'>Sé constante, constancia = ingresos</p>
                  </div>
                  <p className='mb-5 text-lg sm:text-xl text-center'>¡Comienza tu viaje como educador en Learnify hoy y convierte tu experiencia en ingresos!</p>
                  <Link href={"/register"} className='text-xl text-white px-5 py-1 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Empieza ahora!</Link>
                </div>
              )}
              {active === "aprendices" && (
                <div className="bg-white p-5 py-10 rounded-lg shadow-md shadow-white/60 text-left text-[#070E2B] w-[300px] sm:w-[510px] mx-auto">
                  <h3 className="text-3xl mb-5">Para Aprendices</h3>
                  <div className='flex items-center mb-5 gap-2'>
                    <Image 
                      src="/svg/user.svg" 
                      alt="user-svg" 
                      width={46} 
                      height={46} 
                      className="bg-blue-500/50 p-1 rounded-xl"
                    />
                    <p className='text-xl'>Regístrate en Learnify.</p>
                  </div>
                  <div className='flex items-center mb-5 gap-2'>
                    <Image 
                      src="/svg/search.svg" 
                      alt="search-svg" 
                      width={46} 
                      height={46} 
                      className="bg-blue-500/50 p-1 rounded-xl"
                    />
                    <p className='text-xl'>Busca y encuentra cursos que te interesan.</p>
                  </div>
                  <div className='flex items-center mb-5 gap-2'>
                    <Image 
                      src="/svg/exchange.svg" 
                      alt="exchange-svg" 
                      width={46} 
                      height={46} 
                      className="bg-blue-500/50 p-1 rounded-xl"
                    />
                    <p className='text-xl'>Compra cursos a precios convenientes.</p>
                  </div>
                  <div className='flex items-center mb-5 gap-2'>
                    <Image 
                      src="/svg/student.svg" 
                      alt="student-svg" 
                      width={46} 
                      height={46} 
                      className="bg-blue-500/50 p-1 rounded-xl"
                    />
                    <p className='text-xl'>Accede al contenido del curso y aprende</p>
                  </div>
                  <p className='mb-5 text-xl text-center'>Embárcate en tu aventura de aprendizaje con Learnify y adquiere conocimientos de educadores expertos en todo el mundo.</p>
                  <Link href={"/register"} className='text-xl text-white px-5 py-1 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Empieza ahora!</Link>
                </div>
              )}
            </div>
          </div>
        </section>
        <section>
          <div className='bg-slate-200 text-[#070E2B] m-10 sm:m-20 rounded-lg p-10'>
            <h3 className='text-3xl sm:text-5xl text-center mb-10'>Learnify en Números</h3>
            <div className='flex flex-wrap gap-10 items-start justify-around'>
              <div>
                <div className='flex items-center justify-center'>
                  <h4 className='text-3xl font-semibold'>100.000</h4>
                  <Image 
                    src="/svg/plus.svg" 
                    alt="plus-svg" 
                    width={40} 
                    height={40} 
                    className="text-[#070E2B]"
                  />
                </div>
                <p className='text-xl text-[#070E2B]/60'>Aprendices activos</p>
              </div>
              <div>
                <div className='flex items-center justify-center'>
                  <h4 className='text-3xl font-semibold'>50.000</h4>
                  <Image 
                    src="/svg/plus.svg" 
                    alt="plus-svg" 
                    width={40} 
                    height={40} 
                  />
                </div>
                <p className='text-xl text-[#070E2B]/60'>Cursos disponibles</p>
              </div>
              <div>
                <div className='flex items-center justify-center'>
                  <h4 className='text-3xl font-semibold'>1.000</h4>
                  <Image 
                    src="/svg/plus.svg" 
                    alt="plus-svg" 
                    width={40} 
                    height={40} 
                  />
                </div>
                <p className='text-xl text-[#070E2B]/60'>Instructores expertos</p>
              </div>
            </div>
          </div>
          <div className='text-[#0D1D5F]'>
            <h2 className='text-2xl sm:text-4xl text-center font-semibold mb-2'>¿Listo para Comenzar tu Viaje de Aprendizaje?</h2>
            <p className='text-lg sm:text-2xl text-center font-medium mb-10'>Únete a Learnify hoy y desbloquea un mundo de conocimiento a tu alcance.</p>
            <Link href={"/register"} className='text-2xl text-white px-5 py-1 mb-20 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Únete a Learnify hoy!</Link>
          </div>
        </section>
      </main>
    </>
  )
}
