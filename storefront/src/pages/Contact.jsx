import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const trans = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <section id="contact" style={{ padding: '100px 40px', backgroundColor: '#fffef2', display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '0 40px' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...trans, delay: 0 }} style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', marginBottom: '20px' }}>Contact Us</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...trans, delay: 0.1 }} style={{ fontSize: '16px', marginBottom: '40px' }}>For enquiries regarding products, formulations, or online orders, our trained consultants are available to assist.</motion.p>
        
        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ ...trans }} style={{ padding: '30px', border: '1px solid #333', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', marginBottom: '10px' }}>Message Received</h3>
            <p>A specialist will be in touch within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ ...trans, delay: 0.2 }} 
            onSubmit={async (e) => { 
              e.preventDefault(); 
              const formData = {
                name: e.target[0].value,
                email: e.target[1].value,
                subject: e.target[2].value,
                message: e.target[3].value
              };
              try {
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
                });
                if (res.ok) setSent(true);
              } catch (err) {
                console.error('Contact error:', err);
              }
            }} 
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" placeholder="Full name" required style={{ padding: '16px', border: '1px solid #ccc', backgroundColor: 'transparent', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px' }} />
            <input type="email" placeholder="Email address" required style={{ padding: '16px', border: '1px solid #ccc', backgroundColor: 'transparent', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px' }} />
            <select style={{ padding: '16px', border: '1px solid #ccc', backgroundColor: 'transparent', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
              <option>Product Enquiry</option>
              <option>Order Issue</option>
              <option>General Consultation</option>
            </select>
            <textarea placeholder="Your message" rows="6" required style={{ padding: '16px', border: '1px solid #ccc', backgroundColor: 'transparent', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '15px', resize: 'vertical' }}></textarea>
            <motion.button type="submit" className="btn btn-primary btn-full" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} style={{ padding: '18px 0' }}>Send Enquiry</motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
