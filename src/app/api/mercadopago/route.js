const { MercadoPagoConfig, Preference } = require("mercadopago");

export async function POST(req, res) {
    try {
        // Configura las credenciales de Mercado Pago
        const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

        // Recibe los datos del curso o producto desde el frontend
        const { courseId, title, price, currency, currentUserId } = await req.json();

        // Convertir price a un número flotante y eliminar caracteres no numéricos
        const unitPrice = parseFloat(String(price).replace(/[^0-9.]/g, ''));

        // Crea la preferencia de pago
        const preference = await new Preference(mercadopago).create({
            body: {
                items: [
                    {
                        id: courseId,
                        title: title,
                        unit_price: unitPrice,
                        currency_id: currency || "COP", // Moneda por defecto COP
                        quantity: 1,
                    },
                ],
                metadata: {
                    userId: currentUserId,
                },
                back_urls: {
                    success: `${process.env.NEXTAUTH_URL}/user/courses/${courseId}?paymentStatus=succes`,
                    failure: `${process.env.NEXTAUTH_URL}/user/courses/${courseId}?paymentStatus=failure`,
                    pending: `${process.env.NEXTAUTH_URL}/user/courses/${courseId}?paymentStatus=pending`,
                },
                auto_return: "approved"
            }
        });

        // Devolvemos el init point (url de pago) para que el usuario pueda pagar
        return Response.json({ init_point: preference.init_point });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Error al crear la preferencia de pago" }, { status: 500 });
    }
}