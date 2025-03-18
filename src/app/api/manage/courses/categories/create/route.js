import { Category } from '@/models/index';
import { NextResponse } from 'next/server';

export async function POST(req) {
    // Crear categoría
    const { nombre, descripcion } = await req.json();

    if (!nombre || !descripcion) {
        return NextResponse.json({ message: 'Nombre y descripción son requeridos' }, { status: 400 });
    }

    try {
        const newCategory = await Category.create({
            categoria: nombre,
            descripcion: descripcion,
        });
        return NextResponse.json({ message: 'Categoría creada correctamente', id: newCategory.id_categoria }, { status: 201 });
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}