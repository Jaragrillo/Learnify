import { NextResponse } from 'next/server';
import { Sale } from '@/models/index'; 

export async function GET(req) {
    try {
        // Obtener courseId y userId de los parámetros de la URL
        const url = new URL(req.url);
        const courseId = url.searchParams.get('courseId');
        const userId = url.searchParams.get('userId');

        if (!courseId || !userId) {
            return NextResponse.json({ message: 'courseId o userId faltante.' }, { status: 400 });
        }

        // Verificar si el usuario ha comprado el curso
        const sale = await Sale.findOne({
            where: {
                id_curso: parseInt(courseId),
                id_cliente: userId, 
            },
        });

        return NextResponse.json({ purchased: !!sale }, { status: 200 });
    } catch (error) {
        console.error('Error checking purchase:', error);
        return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
    }
}