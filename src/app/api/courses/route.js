import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Course from '@/models/Course'; // Ajusta la ruta según tu estructura
import { SECRET_KEY } from '../auth/login/route';
import User from '@/models/User';
import CourseContent from '@/models/CourseContent';

// Consulta de todos los cursos
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category'); // Parámetro de categoría para filtrar
    const createdByUser = searchParams.get('createdByUser'); // Consulta de cursos creados por usuario actual

    try {
        if (createdByUser) {
            // Autenticación del usuario
            const cookieStore = cookies();
            const token = await cookieStore.get('auth-token')?.value;

            if (!token) {
                return NextResponse.json({ message: 'No autenticado.' }, { status: 401 });
            }

            const decodedToken = jwt.verify(token, SECRET_KEY);
            const userId = decodedToken.id;

            // Filtrar cursos creados por el usuario autenticado
            const userCourses = await Course.findAll({
                where: { id_autor: userId },
            });

            return NextResponse.json(userCourses);
        }

        if (categoryId) {
            // Filtrar cursos por categoría
            const categoryCourses = await Course.findAll({
                where: { id_categoria: categoryId },
                include: [
                    {
                        model: User,
                        as: 'autor',
                        attributes: ['id_usuario', 'nombre', 'apellidos']
                    },
                    {
                        model: CourseContent,
                        as: 'clases',
                        attributes: ['id_clase']
                    }
                ]
            });

            // Mapear resultados para agregar el conteo de clases
            const cursosConDetalles = categoryCourses.map(curso => ({
                id_curso: curso.id_curso,
                titulo: curso.titulo,
                img_portada: curso.img_portada,
                descripcion: curso.descripcion,
                precio: curso.precio,
                estudiantes: curso.estudiantes,
                autor: {
                    id_autor: curso.autor.id_usuario,
                    nombre_completo: `${curso.autor.nombre} ${curso.autor.apellidos}` || "autor desconocido",
                },
                totalClases: curso.clases.length // Contar las clases
            }));

            return new Response(JSON.stringify(cursosConDetalles), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });            
        }

        // Consulta de todos los cursos
        const allCourses = await Course.findAll();
        return NextResponse.json(allCourses);
    } catch (error) {
        console.error('Error en el controlador de cursos:', error);
        return NextResponse.json(
            { message: 'Error al obtener los cursos.', error: error.message },
            { status: 500 }
        );
    }
}
