import { Course, Sale, Rating, User, Category } from '@/models/index';
import { NextResponse } from 'next/server';
import { Sequelize } from 'sequelize';

export async function GET(req, res) {
    try {
        // Cursos más comprados
        const cursosMasCompradosSales = await Sale.findAll({
            attributes: [
                'id_curso',
                [Sequelize.fn('COUNT', Sequelize.col('id_curso')), 'ventas'],
                [Sequelize.fn('SUM', Sequelize.col('precio')), 'ganancias'],
            ],  
            group: ['id_curso'],
            order: [[Sequelize.literal('ventas'), 'DESC']],
            limit: 4,
        });

        const cursosMasCompradosData = await Promise.all(cursosMasCompradosSales.map(async venta => {
            const course = await Course.findOne({
                where: { id_curso: venta.dataValues.id_curso },
                attributes: ['titulo', 'estudiantes', 'id_autor'],
                include: [{
                    model: User,
                    as: 'autor',
                    attributes: ['nombre', 'apellidos', 'foto_perfil'],
                },],
            });

            if (!course) {
                console.error("Error: No se encontró el curso con id:", venta.dataValues.id_curso);
                return null;
            }

            return {
                title: course.titulo,
                students: course.estudiantes,
                incomes: venta.dataValues.ganancias || 0,
                author: {
                    nombreCompleto: `${course.autor.nombre} ${course.autor.apellidos}`,
                    profileImage: course.autor.foto_perfil,
                },
            };
        }));

        // Filtra los resultados nulos
        const filteredCursosMasCompradosData = cursosMasCompradosData.filter(item => item !== null);

        // Cursos mejor valorados
        const cursosMejorValoradosRatings = await Rating.findAll({
            attributes: ['id_curso', [Sequelize.fn('AVG', Sequelize.col('Rating.puntuacion')), 'promedio']],
            group: ['id_curso'],
            order: [[Sequelize.literal('promedio'), 'DESC']],
            limit: 4,
        });

        const cursosMejorValoradosData = await Promise.all(cursosMejorValoradosRatings.map(async rating => {
            const course = await Course.findOne({
                where: { id_curso: rating.dataValues.id_curso },
                attributes: ['titulo', 'descripcion', 'id_autor'],
                include: [{
                    model: User,
                    as: 'autor',
                    attributes: ['nombre', 'apellidos', 'foto_perfil'],
                }],
            });

            if (!course) {
                console.error("Error: No se encontró el curso con id:", rating.dataValues.id_curso);
                return null;
            }

            return {
                title: course.titulo,
                description: course.descripcion,
                rating: rating.dataValues.promedio,
                author: {
                    nombreCompleto: `${course.autor.nombre} ${course.autor.apellidos}`,
                    profileImage: course.autor.foto_perfil,
                },
            };
        }));

        // Filtra los resultados nulos
        const filteredCursosMejorValoradosData = cursosMejorValoradosData.filter(item => item !== null);

        // Tabla de cursos y categorías (sin cambios)
        const cursos = await Course.findAll({
            attributes: ['id_curso', 'titulo', 'precio', 'estudiantes', 'id_autor', 'id_categoria'],
            include: [{
                model: Category,
                as: 'categoria', // Alias para la relación
                attributes: ['categoria'],
            }],
        });

        const cursosConNombreCategoria = cursos.map(curso => {
            return {
                ...curso.get({ plain: true }),
                categoria: curso.categoria && curso.categoria.categoria ? curso.categoria.categoria : null, // Obtener el nombre de la categoría
            };
        });

        const categorias = await Category.findAll({
            attributes: ['id_categoria', 'categoria', 'descripcion'],
        });

        return NextResponse.json({
            cursosMasComprados: filteredCursosMasCompradosData,
            cursosMejorValorados: filteredCursosMejorValoradosData,
            cursos: cursosConNombreCategoria,
            categorias,
        });
    } catch (error) {
        console.error('Error al obtener datos del dashboard de cursos:', error);
        return NextResponse.json({ message: 'Error al obtener datos del dashboard de cursos' }, { status: 500 });
    }
}