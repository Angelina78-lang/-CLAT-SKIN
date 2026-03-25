import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import Collections from './Collections';
import About from './About';
import Contact from './Contact';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error('Failed to load products', err));
  }, []);

  // New TrackOrderSection component
  function TrackOrderSection() {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = (e) => {
      e.preventDefault();
      if (!orderId) return;
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setStatus({
          id: orderId,
          state: 'In Transit',
          location: 'Mumbai Distribution Center',
          estimated: 'Next 2-3 business days'
        });
      }, 1500);
    };

    return (
      <section id="track" className="aesop-section" style={{ backgroundColor: '#fffef2', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="aesop-container">
          <div style={{ maxWidth: '600px' }}>
            <h2 className="heading-lg" style={{ marginBottom: '30px' }}>Track Your Order</h2>
            <p style={{ marginBottom: '40px', fontSize: '18px', opacity: 0.8 }}>
              Enter your order number to check the current location and arrival estimate for your formulations.
            </p>
            
            <form onSubmit={handleTrack} style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
              <input 
                type="text" 
                placeholder="Order Number (e.g., ECLAT-123456)" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{
                  flex: 1,
                  padding: '15px 20px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  fontFamily: 'inherit',
                  outline: 'none',
                  background: 'white'
                }}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0 30px' }}>
                {loading ? 'Consulting...' : 'Track'}
              </button>
            </form>

            <AnimatePresence>
              {status && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ backgroundColor: '#f8fafc', padding: '30px', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase' }}>Status</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{status.state}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase' }}>Location</span>
                    <span>{status.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', opacity: 0.6, textTransform: 'uppercase' }}>Estimated Arrival</span>
                    <span>{status.estimated}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Hero />
      
      <section id="catalog" className="aesop-carousel-section">
        <div className="carousel-intro">
          <span className="text-supra">For the skin</span>
          <h2 className="text-heading" style={{ marginBottom: '20px' }}>Routine architecture</h2>
          <p className="text-body" style={{ marginBottom: '30px' }}>
            Selections to cleanse, tone and hydrate—formulated for environmental protection and profound structural integrity.
          </p>
          <a href="#" className="aesop-link aesop-link-underline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            See all Skin Care <ArrowRight size={14} />
          </a>
        </div>

        <div className="carousel-products">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              className="aesop-product"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -5 }}
            >
              <div style={{ width: '100%', height: '400px', overflow: 'hidden', marginBottom: '20px' }}>
                <motion.img 
                  src={product.image} 
                  alt={product.title} 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                />
              </div>
              <h4 style={{ fontSize: '15px', marginTop: '20px', marginBottom: '8px', fontWeight: 500, fontFamily: 'var(--font-heading)' }}>
                {product.title}
              </h4>
              <p style={{ fontSize: '14px', marginBottom: '30px' }}>{product.text}</p>

              <div style={{ width: '100%', marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '15px', paddingBottom: '15px', fontSize: '14px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ display: 'block', fontSize: '12px', color: 'rgba(0,0,0,0.6)', marginBottom: '4px' }}>Sizes</span>
                    <span>Standard</span>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', alignItems: 'flex-end' }}>
                    <span style={{ fontWeight: 500 }}>${product.price.toFixed(2)}</span>
                  </div>
                </div>
                
                <motion.button 
                  className="btn btn-primary btn-full" 
                  onClick={() => addToCart(product, 'Standard')}
                  style={{ padding: '16px 0', marginTop: '10px' }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to your cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Collections />
      <About />
      <Contact />
      <TrackOrderSection />

      <section className="aesop-feature-section">
        <div className="feature-image" style={{ backgroundColor: 'var(--color-bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/serum.png" alt="Architecture" style={{ width: '80%', height: '80%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
        </div>
        <motion.div 
          className="feature-text"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-supra">The architecture of skin</span>
          <h2 className="text-heading">A balanced formulation.</h2>
          <p className="text-body" style={{ marginBottom: '30px' }}>
            Our philosophy prioritizes the skin's structural integrity. Efficacy is achieved not through stripping, but by augmenting the lipid barrier with bio-compatible ceramides. Step into one of our spaces to consult with a trained specialist.
          </p>
          <Link to="/formulation" className="aesop-btn" style={{ maxWidth: '300px' }} onClick={() => window.scrollTo(0, 0)}>
            Discover our formulations <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      <footer className="aesop-footer">
        <div className="footer-top">
          <div className="newsletter-block">
            <form onSubmit={e => e.preventDefault()} style={{ borderBottom: '1px solid var(--color-base)', paddingBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <input type="email" placeholder="Email address" style={{ background: 'none', border: 'none', color: 'var(--color-base)', width: '100%', outline: 'none', fontSize: '16px', fontFamily: 'var(--font-body)' }} />
              <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--color-base)', cursor: 'pointer' }}><ArrowRight size={20} /></button>
            </form>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <input type="checkbox" style={{ marginTop: '4px' }} />
              <p style={{ fontSize: '14px', lineHeight: 1.4, color: 'var(--color-base)' }}>Subscribe to receive communications from Éclat Skin about our products and services. By subscribing, you confirm you have read and understand our privacy policy.</p>
            </div>
          </div>

          <div className="links-col">
            <h4 style={{ fontSize: '14px', marginBottom: '20px', fontWeight: 500, color: 'var(--color-base)' }}>Support & Information</h4>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">FAQ</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
          </div>

          <div className="links-col">
            <h4 style={{ fontSize: '14px', marginBottom: '20px', fontWeight: 500, color: 'var(--color-base)' }}>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          <div className="links-col">
            <h4 style={{ fontSize: '14px', marginBottom: '20px', fontWeight: 500, color: 'var(--color-base)' }}>Location preferences</h4>
            <p>Shipping: <span style={{ textDecoration: 'underline' }}>United States</span></p>
            <p style={{ marginTop: '10px' }}>Language: <span style={{ textDecoration: 'underline' }}>English</span></p>
          </div>
        </div>
      </footer>
    </>
  );
}
