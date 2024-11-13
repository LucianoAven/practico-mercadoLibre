import React from 'react';
import '../styles/ConfirmationModal.css';

const ConfirmationModal = ({ show, handleClose, product, quantity }) => {
  if (!show) return null;

  return (
    // Alerta generada una vez se ingrese un producto o conjunto del mismo al carrito de compras
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Botón para cerrar la aletra */}
        <button className="modal-close" onClick={handleClose}>×</button>
        <h2>¡Producto añadido al carrito!</h2>
        {/* Declara el producto que añadiste al carrito */}
        <p>Has añadido {quantity} unidad(es) de <strong>{product.title}</strong> a tu carrito de compras.</p>
        <div className="modal-actions">
          {/* Tres botónes según al sitito de la página que quieras ir o volver una vez
          realizada la acción */}
          <button className="btn btn-primary" onClick={handleClose}>Volver a la página de {product.title}</button>
          {/* Los votones envían al usuario al enlace que contienen en la función "onClick" */}
          <button className="btn btn-primary" onClick={() => window.location.href = '/cart'}>Ver tu carrito de compras</button>
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Ir a Inicio</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
