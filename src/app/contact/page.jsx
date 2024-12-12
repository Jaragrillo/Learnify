import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ContactPage() {
  return (
    <>
      <main>
        <div>
          <h2 className='text-4xl text-[#0D1D5F] text-center font-medium my-10'>¡Contáctanos!</h2>
          <section className='flex gap-10 p-10 relative bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
            <div className='w-1/2'>
              <div className='text-white'>
                <h3 className='text-3xl mb-2'>Mandanos un mensaje</h3>
                <p className='text-justify text-lg mb-8'>Estamos aquí para escucharte. Ya sea que tengas sugerencias, quejas, reclamos o si deseas presentar oportunidades o propuestas laborales, ¡no dudes en escribirnos! Tu opinión es importante para nosotros.</p>
              </div>
              <form action="">
                <div className='flex gap-3'>
                  <div className='w-1/2 relative mb-10'>
                    <input type="text" name="name" id="name" placeholder='Nombre' className='w-full placeholder-white text-white bg-transparent border-b border-white px-2 py-3 focus:outline-none focus:bg-white focus:shadow-lg focus:shadow-white/10 focus:text-black transition duration-200'/>
                    <Image 
                      src="/svg/name.svg" 
                      alt="name-svg" 
                      width={24} 
                      height={24} 
                      className="absolute top-0 bottom-0 right-5 m-auto"
                    />
                  </div>
                  <div className='w-1/2 relative mb-10'>
                    <input type="text" name="lastName" id="lastName" placeholder='Apellidos' className='w-full placeholder-white text-white bg-transparent border-b border-white px-2 py-3 focus:outline-none focus:bg-white focus:shadow-lg focus:shadow-white/10 focus:text-black transition duration-200'/>
                    <Image 
                      src="/svg/name.svg" 
                      alt="name-svg" 
                      width={24} 
                      height={24} 
                      className="absolute top-0 bottom-0 right-5 m-auto"
                    />
                  </div>
                </div>
                <div className='w-full relative mb-10'>
                  <input type="email" name="email" id="email" placeholder='Correo electrónico' className='w-full placeholder-white text-white bg-transparent border-b border-white px-2 py-3 focus:outline-none focus:bg-white focus:shadow-lg focus:shadow-white/10 focus:text-black transition duration-200'/>
                  <Image 
                    src="/svg/emailWhite.svg" 
                    alt="emailWhite-svg" 
                    width={24} 
                    height={24} 
                    className="absolute top-0 bottom-0 right-5 m-auto"
                  />
                </div>
                <div className='w-full mb-10'>
                  <select name="typeOfQuery" id="typeOfQuery" className='w-full bg-transparent text-white border-b border-white focus:outline-none px-2 py-3'>
                    <option value="" className='bg-white text-black'>Tipo de consulta</option>  
                    <option value="" className='bg-white text-black'>Soporte técnico</option>
                    <option value="" className='bg-white text-black'>Pregunta sobre facturación</option>
                    <option value="" className='bg-white text-black'>Propuesta laboral</option>
                    <option value="" className='bg-white text-black'>Otro</option>
                  </select>
                </div>
                <div className='w-full relative mb-10'>
                  <textarea name="message" id="message" placeholder='Tu mensaje...' className='resize-none w-full min-h-24 max-h-24 rounded-lg focus:outline-none px-2 py-3' />
                  <Image 
                    src="/svg/message.svg" 
                    alt="message-svg" 
                    width={24} 
                    height={24} 
                    className="absolute top-3 right-5 "
                  />
                </div>
                <button type="submit" className='bg-white px-10 shadow-lg shadow-black/25 py-2 flex items-center justify-center gap-2 rounded-lg hover:scale-105 transition duration-300'>
                  Enviar
                  <Image 
                    src="/svg/send.svg" 
                    alt="send-svg" 
                    width={24} 
                    height={24} 
                    className=""
                  />
                </button>
              </form>
            </div>
            <div className='w-1/2'>
              <div className='bg-white p-5 rounded-lg shadow-lg shadow-black/40'>
                <h4 className='text-2xl font-medium mb-5'>Información de contacto</h4>
                <ul>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/email.svg" 
                      alt="email-svg" 
                      width={24} 
                      height={24} 
                      className="text-inherit"
                    />
                    <p>soporte@learnify.com</p>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/phone.svg" 
                      alt="phone-svg" 
                      width={24} 
                      height={24} 
                      className=""
                    />
                    <p>+57 300 6648618</p>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/location.svg" 
                      alt="location-svg" 
                      width={24} 
                      height={24} 
                      className=""
                    />
                    <p>Cl. 63 #58B-03, Terranova, Itagüi, Antioquia</p>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/time.svg" 
                      alt="time-svg" 
                      width={24} 
                      height={24} 
                      className=""
                    />
                    <p>Lunes - Viernes: 9am - 5pm COT</p>
                  </li>
                </ul>
              </div>
              <div className='bg-white p-5 rounded-lg shadow-lg shadow-black/40 w-1/2 mt-10'>
                <h4 className='text-2xl font-medium mb-5'>Conecta con nosotros</h4>
                <ul>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/facebook.svg" 
                      alt="facebook-svg" 
                      width={32} 
                      height={32} 
                      className=""
                    />
                    <Link href={"/"} className='hover:underline'>Learnify</Link>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/linkedin.svg" 
                      alt="linkedin-svg" 
                      width={32} 
                      height={32} 
                      className=""
                    />
                    <Link href={"/"} className='hover:underline'>Learnify</Link>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/instagram.svg" 
                      alt="instagram-svg" 
                      width={32} 
                      height={32} 
                      className=""
                    />
                    <Link href={"/"} className='hover:underline'>@Learnify</Link>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/twitter.svg" 
                      alt="twitter-svg" 
                      width={32} 
                      height={32} 
                      className=""
                    />
                    <Link href={"/"} className='hover:underline'>@Learnify</Link>
                  </li>
                </ul>
              </div>
            </div>
            <Image 
              src="/images/learnifyLogoTransparent.png" 
              alt="learnify-logo-transparent-image" 
              width={374} 
              height={374} 
              className="absolute bottom-10 right-10"
            />
          </section>
        </div>
      </main>
    </>
  )
}
