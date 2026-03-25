import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <section className="aesop-hero-fullbleed">
      
      {/* Custom generated branded Cinematic Hero Background */}
      <div className="hero-brand-bg"></div>
      
      {/* Dynamic Lighting Vignette protecting legibility */}
      <div className="hero-vignette"></div>

      {/* Foreground Content - Text centered at the bottom exactly matching the layout spec */}
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span variants={itemVariants} className="text-supra" style={{ color: '#fffef2', letterSpacing: '1px', display: 'block', marginBottom: '15px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          Our first Retinoid-enriched serum
        </motion.span>
        
        <motion.h2 variants={itemVariants} className="text-heading" style={{ fontSize: '42px', maxWidth: '800px', margin: '0 auto 20px', color: '#fffef2', textShadow: '0 4px 12px rgba(0,0,0,0.9)' }}>
          Resolute Facial Concentrate—from renewal, resilience
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-body" style={{ maxWidth: '600px', margin: '0 auto 40px', fontSize: '18px', color: 'rgba(255,254,242,0.95)', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
          A replenishing formulation with a skin-supportive Retinoid as potent as Retinol—helping to strengthen the skin through time.
        </motion.p>
        
        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to="/#catalog" className="aesop-btn-light" onClick={(e) => {
            if (window.location.pathname === '/') {
              e.preventDefault();
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Discover our formulations <ArrowRight size={16} style={{marginLeft: '20px'}} />
          </Link>
        </motion.div>
      </motion.div>

      <style>{`
        .aesop-hero-fullbleed {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 80px 40px;
          text-align: center;
          overflow: hidden;
        }

        .hero-brand-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('/hero_branded.png') no-repeat center center;
          background-size: cover;
          z-index: -3;
          animation: kenBurns 25s ease-out infinite alternate;
        }

        .hero-vignette {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70vh;
          background: linear-gradient(to top, rgba(5, 10, 25, 0.95) 0%, rgba(10, 15, 30, 0.6) 40%, transparent 100%);
          z-index: -1;
          pointer-events: none;
          animation: breatheLighting 10s ease-in-out infinite alternate;
        }

        .hero-content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          z-index: 10;
        }

        .aesop-btn-light {
          display: inline-flex;
          align-items: center;
          padding: 18px 24px;
          border: 1px solid rgba(255,255,255,0.8);
          background-color: transparent;
          color: #fffef2;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.4s ease, color 0.4s ease;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }

        .aesop-btn-light:hover {
          background-color: #fffef2;
          color: #0f172a;
        }

        @keyframes kenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }

        @keyframes breatheLighting {
          0% { opacity: 0.85; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
