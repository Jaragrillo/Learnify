// src/app/api/courses/course/[id]/route.js
import { NextResponse } from 'next/server';
import { Course, User, CourseContent, Rating, Comment, Category } from '@/models/index';

export async function GET(request, { params }) {
    const { id } = await params;
    

    try {
        const course = await Course.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'autor',
                    attributes: ['id_usuario', 'nombre', 'apellidos', 'foto_perfil', 'biografia'],
                },
                {
                    model: CourseContent,
                    as: 'clases',
                    attributes: ['id_clase', 'titulo', 'descripcion', 'url_video'],
                },
                {
                    model: Comment,
                    as: 'comentarios',
                    include: {
                        model: User,
                        as: 'usuario',
                        attributes: ['id_usuario', 'nombre', 'apellidos', 'foto_perfil'],
                    },
                    attributes: ['comentario', 'fecha_comentario'],
                },
                {
                    model: Category,
                    as: 'categoria',
                    attributes: ['id_categoria', 'categoria']
                }
            ],
        });

        if (!course) {
            return NextResponse.json({ error: 'Curso no encontrado' }, { status: 404 });
        }

        // Calcular el promedio de valoraciones
        const valoraciones = await Rating.findAll({
            where: { id_curso: course.id_curso },
            attributes: ['puntuacion'],
        });

        const totalValoraciones = valoraciones.length;
        const promedioValoracion = totalValoraciones > 0
            ? valoraciones.reduce((sum, val) => sum + val.puntuacion, 0) / totalValoraciones
            : null;

        const courseDetails = {
            id_curso: course.id_curso,
            titulo: course.titulo,
            img_portada: course.img_portada,
            descripcion: course.descripcion,
            precio: course.precio,
            estudiantes: course.estudiantes,
            autor: {
                id_autor: course.autor.id_usuario,
                nombre_completo: `${course.autor.nombre} ${course.autor.apellidos}`,
                foto_perfil: course.autor.foto_perfil,
                biografia: course.autor.biografia,
            },
            clases: course.clases,
            comentarios: course.comentarios,
            valoracion: promedioValoracion ?? 'El curso no ha sido valorado',
            totalValoraciones,
            categoria: course.categoria ? course.categoria.id_categoria : null, // Incluir id de la categoria
            nombreCategoria: course.categoria ? course.categoria.categoria : null, // Incluir nombre de la categoría
        };

        return NextResponse.json(courseDetails, { status: 200 });
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}