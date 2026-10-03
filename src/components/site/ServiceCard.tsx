import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Service } from '../../data/services';

export interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link
      to={`/services/${service.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(165deg, rgba(20,29,45,0.95) 0%, rgba(13,20,33,0.98) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#FFFFFF',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        transition: 'border-color 220ms ease, transform 220ms var(--ease-standard), box-shadow 220ms ease',
        height: '100%',
        position: 'relative',
      }}
      className="service-card-link"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 44px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
      }}
    >
      {/* Top gold accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Photo area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56%',
          overflow: 'hidden',
          backgroundColor: '#070B12',
        }}
      >
        <img
          src={service.image}
          alt={`Security service: ${service.name}`}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 500ms var(--ease-standard)',
          }}
          className="service-card-img"
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13,20,33,1) 0%, rgba(13,20,33,0.3) 55%, transparent 100%)',
          }}
        />

        {/* Category badge */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            padding: '4px 10px',
            backgroundColor: 'rgba(7,11,18,0.78)',
            border: '1px solid rgba(212,175,55,0.3)',
            color: '#D4AF37',
            fontSize: '10.5px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '999px',
            backdropFilter: 'blur(8px)',
          }}
        >
          {service.category}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '24px 24px 22px 24px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '12px',
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 600,
            margin: 0,
            color: '#F1F5F9',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
          }}
        >
          {service.name}
        </h3>

        <p
          style={{
            fontSize: '14px',
            color: 'rgba(148,163,184,0.88)',
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
          }}
        >
          {service.outcome}
        </p>

        {/* Use case tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {service.useCases.slice(0, 3).map((uc, i) => (
            <span
              key={i}
              style={{
                fontSize: '11px',
                padding: '3px 9px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '999px',
                color: 'rgba(148,163,184,0.7)',
                letterSpacing: '0.02em',
              }}
            >
              {uc}
            </span>
          ))}
        </div>

        {/* Footer link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            marginTop: '4px',
          }}
        >
          <span
            style={{
              fontSize: '13.5px',
              fontWeight: 600,
              color: '#D4AF37',
              letterSpacing: '-0.005em',
            }}
          >
            View service details
          </span>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid rgba(212,175,55,0.3)',
              background: 'rgba(212,175,55,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ArrowUpRight size={14} color="#D4AF37" />
          </div>
        </div>
      </div>

      <style>{`
        .service-card-link:hover .service-card-img {
          transform: scale(1.05);
        }
      `}</style>
    </Link>
  );
};
