import React from 'react'
import Image from "next/image";

export default function BenefitsPage() {
  return (
    <>
      <main>
        <section>
          <div className='p-20'>
            <h2 className='text-4xl text-[#0D1D5F] text-center font-medium'>¡Conoce todos los beneficios de ser parte de la familia Learnify!</h2>  
          </div>
          <div className='p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
            <div className='flex flex-wrap justify-around'>
              <div className='bg-white w-[500px] h-[350px] text-black text-center rounded-xl flex flex-col items-center justify-center mb-10 mt-10 shadow-lg shadow-black/40'>
                <Image 
                  src="/svg/book.svg" 
                  alt="book-svg" 
                  width={70} 
                  height={70} 
                  className="mb-5"
                />
                <h3 className='text-4xl bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text font-semibold mb-5'>¡Aprende lo que sea!</h3>
                <p className='text-2xl max-w-sm text-justify leading-tight text-[#070E2B] font-light'>Obten acceso a una basta librería de conocimientos en todos los ambitos. Amplía tus habilidades, aprendiendo donde sea y cuando sea.</p>
              </div>
              <div className='bg-white w-[500px] h-[350px] text-black text-center rounded-xl flex flex-col items-center justify-center mb-10 mt-10 shadow-lg shadow-black/40'>
                <Image 
                  src="/svg/teach.svg" 
                  alt="teach-svg" 
                  width={70} 
                  height={70} 
                  className="mb-5"
                />
                <h3 className='text-4xl bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text font-semibold mb-5'>¡Enseña a otros!</h3>
                <p className='text-2xl max-w-sm text-justify leading-tight text-[#070E2B] font-light'>Comparte tu experiencia con el mundo. Crea y sube tu propio contenido e inspira y educa a otros.</p>
              </div>
            </div>
            <div className='flex flex-wrap justify-around'>
              <div className='bg-white w-[500px] h-[350px] text-black text-center rounded-xl flex flex-col items-center justify-center mb-10 shadow-lg shadow-black/40'>
                <Image 
                  src="/svg/money.svg" 
                  alt="money-svg" 
                  width={70} 
                  height={70} 
                  className="mb-5"
                />
                <h3 className='text-4xl bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text font-semibold mb-5'>Gana dinero</h3>
                <p className='text-2xl max-w-sm text-justify leading-tight text-[#070E2B] font-light'>Convierte tus aptitudes en un ingreso. Vende tu contenido y genera ganancias desde tus conocimientos.</p>
              </div>
              <div className='bg-white w-[500px] h-[350px] text-black text-center rounded-xl flex flex-col items-center justify-center mb-10 shadow-lg shadow-black/40'>
              <Image 
                  src="/svg/interactive.svg" 
                  alt="interactive-svg" 
                  width={70} 
                  height={70} 
                  className="mb-5"
                />
                <h3 className='text-4xl bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text font-semibold mb-5'>Aprendizaje interactivo</h3>
                <p className='text-2xl max-w-sm text-justify leading-tight text-[#070E2B] font-light'>Participa con contenidos didácticos e interactivos, quizzes y proyectos prácticos. Mientras aprendes a tu propio ritmo.</p>
              </div>
            </div>
            <div className='flex flex-wrap justify-around'>
              <div className='bg-white w-[500px] h-[350px] text-black text-center rounded-xl flex flex-col items-center justify-center mb-10 shadow-lg shadow-black/40'>
                <Image 
                  src="/svg/community.svg" 
                  alt="community-svg" 
                  width={70} 
                  height={70} 
                  className="mb-5"
                />
                <h3 className='text-4xl bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text font-semibold mb-5'>Comunidad global</h3>
                <p className='text-2xl max-w-sm text-justify leading-tight text-[#070E2B] font-light'>Conecta con aprendices e instructores de todas partes del mundo.</p>
              </div>
              <div className='bg-white w-[500px] h-[350px] text-black text-center rounded-xl flex flex-col items-center justify-center mb-10 shadow-lg shadow-black/40'>
                <Image 
                  src="/svg/quality.svg" 
                  alt="quality-svg" 
                  width={70} 
                  height={70} 
                  className="mb-5"
                />
                <h3 className='text-4xl bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text font-semibold mb-5'>Contenido de calidad</h3>
                <p className='text-2xl max-w-sm text-justify leading-tight text-[#070E2B] font-light'>Cursos de alta calidad creados por los mismos expertos del sector.</p>
              </div>
            </div>
          </div>
        </section>
        <section id='testimonials'>
          <div className='p-20'>
            <h2 className='text-4xl text-[#0D1D5F] text-center font-medium'>Testimonios, <span>los mejores en lo que hacemos.</span></h2>
          </div>
          <div className='flex flex-wrap'>
            <div className='w-1/2 p-10 bg-gradient-to-r text-white from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
              <Image 
                src="/images/benefits/testimony1.png" 
                alt="testimony-1-image" 
                width={164} 
                height={164} 
                className="m-auto"
              />
              <h3 className='text-center text-2xl my-5 font-medium'>Ana María López <span className='opacity-20'>/</span> Instructora</h3>
              <p className='text-justify text-xl'>Learnify ha transformado mi manera de enseñar. Las herramientas son intuitivas y me permiten conectarme mejor con mis estudiantes. ¡Una experiencia inigualable! </p>
            </div>
            <div className='w-1/2 p-10 bg-[#F7F7F7]'>
              <Image 
                src="/images/benefits/testimony2.png" 
                alt="testimony-2-image" 
                width={164} 
                height={164} 
                className="m-auto"
              />
              <h3 className='text-center text-2xl my-5 font-medium text-[#070E2B]'>Carlos Méndez <span className='opacity-20'>/</span> Aprendiz</h3>
              <p className='text-justify text-xl text-[#070E2B]'>Nunca imaginé que aprender pudiera ser tan interactivo y divertido. Learnify me ha ayudado a mejorar mis habilidades a un ritmo increíble. ¡Totalmente recomendado!</p>
            </div>
            <div className='w-1/2 p-10 bg-[#F7F7F7]'>
              <Image 
                src="/images/benefits/testimony3.png" 
                alt="testimony-3-image" 
                width={164} 
                height={164} 
                className="m-auto"
              />
              <h3 className='text-center text-2xl my-5 font-medium text-[#070E2B]'>Pedro Ruiz <span className='opacity-20'>/</span> Aprendiz</h3>
              <p className='text-justify text-xl text-[#070E2B]'>Lo que más me gusta de Learnify es la comunidad. Aprender de otros y compartir mi conocimiento ha sido una experiencia enriquecedora.</p>
            </div>
            <div className='w-1/2 p-10 bg-gradient-to-r text-white from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
              <Image 
                src="/images/benefits/testimony4.png" 
                alt="testimony-4-image" 
                width={164} 
                height={164} 
                className="m-auto"
              />
              <h3 className='text-center text-2xl my-5 font-medium'>Laura González <span className='opacity-20'>/</span> Instructora <span className='opacity-20'>-</span> Aprendiz</h3>
              <p className='text-justify text-xl'>Como instructor y aprendiz, puedo decir que Learnify es la plataforma perfecta. Puedo enseñar y seguir aprendiendo, todo en un solo lugar. Es simplemente fantástico.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
