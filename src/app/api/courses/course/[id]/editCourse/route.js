import { NextResponse } from 'next/server';
import { Course } from '@/models/index';
import { cookies } from 'next/headers';
import { SECRET_KEY } from '@/app/api/auth/login/route';
import jwt from 'jsonwebtoken';

export async function PUT(req, { params }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const { titulo, descripcion, categoria, precio, img_portada } = await req.json();

        if (!titulo || !descripcion || !categoria || !precio || !img_portada) {
            return NextResponse.json({ error: "Los campos Título, Descripción, Categoría, Precio y Portada son obligatorios." }, { status: 400 });
        }

        const course = await Course.findByPk(id);
        if (!course) {
            return NextResponse.json({ error: "Curso no encontrado." }, { status: 404 });
        }

        // Validar que el usuario actual sea el creador del curso
        const cookieStore = await cookies();
        const token =  cookieStore.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'No autenticado.' }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, SECRET_KEY);
        const currentUserId = decodedToken.id;
        const courseAuthorId = course.id_autor

        if (currentUserId !== courseAuthorId) {
            return NextResponse.json({ error: "No tienes permiso para modificar este curso." }, { status: 403 });
        }

        course.titulo = titulo;
        course.descripcion = descripcion;
        course.id_categoria = categoria?.id_categoria; // Asegúrate de que categoria tenga la propiedad id_categoria
        course.precio = precio;
        course.img_portada = img_portada || course.img_portada;

        await course.save();

        return NextResponse.json({ message: "Curso actualizado correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar el curso:", error);
        return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
    }
}