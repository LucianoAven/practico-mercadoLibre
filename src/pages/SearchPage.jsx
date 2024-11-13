import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';

// Función para mostrar los resultados que coincidan con la información enviada 
// por la barra de navegación
const SearchPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('searchTerm') || '';
    const category = params.get('category') ? decodeURIComponent(params.get('category')) : '';

    console.log("Search Term:", searchTerm);
    console.log("Category:", category);

    const fetchProducts = async () => {
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url += `/category/${encodeURIComponent(category)}`;
      }

      console.log("Fetching URL:", url);

      try {
        const response = await axios.get(url);
        console.log("API Response:", response.data);

        const filteredProducts = response.data.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("Filtered Products:", filteredProducts);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [location]);

  return (
    // Establece los resultados en la ventana.
    <div className="container mt-4">
      <h2>Resultados de la búsqueda</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>Producto no encontrado. </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
