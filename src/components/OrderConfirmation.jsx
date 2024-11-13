import React from 'react';

// Confirmar la compra que se busca realizar.
const OrderConfirmation = ({ shippingInfo, subtotal, shippingCost, total, onConfirm, onPrevious }) => (
    <div className="checkout-section">
        <h2>Confirmación del Pedido</h2>
        <div className="confirmation">
            {/* Datos del usuario para realizar la acción de compra */}
            <p><strong>Nombre:</strong> {shippingInfo.name}</p>
            <p><strong>Teléfono:</strong> {shippingInfo.phone}</p>
            <p><strong>Dirección:</strong> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.province}, {shippingInfo.country}, {shippingInfo.postalCode}</p>
            <p><strong>Subtotal:</strong> ${subtotal}</p>
            <p><strong>Costo de Envío:</strong> ${shippingCost}</p>
            <p><strong>T0tal:</strong> ${total}</p>
        </div>
        {/* Opciones para realizar la compra o volver */}
        <button onClick={onConfirm} className="checkout-button">Confirmar Compra</button>
        <button onClick={onPrevious} className="checkout-button">Volver</button>
    </div>
);

export default OrderConfirmation;
