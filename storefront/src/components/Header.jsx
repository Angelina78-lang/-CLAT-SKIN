import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const handleHomeClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleHashNav = (e, hash) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#252525', color: '#fffef2', padding: '12px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px', letterSpacing: '0.2px', zIndex: 101, position: 'relative' }}>
        Receive a generous sample of your choice with orders over $125 at checkout.
      </div>
      
      <header className={`aesop-fullbleed-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-top-row">
          <nav className="header-top-left">
            <Link to="/" className="aesop-link-light">Stores</Link>
            <Link to="/contact" className="aesop-link-light">Customer service</Link>
          </nav>

          <div className="header-logo-center">
            <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', textDecoration: 'none', color: 'inherit', letterSpacing: '1px' }}>
              ÉCLAT SKIN.
            </Link>
          </div>

          <nav className="header-top-right">
            {user ? (
              <>
                <span className="aesop-link-light" style={{ cursor: 'default' }}>Welcome, {user.name}</span>
                <a href="#" className="aesop-link-light" onClick={handleLogout}>Log out</a>
              </>
            ) : (
              <>
                <Link to="/signup" className="aesop-link-light">Email sign up</Link>
                <Link to="/login" className="aesop-link-light">Account</Link>
              </>
            )}
            <a href="#" className="aesop-link-light" onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}>Cart {totalItems > 0 ? `(${totalItems})` : ''}</a>
          </nav>
        </div>

        <div className="header-bottom-row">
          <nav className="header-bottom-nav">
            <Link to="/" className="aesop-link-light" onClick={handleHomeClick}>Home</Link>
            <Link to="/#catalog" className="aesop-link-light" onClick={(e) => handleHashNav(e, 'catalog')}>Catalog</Link>
            <Link to="/#collections" className="aesop-link-light" onClick={(e) => handleHashNav(e, 'collections')}>Collections</Link>
            <Link to="/#about" className="aesop-link-light" onClick={(e) => handleHashNav(e, 'about')}>About Us</Link>
            <Link to="/#contact" className="aesop-link-light" onClick={(e) => handleHashNav(e, 'contact')}>Contact</Link>
            <Link to="/#track" className="aesop-link-light" onClick={(e) => handleHashNav(e, 'track')}>Track Order</Link>
          </nav>
          
          <div className="header-search">
            <form onSubmit={(e) => {
              e.preventDefault();
              const q = e.target.elements.search.value;
              if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
            }} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', opacity: 0.6 }} />
                <input 
                  name="search"
                  type="text" 
                  placeholder="Search..." 
                  className="search-input"
                  style={{
                    padding: '8px 12px 8px 36px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'inherit',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    borderRadius: '4px',
                    outline: 'none',
                    width: '180px',
                    transition: 'width 0.3s, border-color 0.3s'
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      <style>{`
        .aesop-fullbleed-header {
          position: absolute;
          top: 40px; /* height of announcement bar */
          left: 0;
          width: 100%;
          z-index: 100;
          padding: 24px 40px;
          color: #fffef2;
          transition: background-color 0.4s ease, color 0.4s ease;
        }

        .aesop-fullbleed-header.scrolled {
          position: fixed;
          top: 0;
          background-color: var(--color-base);
          color: var(--color-text);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .header-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .header-top-left, .header-top-right {
          display: flex;
          gap: 20px;
          flex: 1;
        }

        .header-top-right {
          justify-content: flex-end;
        }

        .header-logo-center {
          flex: 0 0 auto;
        }

        .header-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-bottom-nav {
          display: flex;
          gap: 24px;
        }

        .aesop-link-light {
          color: inherit;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .search-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          color: inherit;
          display: flex;
          align-items: center;
          padding: 8px 16px;
          font-family: inherit;
          cursor: pointer;
          border-radius: 4px;
        }

        .aesop-fullbleed-header.scrolled .search-btn {
          border-color: rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
}
