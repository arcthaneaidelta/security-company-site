import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import { services } from '../../data/services';
import { industries } from '../../data/industries';

export interface MegaMenuProps {
  type: 'services' | 'industries';
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, isOpen, onClose }) => {
  if (!isOpen) return null;

  if (type === 'services') {
    const featuredServices = services.slice(0, 3);
    return (
      <div
        role="region"
        aria-label="Services menu"
        style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '940px',
          backgroundColor: '#0F1622',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.08)',
          padding: '28px',
          animation: 'slideDownMenu 180ms var(--ease-standard)',
          zIndex: 'var(--z-menu)',
          marginTop: '12px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1.2fr', gap: '28px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <span className="eyebrow eyebrow-accent">Security Disciplines</span>
              <Link
                to="/services"
                onClick={onClose}
                style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                }}
              >
                View all 6 services <ArrowRight size={13} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              {featuredServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    transition: 'all var(--dur-fast) ease',
                  }}
                  className="mega-menu-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: '15px', color: '#FFFFFF', marginBottom: '6px' }}>
                    {service.name}
                  </span>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {service.outcome}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick highlight block */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(24, 34, 53, 0.9) 0%, rgba(15, 22, 34, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '22px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 700 }}>
                Guaranteed Standard
              </span>
              <h4 style={{ color: '#FFFFFF', fontSize: '17px', marginTop: '6px', marginBottom: '6px' }}>
                Every post has a verified plan.
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                Daily activity logs delivered by 8 AM with GPS patrol verification.
              </p>
            </div>
            <Link
              to="/quote"
              onClick={onClose}
              style={{
                color: 'var(--accent)',
                fontSize: '13.5px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                marginTop: '16px',
              }}
            >
              Get a custom proposal <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const featuredIndustries = industries.slice(0, 3);
  return (
    <div
      role="region"
      aria-label="Industries menu"
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '940px',
        backgroundColor: '#0F1622',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.08)',
        padding: '28px',
        animation: 'slideDownMenu 180ms var(--ease-standard)',
        zIndex: 60,
        marginTop: '12px',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1.2fr', gap: '28px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <span className="eyebrow eyebrow-accent">Sectors & Operating Environments</span>
            <Link
              to="/industries"
              onClick={onClose}
              style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
              }}
            >
              View all 6 industries <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
            {featuredIndustries.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                onClick={onClose}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all var(--dur-fast) ease',
                }}
                className="mega-menu-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '15px', color: '#FFFFFF', marginBottom: '6px' }}>
                  {ind.name}
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {ind.tagline}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sector preview */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundImage: `linear-gradient(rgba(11,15,23,0.7), rgba(11,15,23,0.9)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#FFFFFF',
            padding: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', fontWeight: 700 }}>
              Custom Alignment
            </span>
            <h4 style={{ color: '#FFFFFF', fontSize: '17px', marginTop: '6px' }}>
              Specialized risk mitigations per sector.
            </h4>
          </div>
          <Link
            to="/industries"
            onClick={onClose}
            style={{
              color: '#FFFFFF',
              fontSize: '13.5px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            Explore all sectors <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
