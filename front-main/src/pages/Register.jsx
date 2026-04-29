import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, School, MapPin, Building, Info, AlertCircle, Calendar } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    university: '',
    wilaya: '',
    description: '',
    location: '',
    logo: '',
    birthDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Filter data based on role
      const payload = {
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
        role: role
      };

      if (role === 'student') {
        payload.university = formData.university;
        payload.wilaya = formData.wilaya;
        payload.birthDate = formData.birthDate;
      } else if (role === 'company') {
        payload.description = formData.description;
        payload.location = formData.location;
        payload.logo = formData.logo;
      }

      const user = await register(payload);
      if (user.role === 'student') navigate('/student');
      else if (user.role === 'company') navigate('/company');
      else if (user.role === 'administration') navigate('/admin');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{ padding: '4rem 2rem' }}>
      <div className="card animate-fade-in" style={{ maxWidth: '550px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            background: 'var(--primary-light)', 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <UserPlus size={32} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-muted)' }}>Join our internship management platform</p>
        </div>

        {error && (
          <div style={{ 
            background: '#fef2f2', 
            color: 'var(--danger)', 
            padding: '0.75rem', 
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}>
            <AlertCircle size={18} />
            {typeof error === 'string' ? error : (error.response?.data?.message || 'Registration failed')}
          </div>
        )}

        {/* Role Selector */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '0.5rem', 
          marginBottom: '2rem',
          background: 'var(--bg-main)',
          padding: '0.4rem',
          borderRadius: 'var(--radius-md)'
        }}>
          {['student', 'company', 'administration'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                background: role === r ? 'var(--bg-card)' : 'transparent',
                color: role === r ? 'var(--primary)' : 'var(--text-muted)',
                boxShadow: role === r ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              {r === 'administration' ? 'Admin' : r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  name="fullname"
                  className="form-input" 
                  placeholder="John Doe"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  name="email"
                  type="email" 
                  className="form-input" 
                  placeholder="name@example.dz"
                  style={{ paddingLeft: '2.5rem' }}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                name="password"
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Role Specific Fields */}
          {role === 'student' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">University</label>
                <div style={{ position: 'relative' }}>
                  <School size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    name="university"
                    className="form-input" 
                    placeholder="University of..."
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.university}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Wilaya</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    name="wilaya"
                    className="form-input" 
                    placeholder="e.g. Algiers"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.wilaya}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Birth Date</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    name="birthDate"
                    type="date"
                    className="form-input" 
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {role === 'company' && (
            <>
              <div className="form-group">
                <label className="form-label">Company Description</label>
                <div style={{ position: 'relative' }}>
                  <Info size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                  <textarea 
                    name="description"
                    className="form-input" 
                    placeholder="Tell us about your company..."
                    style={{ paddingLeft: '2.5rem', minHeight: '80px', resize: 'vertical' }}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <div style={{ position: 'relative' }}>
                  <Building size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    name="location"
                    className="form-input" 
                    placeholder="Main HQ Address"
                    style={{ paddingLeft: '2.5rem' }}
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
