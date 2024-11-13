import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/App.css';


const CategoryList = () => {
  // Establezco listas para guardar los nombres de cada categoría y sus respectivas imagenes.
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});

  useEffect(() => {
    // Extrae las categorias del enlace de web especificado.
    axios.get('https://fakestoreapi.com/products/categories')
      // Corre la función si no se produce algún error con el enlace.
      .then(response => {
        // Almacena en una lista todas las categorías del sitio.
        setCategories(response.data);
        // Recorre por cada categoría.
        response.data.forEach(category => {
          axios.get(`https://fakestoreapi.com/products/category/${category}`)
            // Guarda en la variable "setCategoryImages" la imagen de cada categoría.
            .then(res => {
              setCategoryImages(prevState => ({
                ...prevState,
                [category]: res.data[0].image
              }));
            })
            // Alerta generada en caso de ocurrir un error.
            .catch(error => {
              console.error(`Error fetching products for category ${category}:`, error);
            });
        });
      })
      // Si no se pudo almacenar correctamente las categorías del enlace.
      .catch(error => {
        console.error('Error fetching the categories!', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Categorías</h2>
      <div className="row justify-content-center">
        {/* Establece el diseño de cada categoría que se visualizará en la página principal */}
        {categories.map((category, index) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
            <div className="card">
              {/* Muestra la imagen de cada categoría */}
              <img src={categoryImages[category]} className="card-img-top" alt={category} />
              <div className="card-body">
                {/* Muestra el nombre de la categoría */}
                <h5 className="card-title text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                {/* Genera una opción para entrar a los productos con la categoría seleccionada */}
                <Link to={`/category/${category}`} className="btn btn-primary btn-block">Seleccionar</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
