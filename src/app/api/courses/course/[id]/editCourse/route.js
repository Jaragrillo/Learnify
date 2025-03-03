import { NextResponse } from 'next/server';
import { Course } from '@/models/index';

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