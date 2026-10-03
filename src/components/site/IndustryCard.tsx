import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Shield } from 'lucide-react';
import { Industry } from '../../data/industries';

export interface IndustryCardProps {
  industry: Industry;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        height: '100%',
      }}
      className="industry-card"
    >
      <div style={{ position: 'relative', width: '100%', paddingTop: '50%', overflow: 'hidden', backgroundColor: 'var(--border)' }}>
        <img
          src={industry.image}
          alt={`Security for ${industry.name}`}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(20,32,43,0.8) 0%, transparent 60%)',
          }}
        />
        <h3
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            right: '20px',
            color: '#FFFFFF',
            fontSize: '22px',
            fontWeight: 600,
            margin: 0,
          }}
        >
          {industry.name}
        </h3>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '16px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          {industry.tagline}
        </p>

        {/* Primary Risks */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>
            <AlertTriangle size={14} color="var(--accent-text)" />
            <span>Key Vulnerabilities Addressed</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {industry.risks.map((risk, idx) => (
              <li key={idx}>{risk.title}</li>
            ))}
          </ul>
        </div>

        {/* Action link */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <Link
            to={`/industries/${industry.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--primary)',
              textDecoration: 'none',
            }}
          >
            <span>View deployment plan & case snapshot</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
