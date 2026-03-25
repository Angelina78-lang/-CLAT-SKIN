import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const trans = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <section id="about" style={{ padding: '100px 40px', backgroundColor: '#fffef2', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <div style={{ maxWidth: '800px', textAlign: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...trans, delay: 0 }} style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 400, color: 'var(--color-primary)', marginBottom: '40px' }}>Our formulation philosophy</motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...trans, delay: 0.15 }} style={{ fontSize: '18px', lineHeight: 1.8, marginBottom: '40px' }}>
          At Éclat Skin, we are dedicated to formulations of the highest quality. We investigate widely to source plant-based and laboratory-made ingredients, and use only those with a proven record of safety and efficacy.
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ ...trans, delay: 0.3 }} style={{ overflow: 'hidden', marginBottom: '40px' }}>
          <motion.img whileHover={{ scale: 1.03 }} transition={{ duration: 1 }} src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80" alt="Laboratory" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...trans, delay: 0.45 }} style={{ fontSize: '18px', lineHeight: 1.8 }}>
          Our meticulous approach ensures each product delivers a remarkable sensory experience along with definitive results. Time, dedication, and precision are the cornerstones of our architecture.
        </motion.p>
      </div>
    </section>
  );
}
