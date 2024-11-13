import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';
import ConfirmationModal from './ConfirmationModal';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
    // Variables que almacenan cada detalle de cada producto.
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const { cart, addToCart } = useContext(CartContext);

    // Establece en la llave "id" todos los detalles de cada producto
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error al obtener los detalles del producto', error));
    }, [id]);

    // Opciones para aumentar o disminuir la cantidad de un producto
    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    // Aumentar cantidad para adquirir del producto
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Disminuir cantidad para adquirir del producto
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Opción para agregar al carro después de cada modificación
    const handleAddToCart = () => {
        const currentQuantity = quantity;
        addToCart(product, currentQuantity);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setQuantity(1);
    };

    // Visualizar la categoría del producto
    const handleBackToCategory = () => {
        navigate(`/category/${product.category}`);
    };

    // Almacenan el id del producto y la cantidad establecida por el usuario.
    const productInCart = cart.find(item => item.id === product.id);
    const productQuantityInCart = productInCart ? productInCart.quantity : 0;

    return (
        <div className="container product-detail-container mt-4">
            {/* Nombre del producto */}
            <h2 className="product-title">{product.title}</h2>
            <div className="product-detail">
                {/* Imagen del producto */}
                <div className="product-image-container">
                    <img src={product.image} className="product-detail-image" alt={product.title} />
                </div>
                <div className="product-info">
                    {/* Precio y descripción del producto */}
                    <h3 className="product-price">${product.price}</h3>
                    <p className="product-description">{product.description}</p>
                    {/* Opciones para aumentar o disminuir el conjunto del elemento */}
                    <div className="quantity-control">
                        <button onClick={decrementQuantity} className="btn btn-secondary">-</button>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                        />
                        <button onClick={incrementQuantity} className="btn btn-secondary">+</button>
                    </div>
                    {/* Opciones para continuar o retroceder una ves realizada todas las especificaciones */}
                    <div className="action-buttons">
                        <button onClick={handleAddToCart} className="btn btn-success">Agregar al carrito</button>
                        <button onClick={handleBackToCategory} className="btn btn-primary">Volver a Categoría</button>
                    </div>
                    {/* Genera una alerta declarando cuanto de un producto ya poseo en el carrito */}
                    <p className="product-quantity-info">
                        {productQuantityInCart > 0
                            ? `Actualmente tienes ${productQuantityInCart} unidad(es) de este producto en tu carrito.`
                            : "Todavía no tienes este producto en tu carrito."}
                    </p>
                </div>
            </div>
            {/* Enlace para especificar la configuración de la ventana emergente */}
            <ConfirmationModal
                show={showModal}
                handleClose={handleCloseModal}
                product={product}
                quantity={quantity}
            />
        </div>
    );
};

export default ProductDetail;
