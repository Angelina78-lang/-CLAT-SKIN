import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Catalog from './pages/Catalog';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import Formulation from './pages/Formulation';
import Checkout from './pages/Checkout';
import Category from './pages/Category';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <Header />
        <CartDrawer />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/formulation" element={<Formulation />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category/:categoryName" element={<Category />} />
          </Routes>
        </main>

        <style>{`
          .aesop-carousel-section {
            padding: 100px 40px;
            display: flex;
            flex-direction: column;
          }

          .carousel-intro {
            max-width: 400px;
            margin-bottom: 60px;
          }

          .carousel-products {
            display: flex;
            gap: 40px;
            overflow-x: auto;
            padding-bottom: 20px;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          
          .carousel-products::-webkit-scrollbar {
            height: 4px;
            display: block;
          }

          .carousel-products::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.05);
          }

          .carousel-products::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.2);
          }

          .aesop-product {
            flex: 0 0 320px;
            max-width: 320px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            padding-bottom: 20px;
          }

          .aesop-product img {
            width: 100%;
            height: 400px;
            object-fit: contain;
            mix-blend-mode: multiply;
            margin-bottom: 20px;
          }

          @media (min-width: 1024px) {
            .aesop-carousel-section {
              flex-direction: row;
              gap: 100px;
              padding: 150px 80px;
            }
            .carousel-intro {
              flex: 0 0 320px;
              margin-bottom: 0;
            }
            .carousel-products {
              flex: 1;
            }
          }

          .aesop-feature-section {
            display: flex;
            flex-direction: column;
          }

          .feature-image {
            flex: 1.5;
          }

          .feature-image img {
            width: 100%;
            height: 100%;
            min-height: 400px;
            object-fit: cover;
          }

          .feature-text {
            flex: 1;
            padding: 60px 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          @media (min-width: 1024px) {
            .aesop-feature-section {
              flex-direction: row;
            }
            .feature-text {
              padding: 100px 80px;
            }
          }

          .aesop-footer {
            background-color: var(--color-accent);
            color: var(--color-base);
            padding: 80px 40px;
          }

          .footer-top {
            display: grid;
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .links-col {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .links-col a, .links-col p {
            color: var(--color-base);
            text-decoration: none;
            font-size: 14px;
          }

          @media (min-width: 1024px) {
            .footer-top {
              grid-template-columns: 2fr 1fr 1fr 1fr;
              gap: 40px;
            }
          }
        `}</style>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}
