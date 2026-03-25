import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-base)' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h1 className="text-heading" style={{ marginBottom: '40px', textAlign: 'center' }}>Establish your<br/>profile.</h1>
          
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
            
            <input 
              type="text" 
              placeholder="Full name" 
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ padding: '15px 20px', fontSize: '14px', border: '1px solid rgba(15, 23, 42, 0.2)', backgroundColor: 'transparent', outline: 'none' }}
              required 
            />

            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ padding: '15px 20px', fontSize: '14px', border: '1px solid rgba(15, 23, 42, 0.2)', backgroundColor: 'transparent', outline: 'none' }}
              required 
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ padding: '15px 20px', fontSize: '14px', border: '1px solid rgba(15, 23, 42, 0.2)', backgroundColor: 'transparent', outline: 'none' }}
              required 
            />

            <button type="submit" className="aesop-btn" style={{ justifyContent: 'center', marginTop: '10px' }}>
              Create Account <ArrowRight size={16} />
            </button>
          </form>

          <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px' }}>
            Already have an account? <a href="/login" className="aesop-link aesop-link-underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
