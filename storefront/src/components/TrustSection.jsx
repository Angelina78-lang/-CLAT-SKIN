import React from 'react';
import { ShieldCheck, Leaf, Sparkles } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="trust-section">
      <div className="container">
        
        <div className="trust-brands">
          <p className="subheading" style={{textAlign: 'center', marginBottom: '2rem'}}>As Featured In</p>
          <div className="brand-logos">
            <span>VOGUE</span>
            <span>HARPER'S BAZAAR</span>
            <span>ALLURE</span>
            <span>ELLE</span>
          </div>
        </div>

        <div className="trust-guarantees grid-3">
          <div className="guarantee-item">
            <ShieldCheck size={32} className="guarantee-icon" />
            <h4 className="guarantee-title">Dermatologist Tested</h4>
            <p className="guarantee-text">Clinically proven formulas safe for compromised barriers.</p>
          </div>
          <div className="guarantee-item">
            <Leaf size={32} className="guarantee-icon" />
            <h4 className="guarantee-title">Vegan & Cruelty-Free</h4>
            <p className="guarantee-text">Ethically sourced, bio-compatible botanical ingredients.</p>
          </div>
          <div className="guarantee-item">
            <Sparkles size={32} className="guarantee-icon" />
            <h4 className="guarantee-title">30-Day Efficacy Guarantee</h4>
            <p className="guarantee-text">Experience the Éclat difference or your money back.</p>
          </div>
        </div>
      </div>
      
      <style>{`
        .trust-section {
          background-color: var(--color-secondary);
          padding: 6rem 5%;
        }

        .brand-logos {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          flex-wrap: wrap;
          margin-bottom: 6rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding-bottom: 4rem;
        }

        .brand-logos span {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          color: var(--color-text-light);
        }

        .guarantee-item {
          text-align: center;
          padding: 2rem;
        }

        .guarantee-icon {
          color: var(--color-accent);
          margin-bottom: 1.5rem;
          stroke-width: 1.5;
        }

        .guarantee-title {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .guarantee-text {
          margin: 0 auto;
          font-size: 0.95rem;
        }
      `}</style>
    </section>
  );
}
