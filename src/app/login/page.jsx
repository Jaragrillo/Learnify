'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie' // Importar js-cookie

export default function LoginPage() {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // useState para mostrar el campo de la contraseña
  const router = useRouter();

  const validateForm = () => {

    // Expresiones regulares de validación
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    const emailRegex = /\S+@\S+\.\S+/;

    // Validaciones del correo electrónico
    if (!formData.email.trim()) {
      showAlert('El Correo Electrónico es obligatorio.');
      return false;
    };
    if (!emailRegex.test(formData.email)) {
      showAlert('Correo Electrónico inválido.');
      return false;
    };
    // Validaciones de la contraseña
    if (!formData.password.trim()) {
      showAlert('La Contraseña es obligatoria.');
      return false;
    };
    if (!passwordRegex.test(formData.password)) {
      showAlert('La Contraseña no es válida.');
      return false;
    };

    return true;
  }

  const showAlert = (message) => {
    Swal.fire({
      title: 'Error de Validación',
      text: message,
      icon: 'error',
      confirmButtonText: 'Entendido',
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded',
      },
      buttonsStyling: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el envío del formulario
    if (!validateForm()) return; // Realizar las validaciones del formulario

    try {
      // Mostrar el loader mientras se procesa la solicitud en el servidor
      Swal.fire({
        title: 'Procesando...',
        text: 'Iniciando sesión.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(), // Activa el loader
      });

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        // Eliminamos credentials: 'include' porque ya no necesitamos manejar cookies HttpOnly.
      });

      if (!response.ok) {
        // Parsear el mensaje de error desde el servidor
        const errorData = await response.json().catch(() => ({
          message: 'Error desconocido en el servidor',
        }));

        // Mostrar el mensaje específico del servidor
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: errorData.message || 'Ocurrió un error al procesar tu solicitud.',
          confirmButtonText: 'Reintentar',
          customClass: {
            confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded',
          },
          buttonsStyling: false,
        });

        return;
      }

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Guardar el token en la cookie usando js-cookie
        Cookies.set('auth-token', data.token, {
          expires: 1, // El token expira en 1 día
          secure: process.env.NODE_ENV === 'production', // Solo seguro en producción
          sameSite: 'Strict', // Previene ataques CSRF
        });

        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido a Learnify!',
          text: '¡Haz iniciado sesión correctamente!',
          confirmButtonText: 'Continuar',
          customClass: {
            confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded',
          },
          buttonsStyling: false,
        }).then(() => {
          router.push('/user/home');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Ha ocurrido un problema al procesar tu solicitud. Por favor, inténtalo más tarde.',
          confirmButtonText: 'Entendido',
          customClass: {
            confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded',
          },
          buttonsStyling: false,
        });
      }

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor',
        text: 'Ha ocurrido un problema al procesar tu solicitud. Por favor, inténtalo más tarde.',
        confirmButtonText: 'Entendido',
        customClass: {
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded',
        },
        buttonsStyling: false,
      });
    }
  }

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
              <form onSubmit={handleSubmit} className='w-fit m-auto'>

                <div className='mb-4'>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder='Correo Electrónico'
                    className='border border-black rounded-lg w-80 px-3 py-2 focus:outline-none'
                  />
                </div>
                <div className='mb-4 relative w-fit h-fit'>
                  <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder='Contraseña'
                    className='border border-black rounded-lg w-80 px-3 py-2 focus:outline-none'
                  />
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
                <Link href={"/"} className='mb-4 text-gray-500 block hover:text-gray-700 w-fit'>¿Olvidaste tu contraseña?</Link>

                <button type="submit" className='m-auto mb-4 bg-[#1F84BA] text-white px-14 py-2 rounded-lg block hover:bg-[#3192c6] transition duration-300'>Iniciar sesión</button>
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
