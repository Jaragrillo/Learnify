import { Sale, Invoice, InvoiceDetail, Course, Payments } from '@/models/index'; 
const { MercadoPagoConfig, Payment } = require('mercadopago');
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    try {
        // Analizar el cuerpo de la solicitud como JSON
        const requestBody = await req.json();
        console.log("Cuerpo de la solicitud analizado:", requestBody); 

        // Verificar que el cuerpo de la solicitud contenga los datos necesarios
        if (!requestBody || !requestBody.data || !requestBody.data.id) {
            console.error("Cuerpo de la solicitud inválido:", requestBody);
            return NextResponse.json({ error: "Cuerpo de la solicitud inválido" }, { status: 400 });
        }

        // Obtener el ID del pago desde el cuerpo de la solicitud
        const paymentId = requestBody.data.id;

        // Configura las credenciales de Mercado Pago
        const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

        // Crear una instancia de Payment con la configuración
        const paymentInstance = new Payment(mercadopago);

        // Obtener detalles del pago desde Mercado Pago
        const payment = await paymentInstance.get({ id: paymentId });

        // Verificar que el pago se haya encontrado
        if (!payment) {
            console.error("Pago no encontrado con ID:", paymentId);
            return NextResponse.json({ error: "Pago no encontrado" }, { status: 404 });
        }

        if (payment.status === 'approved') {
            // Obtén el ID del curso de los items
            const courseId = payment.additional_info.items[0].id;

            // Obtén el usuario que realizo la compra, de la metadata.
            const userId = payment.metadata.userId;

            // Obtén los datos del curso
            const course = await Course.findByPk(courseId);

            // Crea la factura
            const factura = await Invoice.create({
                id_curso: courseId,
                precio: course.precio,
                fecha_factura: new Date(),
                total: payment.transaction_amount,
                id_cliente: userId,
            });

            // Crea el detalle de la factura
            await InvoiceDetail.create({
                id_factura: factura.id_factura,
                id_curso: courseId,
                cantidad: 1,
                precio_unitario: course.precio,
            });

            // Crea la venta
            await Sale.create({
                id_curso: courseId,
                id_autor: course.id_autor,
                id_cliente: userId,
                precio: course.precio,
                fecha_venta: new Date(),
                id_factura: factura.id_factura,
            });

            const metodosPagoAmigables = {
                credit_card: 'Tarjeta de crédito',
                debit_card: 'Tarjeta de débito',
                ticket: 'Pago en efectivo',
                account_money: 'Dinero en cuenta de Mercado Pago',
                bank_transfer: 'Transferencia bancaria',
            };
            const metodoPagoAmigable = metodosPagoAmigables[payment.payment_type_id] || payment.payment_type_id;

            await Payments.create({
                id_factura: factura.id_factura,
                metodo_pago: metodoPagoAmigable,
                monto: payment.transaction_amount,
                fecha_pago: new Date(),
            })

            await Course.update(
                { estudiantes: course.estudiantes + 1 },
                { where: { id_curso: courseId } }
            )
        } else {
            console.warn("Pago no aprobado. Estado:", payment.status);
        }

        return NextResponse.json({ message: 'Notificación recibida' }, { status: 200 });
    } catch (error) {
        console.error('Error al procesar la notificación:', error);
        return NextResponse.json({ error: 'Error al procesar la notificación' }, { status: 500 });
    }
}