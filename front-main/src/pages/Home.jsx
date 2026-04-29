import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import Footer from '../components/Footer';
import { Briefcase, Building, CheckCircle, GraduationCap, ChevronRight, Star, Search, FileText } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicNavbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section className="section-padding hero-gradient" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                background: 'var(--primary-light)', 
                color: 'var(--primary)', 
                padding: '0.5rem 1rem', 
                borderRadius: '999px',
                fontWeight: '600',
                fontSize: '0.875rem',
                marginBottom: '2rem'
              }}>
                <Star size={16} fill="currentColor" /> The Premium Platform for Career Starters
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Launch Your Career with the <span className="text-gradient">Perfect Internship</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                Connect directly with top companies, track your applications in real-time, and secure the internship that will kickstart your future.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/register" className="btn btn-lg btn-primary animate-scale delay-100">
                  <GraduationCap size={22} /> I'm a Student
                </Link>
                <Link to="/register" className="btn btn-lg btn-outline glass animate-scale delay-200">
                  <Building size={22} /> I'm a Company
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative floating elements */}
          <div className="animate-float" style={{ position: 'absolute', top: '15%', left: '10%', background: 'white', padding: '1rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: '#10b98115', color: '#10b981', padding: '0.5rem', borderRadius: '50%' }}>
                <CheckCircle size={24} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Application Status</p>
                <p style={{ fontWeight: 'bold' }}>Accepted!</p>
              </div>
            </div>
          </div>
          
        </section>

        {/* Features Section */}
        <section className="section-padding" style={{ background: 'white' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>Why Choose Stagio?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                We provide a professional, seamless experience for both students seeking opportunities and companies seeking talent.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="card-premium">
                <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '64px', height: '64px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Search size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Smart Search Filters</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Easily find exactly what you're looking for with our advanced filtering by location, duration, and type (Remote/On-site).</p>
              </div>

              <div className="card-premium">
                <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '64px', height: '64px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <FileText size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Digital CV Profiles</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Create a standout digital profile. Upload your CV and let your skills shine to recruiters before they even interview you.</p>
              </div>

              <div className="card-premium">
                <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: '64px', height: '64px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Briefcase size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Centralized Tracking</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Keep track of every application status in real-time. Know exactly where you stand with every company you apply to.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding" style={{ padding: '6rem 0' }}>
          <div className="container">
            <div style={{ 
              background: 'var(--gradient-dark)', 
              borderRadius: 'var(--radius-xl)', 
              padding: '4rem', 
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Ready to shape the future?</h2>
                <p style={{ fontSize: '1.125rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                  Join thousands of students and leading companies building the next generation of professional talent together.
                </p>
                <Link to="/register" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: '700' }}>
                  Get Started Today <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
