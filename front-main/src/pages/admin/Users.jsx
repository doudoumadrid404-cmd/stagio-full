import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../api/axios';
import ProfileDossier from '../../components/ProfileDossier';
import { Users as UsersIcon, Building, GraduationCap, Search, Eye, X, Mail } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/auth/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => 
        user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>User Management</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Overview of all registered students and companies</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="card" style={{ maxWidth: 'none', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Search size={20} color="var(--text-muted)" />
                    <input 
                        className="form-input" 
                        placeholder="Search users by name, email, or role..." 
                        style={{ border: 'none', padding: '0.5rem 0' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>Loading user directory...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {filteredUsers.map((user) => (
                            <div key={user._id} className="card" style={{ maxWidth: 'none', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <div style={{ 
                                        width: '48px', 
                                        height: '48px', 
                                        borderRadius: 'var(--radius-md)', 
                                        background: user.role === 'student' ? 'var(--primary-light)' : '#fef3c7',
                                        color: user.role === 'student' ? 'var(--primary)' : '#92400e',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {user.role === 'student' ? <GraduationCap size={24} /> : <Building size={24} />}
                                    </div>
                                    <div style={{ 
                                        padding: '0.2rem 0.6rem', 
                                        borderRadius: '12px', 
                                        background: 'var(--bg-main)', 
                                        fontSize: '0.7rem', 
                                        fontWeight: '700', 
                                        textTransform: 'uppercase' 
                                    }}>
                                        {user.role}
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{user.fullname}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                    <Mail size={14} /> {user.email}
                                </p>

                                {user.role === 'student' ? (
                                    <button 
                                        className="btn btn-primary" 
                                        style={{ width: '100%', fontSize: '0.85rem' }}
                                        onClick={() => viewStudentProfile(user._id)}
                                    >
                                        <Eye size={16} /> View Student Dossier
                                    </button>
                                ) : (
                                    <div style={{ padding: '0.6rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Registered Company
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Profile Modal */}
                {showModal && selectedStudent && (
                    <div style={{ 
                        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
                        background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', zIndex: 1000, padding: '2rem' 
                    }}>
                        <div className="card animate-fade-in" style={{ maxWidth: '1000px', width: '100%', maxHeight: '85vh', overflowY: 'auto', padding: '3rem', position: 'relative' }}>
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

export default Users;
