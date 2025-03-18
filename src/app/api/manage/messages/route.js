import { NextResponse } from 'next/server';
import { Contact } from '@/models/index';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const tipoConsulta = searchParams.get('tipo_consulta');

        let whereClause = {};
        if (tipoConsulta) {
            whereClause = { tipo_consulta: tipoConsulta };
        }

        const mensajes = await Contact.findAll({
            where: whereClause,
            attributes: ['id_contacto', 'nombre', 'apellidos', 'correo', 'tipo_consulta', 'mensaje'],
        });

        return NextResponse.json(mensajes);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        return NextResponse.json({ message: 'Error al obtener mensajes.' }, { status: 500 });
    }
}