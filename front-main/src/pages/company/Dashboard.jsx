import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Briefcase, Users, FileCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyDashboard = () => {
    const [stats, setStats] = useState({ offers: 0, applicants: 0, accepted: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [offRes, appRes] = await Promise.all([
                    api.get('/offres'),
                    api.get('/applications')
                ]);
                const user = JSON.parse(localStorage.getItem('user'));
                const myOffers = offRes.data.filter(o => o.company?._id === user._id);
                const myOfferIds = myOffers.map(o => o._id);
                const myApps = appRes.data.filter(a => myOfferIds.includes(a.offre?._id));

                setStats({
                    offers: myOffers.length,
                    applicants: myApps.length,
                    accepted: myApps.filter(a => a.status === 'company_accepted' || a.status === 'accepted').length
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
            <h1 style={{ marginBottom: '2rem' }}>Company Overview</h1>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard title="Active Offers" value={stats.offers} icon={Briefcase} color="#2563eb" />
                <StatCard title="Total Applicants" value={stats.applicants} icon={Users} color="#7c3aed" />
                <StatCard title="Pre-Approved" value={stats.accepted} icon={FileCheck} color="#059669" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card glass" style={{ background: 'var(--primary)', color: 'white' }}>
                    <h3>Post a Challenge</h3>
                    <p style={{ margin: '1rem 0 1.5rem', opacity: 0.9 }}>Looking for fresh talent? Post a new internship offer today.</p>
                    <Link to="/company/offers" className="btn" style={{ background: 'white', color: 'var(--primary)' }}>Create Offer</Link>
                </div>
                <div className="card" style={{ border: '1px solid var(--primary-light)' }}>
                    <h3>Review Applications</h3>
                    <p style={{ margin: '1rem 0 1.5rem', color: 'var(--text-muted)' }}>You have {stats.applicants} students waiting for your feedback.</p>
                    <Link to="/company/applications" className="btn btn-primary">Go to Applications</Link>
                </div>
            </div>
        </div>
    );
};
export default CompanyDashboard;
