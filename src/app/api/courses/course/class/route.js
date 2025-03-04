import { NextResponse } from 'next/server';
import { CourseContent, Course } from '@/models/index'; 
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { SECRET_KEY } from '@/app/api/auth/login/route';

export async function POST(req) {
    const cookieStore = cookies();
    const token = await cookieStore.get('auth-token')?.value;

    if (!token) {
        return NextResponse.json({ message: 'No autenticado.' }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;

    const formData = await req.formData();

    const title = formData.get('title');
    const description = formData.get('description');
    const videoUrl = formData.get('videoUrl');
    const courseId = formData.get('courseId');

    // Validaciones de los datos de entrada
    if (!title || title.trim().length === 0) {
        return NextResponse.json({ message: 'El título es obligatorio.' }, { status: 400 });
    }

    if (!description || description.trim().length === 0) {
        return NextResponse.json({ message: 'La descripción es obligatoria.' }, { status: 400 });
    }

    if (!videoUrl || videoUrl.trim().length === 0) {
        return NextResponse.json({ message: 'El video es obligatorio.' }, { status: 400 });
    }

    if (!courseId) {
        return NextResponse.json({ message: 'El ID del curso es obligatorio.' }, { status: 400 });
    }

    try {
        // Verificar si el curso existe
        const course = await Course.findByPk(courseId);
        if (!course) {
            return NextResponse.json({ message: 'El curso no existe.' }, { status: 404 });
        }

        // Crear nueva clase con Sequelize
        const newClass = await CourseContent.create({
            id_curso: courseId,
            titulo: title,
            url_video: videoUrl,
            descripcion: description,
        });

        return NextResponse.json({ message: 'Clase creada exitosamente.', class: newClass }, { status: 201 });
    } catch (error) {
        console.error('Error al crear la clase:', error);
        return NextResponse.json({ message: 'Error al crear la clase.' }, { status: 500 });
    }
}