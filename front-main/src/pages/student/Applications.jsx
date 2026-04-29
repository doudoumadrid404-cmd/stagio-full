import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../api/axios';
import { FileText, Download, Clock, CheckCircle, XCircle } from 'lucide-react';

const StudentApplications = () => {
    const [applications, setApplications] = useState([]);
    const [agreements, setAgreements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [appRes, agRes] = await Promise.all([
                api.get('/applications/my'),
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

    const handleDownload = async (appId) => {
        const ag = agreements.find(a => a.application?._id === appId);
        if (!ag || !ag.validated) {
            alert('Your convention is not yet ready or validated by the administration.');
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
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>My Applications</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track the progress of your internship requests</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Loading your applications...</div>
                ) : applications.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>You haven't applied to any internships yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                        {applications.map((app) => {
                            const agreement = agreements.find(a => a.application?._id === app._id);
                            return (
                                <div key={app._id} className="card" style={{ maxWidth: 'none', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ 
                                            width: '56px', 
                                            height: '56px', 
                                            borderRadius: 'var(--radius-md)', 
                                            background: 'var(--primary-light)', 
                                            color: 'var(--primary)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <FileText size={28} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.25rem' }}>{app.offre?.title}</h3>
                                            <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                                {app.offre?.company?.fullname || 'Company'}
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ 
                                                    display: 'flex', alignItems: 'center', gap: '0.3rem', 
                                                    padding: '0.25rem 0.75rem', borderRadius: '20px', 
                                                    fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase',
                                                    background: app.status === 'pending' ? '#eff6ff' : app.status === 'rejected' ? '#fef2f2' : '#dcfce7',
                                                    color: app.status === 'pending' ? '#2563eb' : app.status === 'rejected' ? '#991b1b' : '#166534'
                                                }}>
                                                    {app.status === 'pending' ? <Clock size={14} /> : app.status === 'rejected' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                                                    {app.status === 'company_accepted' ? 'Company Approved' : app.status}
                                                </div>
                                                {agreement?.validated && (
                                                    <span style={{ color: 'var(--success)', fontSize: '0.75rem', fontWeight: '800' }}>✓ CONVENTION SIGNED</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        {agreement?.validated ? (
                                            <button className="btn btn-primary" onClick={() => handleDownload(app._id)}>
                                                <Download size={18} /> Download Convention
                                            </button>
                                        ) : (
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                                                {app.status === 'accepted' ? 'Awaiting Convention...' : 'Review in progress'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default StudentApplications;
