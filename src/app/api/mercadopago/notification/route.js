import { Sale, Invoice, InvoiceDetail, Course, Payment } from '@/models/index'; 
const { MercadoPagoConfig, Payment } = require('mercadopago');

export async function POST(req, res) {
    try {
        // Configura las credenciales de Mercado Pago
        const client = new MercadoPagoConfig({
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
        });
        const payment = new Payment(client);

        const paymentResult = await payment.get({ paymentId: req.body.data.id });

        // Verificar la autenticidad (ejemplo simplificado)
        if (paymentResult.id !== req.body.data.id) {
            console.error('Notificación no autenticada');
            return Response.json({ error: 'Notificación no autenticada' }, { status: 400 });
        }

        const paymentDetails = paymentResult;

        if (paymentDetails.status === 'approved') {
            // Obtén el ID del curso de los items
            const courseId = paymentDetails.additional_info.items[0].id;

            // Obtén el usuario que realizo la compra, de la metadata.
            const userId = paymentDetails.metadata.userId;

            // Obtén los datos del curso
            const course = await Course.findByPk(courseId);

            // Crea la factura
            const factura = await Invoice.create({
                id_curso: courseId,
                precio: course.precio,
                fecha_factura: new Date(),
                total: paymentDetails.transaction_amount,
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
            const metodoPagoAmigable = metodosPagoAmigables[paymentDetails.payment_type_id] || paymentDetails.payment_type_id;

            await Payment.create({
                id_factura: factura.id_factura,
                metodo_pago: metodoPagoAmigable,
                monto: paymentDetails.transaction_amount,
                fecha_pago: new Date(),
            })

            await Course.update(
                { estudiantes: course.estudiantes + 1 },
                { where: { id_curso: courseId } }
            )
        }

        return Response.json({ message: 'Notificación recibida' });
    } catch (error) {
        console.error('Error al procesar la notificación:', error);
        return Response.json({ error: 'Error al procesar la notificación' }, { status: 500 });
    }
}