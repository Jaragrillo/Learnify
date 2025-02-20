'use client'

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode'; 
import jsCookie from 'js-cookie';
import Image from "next/image";
import Swal from 'sweetalert2';
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Spanish } from 'flatpickr/dist/l10n/es' // Importamos el idioma español
import EditProfileSkeleton from "@/components/skeletons/EditProfileSkeleton";

export default function EditProfilePage() {
  const [originalData, setOriginalData] = useState(null); // Guardamos los datos originales
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCurrentlyPassword, setShowCurrentlyPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const datePickerRef = useRef(null);
  const flatpickrInstance = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const token = jsCookie.get('auth-token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      fetchUserData(decodedToken.id);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      jsCookie.remove('auth-token');
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (datePickerRef.current && !flatpickrInstance.current && userData) {
      flatpickrInstance.current = flatpickr(datePickerRef.current, {
        defaultDate: userData.fecha_nacimiento, 
        onChange: (selectedDates) => {
          setUserData((prevState) => ({
            ...prevState,
            fecha_nacimiento: selectedDates[0] || '',
          }));
        },
        maxDate: "2009-12-12",
        altInputPlaceholder: 'Fecha de Nacimiento',
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d',
        locale: Spanish,
      });
    }

    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
        flatpickrInstance.current = null;
      }
    };
  }, [userData]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      const data = await response.json();
      setOriginalData(data);
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener datos del perfil:", error);
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => { 
    if (!selectedFile) return userData.foto_perfil;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "learnify-uploads"); // Configuración de Cloudinary

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/djsrfacsx/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      return userData.foto_perfil;
    }
  };

  const handleSaveChanges = async () => {
    // Diccionario para mostrar nombres más amigables en la alerta
    const fieldNames = {
      nombre: "Nombre",
      apellidos: "Apellidos",
      correo: "Correo",
      biografia: "Biografía",
      fecha_nacimiento: "Fecha de nacimiento"
    };

    // Crear una copia limpia del userData sin las contraseñas para comparar cambios reales
    const { currentlyPassword, newPassword, ...cleanUserData } = userData;
    const { currentlyPassword: oldCurrentlyPassword, newPassword: oldNewPassword, ...cleanOriginalData } = originalData;

    // Verificar si hay cambios en los demás campos (sin contar contraseñas)
    const fieldsChanged = Object.keys(cleanUserData).filter(
      (key) => cleanUserData[key] !== cleanOriginalData[key]
    );

    // Verificar cambios en la nueva contraseña
    const newPasswordChanged = newPassword && newPassword !== oldNewPassword;

    if (fieldsChanged.length === 0 && !newPasswordChanged) {
      Swal.fire("Sin cambios", "Debes realizar algún cambio antes de guardar.", "info");
      return;
    }

    // Mapear los cambios usando el diccionario de nombres
    const changesMessage = [
      ...fieldsChanged.map((field) => `• ${fieldNames[field] || field}`), // Usar el diccionario o el nombre original
      newPasswordChanged ? "• Nueva Contraseña" : "",
    ]
    .filter(Boolean) // Filtrar valores vacíos
    .join("\n"); 

    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás realizando cambios en los siguientes campos: \n${changesMessage}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const imageUrl = await uploadImage();

        if (!userData.nombre || !userData.apellidos || !userData.correo || !userData.fecha_nacimiento) {
          Swal.fire("Error", "Los campos Nombre, Apellidos, Correo y Fecha de Nacimiento son obligatorios.", "error");
          return;
        }

        try {
          // Mostrar el loader mientras se procesa la solicitud en el servidor
          Swal.fire({
            title: 'Procesando...',
            text: 'Guardando los cambios realizados.',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(), // Activa el loader
          });

          const response = await fetch(`/api/user/${userData.id_usuario}/updateProfile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...userData, foto_perfil: imageUrl }),
          });
    
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Perfil actualizado correctamente.',
              confirmButtonText: 'Aceptar',
              customClass: {
                confirmButton: 'bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded',
              },
              buttonsStyling: false,
            }).then(() => {
              router.push('/user/profile'); // Redirigir después de confirmar
            });
          } else {
            // Parsear el mensaje de error desde el servidor si es posible
            const errorData = await response.json().catch(() => ({
              message: 'Error desconocido al guardar los cambios.',
            }));

            Swal.fire({
              icon: 'error',
              title: 'Error al guardar',
              text: errorData.error || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
              confirmButtonText: 'Reintentar',
              customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded',
              },
              buttonsStyling: false,
            });

            return ; // Detener el flujo en caso de error
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
    })

    // Verificar envío de datos al backend
    // console.log("Datos enviados al backend:", {
    //   ...userData,
    //   foto_perfil: imageUrl,
    // });

  };

  const handleGoBack = () => {
    Swal.fire({
      title: "¿Estás seguro de volver?",
      text: "Los cambios realizados no se guardarán si vuelves.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Volver",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/user/profile");
      }
    })
  }

  if (isLoading) {
    return <EditProfileSkeleton />;
  }

  return (
    <main>
      <section className="container mx-auto">
        <h2 className='text-4xl text-[#0D1D5F] m-10'>Editar perfil</h2>

        <div className="bg-gradient-to-bl from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] p-10">
          <div className="mb-10 flex items-center gap-5">
            <label htmlFor="profileImage">
              <Image 
                src={userData.foto_perfil ?? '/images/userDefaultImage.png'}
                alt="profile-image"
                width={150} 
                height={150} 
                className="cursor-pointer"
              />
              <input 
                type="file" 
                id="profileImage" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </label>
            <div>
                <p className="text-3xl text-white">{userData.nombre} {userData.apellidos}</p>
                <p className="text-2xl text-white/60 font-light">{userData.correo}</p>
            </div>
          </div>

          <form className="flex flex-wrap gap-y-10 gap-x-32">
            {/* Nombre */}
            <div className="w-2/5">
              <label htmlFor="name" className="block text-2xl text-white">
                <div className="flex items-center gap-1">
                  <Image 
                    src="/svg/name.svg" 
                    alt="name-svg" 
                    width={35} 
                    height={35} 
                    className=""
                  />
                  Nombre
                </div>
              </label>
              <input 
                type="text" 
                value={userData.nombre} 
                onChange={(e) => setUserData({ ...userData, nombre: e.target.value })} 
                className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
              />
            </div>
            {/* Apellidos */}
            <div className="w-2/5">
              <label htmlFor="lastName" className="block text-2xl text-white">
                <div className="flex items-center gap-1">
                  <Image 
                    src="/svg/name.svg" 
                    alt="name-svg" 
                    width={35} 
                    height={35} 
                    className=""
                  />
                  Apellidos
                </div>
              </label>
              <input 
                type="text" 
                value={userData.apellidos} 
                onChange={(e) => setUserData({ ...userData, apellidos: e.target.value })} 
                className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
              />
            </div>
            
            {/* Fecha de nacimiento */}
            <div className="w-2/5">
              <label htmlFor="dateOfBirth" className="block text-2xl text-white">
                <div className="flex items-center gap-1">
                  <Image 
                    src="/svg/calendar.svg" 
                    alt="calendar-svg" 
                    width={35} 
                    height={35} 
                    className=""
                  />
                  Fecha de nacimiento
                </div>
              </label>
              <input 
                ref={datePickerRef}
                type="text"
                value={userData.fecha_nacimiento} 
                onChange={(e) => setUserData({ ...userData, fecha_nacimiento: e.target.value })} 
                placeholder='Fecha de Nacimiento'
                className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
                readOnly
              />
            </div>

            {/* Correo */}
            <div className="w-2/5">
              <label htmlFor="email" className="block text-2xl text-white">
                <div className="flex items-center gap-1">
                  <Image 
                    src="/svg/emailWhite.svg" 
                    alt="emailWhite-svg" 
                    width={35} 
                    height={35} 
                    className=""
                  />
                  Correo electrónico
                </div>
              </label>
              <input 
                type="email" 
                value={userData.correo} 
                onChange={(e) => setUserData({ ...userData, correo: e.target.value })} 
                className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
               />
            </div>

            {/* Biografía */}
            <div className="w-full">
              <label htmlFor="description" className="block text-2xl text-white">
                <div className="flex items-center gap-1">
                  <Image 
                    src="/svg/description.svg" 
                    alt="description-svg" 
                    width={35} 
                    height={35} 
                    className=""
                  />
                  Biografía
                </div>
              </label>
              <textarea 
                value={userData.biografia} 
                placeholder="Añade una biografía..."
                onChange={(e) => setUserData({ ...userData, biografia: e.target.value })} 
                className="w-[89%] resize-none min-h-24 max-h-24 px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300 h-32"
              />
            </div>

            {/* Contraseña actual */}
            <div className="w-2/5">
              <label htmlFor="currentlyPassword" className="block text-2xl text-white">
                <div className="flex items-center gap-1">
                  <Image 
                    src="/svg/password.svg" 
                    alt="password-svg" 
                    width={35} 
                    height={35} 
                    className=""
                  />
                  Contraseña actual
                </div>
              </label>
              <div className="relative">
                <input 
                  type={showCurrentlyPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña actual..." 
                  onChange={(e) => setUserData({ ...userData, currentlyPassword: e.target.value })} 
                  className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
                />
                <button
                  type='button'
                  onClick={(e) => {e.preventDefault(); setShowCurrentlyPassword(!showCurrentlyPassword)}}
                >
                  <Image
                    src={showCurrentlyPassword ? "/svg/passwordEyeOn.svg" : "/svg/passwordEyeOff.svg"}
                    alt="password-Eye-svg"
                    width={24}
                    height={24}
                    className="absolute top-0 bottom-0 right-3 m-auto"
                  />
                </button>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div className="w-2/5">
              <label htmlFor="email" className="block text-2xl text-white">
                <div className="flex items-center gap-1">
                  <Image 
                    src="/svg/password.svg" 
                    alt="password-svg" 
                    width={35} 
                    height={35} 
                    className=""
                  />
                  Nueva contraseña
                </div>
              </label>
              <div className="relative">
                <input 
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña..."
                  onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })} 
                  className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
                />
                <button
                  type='button'
                  onClick={(e) => {e.preventDefault(); setShowNewPassword(!showNewPassword)}}
                >
                  <Image
                    src={showNewPassword ? "/svg/passwordEyeOn.svg" : "/svg/passwordEyeOff.svg"}
                    alt="password-Eye-svg"
                    width={24}
                    height={24}
                    className="absolute top-0 bottom-0 right-3 m-auto"
                  />
                </button>
              </div>
            </div>
          </form>

          <button onClick={handleSaveChanges} className="flex items-center gap-2 text-white text-2xl font-light mt-10 w-fit">
            <Image 
              src="/svg/edit.svg" 
              alt="edit-svg" 
              width={35} 
              height={35} 
              className=""
            />
            <p className="hover:underline">Guardar cambios</p>
          </button>

          <button onClick={handleGoBack} className="mt-4 text-2xl font-light text-white flex items-center gap-2">
            <Image 
              src="/svg/exit.svg" 
              alt="exit-svg" 
              width={35} 
              height={35} 
              className=""
            />
            <p className="hover:underline">Volver</p>
          </button>
        </div>
      </section>
    </main>
  );
}
