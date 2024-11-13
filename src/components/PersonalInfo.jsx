import React, { useState } from 'react';

const PersonalInfo = ({ shippingInfo, handleInputChange, onNext, onPrevious }) => {
    const [errors, setErrors] = useState({});

    // Alertas en caso de no haberse enviado la información solicitada.
    const validateForm = () => {
        const newErrors = {};
        if (!shippingInfo.name) newErrors.name = 'El nombre es requerido.';
        if (!shippingInfo.phone) newErrors.phone = 'El teléfono es requerido.';
        return newErrors;
    };

    // Cambiarse a la siguiente ventana si no se detectó algún error
    const handleNext = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            onNext();
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="checkout-section">
            {/* Muestra en la ventana los datos principales de la cuenta de usuario */}
            <h2>Información Personal</h2>
            <form className="shipping-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                    />
                    {errors.phone && <span>{errors.phone}</span>}
                </div>
                {/* Opciones para continuar o retroceder con la compra */}
                <button type="button" onClick={handleNext} className="checkout-button">Continuar</button>
                <button type="button" onClick={onPrevious} className="checkout-button">Volver</button>
            </form>
        </div>
    );
};

export default PersonalInfo;
