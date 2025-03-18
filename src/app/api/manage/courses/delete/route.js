import { Course } from '@/models/index';
import { NextResponse } from 'next/server';

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'ID del curso es requerido' }, { status: 400 });
    }

    try {
        const deletedCourse = await Course.destroy({
            where: { id_curso: id },
        });

        if (deletedCourse > 0) {
            return NextResponse.json({ message: 'Curso eliminado correctamente' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Curso no encontrado' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}