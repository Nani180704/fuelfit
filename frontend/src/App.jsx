import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Meals from './pages/Meals';
import MealPlans from './pages/MealPlans';
import MealDetail from './pages/MealDetail';
import Subscription from './pages/Subscription';
import ExpertAdvice from './components/ExpertAdvice/ExpertAdvice';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Account from './components/Account/Account';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              <Route path="/meals" element={
                <PrivateRoute>
                  <Meals />
                </PrivateRoute>
              } />
              <Route path="/meal-plans" element={<MealPlans />} />
              <Route path="/meal/:id" element={<MealDetail />} />
              <Route path="/subscriptions" element={<Subscription />} />
              <Route path="/expert-advice" element={<ExpertAdvice />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={
                <PrivateRoute>
                  <Account />
                </PrivateRoute>
              } />
              <Route path="/order-success" element={
                <PrivateRoute>
                  <OrderSuccess />
                </PrivateRoute>
              } />
              <Route path="*" element={
                <div className="not-found">
                  <h2>Page Not Found</h2>
                  <p>The page you are looking for doesn't exist or has been moved.</p>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; 