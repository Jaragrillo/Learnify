import { NextResponse } from 'next/server';
import { Rating } from '@/models/index';

export async function POST(request) {
    try {
        const { id_curso, id_usuario, valoracion } = await request.json();

        // Verificar si el usuario ya valoró el curso
        const existingRating = await Rating.findOne({
            where: { id_curso, id_usuario },
        });

        if (existingRating) {
            return NextResponse.json({ error: 'El usuario ya valoró este curso' }, { status: 400 });
        }

        // Crear la valoración
        const newRating = await Rating.create({
            id_curso,
            id_usuario,
            puntuacion: valoracion,
        });

        return NextResponse.json(newRating, { status: 201 });
    } catch (error) {
        console.error('Error al crear la valoración:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}