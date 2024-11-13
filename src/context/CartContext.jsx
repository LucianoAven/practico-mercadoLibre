import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

// Almacena todas las últimas modificaciones realizadas en el carro.
export const useCart = () => useContext(CartContext);

// Establece la página donde podrán apreciarse los productos que se encuentren dentro del carro.
export const CartProvider = ({ children }) => {
    // Establece los parámetros para crear visualizar cada producto dentro del carrito.
    const [cart, setCart] = useState(() => {
        // Almacena en una variable el elemento del almacenamiento local que contiene las
        // últimas modificaciones realizadas en el carrito.
        const savedCart = localStorage.getItem('cart');
        // Retorna la variable que contiene las últimas acciones hechas en el carro, además de
        // asegurar que la clave-valor se encuentre en el almacenamiento local.
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Establece un elemento que almacenará toda la información que se envíe o elimine del carrito.
    useEffect(() => {
        // Crea o modifica la clave-valor del carrito con sus últimas alteraciones.
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Función para agregar un producto al carrito de compras.
    const addToCart = (product, quantity) => {
        // Recorro la información de cada producto disponible que se encuentre en el carrito.
        setCart(prevCart => {
            // Busca aquellos productos del carro que posean el mismo id del producto
            // disponible en la página principal.
            const existingProduct = prevCart.find(item => item.id === product.id);
            // Si encuentra una relación de ambos id.
            if (existingProduct) {
                // Retorna el producto con la cantidad del mismo ingresada en el carro.
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    // Función para remover un producto del carro.
    const removeFromCart = (productId) => {
        // Filtra los elementos del carro para eliminar aquellos que posean la misma id del
        // producto que se busca retirar,
        setCart(cart.filter((product) => product.id !== productId));
    };

    // Permite agregar o disminuir la cantidad de productos que deseas añadir al carrito.
    const updateQuantity = (productId, quantity) => {
        setCart(prevCart =>
            // Establece una variable que permite visualizar las caracteristicas del producto
            // al igual que la cantidad agregada del mismo.
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    // Vacía el carro para dejarlo en su estado base sin productos agregados.
    const clearCart = () => {
        setCart([]);
    };

    return (
        // Exporta la función que almacena todos los funcionamientos del sitio del carrito para
        // utilizarlas en otros archivos de la página.
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext };
export default CartProvider;
