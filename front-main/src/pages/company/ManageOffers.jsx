import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../api/axios';
import { Plus, Edit2, Trash2, Briefcase, MapPin, Users, Check, X, Monitor } from 'lucide-react';

const ManageOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        wilaya: '',
        internshipType: 'on-site',
        category: 'classic',
        slots: 1
    });

    const fetchOffers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/offres');
            const user = JSON.parse(localStorage.getItem('user'));
            setOffers(response.data.filter(o => o.company?._id === user._id));
        } catch (error) {
            console.error('Error fetching offers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const payload = { ...formData, company: user._id };
            
            if (editingId) {
                await api.put(`/offres/${editingId}`, payload);
                alert('Offer updated successfully!');
            } else {
                await api.post('/offres', payload);
                alert('Offer created successfully!');
            }
            setShowForm(false);
            setEditingId(null);
            setFormData({ title: '', description: '', wilaya: '', internshipType: 'on-site', category: 'classic', slots: 1 });
            fetchOffers();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to save offer');
        }
    };

    const handleEdit = (offer) => {
        setFormData({
            title: offer.title,
            description: offer.description,
            wilaya: offer.wilaya,
            internshipType: offer.internshipType || 'on-site',
            category: offer.category || 'classic',
            slots: offer.slots || 1
        });
        setEditingId(offer._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this offer?')) {
            try {
                await api.delete(`/offres/${id}`);
                fetchOffers();
            } catch (error) {
                alert('Failed to delete offer');
            }
        }
    };

    return (
        <Layout>
            <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Manage Internship Offers</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Create and manage opportunities for students</p>
                    </div>
                    {!showForm && (
                        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                            <Plus size={18} /> Add New Offer
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="card" style={{ maxWidth: '800px', margin: '0 auto 2rem', padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Internship Offer' : 'Create New Offer'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Position Title</label>
                                <input 
                                    className="form-input" 
                                    required 
                                    placeholder="e.g. Full Stack Developer"
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location (Wilaya)</label>
                                <input 
                                    className="form-input" 
                                    required 
                                    placeholder="e.g. Algiers"
                                    value={formData.wilaya} 
                                    onChange={(e) => setFormData({...formData, wilaya: e.target.value})} 
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Modality</label>
                                    <select 
                                        className="form-input" 
                                        value={formData.internshipType} 
                                        onChange={(e) => setFormData({...formData, internshipType: e.target.value})}
                                    >
                                        <option value="on-site">On-Site</option>
                                        <option value="remote">Remote</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select 
                                        className="form-input" 
                                        value={formData.category} 
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    >
                                        <option value="classic">Classic</option>
                                        <option value="pfe">PFE</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Slots</label>
                                    <input 
                                        type="number" 
                                        className="form-input" 
                                        min="1" 
                                        value={formData.slots} 
                                        onChange={(e) => setFormData({...formData, slots: parseInt(e.target.value)})} 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Detailed Description</label>
                                <textarea 
                                    className="form-input" 
                                    style={{ height: '150px' }} 
                                    required
                                    value={formData.description} 
                                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                    <Check size={18} /> {editingId ? 'Update Offer' : 'Publish Offer'}
                                </button>
                                <button type="button" className="btn" style={{ flex: 1 }} onClick={() => { setShowForm(false); setEditingId(null); }}>
                                    <X size={18} /> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Loading offers...</div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                        {offers.map((offer) => (
                            <div key={offer._id} className="card" style={{ maxWidth: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Briefcase size={24} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.2rem' }}>{offer.title}</h3>
                                        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {offer.wilaya}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Monitor size={14} /> {offer.internshipType?.toUpperCase()}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={14} /> {offer.slots} Slots</span>
                                            <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>{offer.category?.toUpperCase()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button className="btn" style={{ background: 'var(--bg-main)' }} onClick={() => handleEdit(offer)}>
                                        <Edit2 size={16} /> Edit
                                    </button>
                                    <button className="btn" style={{ color: 'var(--danger)', background: '#fef2f2' }} onClick={() => handleDelete(offer._id)}>
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ManageOffers;
