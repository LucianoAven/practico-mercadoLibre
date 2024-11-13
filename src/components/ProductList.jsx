import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css'; 

// Función que permite alistar todos los productos de la tienda virtual
const ProductList = ({ products }) => (
  <div className="product-list-container">
    {products.map(product => (
      <div key={product.id} className="product-item">
        {/* Especifica los principales detalles que serán visibles en la ventana principal */}
        <img src={product.image} alt={product.title} />
        <h3 className="product-item-title">{product.title}</h3>
        <p className="product-item-price">${product.price}</p>
        {/* Enlace para ver los detalles de cada producto de forma más completa */}
        <Link to={`/product/${product.id}`} className="product-item-button">Ver detalles</Link>
      </div>
    ))}
  </div>
);

export default ProductList;
