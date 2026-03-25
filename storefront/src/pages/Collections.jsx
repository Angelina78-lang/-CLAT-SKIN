import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const collections = [
  {
    title: "Skin Care",
    text: "Formulations for skin health.",
    linkText: "Explore skin care",
    link: "/category/skin-care",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Body & Hand",
    text: "Resonant, layered aromas.",
    linkText: "Explore body & hand",
    link: "/category/body-and-hand",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Kits & Travel",
    text: "Curated essentials for all climates.",
    linkText: "Explore kits & travel",
    link: "/category/kits-and-travel",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Collections() {
  return (
    <section className="collections-section" style={{ padding: '100px 40px', backgroundColor: '#fffef2' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '42px', fontWeight: 400, color: 'var(--color-primary)', marginBottom: '60px' }}>Explore Collections</h1>
      
      <div className="collections-grid" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {collections.map((item, index) => (
          <motion.div 
            key={index}
            className="collection-card"
            style={{ flex: '1 1 350px', cursor: 'pointer' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="collection-img-wrapper" style={{ overflow: 'hidden', height: '400px', marginBottom: '20px' }}>
              <motion.img 
                src={item.image} 
                alt={item.title} 
                className="collection-img" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="collection-content">
              <h3 className="heading-sm" style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', marginBottom: '10px' }}>{item.title}</h3>
              <p className="collection-text" style={{ fontSize: '15px', marginBottom: '15px' }}>{item.text}</p>
              <Link to={item.link} className="aesop-link aesop-link-underline">
                {item.linkText} <span style={{marginLeft: '10px'}}>→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .col-img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
