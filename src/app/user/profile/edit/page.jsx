'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode'; 
import jsCookie from 'js-cookie';
import Image from "next/image";
import Swal from 'sweetalert2';
import { useAuth } from "@/contexts/AuthContext";

export default function EditProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCurrentlyPassword, setShowCurrentlyPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      const data = await response.json();
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
    const imageUrl = await uploadImage();

    if (!userData.nombre || !userData.apellidos || !userData.correo || !userData.fecha_nacimiento) {
      Swal.fire("Error", "Por favor, completa todos los campos obligatorios.", "error");
      return;
    }

    try {
      const response = await fetch(`/api/user/${userData.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, foto_perfil: imageUrl }),
      });

      if (response.ok) {
        Swal.fire("Éxito", "Perfil actualizado correctamente.", "success");
        router.push("/user/profile");
      } else {
        throw new Error("Error al guardar los cambios");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
                type="date" 
                value={userData.fecha_nacimiento} 
                onChange={(e) => setUserData({ ...userData, fecha_nacimiento: e.target.value })} 
                className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
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
                value={userData.bio} 
                placeholder="Añade una biografía..."
                onChange={(e) => setUserData({ ...userData, bio: e.target.value })} 
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
                  // onChange={(e) => setUserData({ ...userData, correo: e.target.value })} 
                  className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
                />
                <button
                  type='button'
                  onClick={() => setShowCurrentlyPassword(!showCurrentlyPassword)}
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
                  // onChange={(e) => setUserData({ ...userData, correo: e.target.value })} 
                  className="w-full px-2 py-3 shadow-lg shadow-black/40 focus:shadow focus:shadow-white/40 focus:outline-none transition duration-300"
                />
                <button
                  type='button'
                  onClick={() => setShowNewPassword(!showNewPassword)}
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

          <button onClick={() => router.push("/user/profile")} className="mt-4 text-2xl font-light text-white flex items-center gap-2">
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
