// src/components/ProductButton.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

export const AddToCartButton = ({ product, quantity, onAddToCart }) => {
  const { addToCart } = useContext(CartContext);

  // Opciones para agregar una cantidad específica del producto al carro.
  const handleAddToCart = () => {
    addToCart(product, quantity);
    onAddToCart(product, quantity);
  };

  return (
    // Botón para agregar al carro (muestra la cantidad del producto que se agregará)
    <button onClick={handleAddToCart} className="btn btn-success">
      Add {quantity} {quantity > 1 ? 'units' : 'unit'} to Cart
    </button>
  );
};

// Establece en la ventana un enlace para ver todos los detalles disponibles del producto.
export const ViewDetailsButton = ({ productId }) => {
  return (
    <Link to={`/product/${productId}`} className="btn btn-primary">
      Ver detalles
    </Link>
  );
};
