import { NextResponse } from 'next/server';
import { CourseContent } from '@/models/index';

export async function GET(req, { params }) {
    try {
        const { classId } = params;

        if (!classId) {
            return NextResponse.json({ message: 'classId faltante.' }, { status: 400 });
        }

        const clase = await CourseContent.findByPk(classId);

        if (!clase) {
            return NextResponse.json({ message: 'Clase no encontrada.' }, { status: 404 });
        }

        return NextResponse.json(clase, { status: 200 });
    } catch (error) {
        console.error('Error obteniendo la clase:', error);
        return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
    }
}