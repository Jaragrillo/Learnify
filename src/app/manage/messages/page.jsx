'use client'

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

export default function AdminMessagesPage() {
  const [mensajes, setMensajes] = useState([]);
  const [mensajesTotales, setMensajesTotales] = useState([]);
  const [filtroTipoConsulta, setFiltroTipoConsulta] = useState('');
  const [categorias, setCategorias] = useState({
    "Soporte técnico": 0,
    "Pregunta sobre facturación": 0,
    "Propuesta laboral": 0,
    "Otro": 0,
  });
  const [totalMensajes, setTotalMensajes] = useState(0);
  // Estados para la paginación de la tabla de mensajes
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // useEffect para obtener todos los mensajes
  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const response = await fetch(`/api/manage/messages`); // Obtener todos los mensajes
        if (response.ok) {
          const data = await response.json();
          setMensajesTotales(data); // Almacenar todos los mensajes
        } else {
          console.error('Error al obtener mensajes');
        }
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      }
    };

    fetchMensajes();
  }, []); // Ejecutar solo una vez al montar el componente

  // useEffect para obtener los mensajes filtrados
  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const response = await fetch(`/api/manage/messages?tipo_consulta=${filtroTipoConsulta}`);
        if (response.ok) {
          const data = await response.json();
          setMensajes(data);
        } else {
          console.error('Error al obtener mensajes');
        }
      } catch (error) {
        console.error('Error al obtener mensajes:', error);
      }
    };

    fetchMensajes();
  }, [filtroTipoConsulta]);

  const reloadData = async () => {
    try {
      const response = await fetch(`/api/manage/messages`);
      if (response.ok) {
        const data = await response.json();
        setMensajesTotales(data);
      } else {
        console.error('Error al obtener mensajes');
      }
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  };

  // Funcionamiento de mensajes por categorías
  useEffect(() => {
    setTotalMensajes(mensajesTotales.length); // Usar mensajesTotales para el total
    calcularCategorias(mensajesTotales); // Usar mensajesTotales para las categorías
  }, [mensajesTotales]);

  const calcularCategorias = (mensajes) => {
    const nuevasCategorias = {
      "Soporte técnico": 0,
      "Pregunta sobre facturación": 0,
      "Propuesta laboral": 0,
      "Otro": 0,
    };

    mensajes.forEach(mensaje => {
      nuevasCategorias[mensaje.tipo_consulta]++;
    });

    setCategorias(nuevasCategorias);
  };

  const handleFiltroChange = (e) => {
    setFiltroTipoConsulta(e.target.value);
  };

  const calcularPorcentaje = (categoria) => {
    if (totalMensajes === 0) return 0;
    return (categorias[categoria] / totalMensajes) * 100;
  };

  const getBarColor = (categoria) => {
    switch (categoria) {
      case "Soporte técnico":
        return "bg-red-500";
      case "Pregunta sobre facturación":
        return "bg-yellow-500";
      case "Propuesta laboral":
        return "bg-green-500";
      case "Otro":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const truncateMessage = (message, maxLength) => {
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + "...";
    }
    return message;
  };

  // Función para ver los detalles del mensaje → eliminarlo o cerrar los detalles
  const showMessageDetails = (mensaje) => {
    const color = getBarColor(mensaje.tipo_consulta).split('-')[1];
    Swal.fire({
      title: 'Detalles del Mensaje',
      html: `
        <p class="text-justify"><strong>Nombre:</strong> ${mensaje.nombre} ${mensaje.apellidos}</p>
        <p class="text-justify"><strong>Correo:</strong> ${mensaje.correo}</p>
        <p class="text-justify my-1">
          <strong>Consulta:</strong> 
          <span class="px-2 py-1 rounded-full bg-${color}-500 text-white">${mensaje.tipo_consulta}</span>
        </p>
        <p class="text-justify"><strong>Mensaje:</strong> ${mensaje.mensaje}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cerrar',
      cancelButtonColor: 'red',
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Mostrar confirmación adicional antes de eliminar
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¿Deseas eliminar este mensaje?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
        }).then((confirmResult) => {
          if (confirmResult.isConfirmed) {
            // Proceder con la eliminación
            Swal.fire({
              title: 'Eliminando...',
              showConfirmButton: false,
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
                fetch(`/api/manage/messages/delete?id=${mensaje.id_contacto}`, {
                  method: 'DELETE',
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText);
                  }
                  return response.json();
                })
                .then(() => {
                  Swal.fire('Eliminado!', 'El mensaje ha sido eliminado.', 'success');
                  reloadData();
                  fetch(`/api/manage/messages?tipo_consulta=${filtroTipoConsulta}`).then(response => response.json()).then(data => setMensajes(data));
                })
                .catch(error => {
                  Swal.fire('Error', `Error al eliminar: ${error}`, 'error');
                });
              },
            });
          }
        });
      }
    });
  };

  // Funciones para la paginación de la tabla de mensajes
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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Cálculo de los datos a mostrar en cada página
  const currentMessages = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return mensajes.slice(startIndex, endIndex);
  }, [mensajes, currentPage, itemsPerPage]);

  return (
    <>
      <main className="lg:ml-80">
        <section className="p-10">
          <div className="flex items-center gap-2">
            <Image 
                src="/svg/messageDarkBlue.svg" 
                alt="messageDarkBlue-svg" 
                width={50} 
                height={50} 
            />
            <h2 className="text-2xl sm:text-4xl text-[#0D1D5F]">Mensajes</h2>
          </div>
        </section>
        <section className="px-10">
          <div>
            <div className="w-full border-2 border-[#0D1D5F] rounded-lg p-5 mb-10">
              <h3 className="text-xl font-medium">Mensajes Totales</h3>
              <p className="text-4xl font-medium my-3">{totalMensajes}</p>
            </div>
            <div className="w-full border-2 border-[#0D1D5F] rounded-lg p-5 mb-10">
              <h3 className="text-xl font-medium mb-5">Categorías de Mensajes</h3>
              <div>
                {Object.keys(categorias).map(categoria => (
                  <div key={categoria} className="w-full">
                    <div className="flex items-center justify-between mb-5">
                      <h4 className="text-lg font-medium">{categoria}</h4>
                      <p className="text-[#0D1D5F] text-lg">{calcularPorcentaje(categoria).toFixed(2)}%</p>
                    </div>
                    <div className="bg-gray-200 rounded-full h-4 mb-5">
                      <div
                        className={`h-4 rounded-full ${getBarColor(categoria)} transition-all duration-700 ease-in-out`}
                        style={{ width: `${calcularPorcentaje(categoria)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
        </section>
        <section className="px-10 pb-10">
          <h3 className="text-2xl font-medium text-[#0D1D5F] mb-10">Mensajes</h3>
          <div className="w-full">
            <div className="flex justify-center sm:justify-normal sm:flex-row-reverse mb-5">
              <select name="tipo_consulta" id="tipo_consulta" value={filtroTipoConsulta} onChange={handleFiltroChange} className="text-xl px-2 py-2 border w-full sm:w-fit border-[#0D1D5F] text-[#0D1D5F] focus:outline-none">
                <option value="">Todos</option>
                <option value="Soporte técnico">Soporte técnico</option>
                <option value="Pregunta sobre facturación">Pregunta sobre facturación</option>
                <option value="Propuesta laboral">Propuesta laboral</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="overflow-x-auto border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Consulta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensaje</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMessages.length > 0 ? (
                    currentMessages.map(mensaje => (
                      <tr key={mensaje.id_contacto} onClick={() => showMessageDetails(mensaje)} className="hover:bg-gray-100 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{mensaje.id_contacto}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{mensaje.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{mensaje.apellidos}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{mensaje.correo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{mensaje.tipo_consulta}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-base">{truncateMessage(mensaje.mensaje, 20)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-center">
                        No hay mensajes para este tipo de consulta.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Paginación para mensajes */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(mensajes.length / itemsPerPage) }, (_, index) => (
                <button
                  key={index + 1}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}