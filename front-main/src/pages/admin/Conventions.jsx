import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../api/axios';
import { FilePlus, FileCheck, Download, Calendar, User, Briefcase, Plus, Check } from 'lucide-react';

const Conventions = () => {
    const [agreements, setAgreements] = useState([]);
    const [acceptedApps, setAcceptedApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        applicationId: '',
        startDate: '',
        endDate: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [agRes, appRes] = await Promise.all([
                api.get('/agreements'),
                api.get('/applications')
            ]);
            setAgreements(agRes.data);
            // Only applications with status 'accepted' can have an agreement
            setAcceptedApps(appRes.data.filter(app => app.status === 'accepted'));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateAgreement = async (e) => {
        e.preventDefault();
        try {
            await api.post('/agreements', formData);
            alert('Agreement created successfully!');
            setShowCreateForm(false);
            setFormData({ applicationId: '', startDate: '', endDate: '' });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create agreement');
        }
    };
    const handleValidate = async (id) => {
        try {
            await api.put(`/agreements/${id}/validate`);
            alert('Agreement validated by Administration!');
            fetchData();
        } catch (error) {
            alert('Validation failed');
        }
    };

    const handleDownload = async (id) => {
        try {
            const response = await api.get(`/agreements/${id}/download`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `convention_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            alert('Download failed. Ensure the agreement is validated.');
        }
    };

    return (
        <Layout>
            <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Internship Conventions</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Issue and validate legal internship agreements</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
                        <FilePlus size={18} /> New Convention
                    </button>
                </div>

                {showCreateForm && (
                    <div className="card" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Generate New Convention</h2>
                        <form onSubmit={handleCreateAgreement}>
                            <div className="form-group">
                                <label className="form-label">Select Accepted Application</label>
                                <select 
                                    className="form-input" 
                                    value={formData.applicationId}
                                    onChange={(e) => setFormData({...formData, applicationId: e.target.value})}
                                    required
                                >
                                    <option value="">-- Choose Student & Offer --</option>
                                    {acceptedApps.map(app => (
                                        <option key={app._id} value={app._id}>
                                            {app.student?.fullname} - {app.offre?.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Start Date</label>
                                    <input 
                                        type="date" 
                                        className="form-input" 
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">End Date</label>
                                    <input 
                                        type="date" 
                                        className="form-input" 
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Generate</button>
                                <button type="button" className="btn" style={{ flex: 1, border: '1px solid var(--border-color)' }} onClick={() => setShowCreateForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                )}

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading conventions...</div>
                    ) : agreements.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            No conventions have been issued yet.
                        </div>
                    ) : (
                        agreements.map((ag) => (
                            <div key={ag._id} className="card" style={{ maxWidth: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ 
                                        width: '48px', 
                                        height: '48px', 
                                        borderRadius: 'var(--radius-md)', 
                                        background: ag.validated ? '#dcfce7' : 'var(--primary-light)', 
                                        color: ag.validated ? '#166534' : 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {ag.validated ? <FileCheck size={24} /> : <FilePlus size={24} />}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                                            Agreement for {ag.application?.student?.fullname}
                                        </h3>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                            {ag.application?.offre?.title} @ {ag.application?.offre?.company?.fullname}
                                        </p>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> {new Date(ag.startDate).toLocaleDateString()} - {new Date(ag.endDate).toLocaleDateString()}</span>
                                            {ag.validated && <span style={{ color: 'var(--success)', fontWeight: '700' }}>✓ VALIDATED</span>}
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    {!ag.validated && (
                                        <button className="btn" style={{ background: '#dcfce7', color: '#166534' }} onClick={() => handleValidate(ag._id)}>
                                            <Check size={18} /> Validate
                                        </button>
                                    )}
                                    <button className="btn btn-primary" onClick={() => handleDownload(ag._id)} disabled={!ag.validated}>
                                        <Download size={18} /> Download PDF
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Conventions;
