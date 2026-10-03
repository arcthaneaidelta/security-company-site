import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, ShieldAlert, Phone, HelpCircle } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  usePageMeta({
    title: 'Page Not Found (404)',
    description: 'We could not locate the requested security page. Helpful navigation links provided.',
  });

  return (
    <div style={{ padding: '80px 0', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(161, 45, 45, 0.1)',
            color: 'var(--error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
          }}
        >
          <ShieldAlert size={32} />
        </div>

        <span className="eyebrow eyebrow-accent">404 Error</span>
        <h1 style={{ marginTop: '8px', marginBottom: '16px', fontSize: 'clamp(32px, 4vw, 44px)' }}>
          We couldn't find that page.
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
          The link may have moved or the address was mistyped. Use the links below to find what you need:
        </p>

        {/* 4 Search-Free Helpful Links (Per PRD section 6.14) */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            textAlign: 'left',
            marginBottom: '32px',
          }}
        >
          {[
            { to: '/services', label: 'View our 6 security service models', desc: 'Unarmed, armed, mobile patrol, event coverage' },
            { to: '/quote', label: 'Request a customized staffing quote', desc: 'Fast 3-step proposal wizard' },
            { to: '/standards', label: 'Review licensing & insurance credentials', desc: '$5M liability binder & state licences' },
            { to: '/contact', label: 'Contact dispatch and operations office', desc: '24/7 phone line and email directory' },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
            >
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--primary)' }}>{item.label}</strong>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.desc}</div>
              </div>
              <ArrowRight size={16} color="var(--primary)" />
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg" leftIcon={<Home size={18} />}>
              Go to Home page
            </Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="lg">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
