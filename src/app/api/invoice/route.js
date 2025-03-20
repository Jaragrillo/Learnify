import { NextResponse } from 'next/server';
import { Invoice, InvoiceDetail, User } from '@/models/index';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const courseId = searchParams.get('courseId');

        if (!userId || !courseId) {
            return NextResponse.json({ message: 'Se requieren userId y courseId' }, { status: 400 });
        }

        // Obtener la factura del usuario para el curso dado
        const factura = await Invoice.findOne({
            where: {
                id_cliente: userId,
                id_curso: courseId,
            },
        });

        if (!factura) {
            return NextResponse.json({ message: 'Factura no encontrada' }, { status: 404 });
        }

        // Obtener el detalle de la factura
        const detalle = await InvoiceDetail.findAll({
            where: {
                id_factura: factura.id_factura,
            },
        });

        // Obtener datos del cliente
        const cliente = await User.findOne({
            where: {
                id_usuario: userId,
            },
            attributes: ['nombre', 'apellidos'],
        });

        if (!cliente) {
            return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ factura, detalle, cliente });
    } catch (error) {
        console.error('Error al obtener la factura:', error);
        return NextResponse.json({ message: 'Error al obtener la factura' }, { status: 500 });
    }
}