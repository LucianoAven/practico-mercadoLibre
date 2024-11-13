import React from 'react';
import '../styles/OrderConfirmationPage.css';

// Función que origina una alerta para confirmar que la incorporación se realizó con exito.
const OrderConfirmationPage = () => {
    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="confirmation-icon">
                    ✔️
                </div>
                <h1>¡Pedido Confirmado!</h1>
                <p>Su pedido ha sido confirmado y está en camino.</p>
                <div className="confirmation-details">
                    <p><strong>Gracias por su compra.</strong></p>
                    <p>Recibirá un correo electrónico con los detalles de su pedido.</p>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
