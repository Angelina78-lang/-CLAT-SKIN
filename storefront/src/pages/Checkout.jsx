import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { ChevronRight, Lock, CreditCard, Ship, User, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [saveAddress, setSaveAddress] = useState(true);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    pinCode: '',
    phone: ''
  });

  const subtotal = getSubtotal();
  const shipping = step > 1 ? 15 : 0;
  const total = subtotal + shipping;

  const trans = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] };

  // Load saved address
  React.useEffect(() => {
    const saved = localStorage.getItem('eclat_saved_address');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved address', e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const proceedToShipping = () => {
    if (saveAddress) {
      localStorage.setItem('eclat_saved_address', JSON.stringify(formData));
    }
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleOrder = () => {
    setStep(4);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (cart.length === 0 && step < 4) {
    return (
      <div style={{ padding: '150px 40px', textAlign: 'center', backgroundColor: '#fffef2', minHeight: '80vh' }}>
        <h2 className="text-heading">Your bag is empty.</h2>
        <p style={{ marginTop: '20px', marginBottom: '40px' }}>Add some formulations to start your journey.</p>
        <button className="btn btn-primary" onClick={() => navigate('/#catalog')}>Return to Catalog</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fffef2', display: 'flex', flexWrap: 'wrap' }}>
      {/* LEFT: Checkout Forms */}
      <div style={{ flex: '1 1 600px', padding: '120px 80px 80px', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '500px', margin: '0 0' }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', gap: '10px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '60px', opacity: 0.6 }}>
            <span style={{ color: step >= 1 ? '#0f172a' : 'inherit', fontWeight: step === 1 ? '700' : 'normal', cursor: 'pointer' }} onClick={() => step > 1 && setStep(1)}>Information</span>
            <ChevronRight size={12} />
            <span style={{ color: step >= 2 ? '#0f172a' : 'inherit', fontWeight: step === 2 ? '700' : 'normal', cursor: 'pointer' }} onClick={() => step > 2 && setStep(2)}>Shipping</span>
            <ChevronRight size={12} />
            <span style={{ color: step >= 3 ? '#0f172a' : 'inherit', fontWeight: step === 3 ? '700' : 'normal', cursor: 'pointer' }} onClick={() => step > 3 && setStep(3)}>Payment</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={trans}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginBottom: '40px' }}>Contact Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email address" className="checkout-input" />
                  
                  <h3 style={{ fontSize: '16px', marginTop: '10px', fontWeight: 500 }}>Shipping Address</h3>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <input name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="First name" className="checkout-input" style={{ flex: 1 }} />
                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Last name" className="checkout-input" style={{ flex: 1 }} />
                  </div>
                  <input name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="Address" className="checkout-input" />
                  <input name="apartment" value={formData.apartment} onChange={handleInputChange} type="text" placeholder="Apartment, suite, etc. (optional)" className="checkout-input" />
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <input name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="City" className="checkout-input" style={{ flex: 1 }} />
                    <input name="pinCode" value={formData.pinCode} onChange={handleInputChange} type="text" placeholder="PIN code" className="checkout-input" style={{ flex: 1 }} />
                  </div>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone number (for delivery updates)" className="checkout-input" />
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <input type="checkbox" id="save-address" checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    <label htmlFor="save-address" style={{ fontSize: '14px', cursor: 'pointer' }}>Save this information for next time</label>
                  </div>
                </div>
                <button className="btn btn-primary btn-full" style={{ marginTop: '40px', padding: '20px' }} onClick={proceedToShipping}>
                  Continue to Shipping
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="ship" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={trans}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginBottom: '40px' }}>Shipping Method</h2>
                <div style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '18px', height: '18px', border: '5px solid #0f172a', borderRadius: '50%' }}></div>
                    <div>
                      <p style={{ fontWeight: 500 }}>Standard Shipping</p>
                      <p style={{ fontSize: '13px', color: '#64748b' }}>4-7 business days</p>
                    </div>
                  </div>
                  <span style={{ fontWeight: 500 }}>$15.00</span>
                </div>
                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }} onClick={() => setStep(1)}>Return to info</button>
                  <button className="btn btn-primary" style={{ padding: '20px 40px' }} onClick={() => setStep(3)}>Continue to Payment</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="pay" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={trans}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', marginBottom: '40px' }}>Payment</h2>
                <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderBottom: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 500 }}>Credit Card</span>
                    <CreditCard size={20} />
                  </div>
                  <div style={{ padding: '30px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input type="text" placeholder="Card number" className="checkout-input" />
                    <input type="text" placeholder="Name on card" className="checkout-input" />
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <input type="text" placeholder="Expiration (MM / YY)" className="checkout-input" style={{ flex: 1 }} />
                      <input type="text" placeholder="Security code" className="checkout-input" style={{ flex: 1 }} />
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary btn-full" style={{ marginTop: '40px', padding: '24px' }} onClick={handleOrder}>
                  <Lock size={16} style={{ marginRight: '10px' }} /> Complete Order — ${total.toFixed(2)}
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={trans} style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ color: '#059669', marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle size={80} strokeWidth={1} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', marginBottom: '20px' }}>Order Confirmed</h2>
                <p style={{ color: '#64748b', fontSize: '18px', marginBottom: '40px' }}>Thank you for choosing Éclat Skin. Your journey to radiant skin has begun.</p>
                <div style={{ backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)', padding: '30px', textAlign: 'left', marginBottom: '40px' }}>
                  <p style={{ fontSize: '14px', marginBottom: '10px' }}>Confirmation #: <strong>ECLAT-{Math.floor(Math.random() * 900000) + 100000}</strong></p>
                  <p style={{ fontSize: '14px' }}>A confirmation email has been sent to your inbox.</p>
                </div>
                <button className="btn btn-primary btn-full" onClick={() => navigate('/')}>Continue Shopping</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT: Order Summary */}
      <div style={{ flex: '1 1 400px', backgroundColor: '#f1f1e6', padding: '120px 60px 80px' }}>
        <div style={{ maxWidth: '400px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', marginBottom: '40px' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <img src={item.image} style={{ width: '64px', height: '64px', objectFit: 'contain', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.05)' }} />
                  <span style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: '#0f172a', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, fontSize: '14px' }}>{item.title}</p>
                  <p style={{ fontSize: '12px', opacity: 0.6 }}>{item.variant}</p>
                </div>
                <span style={{ fontWeight: 500, fontSize: '14px' }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '14px' }}>
              <span style={{ opacity: 0.6 }}>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '14px' }}>
              <span style={{ opacity: 0.6 }}>Shipping</span>
              <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Calculated at next step'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontFamily: 'var(--font-heading)', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-input {
          width: 100%;
          padding: 15px;
          border: 1px solid rgba(0,0,0,0.1);
          background-color: #fff;
          font-family: var(--font-body);
          font-size: 14px;
          transition: border-color 0.2s;
        }
        .checkout-input:focus {
          outline: none;
          border-color: #0f172a;
        }
      `}</style>
    </div>
  );
}
