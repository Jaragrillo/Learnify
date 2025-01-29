// 'use client';

import Image from 'next/image';
import categoriesData from '@/utils/categoriesData.json'; 
import React from 'react';
import { notFound } from 'next/navigation';

export default async function CategoryPage({ params }) {
  const { categorySlug } = params;

  // Buscar la información de la categoría en el JSON
  const categoryInfo = categoriesData.categories.find(
    (category) => category.categorieSlug === categorySlug
  );

  // Si la categoría no existe, renderizar un mensaje
  if (!categoryInfo) {
    notFound(); // Redirige a la página not-found automáticamente
  }

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
          <h2 className='text-4xl text-center text-[#0D1D5F]'>Explora los cursos sobre {categoryInfo.categorie}</h2>
          {/* Aquí irán los cursos relacionados con la categoría */}
        </section>
      </main>
    </>
  );
}
