import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { ShieldCheck, Users, FileText, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ companies: 0, students: 0, validations: 0, conventions: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [appRes, agRes, offRes, usersRes] = await Promise.all([
                    api.get('/applications'),
                    api.get('/agreements'),
                    api.get('/offres'),
                    api.get('/auth/users')
                ]);
                
                const users = usersRes.data || [];

                // Real counts
                setStats({
                    validations: appRes.data.filter(a => a.status === 'company_accepted').length,
                    conventions: agRes.data.length,
                    students: users.filter(u => u.role === 'student').length,
                    companies: users.filter(u => u.role === 'company').length
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

    if (loading) return <div style={{ padding: '2rem' }}>Loading Admin Central...</div>;

    return (
        <div className="animate-fade-in">
            <h1 style={{ marginBottom: '2rem' }}>Administration Dashboard</h1>
            
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
                <StatCard title="Pending Validations" value={stats.validations} icon={ShieldCheck} color="#2563eb" />
                <StatCard title="Active Conventions" value={stats.conventions} icon={FileText} color="#7c3aed" />
                <StatCard title="Total Students" value={stats.students} icon={Users} color="#059669" />
                <StatCard title="Total Companies" value={stats.companies} icon={CheckCircle} color="#f59e0b" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ background: '#f1f5f9', border: '1px solid var(--border-color)' }}>
                    <h3>Final Approval Queue</h3>
                    <p style={{ margin: '1rem 0 1.5rem', color: 'var(--text-muted)' }}>Validate applications that have been pre-approved by companies.</p>
                    <Link to="/admin/validations" className="btn btn-primary">Review Queue ({stats.validations})</Link>
                </div>
                <div className="card" style={{ background: '#f8fafc', border: '1px solid var(--border-color)' }}>
                    <h3>Convention Management</h3>
                    <p style={{ margin: '1rem 0 1.5rem', color: 'var(--text-muted)' }}>Generate or validate legal internship agreements.</p>
                    <Link to="/admin/conventions" className="btn btn-primary">Manage Documents</Link>
                </div>
            </div>
        </div>
    );
};
export default AdminDashboard;
