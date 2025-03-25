import { NextResponse } from 'next/server';
import { Course } from '@/models/index'; 
import { Sequelize } from 'sequelize';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    try {
        const results = await Course.findAll({
            where: {
                titulo: {
                    [Sequelize.Op.like]: `%${query}%`,
                },
            },
            attributes: ['id_curso', 'titulo'],
        });
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}