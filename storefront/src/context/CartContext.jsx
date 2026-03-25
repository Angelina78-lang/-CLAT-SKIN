import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, variant = 'Standard') => {
    setCart(prev => {
      const id = `${product.id}-${variant}`;
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, id, originalId: product.id, variant, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  
  const updateQty = (id, newQty) => {
    if (newQty < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQty, 
      getSubtotal, 
      isCartOpen, 
      setIsCartOpen,
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
}
