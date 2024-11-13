import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Cart.css';

// Establece el diseño de la página donde se visualizará el carrito de compras.
const CartPage = () => {
    // Se importan funciones del archivo donde se implementan las distintas acciones del carrito.
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

    // Importa el valor que almacena toda la información del usuario
    const { user } = useAuth();
    const navigate = useNavigate();

    // Calcula el precio total de la cantidad de productos agregados en el carrito.
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Muestra la cantidad de cada producto que hay en el carrito.
    const handleQuantityChange = (productId, quantity) => {
        // Asegura que haya algún producto de ese id incorporado en el carrito.
        if (quantity > 0) {
            // Llama a la función del archivo CartContext para calcular y visualizar la cantidad.
            updateQuantity(productId, quantity);
        }
    };

    // Especifica la ruta donde se encuentra el usuario.
    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container cart-container mt-4">
            <h2 className="text-center">Carrito de Compras</h2>
            {cart.length === 0 ? (
                // Cuandro de texto generado en caso de no haber productos en el carro.
                <p className="text-center">Tu carrito está vacío</p>
            ) : (
                // Muestra cada producto agregado al carrito con sus respectivos detalles
                <div className="list-group">
                    {cart.map((item) => (
                        // Establece el id del producto en una llave.
                        <div key={item.id} className="list-group-item cart-item">
                            {/* Permite mostrar por pantalla los detalles del producto */}
                            <div className="cart-item-info">
                                {/* Muestra la imagen del producto en el carrito */}
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    {/* Permite visualizar nombre y precio del producto */}
                                    <h5>{item.title}</h5>
                                    {/* Aumenta o disminuye el precio que se visualizará
                                    según la cantidad del producto que se encuentre agregada */}
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="cart-item-actions">
                                {/* Permite modificar la cantidad de un mismo producto que
                                desees agregar al carro */}
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                    min="1"
                                />
                                {/* Muestra el precio totas de la cantidad de un producto
                                que se vaya a agregar al carro */}
                                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Precio la totalidad de los productos añadidos en el carrito */}
                    <div className="list-group-item d-flex justify-content-end">
                        <h4>Total: ${calculateTotal()}</h4>
                    </div>
                    {/* Opción para realizar la compra */}
                    <div className="list-group-item d-flex justify-content-end">
                        {user ? (
                            // Asegura que estés con una sesión iniciada.
                            <button onClick={handleCheckout} className="btn btn-primary">
                                Realizar compra
                            </button>
                        ) : (
                            // Alerta en caso de realizar la compra sin haber iniciado sesión.
                            <p className="text-danger">Inicia sesión para concretar la compra</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
