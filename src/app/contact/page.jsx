'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    tipo_consulta: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validación para evitar inyecciones de scripts
  const validateScriptInjection = (value) => {
    const scriptRegex = /<[^>]*script[^>]*>|<\/?[a-z][\s\S]*>/i;
    if (scriptRegex.test(value)) {
      return false;
    }
    return true;
  };

  const validateForm = () => {
    // Expresión regular para validar el formato del correo
    const emailRegex = /\S+@\S+\.\S+/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios para nombre y apellidos
    const notOnlyNumbersRegex = /^(?!^\d+$).*$/;

    // Validación del nombre
    if (!formData.nombre.trim()) return 'El Nombre es obligatorio.';
    if (formData.nombre.trim() !== formData.nombre) return 'El Nombre no debe tener espacios en blanco al inicio o al final.';
    if (formData.nombre.includes('  ')) return 'El Nombre no debe tener espacios en blanco dobles.';
    if (!validateScriptInjection(formData.nombre)) return 'El Nombre no debe contener código HTML o scripts.';
    if (!nameRegex.test(formData.nombre)) return 'El Nombre no debe contener números o caracteres especiales.';

    // Validación de los apellidos
    if (!formData.apellidos.trim()) return 'Los Apellidos son obligatorios.';
    if (formData.apellidos.trim() !== formData.apellidos) return 'Los Apellidos no deben tener espacios en blanco al inicio o al final.';
    if (formData.apellidos.includes('  ')) return 'Los Apellidos no deben tener espacios en blanco dobles.';
    if (!validateScriptInjection(formData.apellidos)) return 'Los Apellidos no deben contener código HTML o scripts.';
    if (!nameRegex.test(formData.apellidos)) return 'Los Apellidos no deben contener números o caracteres especiales.';

    // Validación del correo electrónico
    if (!formData.correo.trim()) return 'El Correo Electrónico es obligatorio.';
    if (formData.correo.trim() !== formData.correo) return 'El Correo Electrónico no debe tener espacios en blanco al inicio o al final.';
    if (formData.correo.includes(' ')) return 'El Correo Electrónico no debe tener espacios en blanco.';
    if (!validateScriptInjection(formData.correo)) return 'El Correo Electrónico no debe contener código HTML o scripts.';
    if (!emailRegex.test(formData.correo)) return 'Correo Electrónico inválido.';

    // Validación del tipo de consulta
    if (!formData.tipo_consulta) return 'El Tipo de consulta es obligatorio.';

    // Validación del mensaje
    if (!formData.mensaje.trim()) return 'El Mensaje es obligatorio.';
    if (formData.mensaje.trim() !== formData.mensaje) return 'El Mensaje no debe tener espacios en blanco al inicio o al final.';
    if (formData.mensaje.includes('  ')) return 'El Mensaje no debe tener espacios en blanco dobles.';
    if (!validateScriptInjection(formData.mensaje)) return 'El Mensaje no debe contener código HTML o scripts.';
    if (!notOnlyNumbersRegex.test(formData.mensaje)) return 'El Mensaje no puede contener solo números.';

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

    Swal.fire({
      title: 'Enviando mensaje...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar el mensaje');
      }

      Swal.close(); // Cierra el loader
      Swal.fire('Enviado', 'Tu mensaje ha sido enviado correctamente.', 'success');
      setFormData({
        nombre: '',
        apellidos: '',
        correo: '',
        tipo_consulta: '',
        mensaje: '',
      }); // Limpia el formulario
    } catch (error) {
      Swal.close(); // Cierra el loader
      Swal.fire('Error', error.message, 'error');
    }
  }

  return (
    <>
      <main>
        <div>
          <h2 className='text-4xl text-[#0D1D5F] text-center font-medium my-10'>¡Contáctanos!</h2>
          <section className='block lg:flex gap-10 p-10 relative bg-gradient-to-b from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
            <div className='w-full mb-10 lg:mb-0 lg:w-1/2'>
              <div className='text-white'>
                <h3 className='text-3xl mb-2'>Mandanos un mensaje</h3>
                <p className='text-justify text-lg mb-8'>Estamos aquí para escucharte. Ya sea que tengas sugerencias, quejas, reclamos o si deseas presentar oportunidades o propuestas laborales, ¡no dudes en escribirnos! Tu opinión es importante para nosotros.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='flex gap-3'>
                  <div className='w-1/2 relative mb-10'>
                    <input 
                      type="text" 
                      name="nombre" 
                      id="nombre" 
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder='Nombre' 
                      className='w-full placeholder-white text-white bg-transparent border-b border-white px-2 py-3 focus:outline-none focus:bg-white focus:shadow-lg focus:shadow-white/10 focus:text-black transition duration-200'
                    />
                    <Image 
                      src="/svg/name.svg" 
                      alt="name-svg" 
                      width={24} 
                      height={24} 
                      className="absolute top-0 bottom-0 right-5 m-auto"
                    />
                  </div>
                  <div className='w-1/2 relative mb-10'>
                    <input 
                      type="text" 
                      name="apellidos" 
                      id="apellidos" 
                      value={formData.apellidos}
                      onChange={handleChange}
                      placeholder='Apellidos' 
                      className='w-full placeholder-white text-white bg-transparent border-b border-white px-2 py-3 focus:outline-none focus:bg-white focus:shadow-lg focus:shadow-white/10 focus:text-black transition duration-200'
                    />
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
                  <input 
                    type="text" 
                    name="correo" 
                    id="correo" 
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder='Correo electrónico' 
                    className='w-full placeholder-white text-white bg-transparent border-b border-white px-2 py-3 focus:outline-none focus:bg-white focus:shadow-lg focus:shadow-white/10 focus:text-black transition duration-200'
                  />
                  <Image 
                    src="/svg/emailWhite.svg" 
                    alt="emailWhite-svg" 
                    width={24} 
                    height={24} 
                    className="absolute top-0 bottom-0 right-5 m-auto"
                  />
                </div>
                <div className='w-full mb-10'>
                  <select 
                    name="tipo_consulta" 
                    id="tipo_consulta" 
                    value={formData.tipo_consulta}
                    onChange={handleChange}
                    className='w-full bg-transparent text-white border-b border-white focus:outline-none px-2 py-3'
                  >
                    <option value="" className='bg-white text-black'>Tipo de consulta</option>  
                    <option value="Soporte técnico" className='bg-white text-black'>Soporte técnico</option>
                    <option value="Pregunta sobre facturación" className='bg-white text-black'>Pregunta sobre facturación</option>
                    <option value="Propuesta laboral" className='bg-white text-black'>Propuesta laboral</option>
                    <option value="Otro" className='bg-white text-black'>Otro</option>
                  </select>
                </div>
                <div className='w-full relative mb-10'>
                  <textarea 
                    name="mensaje" 
                    id="mensaje" 
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder='Tu mensaje...' 
                    className='resize-none w-full min-h-24 max-h-24 rounded-lg focus:outline-none px-2 py-3' 
                  />
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
                  />
                </button>
              </form>
            </div>
            <div className='w-full lg:w-1/2'>
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
                    <p className='text-sm sm:text-base'>soporte@learnify.com</p>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/phone.svg" 
                      alt="phone-svg" 
                      width={24} 
                      height={24} 
                    />
                    <p className='text-sm sm:text-base'>+57 300 6648618</p>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/location.svg" 
                      alt="location-svg" 
                      width={24} 
                      height={24} 
                    />
                    <p className='text-sm sm:text-base'>Cl. 63 #58B-03, Terranova, Itagüi, Antioquia</p>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/time.svg" 
                      alt="time-svg" 
                      width={24} 
                      height={24} 
                    />
                    <p className='text-sm sm:text-base'>Lunes - Viernes: 9am - 5pm COT</p>
                  </li>
                </ul>
              </div>
              <div className='bg-white p-5 rounded-lg shadow-lg shadow-black/40 w-full lg:w-1/2 mt-10'>
                <h4 className='text-2xl font-medium mb-5'>Conecta con nosotros</h4>
                <ul>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/facebook.svg" 
                      alt="facebook-svg" 
                      width={32} 
                      height={32} 
                    />
                    <Link href={"/"} className='hover:underline'>Learnify</Link>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/linkedin.svg" 
                      alt="linkedin-svg" 
                      width={32} 
                      height={32} 
                    />
                    <Link href={"/"} className='hover:underline'>Learnify</Link>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/instagram.svg" 
                      alt="instagram-svg" 
                      width={32} 
                      height={32} 
                    />
                    <Link href={"/"} className='hover:underline'>@Learnify</Link>
                  </li>
                  <li className='flex items-center gap-2 mb-2 text-xl'>
                    <Image 
                      src="/svg/twitter.svg" 
                      alt="twitter-svg" 
                      width={32} 
                      height={32} 
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
              className="hidden lg:block absolute bottom-10 right-10"
            />
          </section>
        </div>
      </main>
    </>
  )
}
