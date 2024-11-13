import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList.jsx';
import { getProductsByCategory } from '../services/api';
import '../styles/Category.css'; // Importa el nuevo archivo CSS

const CategoryPage = () => {
  const { name } = useParams();
  // Crea la variablr setProducts como un lista vacía.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCategory(name).then(setProducts).catch((error) => {
      console.error('Error fetching products for category:', error);
    });
  }, [name]);

  return (
    <div>
      <h2>Categoría: {name}</h2>
      <ProductList products={products} />
    </div>
  );
};

export default CategoryPage;
