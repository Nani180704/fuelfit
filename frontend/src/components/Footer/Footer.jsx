import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h3>FitFuel</h3>
          <p>Fuel your fitness journey with nutrition designed for your goals.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4>Menu</h4>
            <ul>
              <li><Link to="/meals/weight-loss">Weight Loss</Link></li>
              <li><Link to="/meals/muscle-gain">Muscle Gain</Link></li>
              <li><Link to="/meals/keto">Keto</Link></li>
              <li><Link to="/meals/vegan">Vegan</Link></li>
              <li><Link to="/meals/paleo">Paleo</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>FitFuel</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/expert-advice">Nutrition Blog</Link></li>
              <li><Link to="/subscriptions">Subscriptions</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:support@fitfuel.com">support@fitfuel.com</a></li>
              <li><a href="tel:+1800123456">1-800-123-456</a></li>
              <li><Link to="/contact">Contact Form</Link></li>
            </ul>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">FB</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">IG</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">TW</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FitFuel. All rights reserved.</p>
        <div className="footer-policies">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 