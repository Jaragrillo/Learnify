import { Category } from '@/models/index';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID de la categoría es requerido' }, { status: 400 });
    }

    try {
        const deletedCategory = await Category.destroy({
            where: { id_categoria: id },
        });

        if (deletedCategory > 0) {
            return NextResponse.json({ message: 'Categoría eliminada correctamente' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}