import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Almacena todos los datos de la cuenta y sus últimas modificaciones.
export const useAuth = () => {
    return useContext(AuthContext);
};

// Exportar todas las funciones almacenadas en el const para el inicio y cierre de cesión.
export const AuthProvider = ({ children }) => {
    // Variable que almacenará la cuenta del usuario que inició sesión.
    const [user, setUser] = useState(null);

    // Guarda en una variable la cuenta de usuario conservada en el almacenamiento local.
    useEffect(() => {
        // Almacena la variable que contiene la cuenta con la sesión iniciada en la página.
        const storedUser = localStorage.getItem('user');
        // Asegura que exista el elemento extraído del almacenamiento local.
        if (storedUser) {
            // Pasa la variable de formato JSON a formato JavaScript para poder ser personalizable.
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Establece la funcionalidad de la opción para iniciar sesión.
    const login = (userData) => {
        // Permite acceder los datos del usuario para el inicio de sesión y almacenarlos 
        // en una clave-valor del almacenamiento local
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Establece la opción para cerrar sesión en la página.
    const logout = () => {
        // Elimina la información de la cuenta almacenada en el almacenamiento local.
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        // Exporta las funciones para el inicio y cierre de sesión de la cuenta.
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
