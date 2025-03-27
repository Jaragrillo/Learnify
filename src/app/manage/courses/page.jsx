'use client'

import Image from "next/image";
import { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';

export default function AdminCoursesPage() {
  const [totalCourses, setTotalCourses] = useState(0);
  const [dashboardCourseData, setDashboardCourseData] = useState({
    cursosMasComprados: [],
    cursosMejorValorados: [],
    cursos: [],
    categorias: [],
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('/api/manage/courses');
            if (response.ok) {
                const data = await response.json();
                setDashboardCourseData(data);
                setTotalCourses(data.cursos.length);
            } else {
                console.error('Error al obtener datos de los cursos');
            }
        } catch (error) {
            console.error('Error al obtener datos de los cursos:', error);
        }
    };

    fetchData();
  }, []);

  const reloadData = async () => {
    try {
      const response = await fetch('/api/manage/courses');
      if (response.ok) {
        const data = await response.json();
        setDashboardCourseData(data);
        setTotalCourses(data.cursos.length);
      } else {
        console.error('Error al obtener datos de los cursos');
      }
    } catch (error) {
      console.error('Error al obtener datos de los cursos:', error);
    }
  };

  // Obtenemos las estrellas de valoración
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating) || 0;
    const emptyStars = 5 - fullStars;

    return (
        <div className="flex items-center">
            {/* Estrellas llenas */}
            {Array.from({ length: fullStars }, (_, index) => (
                <Image
                    key={`full-${index}`}
                    src="/svg/star.svg"
                    alt="star-svg"
                    width={24}
                    height={24}
                />
            ))}
            {/* Estrellas vacías */}
            {Array.from({ length: emptyStars }, (_, index) => (
                <Image
                    key={`empty-${index}`}
                    src="/svg/emptyStar.svg"
                    alt="emptyStar-svg"
                    width={24}
                    height={24}
                />
            ))}
        </div>
    );
  };

  // Prepara los datos para el gráfico de cursos más vendidos
  const bestSellingChartData = useMemo(() => ({
    labels: dashboardCourseData.cursosMasComprados.map(course => course.title),
    datasets: [{
      label: 'Ventas',
      data: dashboardCourseData.cursosMasComprados.map(course => course.students),
    }],
  }), [dashboardCourseData.cursosMasComprados]); // Dependencia: solo recalculamos si cambian los cursos más vendidos

  const BestSellingCoursesChart = dinamic(
    () => import('@/components/charts/BestSellingCoursesChart'),
    { ssr : false }
  )

  // Función para eliminar un curso
  const handleDeleteCourse = async (courseId, reloadData) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el curso permanentemente.',
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
          const response = await fetch(`/api/manage/courses/delete?id=${courseId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Error al eliminar el curso');
          }

          Swal.fire('¡Eliminado!', 'El curso ha sido eliminado correctamente.', 'success');
          reloadData(); // Recargar datos
        } catch (error) {
          Swal.fire('Error', error.message, 'error');
        }
      }
    });
  };

  // Función para crear una categoría
  const handleCreateCategory = async (reloadData) => {
    const { value: formValues } = await Swal.fire({
      title: 'Crear Categoría',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre de la categoría">' +
        '<textarea id="swal-input2" class="swal2-textarea" placeholder="Descripción de la categoría"></textarea>',
      focusConfirm: false,
      confirmButtonText: 'Crear categoría',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'red',
      showCancelButton: true, 
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
        ];
      },
    });

    if (formValues) {
      const [nombre, descripcion] = formValues;

      if (!nombre || !descripcion) {
        Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
        return;
      }

      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres crear la categoría "${nombre}"?`,
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
            const response = await fetch('/api/manage/courses/categories/create', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nombre, descripcion }),
            });
            
            if (!response.ok) {
              throw new Error('Error al crear la categoría');
            }
            
            Swal.fire('¡Creada!', 'La categoría ha sido creada correctamente.', 'success');
            reloadData(); // Recargar datos
          } catch (error) {
            Swal.fire('Error', error.message, 'error');
          }
        }
      });
    }
  };

  // Función para editar una categoría
  const handleEditCategory = async (category, reloadData) => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Categoría',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre de la categoría" value="${category.categoria}">` +
        `<textarea id="swal-input2" class="swal2-textarea" placeholder="Descripción de la categoría">${category.descripcion}</textarea>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
        ];
      },
    });

    if (formValues) {
      const [nombre, descripcion] = formValues;
    
      if (!nombre || !descripcion) {
        Swal.fire('Error', 'Por favor, completa todos los campos.', 'error');
        return;
      }

      if (nombre === category.categoria && descripcion === category.descripcion) {
        Swal.fire('Sin cambios', 'No se realizaron cambios en la categoría.', 'info');
        return;
      }

      Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Quieres actualizar la categoría "${category.categoria}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: 'red'
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Actualizando...',
            text: 'Por favor, espera.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          try {
            const response = await fetch('/api/manage/courses/categories/edit', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id_categoria: category.id_categoria, nombre, descripcion }),
            });
            
            if (!response.ok) {
              throw new Error('Error al actualizar la categoría');
            }
            
            Swal.fire('¡Actualizada!', 'La categoría ha sido actualizada correctamente.', 'success');
            reloadData(); // Recargar datos
          } catch (error) {
            Swal.fire('Error', error.message, 'error');
          }
        }
      });
    }
  };

  return (
    <>
      <main className="ml-80">
        <section className="pt-10 px-10">
          <div className="flex items-center gap-2">
            <Image 
                src="/svg/class.svg" 
                alt="class-svg" 
                width={50} 
                height={50} 
            />
            <h2 className="text-4xl text-[#0D1D5F]">Cursos</h2>
          </div>
        </section>
        <section className="p-10">
          <div className="flex justify-between">
            <div className="w-full border-2 border-[#0D1D5F] rounded-lg p-5">
              <h3 className="text-xl font-medium">Cursos Totales</h3>
              <p className="text-4xl font-medium my-3">{totalCourses}</p>
            </div>
          </div>
        </section>
        <section className="px-10">
          <div>
            {dashboardCourseData.cursosMasComprados.length > 0 && (
              <BestSellingCoursesChart key={JSON.stringify(bestSellingChartData)} data={bestSellingChartData} />
            )}
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
        </section>
        <section className="px-10">
          <h3 className="text-3xl text-center text-[#0D1D5F] mb-10">Cursos más comprados</h3>
          <div className="flex justify-between">
            {dashboardCourseData.cursosMasComprados.map((course, index) => (
              <div key={index} className="w-2/5 shadow-lg shadow-black/60 rounded-lg p-5">
                <h4 className="text-2xl text-[#0D1D5F] mb-3">{course.title}</h4>
                <div className="flex items-center gap-1 mb-3">
                  <Image 
                    src="/svg/student.svg" 
                    alt="student-svg" 
                    width={50} 
                    height={50} 
                  />
                  <div>
                    <h5 className="font-medium">Estudiantes actuales</h5>
                    <p>{course.students}</p>  
                  </div>  
                </div>  
                <div className="flex items-center gap-1 mb-3">
                  <Image 
                    src="/svg/incomes.svg" 
                    alt="incomes-svg" 
                    width={50} 
                    height={50} 
                  />
                  <div>
                    <h5 className="font-medium">Ganancias generadas</h5>
                    <p>${course.incomes} COP</p>  
                  </div>  
                </div>  
                <div className="flex items-center gap-1">
                  <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                    <Image 
                      src={course.author.profileImage} 
                      alt={`${course.author.nombreCompleto}-picture`} 
                      width={50} 
                      height={50} 
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">Creado por:</h5>
                    <p>{course.author.nombreCompleto}</p>
                  </div>  
                </div>  
              </div>  
            ))}            
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
        </section>
        <section className="px-10">
          <h3 className="text-3xl text-center text-[#0D1D5F] mb-10">Cursos mejor valorados</h3>
          <div className="flex justify-between">
            {dashboardCourseData.cursosMejorValorados.map((course, index) => (
              <div key={index} className="shadow-lg shadow-black/60 rounded-lg p-5 w-2/5">
                <h4 className="text-2xl text-[#0D1D5F] mb-3">{course.title}</h4>
                <div className="flex items-center mb-3">
                  {renderStars(Math.round(course.rating))} {/* Renderiza las estrellas */}
                  <p className="ml-2">({Math.round(course.rating)})</p> {/* Muestra el rating redondeado */}
                </div>
                <p className="text-justify text-black/60 mb-3">{course.description}</p>
                <div className="flex items-center">
                  <div className="w-[50px] h-[50px] overflow-hidden rounded-full"> 
                    <Image 
                      src={course.author.profileImage} 
                      alt={`${course.author.nombreCompleto}-picture`} 
                      width={50} 
                      height={50} 
                    />
                  </div>
                  <div>
                    <h5 className="font-medium">Creado por:</h5>
                    <p>{course.author.nombreCompleto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
        </section>
        <section className="px-10">
          <h3 className="text-2xl font-medium text-[#0D1D5F] mb-10">Cursos</h3>
          <div className="overflow-x-auto border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardCourseData.cursos.map(curso => (
                  <tr key={curso.id_curso}>
                    <td className="px-6 py-4 whitespace-nowrap">{curso.id_curso}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{curso.titulo}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${curso.precio}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{curso.estudiantes}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{curso.id_autor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{curso.id_categoria}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        className="bg-red-400 flex items-center px-3 py-2 rounded-lg hover:bg-red-600"
                        onClick={() => handleDeleteCourse(curso.id_curso, reloadData)}
                      >
                        <p className="text-white font-light">Eliminar</p>
                        <Image 
                          src="/svg/delete.svg" 
                          alt="delete-svg" 
                          width={24} 
                          height={24} 
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
        </section>
        <section className="px-10 pb-10">
          <div className="flex items-center gap-2 mb-10">
            <Image 
                src="/svg/class.svg" 
                alt="class-svg" 
                width={50} 
                height={50} 
            />
            <h2 className="text-4xl text-[#0D1D5F]">Categorías</h2>
          </div>
          <div>
            <div className="flex flex-row-reverse mb-2">
              <button 
                className="flex items-center gap-1 group"
                onClick={() => handleCreateCategory(reloadData)}
              >
                <p className="text-2xl group-hover:underline text-[#0D1D5F]">Añadir nueva categoría</p>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripcion</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dashboardCourseData.categorias.map(categoria => (
                    <tr key={categoria.id_categoria}>
                      <td className="px-6 py-4 whitespace-nowrap">{categoria.id_categoria}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{categoria.categoria}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{categoria.descripcion.length > 50 ? categoria.descripcion.substring(0, 50) + "..." : categoria.descripcion}</td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                        <button 
                          className="bg-blue-400 flex items-center px-3 py-2 rounded-lg hover:bg-blue-500 gap-1"
                          onClick={() => handleEditCategory(categoria, reloadData)}
                        >
                          <p className="text-white font-light">Editar</p>
                          <Image 
                            src="/svg/edit.svg" 
                            alt="edit-svg" 
                            width={24} 
                            height={24} 
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}