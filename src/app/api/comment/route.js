import { NextResponse } from 'next/server';
import { Comment } from '@/models/index';

export async function POST(req) {
    try {
        const { comentario, id_curso, id_usuario } = await req.json();

        const newComment = await Comment.create({
            comentario: comentario,
            id_curso: id_curso,
            id_usuario: id_usuario,
            fecha_comentario: new Date(),
        });

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error('Error al crear el comentario:', error);
        return NextResponse.json({ message: 'Error al crear el comentario' }, { status: 500 });
    }
}