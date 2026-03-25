import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Check, ShieldCheck, Leaf, Sparkles, Activity, Droplet } from 'lucide-react';

export default function Formulation() {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const trans = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] };

  const mockProduct = {
    id: 1,
    title: 'Radiance Retinoid Serum',
    price: 799,
    image: '/serum.png'
  };

  return (
    <div style={{ backgroundColor: 'var(--color-base)', color: 'var(--color-text)' }}>
      {/* 1. HERO SECTION */}
      <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 40px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#111' }}>
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1920&q=80" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, filter: 'blur(3px)' }} 
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ ...trans, delay: 0.3 }}
          style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', color: '#fffef2' }}
        >
          <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', display: 'block' }}>Skin Architecture</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '56px', marginBottom: '30px', fontWeight: 400 }}>Inside the Formula</h1>
          <p style={{ fontSize: '20px', lineHeight: 1.6, marginBottom: '40px', color: 'rgba(255,255,255,0.8)' }}>
            A clinically-inspired blend designed for clarity, renewal, and long-term skin health.
          </p>
          <a href="#buy" className="aesop-btn" style={{ borderColor: '#D4AF37', color: '#D4AF37', padding: '18px 40px' }}>
            Shop Now
          </a>
        </motion.div>
      </section>

      {/* 2. INGREDIENT BREAKDOWN */}
      <section style={{ padding: '120px 40px', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
        <div style={{ flex: '1 1 500px', overflow: 'hidden' }}>
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={trans}
            whileHover={{ scale: 1.05 }}
            src="https://images.unsplash.com/photo-1615397323861-fbab30ff1987?auto=format&fit=crop&w=800&q=80" 
            style={{ width: '100%', height: '600px', objectFit: 'cover' }} 
          />
        </div>
        <div style={{ flex: '1 1 500px' }}>
          <span className="text-supra" style={{ color: '#D4AF37' }}>Signature Complex</span>
          <h2 className="text-heading" style={{ marginBottom: '50px' }}>Exacting ingredients.</h2>
          
          {[
            { tag: 'Retinoid Complex', desc: 'Boosts cell turnover and reduces acne over time.', icon: <Sparkles size={20} strokeWidth={1.5} /> },
            { tag: 'Niacinamide', desc: 'Minimizes pores and improves skin texture.', icon: <Activity size={20} strokeWidth={1.5} /> },
            { tag: 'Hyaluronic Acid', desc: 'Deeply hydrates and strengthens the skin barrier.', icon: <Droplet size={20} strokeWidth={1.5} /> }
          ].map((ing, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ ...trans, delay: i * 0.15 }}
              style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}
            >
              <div style={{ color: '#D4AF37', marginTop: '4px' }}>{ing.icon}</div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', marginBottom: '10px' }}>{ing.tag}</h4>
                <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'rgba(15, 23, 42, 0.7)' }}>{ing.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section style={{ padding: '120px 40px', backgroundColor: '#fffef2', borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <h2 className="text-heading" style={{ marginBottom: '80px' }}>Visual Flow</h2>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { step: '01', title: 'Penetrate', desc: 'Active ingredients absorb deep into the skin directly bypassing the lipid layer.' },
            { step: '02', title: 'Repair', desc: 'Targets acne, rough texture, and underlying cellular dullness.' },
            { step: '03', title: 'Renew', desc: 'Reveals smoother, clearer, permanently glowing skin architecture.' }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ ...trans, delay: i * 0.15 }}
              style={{ flex: '1 1 300px', padding: '40px', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: 'var(--color-base)' }}
              whileHover={{ y: -5, borderColor: '#D4AF37' }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', color: '#D4AF37', marginBottom: '20px', display: 'block' }}>{step.step}</span>
              <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>{step.title}</h3>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'rgba(15, 23, 42, 0.7)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. RESULTS SECTION */}
      <section style={{ padding: '120px 40px', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center', backgroundColor: '#0f172a', color: '#fffef2' }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 className="text-heading" style={{ marginBottom: '40px', color: '#D4AF37' }}>Visible Results You Can Trust</h2>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={trans}>
            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '48px', fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>92%</h3>
              <p style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Noticed significantly smoother skin</p>
            </div>
            <div style={{ marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '48px', fontFamily: 'var(--font-heading)', marginBottom: '10px' }}>85%</h3>
              <p style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Saw vastly reduced acne occurrences</p>
            </div>
            <div>
              <p style={{ fontSize: '18px', color: '#D4AF37', fontStyle: 'italic' }}>*Clinical results observed in 2–4 weeks.</p>
            </div>
          </motion.div>
        </div>
        <div style={{ flex: '1 1 500px', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={trans}
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80" 
            style={{ width: '100%', height: '500px', objectFit: 'cover', filter: 'contrast(1.1) brightness(0.9)' }} 
          />
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section style={{ padding: '120px 40px', textAlign: 'center' }}>
        <span className="text-supra">Social Proof</span>
        <h2 className="text-heading" style={{ marginBottom: '60px' }}>Voices of clarity.</h2>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            "My acne reduced in just 10 days. The structural change is unbelievable.",
            "This feels like immense luxury and actually validates its claims.",
            "My skin finally looks breathtakingly healthy without any makeup."
          ].map((quote, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ ...trans, delay: i * 0.15 }}
              style={{ flex: '1 1 300px', padding: '40px', backgroundColor: '#fffef2', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{ display: 'flex', gap: '4px', color: '#D4AF37', marginBottom: '20px' }}>
                ★★★★★
              </div>
              <p style={{ fontSize: '18px', fontFamily: 'var(--font-heading)', fontStyle: 'italic', lineHeight: 1.6 }}>"{quote}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. TRUST SECTION */}
      <section style={{ padding: '60px 40px', backgroundColor: '#e6edf4', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { tag: 'Dermatologically inspired', icon: <ShieldCheck size={20} /> },
            { tag: 'No parabens or sulfates', icon: <Leaf size={20} /> },
            { tag: 'Safe for all skin types', icon: <Check size={20} /> },
            { tag: 'Cruelty-free', icon: <Sparkles size={20} /> }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...trans, delay: i * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 25px', backgroundColor: 'var(--color-base)', borderRadius: '30px', fontSize: '14px', fontWeight: 500 }}
            >
              <span style={{ color: '#D4AF37' }}>{t.icon}</span> {t.tag}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. PRODUCT FOCUS (BUY SECTION) */}
      <section id="buy" style={{ padding: '120px 40px', display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <motion.img 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={trans}
            whileHover={{ scale: 1.05 }}
            src="/serum.png" 
            style={{ width: '80%', height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} 
          />
        </div>
        <div style={{ flex: '1 1 400px' }}>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={trans}>
            <h2 className="text-heading" style={{ fontSize: '42px', marginBottom: '10px' }}>Radiance Retinoid Serum</h2>
            <p style={{ fontSize: '18px', color: 'rgba(15, 23, 42, 0.6)', marginBottom: '30px' }}>Results you can see. Confidence you can feel.</p>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '40px' }}>
              <span style={{ fontSize: '32px', fontWeight: 500 }}>₹799</span>
              <span style={{ fontSize: '20px', color: 'rgba(15, 23, 42, 0.4)', textDecoration: 'line-through' }}>₹1199</span>
            </div>

            <p style={{ color: '#e11d48', fontWeight: 500, fontSize: '14px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', backgroundColor: '#e11d48', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
              Only 12 left in stock — High demand
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '0 15px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '10px' }}>-</button>
                <span style={{ padding: '0 20px', fontSize: '16px' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '10px' }}>+</button>
              </div>
              <motion.button 
                className="btn btn-primary" 
                style={{ flex: 1, padding: '20px', fontSize: '16px', backgroundColor: '#D4AF37', color: '#fff' }}
                whileHover={{ scale: 1.02, backgroundColor: '#c5a028' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  for(let i=0; i<qty; i++) addToCart(mockProduct, 'Standard');
                }}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section style={{ padding: '120px 40px', backgroundColor: '#1e293b', color: '#fffef2', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={trans} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="text-heading" style={{ color: '#D4AF37' }}>Start Your Skin Transformation</h2>
          <p style={{ fontSize: '20px', marginBottom: '50px', color: 'rgba(255,255,255,0.8)' }}>Consistency is the secret to true confidence.</p>
          <motion.a 
            href="#buy" 
            className="btn btn-primary" 
            style={{ padding: '20px 60px', fontSize: '18px', backgroundColor: '#D4AF37', color: '#fff' }}
            whileHover={{ scale: 1.05, backgroundColor: '#c5a028' }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('buy').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Add to Cart
          </motion.a>
        </motion.div>
      </section>
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
