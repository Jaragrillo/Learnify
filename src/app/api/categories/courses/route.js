import { NextResponse } from 'next/server';
import Category from '@/models/Category'; // Ajusta la ruta según tu estructura

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get('name'); // Nombre de la categoría para filtrar

  if (!categoryName) {
    return NextResponse.json({ message: 'Nombre de la categoría no proporcionado.' }, { status: 400 });
  }

  try {
    // Buscar la categoría en la base de datos
    const category = await Category.findOne({
      where: { categoria: categoryName },
    });

    if (!category) {
      return NextResponse.json({ message: 'Categoría no encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ id_categoria: category.id_categoria });
  } catch (error) {
    console.error('Error al buscar la categoría:', error);
    return NextResponse.json(
      { message: 'Error al buscar la categoría.', error: error.message },
      { status: 500 }
    );
  }
}
