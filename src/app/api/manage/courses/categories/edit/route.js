import { Category } from '@/models/index';
import { NextResponse } from 'next/server';

export async function PUT(req) {
    // Editar categoría
    const { id_categoria, nombre, descripcion } = await req.json();

    if (!id_categoria || !nombre || !descripcion) {
        return NextResponse.json({ message: 'ID, nombre y descripción son requeridos' }, { status: 400 });
    }

    try {
        const updatedCategory = await Category.update(
            {
                categoria: nombre,
                descripcion: descripcion,
            },
            {
                where: { id_categoria: id_categoria },
            }
        );

        if (updatedCategory[0] > 0) {
            return NextResponse.json({ message: 'Categoría actualizada correctamente' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}