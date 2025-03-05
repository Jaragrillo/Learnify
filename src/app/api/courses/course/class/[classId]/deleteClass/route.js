// src/app/api/courses/course/class/[classId]/deleteClass/route.js
import { NextResponse } from 'next/server';
import { CourseContent } from '@/models/index';

export async function DELETE(req, { params }) {
    try {
        const { classId } = params;
        const courseContent = await CourseContent.findByPk(classId);

        if (!courseContent) {
            return NextResponse.json({ error: "Clase no encontrada." }, { status: 404 });
        }

        await courseContent.destroy();

        return NextResponse.json({ message: "Clase eliminada correctamente." }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar la clase:", error);
        return NextResponse.json({ error: error.message || "Error interno del servidor" }, { status: 500 });
    }
}