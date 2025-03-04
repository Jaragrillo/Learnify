'use client'

import Image from 'next/image';
import categoriesData from '@/utils/categoriesData.json'; 
import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import CategoryCoursesSkeleton from '@/components/skeletons/CategoryCoursesSkeleton'
import Link from 'next/link';

export default function CategoryPage({ params }) {
  // Desempaquetar los params correctamente usando React.use()
  const resolvedParams = React.use(params);
  const { categorySlug } = resolvedParams;

  // Buscar la información de la categoría en el JSON
  const categoryInfo = categoriesData.categories.find(
    (category) => category.categorieSlug === categorySlug
  );

  // Si la categoría no existe, renderizar un mensaje
  if (!categoryInfo) {
    notFound(); // Redirige a la página not-found automáticamente
  }

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoursesByCategory = async () => {
      try {
        // Buscar el id_categoria en la base de datos usando categoryInfo.categorie
        const categoryResponse = await fetch(`/api/categories/courses?name=${categoryInfo.categorie}`);
        const categoryData = await categoryResponse.json();

        if (!categoryData || !categoryData.id_categoria) {
          console.error('Categoría no encontrada en la base de datos.');
          return;
        }

        const categoryId = categoryData.id_categoria;

        // Buscar los cursos relacionados con la categoría
        const coursesResponse = await fetch(`/api/courses?category=${categoryId}`);
        const coursesData = await coursesResponse.json();

        setCourses(coursesData);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoursesByCategory();
  }, [categoryInfo.categorie]);

  return (
    <>
      <main>
        <section className='p-10'>
          <h2 className='text-4xl text-[#0D1D5F]'>{categoryInfo.categorie}</h2>
          <p className='text-2xl text-[#0D1D5F] font-light max-w-[1000px] text-justify'>{categoryInfo.description}</p>
        </section>

        <section className='p-10 bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472]'>
          <h2 className='text-3xl text-white max-w-3xl mb-10'>Habilidades que puedes desarrollar aprendiendo sobre {categoryInfo.categorie}</h2>
          <div className='flex justify-between'>
            {categoryInfo.skills.map((skill, index) => (
              <div key={index} className='w-[395px] h-[390px] bg-white p-5 shadow-lg shadow-black/30'>
                <div className='bg-gradient-to-l from-[#34ADDA] via-30% via-[#1E88C6] to-[#0E4472] p-5 text-white w-full h-[150px] flex items-center justify-center mb-3'>
                  <h3 className='text-2xl'>{skill.skill}</h3>   
                </div>
                <p className='text-lg font-light text-justify text-[#0D1D5F] leading-tight'>{skill.skillDescription}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='px-10 py-20 flex items-center justify-between bg-[#cee4f1]'>
          <div>
            <h2 className='text-4xl text-[#0D1D5F] mb-3'>¿Por qué aprender sobre {categoryInfo.categorie}?</h2>
            <p className='text-xl font-light text-[#0D1D5F] text-justify max-w-[750px]'>{categoryInfo.importance}</p>
          </div>
          {categoryInfo.categoryImage && (
            <div className='h-[380px] w-[434px]'>
              <Image
                src={categoryInfo.categoryImage}
                alt={`${categoryInfo.categorie}-image`}
                width={434}
                height={380}
                className="w-full h-full shadow-lg shadow-black/60"
              />
            </div>
          )}
        </section>

        <section className='p-10'>
          <h2 className='text-4xl text-center text-[#0D1D5F] mb-10'>Explora los cursos sobre {categoryInfo.categorie}</h2>
          {isLoading ? (
            <CategoryCoursesSkeleton />
          ) : courses.length > 0 ? (
            <div className='flex flex-wrap justify-between gap-6'>
              {courses.map((course) => (
                <div key={course.id_curso} className='shadow-lg shadow-black/60 relative w-[400px] h-[420px]'>
                  <div className="w-full h-40">
                    <Image
                      src={course.img_portada}
                      alt={`Portada de ${course.titulo}`}
                      width={300}
                      height={160}
                      className="w-full h-full "
                    />
                  </div>
                  <div className="mt-4 p-2">
                    <h3 className="text-2xl font-medium">{course.titulo}</h3>
                    <p className='text-lg font-medium text-[#070E2B]/80'>{course.autor.nombre_completo}</p>
                    <div className="flex items-center gap-x-2 mt-2 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Image 
                            src="/svg/star.svg" 
                            alt="star-svg" 
                            width={24} 
                            height={24} 
                        />
                        {course.valoracion || 'El curso no ha sido valorado'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Image 
                            src="/svg/studentDarkBlue.svg" 
                            alt="studentDarkBlue-svg" 
                            width={24} 
                            height={24} 
                        />
                        {course.estudiantes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Image 
                            src="/svg/class.svg" 
                            alt="class-svg" 
                            width={24} 
                            height={24} 
                            className=""
                        />
                        {course.totalClases || 0}
                      </div>
                    </div>
                    <p className="text-2xl mt-2"> {/* Formatear el precio para mostrarlo más agradable al usuario en COP ↓ */}
                        ${Number(course.precio).toLocaleString('es-CO', { minimumFractionDigits: 0 })} COP 
                    </p>
                    <Link 
                      href={`/user/courses/${course.id_curso}`} 
                      className="w-11/12 absolute bottom-2 left-0 right-0 m-auto flex items-center justify-center py-3 gap-2 text-white bg-[#070E2B] mt-4 hover:bg-[#0D1D5F] transition duration-200">
                      Más información
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-xl text-[#0D1D5F]'>
              No hay cursos disponibles en esta categoría.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
