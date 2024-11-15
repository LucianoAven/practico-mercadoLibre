import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import MyPurchasesPage from './pages/MyPurchasesPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import CartProvider from './context/CartContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/category/:name' element={<CategoryPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route
            path='/order-confirmation'
            element={<OrderConfirmationPage />}
          />
          <Route path='/my-purchases' element={<MyPurchasesPage />} />
          <Route path='/account' element={<AccountPage />} />
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </CartProvider>
  </AuthProvider>
);

export default App;
