import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order. Your order has been received and is now being processed.</p>
        <div className="order-info">
          <p>Order Number: <strong>{orderId}</strong></p>
          <p>You will receive a confirmation email shortly.</p>
        </div>
        <div className="success-actions">
          <Link to="/" className="button primary">Return to Home</Link>
          <Link to="/meals" className="button secondary">Browse More Meals</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess; 