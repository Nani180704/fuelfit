import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  const addToCart = (meal) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex(item => item._id === meal._id);

    if (itemIndex >= 0) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      // Make sure all required fields are included
      updatedCart.push({
        _id: meal._id,
        name: meal.name,
        price: parseFloat(meal.price),
        quantity: 1
      });
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (mealId) => {
    const updatedCart = cartItems.filter(item => item._id !== mealId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (mealId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item._id === mealId ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 