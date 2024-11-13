import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';  

const Header = () => {
    // Listas donde se almacenarán las opciones en el encabezado de la web que el usuarió podrá seleccionar.
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Almacena la información de cada categoría en la variable "setCategories"
        axios.get('https://fakestoreapi.com/products/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error al obtener las categorías:', error));
    }, []);

    // Permite al usuario buscar un producto o tipo de productos en específica a través de una
    // barra de búsqueda.
    const handleSearch = (e) => {
        e.preventDefault();
        const query = `?searchTerm=${encodeURIComponent(searchTerm.trim())}${selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`;
        navigate(`/search${query}`);
    };

    // Almacena todos los usuarios del enlace que ya se encuetran ingresados en la página.
    const handleLogin = async () => {
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();

        const user = users.find(u => u.username === username && u.password === password);

        // Permite iniciar sesión al usuario si los datos enviados coninciden con los ya registrados.
        if (user) {
            login(user);
            setShowLogin(false);
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <header className="header">
            {/* Extrae y muestra el logo del sitio */}
            <Link to="/" className="header-logo">
                <img src="/logo.png" alt="Tienda Virtual" className="logo" />
            </Link>
            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    {/* Barra de búsqueda para los usuarios del sitio */}
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    {/* Menú desplegable con las opciones de las distintas categorías disponibles */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="category-select"
                    >
                        <option value="">Todas</option>
                        {/* Filtra los productos que contienen misma categoría */}
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                    {/* Opción para buscar los productos de la categoría o barra de búsqueda */}
                    <button type="submit" className="search-button">Buscar</button>
                </form>
            </div>
            {/* Contiene todo lo que se demostrará en la barra superior del sitio */}
            <nav>
                <ul className="nav-list">
                    {/* Enlace para enviar a la pestaña del carrito de compras */}
                    <li><Link to="/cart">Carrito</Link></li>
                    {/* Revisa si el usuario tiene una sesión iniciada */}
                    {user ? (
                        <>
                            {/* Enlaces para ir a distintas pestañas del sitio */}
                            <li><Link to="/my-purchases">Mis Compras</Link></li>
                            <li><Link to="/account">Cuenta</Link></li>
                            <li><button onClick={logout}>Cerrar Sesión</button></li>
                        </>
                    ) : (
                        // Redirecciona a la pestaña del inicio de sesión en caso de no estar registrado.
                        <li><button onClick={() => setShowLogin(!showLogin)}>Login</button></li>
                    )}
                </ul>
            </nav>
            {showLogin && (
                // Despliega una pestaña para iniciar sesión sin la necesidad de salir de
                // la ventana actual
                <div className="login-container">
                    <h2>Iniciar Sesión</h2>
                    <input
                        type="text"
                        placeholder="Nombre de Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Ingresar</button>
                </div>
            )}
        </header>
    );
};

export default Header;
