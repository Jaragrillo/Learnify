import { useMercadoPago } from '@mercadopago/sdk-react';
import { useEffect } from 'react';

const PaymentButton = ({ preferenceId }) => {
    const { initCheckout, MercadoPagoButton } = useMercadoPago();

    useEffect(() => {
        if (preferenceId) { // Verifica que preferenceId no sea nulo o indefinido
            initCheckout({
                preferenceId: preferenceId,
            });
        }
    }, [preferenceId, initCheckout]);

    if (!preferenceId) {
        return null; // No renderizar el botón si preferenceId no está disponible
    }

    return <MercadoPagoButton />;
};

export default PaymentButton;