import React from 'react';

const Confirmation = ({ cart, shippingInfo, subtotal, shippingCost, total, handleCheckout, prevStep }) => {
    return (
        <div>
            <h2>Confirmación de Pedido</h2>
            <div className="cart-details">
                <h2>Productos en el carrito</h2>
                <ul className="product-list">
                    {/* Muestra al usuario el nombre y precio total de cada producto antes
                    de confirmar la compra */}
                    {cart.map((item) => (
                        // Etiqueta lista para agregar estilos y detalles a cada producto
                        <li key={item.id} className="product-item">
                            {/* Imagen del producto */}
                            <img src={item.image} alt={item.title} className="product-image" />
                            {/* Precio del producto según la cantidad del mismo */}
                            <div className="product-details">
                                {item.title} - ${item.price} x {item.quantity}
                                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* Muestra el valor del producto, consto de envío y precio total */}
                <h3>Subtotal: ${subtotal}</h3>
                <h3>Costo de Envío: ${shippingCost}</h3>
                <h3>Total: ${total}</h3>
            </div>
            <div className="button-group">
                {/* Botones para volver a la página anterior y realizar la compra */}
                <button onClick={prevStep} className="checkout-button">Anterior</button>
                <button onClick={handleCheckout} className="checkout-button">Confirmar Compra</button>
            </div>
        </div>
    );
};

export default Confirmation;
