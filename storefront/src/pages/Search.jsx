import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Search as SearchIcon, Plus } from 'lucide-react';

export default function SearchPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div style={{ padding: '150px 40px', backgroundColor: '#fffef2', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '80px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: '400', marginBottom: '20px' }}>
            Results for "{query}"
          </h1>
          <p style={{ opacity: 0.6 }}>{products.length} formulations found</p>
        </header>

        {loading ? (
          <p>Analyzing the cabinet...</p>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{ marginBottom: '40px', fontSize: '18px' }}>No formulations match your search.</p>
            <Link to="/#catalog" className="btn btn-primary">Return to Catalog</Link>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
