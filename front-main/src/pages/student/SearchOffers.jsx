import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../api/axios';
import { Search, MapPin, Briefcase, Filter, Monitor, CheckCircle } from 'lucide-react';

const SearchOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ wilaya: '', internshipType: '', category: '' });
    const [applying, setApplying] = useState(null);

    const fetchOffers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/offres', {
                params: filters
            });
            setOffers(response.data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleApply = async (offerId) => {
        setApplying(offerId);
        try {
            await api.post('/applications', { offreId: offerId });
            alert('Application submitted successfully!');
            setOffers(offers.map(o => o._id === offerId ? { ...o, alreadyApplied: true } : o));
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to apply');
        } finally {
            setApplying(null);
        }
    };

    return (
        <Layout>
            <div className="animate-fade-in">
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Find Your Next Internship</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Browse through available offers and launch your career</p>
                </div>

                {/* Filter Bar */}
                <div className="card glass" style={{ maxWidth: 'none', padding: '1.5rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div style={{ flex: 2, minWidth: '200px' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Search size={14} /> Search Wilaya
                        </label>
                        <input 
                            className="form-input" 
                            placeholder="e.g. Algiers" 
                            value={filters.wilaya}
                            onChange={(e) => setFilters({...filters, wilaya: e.target.value})}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <label className="form-label">Modality</label>
                        <select 
                            className="form-input" 
                            value={filters.internshipType}
                            onChange={(e) => setFilters({...filters, internshipType: e.target.value})}
                        >
                            <option value="">All</option>
                            <option value="on-site">On-Site</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <label className="form-label">Category</label>
                        <select 
                            className="form-input" 
                            value={filters.category}
                            onChange={(e) => setFilters({...filters, category: e.target.value})}
                        >
                            <option value="">All</option>
                            <option value="classic">Classic</option>
                            <option value="pfe">PFE</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={fetchOffers}>
                        <Filter size={18} /> Filter
                    </button>
                </div>

                {/* Offers Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Searching for offers...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {offers.length === 0 ? (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                No offers found matching your criteria.
                            </div>
                        ) : (
                            offers.map((offer) => (
                                <div key={offer._id} className="card" style={{ maxWidth: 'none', display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div style={{ 
                                            width: '48px', 
                                            height: '48px', 
                                            borderRadius: 'var(--radius-md)', 
                                            background: 'var(--primary-light)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary)'
                                        }}>
                                            <Briefcase size={24} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <div style={{ 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: '20px', 
                                                background: '#eff6ff',
                                                color: '#2563eb',
                                                fontSize: '0.7rem',
                                                fontWeight: '700',
                                                textTransform: 'uppercase'
                                            }}>
                                                {offer.internshipType}
                                            </div>
                                            <div style={{ 
                                                padding: '0.25rem 0.75rem', 
                                                borderRadius: '20px', 
                                                background: offer.category === 'pfe' ? '#fef3c7' : '#dcfce7',
                                                color: offer.category === 'pfe' ? '#92400e' : '#166534',
                                                fontSize: '0.7rem',
                                                fontWeight: '700',
                                                textTransform: 'uppercase'
                                            }}>
                                                {offer.category}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '700' }}>{offer.title}</h3>
                                    <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        {offer.company?.fullname || 'Company'}
                                    </p>
                                    
                                    <p style={{ 
                                        color: 'var(--text-muted)', 
                                        fontSize: '0.9rem', 
                                        marginBottom: '1.5rem',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        flex: 1
                                    }}>
                                        {offer.description}
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={16} /> {offer.wilaya}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Monitor size={16} /> {offer.internshipType}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle size={16} /> {offer.slots} slots</div>
                                    </div>

                                    <button 
                                        className={`btn ${offer.alreadyApplied ? 'btn-secondary' : 'btn-primary'}`}
                                        style={{ width: '100%' }}
                                        onClick={() => handleApply(offer._id)}
                                        disabled={offer.alreadyApplied || applying === offer._id}
                                    >
                                        {offer.alreadyApplied ? (
                                            <><CheckCircle size={18} /> Already Applied</>
                                        ) : applying === offer._id ? (
                                            'Applying...'
                                        ) : (
                                            'Apply Now'
                                        )}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default SearchOffers;
