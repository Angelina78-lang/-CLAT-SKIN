import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function TrackOrder() {
  const [tracking, setTracking] = useState(false);
  const trans = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <section id="track" style={{ padding: '100px 40px', backgroundColor: '#fffef2', display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ maxWidth: '500px', width: '100%', padding: '0 40px' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...trans, delay: 0 }} style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', marginBottom: '20px' }}>Track Your Order</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...trans, delay: 0.1 }} style={{ fontSize: '16px', marginBottom: '40px' }}>Enter your order reference number and associated email address to view its current status.</motion.p>
        
        {tracking ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ ...trans }} style={{ padding: '30px', border: '1px solid #ccc' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '20px' }}>Order Status: Processing</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#333', marginTop: '4px' }}></div>
                <p>Order Confirmed</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', opacity: 0.5 }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1px solid #333', marginTop: '4px' }}></div>
                <p>Formulation Prepared</p>
              </div>
              <div style={{ display: 'flex', gap: '10px', opacity: 0.5 }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '1px solid #333', marginTop: '4px' }}></div>
                <p>Dispatched</p>
              </div>
            </div>
            <button onClick={() => setTracking(false)} className="btn btn-secondary" style={{ padding: '10px 20px', marginTop: '30px' }}>Track another order</button>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...trans, delay: 0.2 }} onSubmit={e => { e.preventDefault(); setTracking(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" placeholder="Order Number (e.g. EC-10924)" required style={{ padding: '16px', border: '1px solid #ccc', backgroundColor: 'transparent', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px' }} />
            <input type="email" placeholder="Email address" required style={{ padding: '16px', border: '1px solid #ccc', backgroundColor: 'transparent', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px' }} />
            <motion.button type="submit" className="btn btn-primary btn-full" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} style={{ padding: '18px 0' }}>Find Order</motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
