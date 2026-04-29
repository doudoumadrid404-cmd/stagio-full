import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, Search, User, FileText, Briefcase, 
  PlusCircle, Users, CheckSquare, FileCheck, 
  LogOut 
} from 'lucide-react';
import logo from '../assets/logo.jpg';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const studentLinks = [
    { to: '/student', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/student/offers', icon: <Search size={20} />, label: 'Search Offers' },
    { to: '/student/profile', icon: <User size={20} />, label: 'Profile & CV' },
    { to: '/student/applications', icon: <FileText size={20} />, label: 'Applications' },
  ];

  const companyLinks = [
    { to: '/company', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/company/offers', icon: <Briefcase size={20} />, label: 'Manage Offers' },
    { to: '/company/applications', icon: <FileCheck size={20} />, label: 'Review Applications' },
  ];

  const adminLinks = [
    { to: '/admin', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/admin/validations', icon: <CheckSquare size={20} />, label: 'Review Applications' },
    { to: '/admin/conventions', icon: <FileText size={20} />, label: 'Conventions' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'User Management' },
  ];

  const links = user.role === 'student' ? studentLinks : 
                user.role === 'company' ? companyLinks : adminLinks;

  return (
    <div style={{
      width: '260px',
      height: '100vh',
      background: 'var(--bg-card)',
      borderRight: '1px solid var(--border-color)',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '90px', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: 'var(--radius-sm)' }} />
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '0.5rem',
              fontWeight: '600',
              fontSize: '0.9rem',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              background: isActive ? 'var(--primary-light)' : 'transparent',
              transition: 'var(--transition)'
            })}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            background: 'var(--primary-light)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--primary)',
            fontWeight: 'bold'
          }}>
            {user.fullname?.charAt(0)}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontWeight: '600', fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user.fullname}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="btn"
          style={{ 
            width: '100%', 
            justifyContent: 'flex-start', 
            color: 'var(--danger)', 
            background: 'transparent',
            padding: '0.75rem 1rem'
          }}
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
