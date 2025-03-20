'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode'; 
import jsCookie from 'js-cookie';
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Swal from 'sweetalert2';
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

export default function ProfilePage() {
  const { logout } = useAuth(); // Obtén logout y el estado del usuario desde el contexto
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();
  const [createdCoursesCount, setCreatedCoursesCount] = useState(0);
  const [purchasedCoursesCount, setPurchasedCoursesCount] = useState(0);

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
      fetchCoursesCounts();
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

  // Función para consultar los cursos que ha comprado y creado el usuario
  const fetchCoursesCounts = async () => {
    try {
      const createdResponse = await fetch('/api/courses?createdByUser=true');
      if (createdResponse.ok) {
        const createdData = await createdResponse.json();
        setCreatedCoursesCount(createdData.length);
      }

      const purchasedResponse = await fetch('/api/courses?purchasedByUser=true');
      if (purchasedResponse.ok) {
        const purchasedData = await purchasedResponse.json();
        setPurchasedCoursesCount(purchasedData.length);
      }
    } catch (error) {
      console.error("Error al obtener la cantidad de cursos:", error);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cerrará tu sesión actual.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina el token y redirige a la página de inicio
        jsCookie.remove('auth-token');
        logout();
        router.push('/');
        Swal.fire(
          'Sesión cerrada',
          'Tu sesión se ha cerrado exitosamente.',
          'success'
        );
      }
    });
  };

  if (isLoading) {
    return <ProfileSkeleton />;
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
                <div className="w-[150px] h-[150px] overflow-hidden rounded-full">
                  <Image 
                      src={userData.foto_perfil ?? '/images/userDefaultImage.png'}
                      alt={`${userData.foto_perfil ? `${userData.nombre}-${userData.apellidos}` : 'default'}-profile-image`}
                      width={150} 
                      height={150} 
                      className="rounded-full object-cover"
                  />
                </div>
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
                      />
                      Correo electrónico
                    </div>
                  </label>
                  <input type="text" name="email" id="email" value={`${userData.correo}`} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                </div>
                <div className="w-[89%]">
                  <label htmlFor="biography" className="block text-2xl text-white">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/svg/description.svg" 
                        alt="description-svg" 
                        width={35} 
                        height={35} 
                      />
                      Biografía
                    </div>
                  </label>
                  <input type="text" name="biography" id="biography" value={userData.biografia ? userData.biografia : "Añade una biografía..."} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                </div>
                <div className={`w-2/5 ${role === 1 ? 'hidden' : ''}`}>
                  <label htmlFor="createdCourses" className="block text-2xl text-white">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/svg/classWhite.svg" 
                        alt="classWhite-svg" 
                        width={35} 
                        height={35} 
                      />
                      Cursos creados
                    </div>
                  </label>
                  <input type="text" name="createdCourses" id="createdCourses" value={createdCoursesCount} className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                  <Link href={'/user/myCourses'} className="text-white/60 hover:text-white/100 w-fit mt-1 block">Ver cursos creados →</Link>
                </div>
                <div className={`w-2/5 ${role === 1 ? 'hidden' : ''}`}>
                  <label htmlFor="purchasedCourses" className="block text-2xl text-white">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/svg/moneyWhite.svg" 
                        alt="moneyWhite-svg" 
                        width={35} 
                        height={35} 
                      />
                      Cursos comprados
                    </div>
                  </label>
                  <input type="text" name="purchasedCourses" id="purchasedCourses" value={purchasedCoursesCount } className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:outline-none placeholder:text-black" readOnly/>
                  <Link href={'/user/purchasedCourses'} className="text-white/60 hover:text-white/100 w-fit mt-1 block">Ver cursos comprados →</Link>
                </div>
              </form>

              {/* Si el usuario quiere cambiar su información */}
              <Link href={'/user/profile/edit'} className="flex items-center gap-2 text-white text-2xl font-light mt-10 w-fit">
                <Image 
                  src="/svg/edit.svg" 
                  alt="edit-svg" 
                  width={35} 
                  height={35} 
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
