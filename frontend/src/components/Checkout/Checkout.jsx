import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState('delivery'); // delivery, payment
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    setCardDetails(prev => ({
      ...prev,
      cardNumber: value
    }));
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    
    setCardDetails(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  const validateCardDetails = () => {
    if (paymentMethod === 'card') {
      // Card number validation
      if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        setError('Please enter a valid 16-digit card number');
        return false;
      }
      
      // Name validation
      if (!cardDetails.cardName || cardDetails.cardName.trim().length < 3) {
        setError('Please enter the complete name on card');
        return false;
      }
      
      // Expiry date validation
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!cardDetails.expiryDate || !expiryRegex.test(cardDetails.expiryDate)) {
        setError('Please enter a valid expiry date (MM/YY)');
        return false;
      }
      
      // Check if card is expired
      if (cardDetails.expiryDate) {
        const [month, year] = cardDetails.expiryDate.split('/');
        const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
        const today = new Date();
        
        if (expiryDate < today) {
          setError('Your card has expired');
          return false;
        }
      }
      
      // CVV validation
      if (!cardDetails.cvv || cardDetails.cvv.length !== 3 || !/^\d+$/.test(cardDetails.cvv)) {
        setError('Please enter a valid 3-digit CVV');
        return false;
      }
    }
    return true;
  };

  const checkUserAuthentication = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      setError('Please login to complete your order');
      navigate('/login', { state: { returnTo: '/checkout' } });
      return false;
    }
    
    if (!user._id) {
      setError('User data is invalid. Please login again.');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login', { state: { returnTo: '/checkout' } });
      return false;
    }
    
    return true;
  };

  const handleCompletePayment = async () => {
    if (!checkUserAuthentication()) {
      return;
    }

    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    // Validate card details if card payment is selected
    if (paymentMethod === 'card') {
      if (!validateCardDetails()) {
        return; // Stop execution if card validation fails
      }
    }

    try {
      setLoading(true);
      setError(null);

      // Get user data from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      // Get the cart items from localStorage
      const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Validate delivery details
      if (!deliveryDetails.fullName || !deliveryDetails.address || !deliveryDetails.city || !deliveryDetails.phone) {
        throw new Error('Please fill in all delivery details');
      }

      // Validate cart items
      if (storedCartItems.length === 0) {
        throw new Error('Your cart is empty');
      }

      // Process cart items
      const processedItems = storedCartItems.map(item => ({
        productId: item._id,
        name: item.name || 'Unknown Item',
        price: parseFloat(item.price || 0),
        quantity: parseInt(item.quantity || 1)
      }));

      // Create the order payload
      const orderPayload = {
        userId: user._id,
        items: processedItems,
        totalAmount: parseFloat(getCartTotal()),
        deliveryAddress: `${deliveryDetails.address}, ${deliveryDetails.city}${deliveryDetails.instructions ? ' - ' + deliveryDetails.instructions : ''}`,
        customerName: deliveryDetails.fullName,
        customerPhone: deliveryDetails.phone,
        paymentMethod: paymentMethod === 'cod' ? 'COD' : 'CARD',
        // Include masked card details if paying by card
        paymentDetails: paymentMethod === 'card' ? {
          cardLastFour: cardDetails.cardNumber.slice(-4),
          cardHolder: cardDetails.cardName,
          expiryDate: cardDetails.expiryDate
        } : null
      };

      console.log('User authentication success');
      console.log('Payment method selected:', paymentMethod);
      console.log('Card validation success');
      console.log('Delivery details:', deliveryDetails);
      console.log('Cart items:', storedCartItems);

      // Also log the final order payload
      console.log('Final payload being sent:', JSON.stringify(orderPayload, null, 2));

      const response = await fetch('http://localhost:5004/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        if (data.missingFields) {
          const missingFieldsList = Object.keys(data.missingFields).join(', ');
          throw new Error(`Missing fields: ${missingFieldsList}`);
        }
        throw new Error(data.message || 'Failed to create order');
      }

      // Order created successfully
      clearCart();
      navigate('/order-success', { state: { orderId: data.order._id } });
    } catch (error) {
      console.error('Order creation error:', error);
      setError(error.message || 'Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkCartStructure = () => {
    const storedCart = localStorage.getItem('cart');
    if (!storedCart) {
      console.error('Cart is empty in localStorage');
      return false;
    }
    
    try {
      const cart = JSON.parse(storedCart);
      console.log('Cart structure:', cart);
      
      if (!Array.isArray(cart) || cart.length === 0) {
        console.error('Cart is not an array or is empty');
        return false;
      }
      
      // Check each item in the cart
      const isValid = cart.every((item, index) => {
        const hasId = !!item._id;
        const hasName = !!item.name;
        const hasPrice = item.price !== undefined;
        const hasQuantity = item.quantity !== undefined;
        
        if (!hasId || !hasName || !hasPrice || !hasQuantity) {
          console.error(`Item at index ${index} is missing required fields:`, {
            hasId, hasName, hasPrice, hasQuantity
          });
          console.log('Item:', item);
          return false;
        }
        return true;
      });
      
      return isValid;
    } catch (error) {
      console.error('Error parsing cart:', error);
      return false;
    }
  };

  useEffect(() => {
    checkCartStructure();
  }, []);

  const renderPaymentMethods = () => (
    <div className="payment-methods">
      <h3>Select Payment Method</h3>
      <div className="payment-options">
        <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="payment-option-content">
            <i className="payment-icon">💳</i>
            <span>Credit/Debit Card</span>
          </div>
        </label>

        <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <div className="payment-option-content">
            <i className="payment-icon">💵</i>
            <span>Cash on Delivery</span>
          </div>
        </label>
      </div>

      {paymentMethod === 'card' && (
        <div className="card-details-form">
          <h4>Enter Card Details</h4>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={handleCardNumberChange}
              maxLength="16"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              placeholder="John Doe"
              value={cardDetails.cardName}
              onChange={(e) => setCardDetails(prev => ({
                ...prev,
                cardName: e.target.value
              }))}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleExpiryDateChange}
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails(prev => ({
                  ...prev,
                  cvv: e.target.value.replace(/\D/g, '').slice(0, 3)
                }))}
                maxLength="3"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/meals')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {step === 'delivery' ? (
        <div className="delivery-form">
          <h2>Delivery Details</h2>
          <form onSubmit={handleDeliverySubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={deliveryDetails.fullName}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  fullName: e.target.value
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Delivery Address</label>
              <input
                type="text"
                id="address"
                value={deliveryDetails.address}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  address: e.target.value
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={deliveryDetails.city}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  city: e.target.value
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={deliveryDetails.phone}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  phone: e.target.value
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="instructions">Delivery Instructions (Optional)</label>
              <textarea
                id="instructions"
                value={deliveryDetails.instructions}
                onChange={(e) => setDeliveryDetails({
                  ...deliveryDetails,
                  instructions: e.target.value
                })}
              />
            </div>
            <button type="submit" className="continue-btn">
              Continue to Payment
            </button>
          </form>
        </div>
      ) : (
        <div className="payment-section">
          <h2>Payment</h2>
          <div className="order-summary">
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item._id} className="order-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Total:</strong>
              <strong>${getCartTotal().toFixed(2)}</strong>
            </div>
          </div>

          {renderPaymentMethods()}

          {error && <div className="error-message">{error}</div>}
          
          <button 
            onClick={handleCompletePayment} 
            className="payment-btn"
            disabled={loading || !paymentMethod}
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
          
          <button 
            onClick={() => setStep('delivery')} 
            className="back-btn"
          >
            Back to Delivery Details
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout; 