import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../api/axios';
import ProfileDossier from '../../components/ProfileDossier';
import { Check, X, Eye, Download, FileText, AlertCircle } from 'lucide-react';

const CompanyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [agreements, setAgreements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [appRes, agRes] = await Promise.all([
                api.get('/applications'),
                api.get('/agreements')
            ]);
            setApplications(appRes.data);
            setAgreements(agRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/applications/${id}/status`, { status });
            alert(`Application ${status === 'company_accepted' ? 'accepted' : 'rejected'}!`);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update status');
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

    const handleDownload = async (appId) => {
        const ag = agreements.find(a => a.application?._id === appId);
        if (!ag || !ag.validated) {
            alert('Convention not ready or not yet validated by administration.');
            return;
        }
        try {
            const response = await api.get(`/agreements/${ag._id}/download`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `convention_${ag._id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert('Download failed.');
        }
    };

    return (
        <Layout>
            <div className="animate-fade-in">
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Incoming Applications</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Review students applying for your internship offers</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Loading applications...</div>
                ) : applications.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>No applications received yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {applications.map((app) => {
                            const agreement = agreements.find(a => a.application?._id === app._id);
                            return (
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
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                                                Applied for: <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{app.offre?.title}</span>
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ 
                                                    padding: '0.2rem 0.6rem', 
                                                    borderRadius: '12px', 
                                                    background: 'var(--bg-main)', 
                                                    fontSize: '0.7rem', 
                                                    fontWeight: '700', 
                                                    textTransform: 'uppercase', 
                                                    color: app.status === 'pending' ? 'var(--warning)' : app.status === 'rejected' ? 'var(--danger)' : 'var(--success)' 
                                                }}>
                                                    {app.status}
                                                </div>
                                                {agreement?.validated && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--success)', fontSize: '0.7rem', fontWeight: '800' }}>
                                                        <FileText size={12} /> CONVENTION READY
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <button className="btn" style={{ border: '1px solid var(--border-color)' }} onClick={() => viewStudentProfile(app.student?._id)}>
                                            <Eye size={16} /> Profile
                                        </button>
                                        
                                        {app.status === 'pending' && (
                                            <>
                                                <button className="btn" style={{ background: '#dcfce7', color: '#166534' }} onClick={() => handleStatusUpdate(app._id, 'company_accepted')}>
                                                    <Check size={18} /> Accept
                                                </button>
                                                <button className="btn" style={{ background: '#fef2f2', color: '#991b1b' }} onClick={() => handleStatusUpdate(app._id, 'rejected')}>
                                                    <X size={18} /> Reject
                                                </button>
                                            </>
                                        )}

                                        {agreement?.validated && (
                                            <button className="btn btn-primary" onClick={() => handleDownload(app._id)}>
                                                <Download size={18} /> Download Convention
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Profile Modal */}
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

export default CompanyApplications;
