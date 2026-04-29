import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Search, FileText, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
    const [stats, setStats] = useState({ offers: 0, applications: 0, accepted: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [offRes, appRes] = await Promise.all([
                    api.get('/offres'),
                    api.get('/applications/my')
                ]);
                setStats({
                    offers: offRes.data.length,
                    applications: appRes.data.length,
                    accepted: appRes.data.filter(a => a.status === 'accepted').length
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="card" style={{ padding: '1.5rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '600' }}>{title}</p>
                    <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{value}</h2>
                </div>
                <div style={{ padding: '1rem', background: `${color}15`, color: color, borderRadius: 'var(--radius-md)' }}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );

    if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

    return (
        <div className="animate-fade-in">
            <h1 style={{ marginBottom: '2rem' }}>Welcome to STAGIO</h1>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard title="Available Offers" value={stats.offers} icon={Search} color="#2563eb" />
                <StatCard title="My Applications" value={stats.applications} icon={FileText} color="#7c3aed" />
                <StatCard title="Final Accepted" value={stats.accepted} icon={CheckCircle} color="#059669" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ padding: '2rem', textAlign: 'left' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Next Steps</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>1</div>
                            <p>Complete your <strong>Digital CV</strong> to stand out.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</div>
                            <p>Search for <strong>Internship Offers</strong> matching your skills.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>3</div>
                            <p>Apply and <strong>track your status</strong> in real-time.</p>
                        </div>
                    </div>
                </div>

                <div className="card glass" style={{ padding: '2rem', background: 'var(--primary)', color: 'white' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Get Started</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.9 }}>Ready to find your dream internship? Start searching now!</p>
                    <Link to="/student/offers" className="btn" style={{ background: 'white', color: 'var(--primary)', width: '100%' }}>Browse Offers</Link>
                </div>
            </div>
        </div>
    );
};
export default StudentDashboard;
