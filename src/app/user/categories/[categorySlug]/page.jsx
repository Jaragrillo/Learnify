'use client'

// import { useRouter } from 'next/navigation';

export default function CategoryPage({ params }) {
  const { categorySlug } = params;

  return (
    <div>
      <h1>Explora la categoría: {categorySlug}</h1>
      <p>Aquí verás los cursos relacionados con la categoría {categorySlug}.</p>
    </div>
  );
}
