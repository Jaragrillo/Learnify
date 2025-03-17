'use client'

import Image from "next/image";
import { useState, useEffect } from 'react';

export default function AdminCoursesPage() {
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
            } else {
                console.error('Error fetching data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

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
        <section className="px-10 pt-10">
          <div>
            chart cursos más vendidos
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
                    <h5>Estudiantes actuales</h5>
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
                    <h5>Ganancias generadas</h5>
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
                    <h5>Creado por:</h5>
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
              <div key={index} className="shadow-lg shadow-black/60 rounded-lg p-5 w-full">
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
                    <h5>Creado por:</h5>
                    <p>{course.author.nombreCompleto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
        </section>
        <section className="px-10">
          <h3>Cursos</h3>
          <div>tabla cursos</div>
          <div className="my-10 h-[2px] w-full bg-[#0D1D5F]/60 rounded-xl"></div>
        </section>
        <section className="px-10">
          <div className="flex items-center gap-2">
            <Image 
                src="/svg/class.svg" 
                alt="class-svg" 
                width={50} 
                height={50} 
            />
            <h2 className="text-4xl text-[#0D1D5F]">Cursos</h2>
          </div>
          <div>
            <div>
              tabla categorias
            </div>
            <div>
              <button>
                <p>Añadir nueva categoría</p>
                <Image 
                    src="/svg/add.svg" 
                    alt="add-svg" 
                    width={50} 
                    height={50} 
                />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}