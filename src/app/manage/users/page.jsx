'use client'

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es";

export default function AdminUsersPage() {
  const [dashboardUsersData, setDashboardUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const flatpickrInstance = useRef(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fecha_nacimiento: '',
    correo: '',
    contraseña: '',
  });
  // Estados para la paginación de la tabla de usuarios
  const [currentPageUsers, setCurrentPageUsers] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsersData = async () => { 
      try {
        const response = await fetch('/api/manage/users');
        if (response.ok) {
          const data = await response.json();
          setDashboardUsersData(data.reverse());
          setTotalUsers(data.length);
        } else {
          console.error('Error al obtener datos de usuarios');
        }
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
      }
    };

    fetchUsersData(); 
  }, []);

  const reloadData = async () => {
    try {
      const response = await fetch('/api/manage/users');
      if (response.ok) {
        const data = await response.json();
        setDashboardUsersData(data.reverse());
        setTotalUsers(data.length);
      } else {
        console.error('Error al obtener datos de usuarios');
      }
    } catch (error) {
      console.error('Error al obtener datos de usuarios:', error);
    }
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (userId, reloadData) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminando...',
          text: 'Por favor, espera.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await fetch(`/api/manage/users/delete?id=${userId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
          }

          Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado correctamente.', 'success');
          reloadData(); // Recargar datos
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
        }
      }
    });
  };

  // Validaciones para la creación de administrador
  // Validación para evitar inyecciones de scripts
  const validateScriptInjection = (value) => {
    const scriptRegex = /<[^>]*script[^>]*>|<\/?[a-z][\s\S]*>/i;
    if (scriptRegex.test(value)) {
      return false;
    }
    return true;
  };

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

  const validateForm = (formData) => {
    // Expresiones regulares de validación
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    const emailRegex = /\S+@\S+\.\S+/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios para nombre y apellidos

    // Validación del nombre
    if (!formData.nombre.trim()) {
      showAlert('El Nombre es obligatorio.');
      return false;
    }
    if (formData.nombre.trim() !== formData.nombre) {
      showAlert('El Nombre no debe tener espacios en blanco al inicio o al final.');
      return false;
    }
    if (formData.nombre.includes('  ')) {
      showAlert('El Nombre no debe tener espacios en blanco dobles.');
      return false;
    }
    if (!validateScriptInjection(formData.nombre)) {
      showAlert('El Nombre no debe contener código HTML o scripts.');
      return false;
    }
    if (!nameRegex.test(formData.nombre)) {
      showAlert('El Nombre no debe contener números o caracteres especiales.');
      return false;
    }

    // Validación de los apellidos
    if (!formData.apellidos.trim()) {
      showAlert('Los Apellidos son obligatorios.');
      return false;
    }
    if (formData.apellidos.trim() !== formData.apellidos) {
      showAlert('Los Apellidos no deben tener espacios en blanco al inicio o al final.');
      return false;
    }
    if (formData.apellidos.includes('  ')) {
      showAlert('Los Apellidos no deben tener espacios en blanco dobles.');
      return false;
    }
    if (!validateScriptInjection(formData.apellidos)) {
      showAlert('Los Apellidos no deben contener código HTML o scripts.');
      return false;
    }
    if (!nameRegex.test(formData.apellidos)) {
      showAlert('Los Apellidos no deben contener números o caracteres especiales.');
      return false;
    }

    // Validación de la fecha de nacimiento
    if (!formData.fecha_nacimiento) {
      showAlert('La Fecha de Nacimiento es obligatoria.');
      return false;
    }

    // Validación del correo electrónico
    if (!formData.correo.trim()) {
      showAlert('El Correo Electrónico es obligatorio.');
      return false;
    }
    if (formData.correo.trim() !== formData.correo) {
      showAlert('El Correo Electrónico no debe tener espacios en blanco al inicio o al final.');
      return false;
    }
    if (formData.correo.includes(' ')) {
      showAlert('El Correo Electrónico no debe tener espacios en blanco.');
      return false;
    }
    if (!validateScriptInjection(formData.correo)) {
      showAlert('El Correo Electrónico no debe contener código HTML o scripts.');
      return false;
    }
    if (!emailRegex.test(formData.correo)) {
      showAlert('Correo Electrónico inválido.');
      return false;
    }

    // Validación de la contraseña
    if (!formData.contraseña.trim()) {
      showAlert('La Contraseña es obligatoria.');
      return false;
    }
    if (formData.contraseña.trim() !== formData.contraseña) {
      showAlert('La Contraseña no debe tener espacios en blanco al inicio o al final.');
      return false;
    }
    if (formData.contraseña.includes('  ')) {
      showAlert('La Contraseña no debe tener espacios en blanco dobles.');
      return false;
    }
    if (!validateScriptInjection(formData.contraseña)) {
      showAlert('La Contraseña no debe contener código HTML o scripts.');
      return false;
    }
    if (!passwordRegex.test(formData.contraseña)) {
      showAlert('La Contraseña debe tener entre 8 y 16 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.');
      return false;
    }

    return true;
  };

  // Función para crear un administrador
  const handleCreateAdmin = async (reloadData) => {
    const { value: formValues } = await Swal.fire({
      title: 'Crear Administrador',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Apellidos">' +
        '<input id="swal-input3" class="swal2-input datepicker" placeholder="Fecha de nacimiento">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Correo eletrónico">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Contraseña">',
      focusConfirm: false,
      confirmButtonText: 'Crear administrador',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'red',
      showCancelButton: true, 
      didOpen: () => {
        const datepickerInput = document.querySelector('.datepicker');
        if (datepickerInput && !flatpickrInstance.current) {
          flatpickrInstance.current = flatpickr(datepickerInput, {
            defaultDate: formData.fecha_nacimiento,
            onChange: (selectedDates) => {
              setFormData((prevState) => ({
                ...prevState,
                fecha_nacimiento: selectedDates[0] ? selectedDates[0].toISOString().split('T')[0] : '',
              }));
            },
            maxDate: "2009-12-12",
            altInputPlaceholder: 'Fecha de Nacimiento',
            altFormat: 'F j, Y',
            dateFormat: 'Y-m-d',
            locale: Spanish,
          });
        }
      },
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
          document.getElementById('swal-input5').value,
        ];
      },
      willClose: () => {
        if (flatpickrInstance.current) {
          flatpickrInstance.current.destroy();
          flatpickrInstance.current = null;
        }
      }
    });

    if (formValues) {
      const [nombre, apellidos, fecha_nacimiento, correo, contraseña ] = formValues;
      
      const formData = {
        nombre,
        apellidos,
        fecha_nacimiento,
        correo,
        contraseña,
      };

      if (!validateForm(formData)) return; // Validar el formulario

      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres crear el administrador "${nombre}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: 'red'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Creando...',
            text: 'Por favor, espera.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          try {
            const response = await fetch('/api/manage/users/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nombre, apellidos, fecha_nacimiento, correo, contraseña }),
            });
            
            if (!response.ok) {
              throw new Error('Error al crear el administrador');
            }
            
            Swal.fire('¡Creada!', 'EL administrador ha sido creado correctamente.', 'success');
            reloadData(); // Recargar datos
          } catch (error) {
            Swal.fire('Error', error.message, 'error');
          }
        }
      });
    }
  };

  // Funciones para manejar la paginación de la tabla de usuarios
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setItemsPerPage(window.innerWidth < 640 ? 5 : 10);
      };

      handleResize(); // Establecer el valor inicial

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Función para cambiar de página
  const handlePageChangeUsers = (pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  // Cálculo de los datos a mostrar en cada página
  const currentUsers = useMemo(() => {
    const startIndex = (currentPageUsers - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dashboardUsersData.slice(startIndex, endIndex);
  }, [dashboardUsersData, currentPageUsers, itemsPerPage]);

  return (
    <>
      <main className="lg:ml-80">
        <section className="pt-10 px-10">
          <div className="flex items-center gap-2">
            <Image 
                src="/svg/userDarkBlue.svg" 
                alt="userDarkBlue-svg" 
                width={50} 
                height={50} 
            />
            <h2 className="text-2xl sm:text-4xl text-[#0D1D5F]">Usuarios</h2>
          </div>
        </section>
        <section className="p-10">
          <div className="flex justify-between">
            <div className="w-full border-2 border-[#0D1D5F] rounded-lg p-5">
              <h3 className="text-xl font-medium">Usuarios Totales</h3>
              <p className="text-4xl font-medium my-3">{totalUsers}</p>
            </div>
          </div>
        </section>
        <section className="px-10 pb-10">
          <h3 className="text-2xl font-medium text-[#0D1D5F] mb-10">Usuarios</h3>
          <div className="flex flex-row-reverse mb-2">
            <button 
              className="flex items-center gap-1 group"
              onClick={() => handleCreateAdmin(reloadData)}
            >
              <p className="text-base sm:text-2xl group-hover:underline text-[#0D1D5F]">Añadir nuevo administrador</p>
              <Image 
                  src="/svg/addDarkBlue.svg" 
                  alt="addDarkBlue-svg" 
                  width={40} 
                  height={40} 
              />
            </button>
          </div>
          <div className="overflow-x-auto border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto Perfil</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Nacimiento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Biografía</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map(usuario => (
                  <tr key={usuario.id_usuario}>
                    <td className="px-6 py-4 whitespace-nowrap">{usuario.id_usuario}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {usuario.foto_perfil ? (
                        <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                          <Image
                            src={usuario.foto_perfil}
                            alt={`${usuario.nombre}-${usuario.apellidos}-profile-image`}
                            width={50}
                            height={50}
                            className="m-auto rounded-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                          <Image
                            src='/images/userDefaultImage.png'
                            alt='default-profile-image'
                            width={50}
                            height={50}
                            className="m-auto rounded-full object-cover"
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{usuario.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{usuario.apellidos}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{new Date(usuario.fecha_nacimiento).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{usuario.correo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{usuario.rol.rol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">
                      {usuario.biografia ? (usuario.biografia.length > 50 ? usuario.biografia.substring(0, 50) + "..." : usuario.biografia) : "El usuario no cuenta con biografía."}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        className="bg-red-400 flex items-center px-3 py-2 rounded-lg hover:bg-red-600"
                        onClick={() => handleDeleteUser(usuario.id_usuario, reloadData)}
                      >
                        <p className="text-white font-light">Eliminar</p>
                        <div className="w-6 h-6">
                          <Image 
                            src="/svg/delete.svg" 
                            alt="delete-svg" 
                            width={24} 
                            height={24} 
                          />
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginación para usuarios */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: Math.ceil(dashboardUsersData.length / itemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-1 rounded ${currentPageUsers === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePageChangeUsers(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}