// Obtener todas las categorías
export const getCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  };
  
  // Obtener productos por categoría
  export const getProductsByCategory = async (category) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products for category');
    }
    return response.json();
  };
  
  // Obtener detalles de un producto por ID
  export const getProduct = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  };
  