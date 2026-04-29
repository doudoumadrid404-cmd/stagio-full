import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../api/axios';
import ProfileDossier from '../../components/ProfileDossier';
import { Check, X, Eye, ShieldCheck } from 'lucide-react';

const Validations = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await api.get('/applications');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleFinalAccept = async (id) => {
        try {
            await api.put(`/applications/${id}/status`, { status: 'accepted' });
            alert('Application finalized and accepted!');
            fetchApplications();
        } catch (error) {
            alert(error.response?.data?.message || 'Validation failed');
        }
    };

    const viewStudentProfile = async (studentId) => {
        try {
            const response = await api.post('/students/view', { id: studentId });
            setSelectedStudent(response.data);
            setShowModal(true);
        } catch (error) {
            alert('Failed to fetch student profile');
        }
    };

    return (
        <Layout>
            <div className="animate-fade-in">
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Global Application Validations</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Final administrative approval for internship applications</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Loading application list...</div>
                ) : applications.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>No applications found in the system.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {applications.filter(app => app.status !== 'pending' && app.status !== 'rejected').map((app) => (
                            <div key={app._id} className="card" style={{ maxWidth: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ 
                                        width: '48px', 
                                        height: '48px', 
                                        borderRadius: '50%', 
                                        background: 'var(--primary-light)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--primary)',
                                        fontWeight: '700'
                                    }}>
                                        {app.student?.fullname?.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.2rem' }}>{app.student?.fullname}</h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            {app.student?.university} • <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{app.offre?.title}</span>
                                        </p>
                                        <div style={{ 
                                            padding: '0.2rem 0.6rem', 
                                            borderRadius: '12px', 
                                            background: app.status === 'accepted' ? '#dcfce7' : '#eff6ff', 
                                            color: app.status === 'accepted' ? '#166534' : '#2563eb',
                                            fontSize: '0.7rem',
                                            fontWeight: '700',
                                            width: 'fit-content',
                                            marginTop: '0.5rem',
                                            textTransform: 'uppercase'
                                        }}>
                                            {app.status === 'company_accepted' ? 'Company Approved' : app.status}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button className="btn" style={{ border: '1px solid var(--border-color)' }} onClick={() => viewStudentProfile(app.student?._id)}>
                                        <Eye size={16} /> View Student Dossier
                                    </button>
                                    
                                    {app.status === 'company_accepted' && (
                                        <button className="btn btn-primary" onClick={() => handleFinalAccept(app._id)}>
                                            <ShieldCheck size={18} /> Final Validation
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Student Profile Modal */}
                {showModal && selectedStudent && (
                    <div style={{ 
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                        background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', zIndex: 1000, padding: '2rem' 
                    }}>
                        <div className="card animate-fade-in" style={{ maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '3rem', position: 'relative' }}>
                            <button 
                                onClick={() => setShowModal(false)} 
                                style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'var(--bg-main)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                <X size={24} />
                            </button>
                            <ProfileDossier student={selectedStudent} />
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Validations;
