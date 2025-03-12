import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { SECRET_KEY } from '../auth/login/route';
import { Course, User, CourseContent, Rating, Sale } from '@/models/index'

// Consulta de todos los cursos
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category'); // Parámetro de categoría para filtrar
    const createdByUser = searchParams.get('createdByUser'); // Consulta de cursos creados por usuario actual
    const purchasedByUser = searchParams.get('purchasedByUser'); // Consulta de cursos comprados por usuario actual
    const topRated = searchParams.get('topRated'); // Consulta para cursos destacados

    try {
        if (createdByUser) {
            // Autenticación del usuario
            const cookieStore = await cookies();
            const token = cookieStore.get('auth-token')?.value;

            if (!token) {
                return NextResponse.json({ message: 'No autenticado.' }, { status: 401 });
            }

            const decodedToken = jwt.verify(token, SECRET_KEY);
            const userId = decodedToken.id;

            // Filtrar cursos creados por el usuario autenticado
            const userCourses = await Course.findAll({
                where: { id_autor: userId },
            });

            // Para cada curso, calculamos el promedio de valoraciones
            const cursosCreadosConDetalles = await Promise.all(userCourses.map(async (curso) => {
                const valoraciones = await Rating.findAll({
                    where: { id_curso: curso.id_curso },
                    attributes: ['puntuacion']
                });
            
                // Calcular el promedio
                const totalValoraciones = valoraciones.length;
                const promedioValoracion = totalValoraciones > 0
                    ? valoraciones.reduce((sum, val) => sum + val.puntuacion, 0) / totalValoraciones
                    : null; // Si no hay valoraciones, dejamos null
            
                return {
                    id_curso: curso.id_curso,
                    titulo: curso.titulo,
                    img_portada: curso.img_portada,
                    descripcion: curso.descripcion,
                    precio: curso.precio,
                    estudiantes: curso.estudiantes,
                    valoracion: promedioValoracion ?? 'El curso no ha sido valorado' // Mostrar promedio o mensaje predeterminado
                };
            }));

            return new Response(JSON.stringify(cursosCreadosConDetalles), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });   
        }

        if (purchasedByUser) {
            // Autenticación del usuario
            const cookieStore = await cookies();
            const token = cookieStore.get('auth-token')?.value;

            if (!token) {
                return NextResponse.json({ message: 'No autenticado.' }, { status: 401 });
            }

            const decodedToken = jwt.verify(token, SECRET_KEY);
            const userId = decodedToken.id;

            // Obtener las ventas del usuario
            const ventasUsuario = await Sale.findAll({
                where: { id_cliente: userId },
                attributes: ['id_curso']
            });

            // Extraer los IDs de los cursos comprados
            const cursosCompradosIds = ventasUsuario.map(venta => venta.id_curso);

            // Obtener detalles de los cursos comprados
            const cursosComprados = await Course.findAll({
                where: { id_curso: cursosCompradosIds },
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

            // Calcular el promedio de valoraciones para cada curso comprado
            const cursosCompradosConDetalles = await Promise.all(cursosComprados.map(async (curso) => {
                const valoraciones = await Rating.findAll({
                    where: { id_curso: curso.id_curso },
                    attributes: ['puntuacion']
                });

                const totalValoraciones = valoraciones.length;
                const promedioValoracion = totalValoraciones > 0
                    ? valoraciones.reduce((sum, val) => sum + val.puntuacion, 0) / totalValoraciones
                    : null;

                return {
                    id_curso: curso.id_curso,
                    titulo: curso.titulo,
                    img_portada: curso.img_portada,
                    descripcion: curso.descripcion,
                    precio: curso.precio,
                    estudiantes: curso.estudiantes,
                    autor: {
                        id_autor: curso.autor?.id_usuario,
                        nombre_completo: ` ${curso.autor.nombre} ${curso.autor.apellidos}` || "autor desconocido",
                    },
                    totalClases: curso.clases?.length || 0,
                    valoracion: promedioValoracion ?? 'El curso no ha sido valorado'
                };
            }));
 
            return new Response(JSON.stringify(cursosCompradosConDetalles), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
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

            // Para cada curso, calculamos el promedio de valoraciones
            const cursosConDetalles = await Promise.all(categoryCourses.map(async (curso) => {
                const valoraciones = await Rating.findAll({
                    where: { id_curso: curso.id_curso },
                    attributes: ['puntuacion']
                });
            
                // Calcular el promedio
                const totalValoraciones = valoraciones.length;
                const promedioValoracion = totalValoraciones > 0
                    ? valoraciones.reduce((sum, val) => sum + val.puntuacion, 0) / totalValoraciones
                    : null; // Si no hay valoraciones, dejamos null
            
                return {
                    id_curso: curso.id_curso,
                    titulo: curso.titulo,
                    img_portada: curso.img_portada,
                    descripcion: curso.descripcion,
                    precio: curso.precio,
                    estudiantes: curso.estudiantes,
                    autor: {
                        id_autor: curso.autor?.id_usuario,
                        nombre_completo: ` ${curso.autor.nombre} ${curso.autor.apellidos}` || "autor desconocido",
                    },
                    totalClases: curso.clases?.length || 0, // Contar las clases
                    valoracion: promedioValoracion ?? 'El curso no ha sido valorado' // Mostrar promedio o mensaje predeterminado
                };
            }));

            return new Response(JSON.stringify(cursosConDetalles), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });       
        }

        if (topRated) {
            // Obtener todos los cursos con sus valoraciones
            const allCourses = await Course.findAll({
                include: [
                    {
                        model: Rating,
                        as: 'valoraciones',
                        attributes: ['puntuacion']
                    }
                ],
            });

            // Calcular el promedio de valoraciones
            const cursosConPromedio = allCourses.map((curso) => {
                const totalValoraciones = curso.valoraciones.length;
                const promedio = totalValoraciones > 0
                    ? curso.valoraciones.reduce((sum, val) => sum + val.puntuacion, 0) / totalValoraciones
                    : 0; // Si no tiene valoraciones, asignar 0

                return {
                    id_curso: curso.id_curso,
                    titulo: curso.titulo,
                    img_portada: curso.img_portada,
                    descripcion: curso.descripcion,
                    estudiantes: curso.estudiantes,
                    precio: curso.precio,
                    valoracion: promedio
                };
            });

            // Ordenar por valoración descendente
            const cursosMasValorados = cursosConPromedio.sort((a, b) => b.valoracion - a.valoracion);

            // Limitar a 10 cursos destacados
            const topCursos = cursosMasValorados.slice(0, 10);

            return new Response(JSON.stringify(topCursos), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Consulta de todos los cursos
        const allCourses = await Course.findAll({
            include: [
                {
                    model: User,
                    as: 'autor',
                    attributes: ['id_usuario', 'nombre', 'apellidos'],
                },
                {
                    model: CourseContent,
                    as: 'clases',
                    attributes: ['id_clase']
                }
            ],
        });

        // Para cada curso, calculamos el promedio de valoraciones
        const allCoursesDetails = await Promise.all(allCourses.map(async (curso) => {
            const valoraciones = await Rating.findAll({
                where: { id_curso: curso.id_curso },
                attributes: ['puntuacion']
            });
        
            // Calcular el promedio
            const totalValoraciones = valoraciones.length;
            const promedioValoracion = totalValoraciones > 0
                ? valoraciones.reduce((sum, val) => sum + val.puntuacion, 0) / totalValoraciones
                : null; // Si no hay valoraciones, dejamos null
        
            return {
                id_curso: curso.id_curso,
                titulo: curso.titulo,
                img_portada: curso.img_portada,
                descripcion: curso.descripcion,
                precio: curso.precio,
                estudiantes: curso.estudiantes,
                autor: {
                    id_autor: curso.autor?.id_usuario,
                    nombre_completo: ` ${curso.autor.nombre} ${curso.autor.apellidos}` || "autor desconocido",
                },
                totalClases: curso.clases?.length || 0, // Contar las clases
                valoracion: promedioValoracion ?? 'El curso no ha sido valorado', // Mostrar promedio o mensaje predeterminado
                totalValoraciones
            };
        }));

        return new Response(JSON.stringify(allCoursesDetails), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error en el controlador de cursos:', error);
        return NextResponse.json(
            { message: 'Error al obtener los cursos.', error: error.message },
            { status: 500 }
        );
    }
}
