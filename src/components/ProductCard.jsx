// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Establece en la ventana del carrito los detalles del o de los productos agregados en el.
const ProductCard = ({ product }) => {
  return (
    <div className='card'>
      {/* Imagen del producto */}
      <img
        src={product.image}
        className='card-img-top'
        style={{ maxHeight: '25vh', objectFit: 'contain' }}
        alt={product.title}
      />
      <div className='card-body'>
        {/* Nombre del producto */}
        <h5
          className='card-title'
          style={{
            textOverflow: 'ellipsis',

            clamp: 1,
            overflow: ' hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {product.title}
        </h5>
        {/* Precio total del producto */}
        <p className='card-text'>${product.price.toFixed(2)}</p>
        {/* Enlace para ver más información del producto en cuestión */}
        <Link to={`/product/${product.id}`} className='btn btn-primary'>
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
