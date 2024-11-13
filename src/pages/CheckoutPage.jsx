import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ShippingInfo from '../components/ShippingInfo';
import PersonalInfo from '../components/PersonalInfo';
import PaymentInfo from '../components/PaymentInfo';
import OrderConfirmation from '../components/OrderConfirmation';
import '../styles/CheckoutPage.css';

// Función para crear una cuenta
const CheckoutPage = () => {
    const { cart, clearCart } = useContext(CartContext);
    const { user } = useAuth();
    // Datos para registrarse en el sitio
    const [shippingInfo, setShippingInfo] = useState({
        country: '',
        province: '',
        city: '',
        address: '',
        postalCode: '',
        name: '',
        phone: '',
        cardNumber: '',
        securityCode: '',
        expirationDate: '',
        initialized: false, // Añadir campo para controlar si la información del usuario ha sido precargada
    });
    const [step, setStep] = useState(1);

    const navigate = useNavigate();

    // Permite elegir un nombre de usuario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Permie elegir la localidad del usuario
    const handleCountryChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prevState) => ({
            ...prevState,
            [name]: value,
            province: '',
        }));
    };

    // Envía el procesidimiento a la siguiente ventana de registro.
    const handleNextStep = () => {
        setStep(step + 1);
    };

    // Envía el proceso al paso anterior.
    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    // Presenta datos de la compra del usuario una vez establecida la cuenta.
    const handleCheckout = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const shippingCost = parseFloat(calculateShippingCost(subtotal));
        const total = (subtotal + shippingCost).toFixed(2);
    
        const orderData = {
            user: user.username,
            products: cart,
            shippingInfo,
            date: new Date().toISOString(),
            subtotal,
            shippingCost,
            total
        };

        // Almacena los detalles de la compra realizada por el usuario.
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
    
        clearCart();
        navigate('/order-confirmation');
    };

    // Calcula el precio total de la totalidad de un producto
    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Calcula el costo de envío de la compra
    const calculateShippingCost = (subtotal) => {
        if (subtotal < 50) return (subtotal * 0.20).toFixed(2);
        if (subtotal < 200) return (subtotal * 0.18).toFixed(2);
        if (subtotal < 300) return (subtotal * 0.16).toFixed(2);
        if (subtotal < 500) return (subtotal * 0.14).toFixed(2);
        if (subtotal < 600) return (subtotal * 0.1).toFixed(2);
        if (subtotal < 800) return (subtotal * 0.05).toFixed(2);
        return (subtotal * 0.03).toFixed(2);
    };

    // Precio total de cada producto
    const subtotal = parseFloat(calculateSubtotal());
    // Costo de envío de la compra
    const shippingCost = parseFloat(calculateShippingCost(subtotal));
    // Se establece el precio total de la compra.
    const total = (subtotal + shippingCost).toFixed(2);

    return (
        <div className="checkout-page">
            {/* Detalles de cada area del proceso de pago y compra */}
            <h1>Checkout</h1>
            {step === 1 && (
                <ShippingInfo 
                    shippingInfo={shippingInfo} 
                    handleInputChange={handleInputChange}
                    handleCountryChange={handleCountryChange}
                    onNext={handleNextStep} 
                />
            )}
            {step === 2 && (
                <PersonalInfo 
                    shippingInfo={shippingInfo} 
                    handleInputChange={handleInputChange} 
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep} 
                />
            )}
            {step === 3 && (
                <PaymentInfo 
                    shippingInfo={shippingInfo} 
                    handleInputChange={handleInputChange} 
                    onNext={handleNextStep}
                    onPrevious={handlePreviousStep} 
                />
            )}
            {step === 4 && (
                <OrderConfirmation 
                    shippingInfo={shippingInfo} 
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    total={total}
                    onConfirm={handleCheckout}
                    onPrevious={handlePreviousStep} 
                />
            )}
        </div>
    );
};

export default CheckoutPage;
