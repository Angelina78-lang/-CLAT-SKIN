import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error('Failed to load products', err));
  }, []);

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: '#fffef2', minHeight: '100vh' }}>
      <div style={{ padding: '0 40px', marginBottom: '60px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 400, color: 'var(--color-primary)' }}>Skin Care Formulation</h1>
        <p style={{ marginTop: '20px', maxWidth: '600px', fontSize: '16px', lineHeight: 1.6 }}>Skin care formulations tailored to the needs of the skin, guided by a scientific approach to botanical ingredients.</p>
      </div>
      
      <div className="catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px', padding: '0 40px' }}>
        {products.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          >
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '350px', objectFit: 'contain', mixBlendMode: 'multiply', marginBottom: '20px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 500, fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>{product.title}</h4>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>{product.text}</p>
            
            <div style={{ width: '100%', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ display: 'block', fontSize: '12px', color: '#666' }}>Size</span>
                <span style={{ fontSize: '14px' }}>Standard</span>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 500, display: 'flex', alignItems: 'flex-end' }}>${product.price.toFixed(2)}</span>
            </div>
            
            <button className="btn btn-primary btn-full" onClick={() => addToCart(product, 'Standard')} style={{ padding: '16px 0', width: '100%' }}>Add to your cart</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
