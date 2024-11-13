import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Contiene las nacionalidades habilitadas para los usuarios
const countries = [
    { code: 'AR', name: 'Argentina' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'CA', name: 'Canada' },
    { code: 'MX', name: 'Mexico' },
   
];

// Provincia donde registre cada usuario del sitio.
const provinces = {
    AR: [
        'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'
    ],
    US: [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Illinois', 'Indiana', 'Kentucky', 'Louisiana', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Missouri', 'Nevada', 'New Jersey', 'New York', 'North Carolina', 'Ohio', 'Oregon', 'Pennsylvania', 'Texas', 'Virginia', 'Washington',
    ],
    CA: [
        'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
       
    ],
    MX: [
        'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico City',
        
    ],

};

// Fucnión para habilitar toda la información de la cuenta de cada usuario
const ShippingInfo = ({ shippingInfo, handleInputChange, handleCountryChange, onNext }) => {
    const { user } = useAuth();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Habilita al usuario registrar su información y datos personales para crear una cuenta.
        if (user && !shippingInfo.initialized) {
            handleInputChange({ target: { name: 'name', value: `${user.name.firstname} ${user.name.lastname}` } });
            handleInputChange({ target: { name: 'phone', value: user.phone } });
            handleInputChange({ target: { name: 'address', value: `${user.address.number} ${user.address.street}` } });
            handleInputChange({ target: { name: 'city', value: user.address.city } });
            handleInputChange({ target: { name: 'postalCode', value: user.address.zipcode } });
            handleCountryChange({ target: { name: 'country', value: 'US' } });
            handleInputChange({ target: { name: 'province', value: 'California' } });
            handleInputChange({ target: { name: 'initialized', value: true } });
        }
    }, [user, handleInputChange, handleCountryChange, shippingInfo.initialized]);

    // En caso de no detectarse alguno de los datos requeridos
    const validateForm = () => {
        const newErrors = {};
        if (!shippingInfo.name) newErrors.name = 'El nombre es requerido.';
        if (!shippingInfo.phone) newErrors.phone = 'El teléfono es requerido.';
        if (!shippingInfo.country) newErrors.country = 'El país es requerido.';
        if (!shippingInfo.province) newErrors.province = 'La provincia es requerida.';
        if (!shippingInfo.city) newErrors.city = 'La ciudad es requerida.';
        if (!shippingInfo.address) newErrors.address = 'La dirección es requerida.';
        if (!shippingInfo.postalCode) newErrors.postalCode = 'El código postal es requerido.';
        return newErrors;
    };

    // Transfiere la navegación a la siguiente ventana si no se detectaros errores o falta de información.
    const handleNext = () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            onNext();
        } else {
            setErrors(formErrors);
        }
    };

    return (
        // Retorna todos los datos del usuario que realizó la compra
        <div className="checkout-section">
            <h2>Información de Envío</h2>
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
                <div className="form-group">
                    <label>País:</label>
                    <select
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleCountryChange}
                    >
                        <option value="">Seleccione  país</option>
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                    {errors.country && <span>{errors.country}</span>}
                </div>
                <div className="form-group">
                    <label>Provincia:</label>
                    <select
                        name="province"
                        value={shippingInfo.province}
                        onChange={handleInputChange}
                        disabled={!shippingInfo.country}
                    >
                        <option value="">Seleccione provincia</option>
                        {shippingInfo.country && provinces[shippingInfo.country].map((province) => (
                            <option key={province} value={province}>
                                {province}
                            </option>
                        ))}
                    </select>
                    {errors.province && <span>{errors.province}</span>}
                </div>
                <div className="form-group">
                    <label>Ciudad:</label>
                    <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                    />
                    {errors.city && <span>{errors.city}</span>}
                </div>
                <div className="form-group">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                    />
                    {errors.address && <span>{errors.address}</span>}
                </div>
                <div className="form-group">
                    <label>Código postal:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={handleInputChange}
                    />
                    {errors.postalCode && <span>{errors.postalCode}</span>}
                </div>
                <button type="button" onClick={handleNext} className="checkout-button">Continuar</button>
            </form>
        </div>
    );
};

export default ShippingInfo;
