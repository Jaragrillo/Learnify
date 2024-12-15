'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode'; // Para decodificar el token
import jsCookie from 'js-cookie';
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const router = useRouter();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = jsCookie.get('auth-token');

    if (!token) {
      // Si no hay token, redirigir al inicio de sesión
      router.push('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setRole(decodedToken.role);
      fetchUserData(decodedToken.id);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem('auth-token'); // Elimina el token en caso de error
      router.push('/login');
    }
  }, []);

  // Función para obtener los datos del perfil desde el backend
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`); // Llamada al API usando el id
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      const data = await response.json(); // Procesa la respuesta
      setUserData(data); // Guarda los datos del usuario
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener datos del perfil:", error);
      setError("No se pudo cargar el perfil.");
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Elimina el token y redirige a la página de inicio
    jsCookie.remove('auth-token');
    router.push('/');
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <main>
        <section className="container mx-auto">
        <h2 className='text-4xl text-[#0D1D5F] m-10'>Bienvenid@, {userData.nombre} {userData.apellidos}</h2>

          {userData && (
            <div className="bg-gradient-to-bl from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] p-10">
              <div className="mb-10 flex items-center gap-5">
                <Image 
                    src="/images/benefits/testimony1.png" 
                    alt="testimony-1-image" 
                    width={150} 
                    height={150} 
                    className=""
                />
                <div>
                  <p className="text-3xl text-white">{userData.nombre} {userData.apellidos}</p>
                  <p className="text-2xl text-white/60 font-light">{userData.correo}</p>
                </div>
              </div>

              <form action="" className="flex flex-wrap gap-y-10 gap-x-32">
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
                  <input type="text" name="name" id="name" value={`${userData.nombre}`} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                </div>
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
                  <input type="text" name="lastName" id="lastName" value={`${userData.apellidos}`} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                </div>
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
                  <input type="text" name="dateOfBirth" id="dateOfBirth" value={`${userData.fecha_nacimiento}`} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                </div>
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
                  <input type="text" name="email" id="email" value={`${userData.correo}`} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                </div>
                <div className="w-2/5">
                  <label htmlFor="createdCourses" className="block text-2xl text-white">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/svg/classWhite.svg" 
                        alt="classWhite-svg" 
                        width={35} 
                        height={35} 
                        className=""
                      />
                      Cursos creados
                    </div>
                  </label>
                  <input type="text" name="createdCourses" id="createdCourses" value={`${userData.nombre}`} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                  <Link href={'/user/myCourses'} className="text-white/60 hover:text-white/100 w-fit mt-1 block">Ver cursos creados →</Link>
                </div>
                <div className="w-2/5">
                  <label htmlFor="purchasedCourses" className="block text-2xl text-white">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/svg/moneyWhite.svg" 
                        alt="moneyWhite-svg" 
                        width={35} 
                        height={35} 
                        className=""
                      />
                      Cursos comprados
                    </div>
                  </label>
                  <input type="text" name="purchasedCourses" id="purchasedCourses" value={`${userData.nombre}`} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                  <Link href={'/user/purchasedCourses'} className="text-white/60 hover:text-white/100 w-fit mt-1 block">Ver cursos comprados →</Link>
                </div>
                {/* <div className="w-2/5">
                  <label htmlFor="password" className="block text-2xl text-white">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/svg/password.svg" 
                        alt="password-svg" 
                        width={35} 
                        height={35} 
                        className=""
                      />
                      Contraseña
                    </div>
                  </label>
                  <input type="text" name="password" id="password" value={`${userData.contraseña}`} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                </div> */}
              </form>

              {/* Si el usuario quiere cambiar su información */}
              <Link href={'/user/profile/edit'} className="flex items-center gap-2 text-white text-2xl font-light mt-10 w-fit">
                <Image 
                  src="/svg/edit.svg" 
                  alt="edit-svg" 
                  width={35} 
                  height={35} 
                  className=""
                />
                <p className="hover:underline">Editar perfil</p>
              </Link>

              {/* Botón para cerrar sesión */}
              <button onClick={handleLogout} className="mt-4 text-2xl font-light text-white flex items-center gap-2">
                <Image 
                  src="/svg/exit.svg" 
                  alt="exit-svg" 
                  width={35} 
                  height={35} 
                  className=""
                />
                <p className="hover:underline">Cerrar sesión</p>
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
