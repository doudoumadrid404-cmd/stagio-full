import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../api/axios';
import { 
    User, Mail, School, MapPin, Phone, Briefcase, 
    GraduationCap, Folder, Plus, Trash2, Save, 
    ExternalLink, Calendar, CheckSquare, FileText
} from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/students/profile');
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await api.put('/students/profile', profile);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCVChange = (section, index, field, value) => {
        const updatedCV = { ...profile.digital_cv };
        updatedCV[section][index][field] = value;
        setProfile({ ...profile, digital_cv: updatedCV });
    };

    const addItem = (section) => {
        const updatedCV = { ...profile.digital_cv };
        const newItem = section === 'education' ? { degree: '', institution: '', startDate: '', endDate: '', description: '' } :
                        section === 'experience' ? { title: '', company: '', startDate: '', endDate: '', description: '' } :
                        { name: '', description: '', skills: [], link: '' };
        updatedCV[section] = [...(updatedCV[section] || []), newItem];
        setProfile({ ...profile, digital_cv: updatedCV });
    };

    const removeItem = (section, index) => {
        const updatedCV = { ...profile.digital_cv };
        updatedCV[section].splice(index, 1);
        setProfile({ ...profile, digital_cv: updatedCV });
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading profile...</div>;

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                border: 'none',
                background: activeTab === id ? 'var(--primary)' : 'transparent',
                color: activeTab === id ? 'white' : 'var(--text-muted)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'var(--transition)'
            }}
        >
            <Icon size={18} /> {label}
        </button>
    );

    return (
        <Layout>
            <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '2rem' }}>My Profile & CV</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage your professional identity and resume</p>
                    </div>
                    <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
                        <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    marginBottom: '2rem', 
                    background: 'white', 
                    padding: '0.5rem', 
                    borderRadius: 'var(--radius-lg)', 
                    boxShadow: 'var(--shadow-sm)',
                    overflowX: 'auto'
                }}>
                    <TabButton id="personal" label="Personal Info" icon={User} />
                    <TabButton id="education" label="Education" icon={GraduationCap} />
                    <TabButton id="experience" label="Experience" icon={Briefcase} />
                    <TabButton id="projects" label="Projects" icon={Folder} />
                    <TabButton id="skills" label="Skills" icon={CheckSquare} />
                </div>

                <div className="card" style={{ maxWidth: 'none', padding: '2rem' }}>
                    {activeTab === 'personal' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input 
                                    className="form-input" 
                                    value={profile.fullname || ''} 
                                    onChange={(e) => setProfile({...profile, fullname: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email (Locked)</label>
                                <input className="form-input" value={profile.email || ''} disabled style={{ background: 'var(--bg-main)' }} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Birth Date</label>
                                <input 
                                    type="date"
                                    className="form-input" 
                                    value={profile.birthDate ? profile.birthDate.split('T')[0] : ''} 
                                    onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">University</label>
                                <input 
                                    className="form-input" 
                                    value={profile.university || ''} 
                                    onChange={(e) => setProfile({...profile, university: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Wilaya</label>
                                <input 
                                    className="form-input" 
                                    value={profile.wilaya || ''} 
                                    onChange={(e) => setProfile({...profile, wilaya: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input 
                                    className="form-input" 
                                    value={profile.phone || ''} 
                                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                />
                            </div>
                            <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                <label className="form-label">Location (Address)</label>
                                <input 
                                    className="form-input" 
                                    value={profile.location || ''} 
                                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'education' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><GraduationCap /> Education</h3>
                                <button onClick={() => addItem('education')} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                                    <Plus size={16} /> Add Education
                                </button>
                            </div>
                            {profile.digital_cv?.education?.map((edu, idx) => (
                                <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', position: 'relative' }}>
                                    <button onClick={() => removeItem('education', idx)} style={{ position: 'absolute', right: '1rem', top: '1rem', border: 'none', background: 'transparent', color: 'var(--danger)', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Degree</label>
                                            <input className="form-input" value={edu.degree} onChange={(e) => handleCVChange('education', idx, 'degree', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Institution</label>
                                            <input className="form-input" value={edu.institution} onChange={(e) => handleCVChange('education', idx, 'institution', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Start Date</label>
                                            <input type="date" className="form-input" value={edu.startDate ? edu.startDate.split('T')[0] : ''} onChange={(e) => handleCVChange('education', idx, 'startDate', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">End Date</label>
                                            <input type="date" className="form-input" value={edu.endDate ? edu.endDate.split('T')[0] : ''} onChange={(e) => handleCVChange('education', idx, 'endDate', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Briefcase /> Experience</h3>
                                <button onClick={() => addItem('experience')} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                                    <Plus size={16} /> Add Experience
                                </button>
                            </div>
                            {profile.digital_cv?.experience?.map((exp, idx) => (
                                <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', position: 'relative' }}>
                                    <button onClick={() => removeItem('experience', idx)} style={{ position: 'absolute', right: '1rem', top: '1rem', border: 'none', background: 'transparent', color: 'var(--danger)', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Title</label>
                                            <input className="form-input" value={exp.title} onChange={(e) => handleCVChange('experience', idx, 'title', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Company</label>
                                            <input className="form-input" value={exp.company} onChange={(e) => handleCVChange('experience', idx, 'company', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Start Date</label>
                                            <input type="date" className="form-input" value={exp.startDate ? exp.startDate.split('T')[0] : ''} onChange={(e) => handleCVChange('experience', idx, 'startDate', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">End Date</label>
                                            <input type="date" className="form-input" value={exp.endDate ? exp.endDate.split('T')[0] : ''} onChange={(e) => handleCVChange('experience', idx, 'endDate', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-input" value={exp.description} onChange={(e) => handleCVChange('experience', idx, 'description', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Folder /> Projects</h3>
                                <button onClick={() => addItem('projects')} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                                    <Plus size={16} /> Add Project
                                </button>
                            </div>
                            {profile.digital_cv?.projects?.map((proj, idx) => (
                                <div key={idx} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', position: 'relative' }}>
                                    <button onClick={() => removeItem('projects', idx)} style={{ position: 'absolute', right: '1rem', top: '1rem', border: 'none', background: 'transparent', color: 'var(--danger)', cursor: 'pointer' }}>
                                        <Trash2 size={18} />
                                    </button>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Project Name</label>
                                            <input className="form-input" value={proj.name} onChange={(e) => handleCVChange('projects', idx, 'name', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Link (Optional)</label>
                                            <input className="form-input" placeholder="https://..." value={proj.link} onChange={(e) => handleCVChange('projects', idx, 'link', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-input" value={proj.description} onChange={(e) => handleCVChange('projects', idx, 'description', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div>
                            <h3 style={{ marginBottom: '1rem' }}>My Professional Skills</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {profile.skills?.map((skill, idx) => (
                                    <div key={idx} style={{ 
                                        padding: '0.5rem 1rem', 
                                        background: 'var(--primary-light)', 
                                        color: 'var(--primary)', 
                                        borderRadius: 'var(--radius-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontWeight: '600'
                                    }}>
                                        {skill}
                                        <Trash2 size={14} style={{ cursor: 'pointer' }} onClick={() => {
                                            const newSkills = profile.skills.filter((_, i) => i !== idx);
                                            setProfile({...profile, skills: newSkills});
                                        }} />
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input 
                                    id="new-skill-input"
                                    className="form-input" 
                                    style={{ maxWidth: '300px' }} 
                                    placeholder="Add a skill e.g. React" 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.target.value.trim();
                                            if (val && !profile.skills.includes(val)) {
                                                setProfile({...profile, skills: [...profile.skills, val]});
                                                e.target.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button className="btn btn-primary" onClick={() => {
                                    const input = document.getElementById('new-skill-input');
                                    const val = input.value.trim();
                                    if (val && !profile.skills.includes(val)) {
                                        setProfile({...profile, skills: [...profile.skills, val]});
                                        input.value = '';
                                    }
                                }}>Add</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
