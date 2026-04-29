import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { LogIn, UserPlus } from 'lucide-react';

const PublicNavbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 5%', 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      boxShadow: 'var(--shadow-sm)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Stagio Logo" style={{ height: '80px', width: 'auto', borderRadius: '4px' }} />
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/login" className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.6rem 1.25rem' }}>
          <LogIn size={18} /> Sign In
        </Link>
        <Link to="/register" className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem', padding: '0.6rem 1.25rem' }}>
          <UserPlus size={18} /> Create Account
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
