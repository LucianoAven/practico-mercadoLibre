import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import '../styles/Cart.css'; 

const Cart = () => {
  // Llamo a la función para remover productos del archivo "CartContext"
  const { cart, removeFromCart } = useContext(CartContext);

  // Establezco el precio de cada prducto, varía según la cantidad que se especifique del mismo.
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="container cart-container">
      <ul className="list-group">
        {cart.map((product) => (
          // Etiqueta lista para agregarle estilos al cuadro de cada producto.
          <li key={product.id} className="list-group-item cart-item">
            <div className="d-flex justify-content-between align-items-center">
              <div className="cart-item-info">
                {/* Imagen del producto */}
                <img src={product.image} alt={product.title} className="cart-item-image" />
                <div className="cart-item-details">
                  {/* Nombre y precio visibles del producto */}
                  <h5>{product.title}</h5>
                  <p>${product.price}</p>
                </div>
              </div>
              {/* Opción para elminiar el producto del carro */}
              <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Función para calcular el precio total del producto en su conjunto */}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
