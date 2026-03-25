import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({ title, image, price, text }) {
  return (
    <motion.div 
      className="aesop-product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="product-image-container">
        <img src={image} alt={title} />
      </div>

      <div className="product-info">
        <h3 className="product-title font-body">{title}</h3>
        {text && <p className="product-desc">{text}</p>}
        {/* Price hidden initially until hovered if mimicking exact Aesop, but for conversion we keep it visible but subtle */}
      </div>

      <div className="product-hover-actions">
        <button className="btn-secondary add-btn">Add to your cart — ${price}</button>
      </div>
      
      <style>{`
        .aesop-product-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1rem;
          position: relative;
          background: var(--color-primary);
          transition: background-color var(--transition-fast);
        }

        .aesop-product-card:hover {
          background-color: var(--color-secondary);
        }

        .product-image-container {
          width: 100%;
          height: 350px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .product-image-container img {
          max-height: 100%;
          max-width: 80%;
          object-fit: contain;
          mix-blend-mode: multiply;
        }

        .product-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        .product-title {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text);
        }

        .product-desc {
          font-size: 0.85rem;
          color: var(--color-text);
          line-height: 1.4;
        }

        .product-hover-actions {
          width: 100%;
          padding: 0 1rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all var(--transition-slow);
          position: absolute;
          bottom: 2rem;
        }

        .aesop-product-card:hover .product-info {
           opacity: 0; /* Fade out text to make room for button */
        }

        .aesop-product-card:hover .product-hover-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .add-btn {
          width: 100%;
          padding: 1rem;
          border-color: #333;
          color: #333;
        }
        
        .add-btn:hover {
          background-color: #333;
          color: #fffef2;
        }
      `}</style>
    </motion.div>
  );
}
