import { NextResponse } from 'next/server';
import { CourseContent, Course } from '@/models/index';
import { cookies } from 'next/headers';
import { SECRET_KEY } from '@/app/api/auth/login/route';
import jwt from 'jsonwebtoken';

export async function PUT(req, { params }) {
    try {
        const { classId } = params;
        if (!classId) {
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const { titulo, descripcion, url_video, previewUrl } = await req.json();

        if (!titulo || !descripcion || !url_video) {
            return NextResponse.json({ error: "Los campos Título, Descripción y URL del video son obligatorios." }, { status: 400 });
        }

        const courseContent = await CourseContent.findByPk(classId);
        if (!courseContent) {
            return NextResponse.json({ error: "Clase no encontrada." }, { status: 404 });
        }

        // Validar que el usuario actual sea el creador del curso
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'No autenticado.' }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, SECRET_KEY);
        const currentUserId = decodedToken.id;

        // Obtener el id del autor del curso al que pertenece la clase.
        const courseContentData = courseContent.toJSON();
        const courseContentCourseId = courseContentData.id_curso;

        // Obtener el id del autor del curso.
        const course = await Course.findByPk(courseContentCourseId);
        const courseAuthorId = course.id_autor;

        if (currentUserId !== courseAuthorId) {
            return NextResponse.json({ error: "No tienes permiso para modificar esta clase." }, { status: 403 });
        }

        courseContent.titulo = titulo;
        courseContent.descripcion = descripcion;
        courseContent.url_video = url_video;
        courseContent.previewUrl = previewUrl;

        await courseContent.save();

        return NextResponse.json({ message: "Clase actualizada correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar la clase:", error);
        return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
    }
}