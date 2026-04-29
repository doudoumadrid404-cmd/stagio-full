import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          
          <div>
            <img src={logo} alt="Stagio Logo" style={{ height: '80px', marginBottom: '1rem', borderRadius: '4px' }} />
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              The premium platform connecting talented students with top companies for outstanding internship opportunities.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--secondary)' }}>Follow our updates</a>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: '600' }}>For Students</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/student/offers" style={{ color: 'var(--text-muted)' }}>Browse Offers</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-muted)' }}>Create Profile</Link></li>
              <li><Link to="/student/applications" style={{ color: 'var(--text-muted)' }}>Track Applications</Link></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Career Advice</a></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: '600' }}>For Companies</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/company/offers" style={{ color: 'var(--text-muted)' }}>Post an Internship</Link></li>
              <li><Link to="/register" style={{ color: 'var(--text-muted)' }}>Company Registration</Link></li>
              <li><Link to="/company/applications" style={{ color: 'var(--text-muted)' }}>Review Applications</Link></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: '600' }}>Contact Us</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                <Mail size={18} style={{ color: 'var(--primary)' }} /> contact@stagio.com
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                <Phone size={18} style={{ color: 'var(--primary)' }} /> +212 500 000 000
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                <MapPin size={18} style={{ color: 'var(--primary)' }} /> Constantine, Algeria
              </li>
            </ul>
          </div>

        </div>
        
        <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <p>&copy; {new Date().getFullYear()} Stagio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
