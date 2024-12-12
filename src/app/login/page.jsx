'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false); // useState para mostar el campo de la contraseña

  return (
    <>
      <main>
        <section className='h-[120vh] flex'>
          <div className='w-1/2 h-full -z-10'>
            <Image 
              src="/images/learnifyLogo.jpeg" 
              width={1000} 
              alt="learnify-logo-image" 
              height={1000}
              className="h-full"
            />
          </div>
          <div className='w-1/2 h-full bg-[#32acda] flex flex-col items-center justify-center'>
            <h2 className='text-white text-4xl max-w-sm mb-5'>¡Aprende sin límites, enseña sin fronteras!</h2>
            <div className=' bg-white w-[490px] rounded-lg shadow-lg shadow-black/25 p-10'>
              <h3 className='text-center text-3xl mb-5 font-medium'>Inicia sesión</h3>
              <form action="" className='w-fit m-auto'>

                <div className='mb-4'>
                  <input type="email" name="email" id="email" placeholder='Correo Electrónico' className='border border-black rounded-lg w-80 px-3 py-2 focus:outline-none'/>
                </div>
                <div className='mb-4 relative w-fit h-fit'>
                  <input type={showPassword ? "text" : "password"} name='password' id='password' placeholder='Contraseña' className='border border-black rounded-lg w-80 px-3 py-2 focus:outline-none'/>
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Image 
                      src={showPassword ? "/svg/passwordEyeOn.svg" : "/svg/passwordEyeOff.svg"}
                      alt="password-Eye-svg" 
                      width={24} 
                      height={24} 
                      className="absolute top-0 bottom-0 right-3 m-auto"
                    />
                  </button>
                </div>
                <Link href={"/"} className='mb-4 text-gray-500 block hover:text-gray-700'>¿Olvidaste tu contraseña?</Link>

                <button type="submit" className='m-auto mb-4 bg-[#1F84BA] text-white px-14 py-2 rounded-lg block hover:bg-[#3192c6] transition duration-300'>Regístrarse</button>
              </form>

              <p className='text-center text-lg mb-4'>¿No tienes una cuenta? <Link href={"/register"} className='text-[#1F84BA] hover:underline'>Únete ahora!</Link></p>
              <p className='text-sm text-gray-500 text-justify'>Recuerda que siendo parte de Learnify estás aceptando los <Link href={"/legal#terms&conditions"} className='underline hover:text-gray-700'>Términos y Condiciones</Link>, la <Link href={"/legal#privacyPolicies"} className='underline hover:text-gray-700'>Política de Privacidad</Link>, la <Link href={"/legal#dataTreatmentPolicies"} className='underline hover:text-gray-700'>Política de Tratamiento de Datos</Link>, y la <Link href={"/legal#cookiesPolicies"} className='underline hover:text-gray-700'>Política de Cookies</Link> de Learnify.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
