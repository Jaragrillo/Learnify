'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Spanish } from 'flatpickr/dist/l10n/es' // Importamos el idioma español
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function RegisterPage() {

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // useState para mostar el campo de la contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // useState para mostar el campo de confirmar la contraseña

  // const [date, setDate] = useState(null);  // Estado para manejar la fecha
  const datePickerRef = useRef(null);  // Referencia para el input de fecha
  const flatpickrInstance = useRef(null); // Referencia para el picker

  // Usamos useEffect para inicializar flatpickr
  useEffect(() => {
    if (datePickerRef.current && !flatpickrInstance.current) { // Verificar si flatpickr ya está inicializado
      flatpickrInstance.current = flatpickr(datePickerRef.current, {
        defaultDate: formData.dateOfBirth,  // Establece la fecha por defecto
        onChange: (selectedDates) => {setFormData((prevState) => ({ ...prevState,  dateOfBirth: selectedDates[0] || '', }));},  // Actualiza el estado con la fecha seleccionada, en caso de que no haya, se llena con un string vacío
        maxDate: "2009-12-12",
        altInputPlaceholder: 'Fecha de Nacimiento',  // Placeholder personalizado
        altFormat: 'F j, Y',  // Formato alternativo de visualización
        dateFormat: 'Y-m-d',  // Formato para el valor de fecha
        locale: Spanish,  // Configuramos el idioma a español
      });
    }

    // Cleanup para destruir el picker cuando el componente se desmonte
    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
        flatpickrInstance.current = null; // Resetea la referencia
      }
    };
  }, [formData.dateOfBirth]);  // Se ejecuta cuando cambia el valor de `date`

  const validateForm = () => {

    // Expresiones regulares de validación
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    const emailRegex = /\S+@\S+\.\S+/;

    // Validación del nombre
    if (!formData.name.trim()) {
      showAlert('El Nombre es obligatorio.');
      return false;
    };
    // Validación de los apellidos
    if (!formData.lastName.trim()) {
      showAlert('Los Apellidos son obligatorios.');
      return false; 
    };
    // Validación de la fecha de nacimiento
    if (!formData.dateOfBirth) {
      showAlert('La Fecha de Nacimiento es obligatoria.');
      return false;
    };
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
      showAlert('La Contraseña debe tener entre 8 y 16 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.');
      return false;
    };
    // Validaciones de la confirmación de la contraseña
    if (!formData.confirmPassword.trim()) {
      showAlert('Confirmar la Contraseña es obligatorio.');
      return false;
    };
    if (formData.password !== formData.confirmPassword) {
      showAlert('Las Contraseñas no coinciden.');
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

    const { name, lastName, dateOfBirth, email, password, confirmPassword, value } = e.target;
    setFormData((prevState) => ({ // Establecer un valor definido en caso de que algún campo se vuelva undefined, para el correcto funcionamiento de flatpickr
      ...prevState,
      [name]: value || '', // Si el valor es `undefined`, usa una cadena vacía ↓
      [lastName]: value || '',
      [dateOfBirth]: value || '',
      [email]: value || '',
      [password]: value || '',
      [confirmPassword]: value || '',
    }));

    try {
      // Mostrar el loader mientras se procesa la solicitud en el servidor
      Swal.fire({
        title: 'Procesando...',
        text: 'Estamos creando tu cuenta.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(), // Activa el loader
      });
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Parsear el mensaje de error desde el servidor
        const errorData = await response.json().catch(() => ({
          message: 'Error desconocido en el servidor',
        }));

        // Mostrar el mensaje específico del servidor
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
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
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido a Learnify!',
          text: '¡Tu cuenta ha sido creada correctamente!',
          confirmButtonText: 'Comenzar',
          customClass: {
            confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded',
          },
          buttonsStyling: false,
        }).then(() => {
          router.push('/login');
        });
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
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
          <div className='w-1/2 h-full bg-[#32acda] flex flex-col items-center justify-center pt-10'>
            <h2 className='text-white text-4xl max-w-sm mb-5'>¡Aprende sin límites, enseña sin fronteras!</h2>
            <div className=' bg-white w-[490px] rounded-lg shadow-lg shadow-black/25 p-5'>
              <h3 className='text-center text-3xl mb-5 font-medium'>Regístrate</h3>
              <form onSubmit={handleSubmit} className='w-fit m-auto'>
                <div className='mb-4'>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    placeholder='Nombre' 
                    className='border border-black rounded-lg w-80 px-3 py-2 focus:outline-none'
                  />
                </div>
                <div className='mb-4'>
                  <input 
                    type="text" 
                    name="lastName" 
                    id="lastName" 
                    value={formData.lastName} 
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                    placeholder='Apellidos' 
                    className='border border-black rounded-lg w-80 px-3 py-2 focus:outline-none'
                  />
                </div>
                <div className='mb-4'>
                  <input 
                    ref={datePickerRef} 
                    type="text" 
                    placeholder='Fecha de Nacimiento' 
                    className='border border-black rounded-lg w-80 px-3 py-2 focus:outline-none' 
                    readOnly
                  />
                </div>
                <div className='mb-4'><div className="3"></div>
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
                      id='showPassword' 
                      width={24} 
                      height={24} 
                      className="absolute top-0 bottom-0 right-3 m-auto"
                    />
                  </button>
                </div>
                <div className='mb-4 relative w-fit h-fit'>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    name='confirmPassword' 
                    id='confirmPassword' 
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                    placeholder='Confirmar Contraseña' 
                    className='border border-black rounded-lg w-80 px-3 py-2 focus:outline-none'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Image 
                      src={showConfirmPassword ? "/svg/passwordEyeOn.svg" : "/svg/passwordEyeOff.svg"} 
                      alt="password-Eye-svg" 
                      id='showPassword'
                      width={24} 
                      height={24} 
                      className="absolute top-0 bottom-0 right-3 m-auto"
                    />
                  </button>
                </div>

                <button type="submit" className='m-auto mb-4 bg-[#1F84BA] text-white px-14 py-2 rounded-lg block hover:bg-[#3192c6] transition duration-300'>Regístrarse</button>
              </form>

              <p className='text-center text-lg mb-4'>¿Ya tienes una cuenta? <Link href={"/login"} className='text-[#1F84BA] hover:underline'>Entra ya!</Link></p>
              <p className='text-sm text-gray-500 text-justify'>Al registrarte, aceptas los <Link href={"/legal#terms&conditions"} className='underline hover:text-gray-700'>Términos y Condiciones</Link>, la <Link href={"/legal#privacyPolicies"} className='underline hover:text-gray-700'>Política de Privacidad</Link>, la <Link href={"/legal#dataTreatmentPolicies"} className='underline hover:text-gray-700'>Política de Tratamiento de Datos</Link>, y la <Link href={"/legal#cookiesPolicies  "} className='underline hover:text-gray-700'>Política de Cookies</Link> de Learnify.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
