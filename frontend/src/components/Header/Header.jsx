import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Search from '../Search/Search';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <h1>FitFuel</h1>
            </Link>
          </div>
          
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger"></span>
          </button>
          
          <nav className={`navigation ${mobileMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li className={isActive('/') ? 'active' : ''}>
                <Link to="/">Home</Link>
              </li>
              <li className={isActive('/meals') ? 'active' : ''}>
                <Link to="/meals">Meals</Link>
              </li>
              <li className={isActive('/meal-plans') ? 'active' : ''}>
                <Link to="/meal-plans">Meal Plans</Link>
              </li>
              <li className={isActive('/subscriptions') ? 'active' : ''}>
                <Link to="/subscriptions">Subscriptions</Link>
              </li>
              <li className={isActive('/expert-advice') ? 'active' : ''}>
                <Link to="/expert-advice">Expert Advice</Link>
              </li>
            </ul>
            
            <div className="header-actions">
              <button className="btn-search" onClick={toggleSearch}>
                <i className="search-icon">🔍</i>
              </button>
              <Link to="/account" className="btn-account">
                <i className="account-icon">👤</i>
              </Link>
              <Link to="/cart" className="btn-cart">
                <i className="cart-icon">🛒</i>
                <span className="cart-count">{itemCount}</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <Search isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header; 