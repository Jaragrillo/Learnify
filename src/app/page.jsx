import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <main>
        <section className='mb-20'>
          <div className='w-full m-auto mb-10 py-16 text-white text-center relative'>
            <div>
                <h1 className='text-4xl md:text-6xl font-medium mb-5'>¡Bienvenido a Learnify!</h1> 
                <p className='text-2xl md:text-4xl font'>La plataforma donde puedes enseñar, aprender y crecer.</p>
                <p className='text-lg md:text-2xl font-medium italic'>Crea y vende tu contenido, o accede a un mundo de conocimiento.</p>
            </div>
            <Image 
              src="/images/landing/bg_home.png" 
              alt="welcome-principal-banner" 
              width={1000} 
              height={1000} 
              className="brightness-50 w-full h-full  absolute top-0 -z-10"
            />
          </div>
          <div className='flex flex-wrap items-top justify-around px-10 gap-5'>
              <div className='w-[530px] text-center bg-[#F4F4F4] p-5 rounded-lg shadow-lg shadow-black/25'>
                  <p className='text-2xl text-[#070E2B] max-w-[300px] m-auto'>¡Inscríbete ahora y descubre nuevas oportunidades!</p>
                  <Image 
                    src="/images/landing/grow.png" 
                    alt="grow-image" 
                    width={200} 
                    height={200} 
                    className="m-auto my-2"
                  />
                  <Link href={"/register"} className='text-xl text-white px-5 py-1 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Empieza ahora!</Link>
              </div>
              <div className='w-[530px] text-center bg-[#F4F4F4] p-5 rounded-lg shadow-lg shadow-black/25'>
                  <p className='text-2xl text-[#070E2B] max-w-[220px] m-auto'>Reanuda tu viaje de aprendizaje. Aprende ahora.</p>
                  <Image 
                    src="/images/landing/resume.png" 
                    alt="resume-image" 
                    width={200} 
                    height={200} 
                    className="m-auto my-2"
                  />
                  <Link href={"/login"} className='text-xl text-white px-5 py-1 shadow-lg shadow-black/60 bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] rounded-lg block w-fit m-auto hover:scale-110 transition duration-500'>¡Entra ya!</Link>
              </div>
          </div>
        </section>
        <section>
          <div className='mt-10 p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
              <h2 className='text-white text-5xl font-medium text-center mb-10'>¿Qué nos hace diferentes?</h2>
              <div className=''>
                  <div className='flex flex-wrap justify-around'>
                      <div className='bg-white w-[500px] h-[350px] text-black text-center rounded-xl flex flex-col items-center justify-center mb-10 shadow-lg shadow-black/40'>
                          <Image 
                            src="/svg/book.svg" 
                            alt="book-svg" 
                            width={70} 
                            height={70} 
                            className="mb-5"
                          />
                          <h3 className='text-4xl bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text font-semibold mb-5'>¡Aprende lo que sea!</h3>
                          <p className='text-2xl max-w-sm text-justify leading-tight text-[#070E2B] font-light'>Obten acceso a una basta librería de conocimientos en todos los ambitos. Aprende donde sea, cuando sea.</p>
                      </div>
                      <div className='bg-white w-[500px] h-[350px] text-black text-center rounded-xl flex flex-col items-center justify-center mb-10 shadow-lg shadow-black/40'>
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
                            src="/svg/grow.svg" 
                            alt="grow-svg" 
                            width={70} 
                            height={70} 
                            className="mb-5"
                          />
                          <h3 className='text-4xl bg-gradient-to-r from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] text-transparent bg-clip-text font-semibold mb-5'>Amplía tus habilidades</h3>
                          <p className='text-2xl max-w-sm text-justify leading-tight text-[#070E2B] font-light'>¡Mejoráte continuamente! Aprende de expertos, adquiere nuevas habilidades y sigue tu progreso al instante.</p>
                      </div>
                  </div>
              </div>
              <div className="group text-white text-3xl sm:text-4xl md:text-5xl mb-10 m-auto block italic w-fit relative">
                  <Link href={"/benefits"} className="relative">
                      ¡Aún hay más para ti!
                      <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-white transform scale-x-0 origin-left transition-transform duration-700 ease-in-out group-hover:scale-x-100"></span>
                  </Link>
              </div>
          </div>
        </section>
        <section className='relative'>
          <div className='p-10'>
            <h2 className='text-[#0D1D5F] text-4xl max-w-[1000px] m-auto font-medium text-center mb-16'>Aprende en cualquier momento, en cualquier lugar</h2>
            <div className='flex flex-wrap justify-around gap-5'>
              <div className='text-center bg-[#F4F4F4] p-5 rounded-lg shadow-lg shadow-black/25 h-[430px] flex items-center'>
                <div>
                  <Image 
                    src="/svg/computer.svg" 
                    alt="computer-svg" 
                    width={150} 
                    height={150} 
                    className="m-auto"
                  />
                  <h3 className='text-3xl my-6 font-medium text-[#070E2B]'>Computadoras</h3>
                  <p className='text-xl max-w-sm text-justify m-auto text-[#070E2B]/90'>Accede a cursos completos en cualquier dispositivo y disfruta  una experiencia de aprendizaje envolvente.</p>
                </div>
              </div>
              <div className='text-center bg-[#F4F4F4] p-5 rounded-lg shadow-lg shadow-black/25 h-[430px] flex items-center'>
                <div>
                  <Image 
                    src="/svg/network.svg" 
                    alt="network-svg" 
                    width={150} 
                    height={150} 
                    className="m-auto"
                  />
                  <h3 className='text-3xl my-6 font-medium text-[#070E2B]'>Acceso sin conexión</h3>
                  <p className='text-xl max-w-sm text-justify m-auto text-[#070E2B]/90'>Descarga cursos para acceder a ellos en cualquier momento. Aprende sin conexión a internet, aprende sin fronteras.</p>
                </div>
              </div>
              <div className='text-center bg-[#F4F4F4] p-5 rounded-lg shadow-lg shadow-black/25 h-[430px] flex items-center'>
                <div>
                  <Image 
                    src="/svg/cellphone.svg" 
                    alt="cellphone-svg" 
                    width={150} 
                    height={150} 
                    className="m-auto"
                  />
                  <h3 className='text-3xl my-6 font-medium text-[#070E2B]'>Celulares</h3>
                  <p className='text-xl max-w-sm text-justify m-auto text-[#070E2B]/90'>Aprende sobre la marcha de tu día a día con nuestro aplicativo móvil. Perfecto para estilos de vida ocupados.</p>
                </div>
              </div>
            </div>    
          </div> 
        </section>
      </main>
    </>
  );
}
