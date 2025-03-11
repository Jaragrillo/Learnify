const { MercadoPagoConfig, Preference } = require("mercadopago");

export async function POST(req, res) {
    try {
        // Configura las credenciales de Mercado Pago
        const client = new MercadoPagoConfig({
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
        });
        const preference = new Preference(client);

        // Recibe los datos del curso o producto desde el frontend
        const { courseId, title, price, currency, currentUserId } = await req.json();

        // Convertir price a un número flotante y eliminar caracteres no numéricos
        const unitPrice = parseFloat(String(price).replace(/[^0-9.]/g, ''));

        // Crea la preferencia de pago
        const preferenceData = {
            items: [
                {
                    id: courseId,
                    title: title,
                    unit_price: unitPrice,
                    currency_id: currency || "COP", // Moneda por defecto COP
                    quantity: 1,
                },
            ],
            back_urls: {
                success: `${process.env.NEXTAUTH_URL}/success`, // URL de éxito
                failure: `${process.env.NEXTAUTH_URL}/failure`, // URL de fallo
                pending: `${process.env.NEXTAUTH_URL}/pending`, // URL de pendiente
            },
            notification_url: `${process.env.NEXTAUTH_URL}/api/mercadopago/notification`, // URL de notificación
            metadata: {
                userId: Number(currentUserId),
            },
        };

        console.log("preferenceData:", preferenceData);
        const preferenceResult = await preference.create(preferenceData);
        console.log("preferenceResult:", preferenceResult);

        // Envía el ID de la preferencia al frontend
        return Response.json({ preferenceId: preferenceResult.id });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Error al crear la preferencia de pago" }, { status: 500 });
    }
}