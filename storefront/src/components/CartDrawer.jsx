import React from 'react';
import { X, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQty, getSubtotal } = useCart();
  const navigate = useNavigate();

  const closeCart = () => setIsCartOpen(false);
  const subtotal = getSubtotal();
  const awayFromFree = Math.max(0, 150 - subtotal);
  const progressPercent = Math.min(100, (subtotal / 150) * 100);

  return (
    <>
      {/* Backdrop */}
      <div className={`drawer-backdrop ${isCartOpen ? 'open' : ''}`} onClick={closeCart}></div>
      
      {/* Drawer */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2 className="heading-md">Your Cart</h2>
          <button className="close-btn" onClick={closeCart}>
            <X size={24} />
          </button>
        </div>
        
        <div className="drawer-body">
          {/* Free Shipping Progress bar */}
          <div className="shipping-progress">
            {awayFromFree > 0 ? (
              <p className="shipping-text">You are <strong>${awayFromFree.toFixed(2)}</strong> away from complimentary shipping.</p>
            ) : (
              <p className="shipping-text">You have unlocked <strong>complimentary shipping</strong>.</p>
            )}
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
          
          {/* Cart Items */}
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '15px' }}>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} className="item-img" />
                <div className="item-details">
                  <h4 className="item-title">{item.title}</h4>
                  <p className="item-variant">{item.variant}</p>
                  <div className="item-controls">
                    <div className="qty-selector">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <span className="item-price">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <div className="drawer-total">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="taxes-text">Taxes and shipping calculated at checkout.</p>
          <button 
            className="checkout-btn" 
            disabled={cart.length === 0} 
            style={{ opacity: cart.length === 0 ? 0.5 : 1 }}
            onClick={() => {
              setIsCartOpen(false);
              navigate('/checkout');
            }}
          >
            <Lock size={16} style={{marginRight: '8px'}} /> Checkout
          </button>
          
          <div className="trust-badges-drawer">
            <span>30-Day Guarantee</span>
            <span>•</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
      
      <style>{`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 9998;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          backdrop-filter: blur(2px);
        }
        .drawer-backdrop.open {
          opacity: 1;
          pointer-events: all;
        }

        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 480px;
          height: 100vh;
          background: #fffef2; /* Solid Aesop Off-white */
          z-index: 9999;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 60px rgba(0,0,0,0.15);
          color: #0f172a;
        }
        .cart-drawer.open {
          transform: translateX(0);
        }

        .drawer-header {
          padding: 30px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .drawer-header h2 {
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 400;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #0f172a;
          padding: 8px;
          transition: opacity 0.2s;
        }
        .close-btn:hover { opacity: 0.6; }

        .drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 40px;
          display: flex;
          flex-direction: column;
        }

        .shipping-progress {
          background: #f1f5f9;
          padding: 20px;
          margin-bottom: 40px;
          text-align: center;
        }

        .shipping-text {
          font-size: 14px;
          margin-bottom: 12px;
          color: #0f172a;
        }

        .progress-bar-bg {
          width: 100%;
          height: 2px;
          background: rgba(0,0,0,0.1);
        }

        .progress-bar-fill {
          height: 100%;
          background: #334155;
          transition: width 0.8s ease-out;
        }

        .cart-item {
          display: flex;
          gap: 25px;
          margin-bottom: 35px;
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .item-img {
          width: 80px;
          height: 100px;
          object-fit: contain;
          background: #f8fafc;
          mix-blend-mode: multiply;
        }

        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .item-title {
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 16px;
          margin-bottom: 4px;
        }

        .item-variant {
          font-size: 13px;
          color: #64748b;
          margin-bottom: auto;
        }

        .item-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
        }

        .qty-selector {
          display: flex;
          align-items: center;
          border: 1px solid rgba(0,0,0,0.1);
        }

        .qty-selector button {
          background: none;
          border: none;
          padding: 5px 12px;
          cursor: pointer;
          font-size: 16px;
        }

        .qty-selector span {
          padding: 0 10px;
          font-size: 14px;
        }

        .item-price {
          font-weight: 500;
          font-size: 15px;
        }

        .drawer-footer {
          padding: 40px;
          background: #fffef2;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.03);
          border-top: 1px solid rgba(0,0,0,0.08);
        }

        .drawer-total {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-heading);
          font-size: 20px;
          margin-bottom: 8px;
        }

        .taxes-text {
          font-size: 13px;
          color: #64748b;
          text-align: left;
          margin-bottom: 25px;
        }

        .checkout-btn {
          width: 100%;
          padding: 20px;
          background: #0f172a;
          color: #fffef2;
          border: none;
          font-size: 14px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .checkout-btn:hover { background: #1e293b; }

        .trust-badges-drawer {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
  `}</style>
    </>
  );
}
