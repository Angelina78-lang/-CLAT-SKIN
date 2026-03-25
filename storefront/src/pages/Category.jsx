import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Plus } from 'lucide-react';

export default function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Map URL param to DB category
  const displayTitle = categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const dbCategory = displayTitle.replace('And', '&');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const filtered = data.products.filter(p => p.category === dbCategory);
        setProducts(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [dbCategory]);

  if (loading) return <div style={{ padding: '150px 40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '150px 40px 100px', backgroundColor: '#fffef2', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', textDecoration: 'none', fontSize: '14px', marginBottom: '60px', opacity: 0.6 }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <header style={{ marginBottom: '80px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: '400', marginBottom: '20px' }}>{dbCategory}</h1>
          <p style={{ maxWidth: '600px', fontSize: '18px', lineHeight: '1.6', opacity: 0.8 }}>
            Discover our curated selection of {dbCategory.toLowerCase()} formulations, designed for physiological balance and sensory pleasure.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '60px 40px' }}>
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ width: '100%', height: '400px', backgroundColor: '#f8fafc', marginBottom: '25px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={product.image} alt={product.title} style={{ width: '80%', height: '80%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '8px' }}>{product.title}</h3>
              <p style={{ fontSize: '14px', marginBottom: '15px', opacity: 0.6, flex: 1 }}>{product.text}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
                <span style={{ fontWeight: '500' }}>${product.price.toFixed(2)}</span>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '10px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}
                  onClick={() => addToCart(product)}
                >
                  <Plus size={14} /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
