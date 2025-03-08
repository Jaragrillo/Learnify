import { MercadoPagoCheckout } from "@mercadopago/sdk-react";

export default function PaymentButton({ preferenceId }) {
    return (
        <MercadoPagoCheckout preferenceId={preferenceId} />
    );
}