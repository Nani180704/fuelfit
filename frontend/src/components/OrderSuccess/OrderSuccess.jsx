import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="order-success">
      <div className="success-content">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. We'll start preparing your meals right away.</p>
        <button onClick={() => navigate('/meals')} className="continue-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess; 