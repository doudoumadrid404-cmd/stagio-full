import React from 'react';
import { 
  User, Mail, School, MapPin, Phone, Briefcase, 
  GraduationCap, Folder, CheckCircle, Calendar, ExternalLink 
} from 'lucide-react';

const ProfileDossier = ({ student }) => {
  if (!student) return null;

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const Section = ({ title, icon: Icon, children }) => (
    <div style={{ marginBottom: '2.5rem' }}>
      <h3 style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        fontSize: '1.25rem', 
        fontWeight: '700', 
        color: 'var(--primary)',
        borderBottom: '2px solid var(--primary-light)',
        paddingBottom: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        <Icon size={24} /> {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div style={{ padding: '1rem' }}>
      {/* Header Info */}
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        alignItems: 'center', 
        marginBottom: '3rem',
        padding: '2rem',
        background: 'var(--primary-light)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          background: 'var(--primary)', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '2.5rem',
          fontWeight: '800',
          boxShadow: 'var(--shadow-md)'
        }}>
          {student.fullname?.charAt(0)}
        </div>
        <div>
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2.25rem' }}>{student.fullname}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <School size={16} /> {student.university}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <Calendar size={16} /> Age: {calculateAge(student.birthDate)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <Mail size={16} /> {student.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <MapPin size={16} /> {student.wilaya}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
        <div>
          {/* Education */}
          <Section title="Education" icon={GraduationCap}>
            {student.digital_cv?.education?.length > 0 ? student.digital_cv.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '1.5rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--primary-light)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', position: 'absolute', left: '-7px', top: '0' }}></div>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{edu.degree}</h4>
                <p style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{edu.institution}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'N/A'} — {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : 'Present'}
                </p>
                {edu.description && <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{edu.description}</p>}
              </div>
            )) : <p>No education details provided.</p>}
          </Section>

          {/* Experience */}
          <Section title="Professional Experience" icon={Briefcase}>
            {student.digital_cv?.experience?.length > 0 ? student.digital_cv.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '1.5rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px solid var(--primary-light)' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', position: 'absolute', left: '-7px', top: '0' }}></div>
                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{exp.title}</h4>
                <p style={{ fontWeight: '600', color: 'var(--secondary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{exp.company}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : 'N/A'} — {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{exp.description}</p>
              </div>
            )) : <p>No professional experience listed.</p>}
          </Section>

          {/* Projects */}
          <Section title="Key Projects" icon={Folder}>
            {student.digital_cv?.projects?.length > 0 ? student.digital_cv.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: '1.5rem', padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0 }}>{proj.name}</h4>
                  {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}>View Project <ExternalLink size={14} /></a>}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{proj.description}</p>
              </div>
            )) : <p>No projects listed.</p>}
          </Section>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Skills */}
          <Section title="Expertise" icon={CheckCircle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {student.skills?.map((skill, i) => (
                <span key={i} style={{ 
                  padding: '0.4rem 0.8rem', 
                  background: 'var(--primary)', 
                  color: 'white', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: '700' 
                }}>
                  {skill}
                </span>
              ))}
              {(!student.skills || student.skills.length === 0) && <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>No skills listed.</p>}
            </div>
          </Section>

          {/* Contact Details */}
          <Section title="Contact Details" icon={Phone}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}><Phone size={18} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Phone</p>
                  <p style={{ fontWeight: '600' }}>{student.phone || 'N/A'}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)' }}><MapPin size={18} /></div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Permanent Address</p>
                  <p style={{ fontWeight: '600' }}>{student.location || 'N/A'}</p>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ProfileDossier;
