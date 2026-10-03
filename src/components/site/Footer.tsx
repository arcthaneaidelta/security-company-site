import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, MapPin, ArrowRight, Shield } from 'lucide-react';
import { useUi } from '../../context/UiContext';

export const Footer: React.FC = () => {
  const { brandTokens } = useUi();

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: '#05080E',
        color: '#FFFFFF',
        paddingTop: '72px',
        paddingBottom: '48px',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Ambient Glow & Gold Accent Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '240px',
          background: 'radial-gradient(ellipse at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Top 4-column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '44px',
            marginBottom: '56px',
          }}
        >
          {/* Col 1: Brand & Credentials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1',
                  }}
                >
                  {brandTokens.companyName}
                </span>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-text)', fontWeight: 700, marginTop: '2px' }}>
                  Protective Services
                </span>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.65', margin: 0 }}>
              Professional guard and patrol services for commercial, campus, industrial and event properties. One accountable team from first walk to final report.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                backgroundColor: 'rgba(24, 34, 53, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                color: 'var(--accent-text)',
                width: 'fit-content',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            >
              <Shield size={14} color="var(--accent)" />
              <span>State Licence #0041-2279 · $5M Insured</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '18px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ width: '4px', height: '12px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
              Services
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', padding: 0, margin: 0, listStyle: 'none' }}>
              {[
                { to: '/services/unarmed-guard-services', label: 'Unarmed Guard Services' },
                { to: '/services/armed-guard-services', label: 'Armed Guard Services' },
                { to: '/services/mobile-patrol', label: 'Mobile Patrol & Alarm Response' },
                { to: '/services/event-security', label: 'Event Security & Crowd Control' },
                { to: '/services/construction-site-security', label: 'Construction Site Security' },
                { to: '/services/concierge-front-desk', label: 'Concierge & Front Desk' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color var(--dur-fast) var(--ease-standard), padding-left var(--dur-fast) var(--ease-standard)',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.paddingLeft = '4px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Sectors */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '18px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ width: '4px', height: '12px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
              Company & Sectors
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', padding: 0, margin: 0, listStyle: 'none' }}>
              {[
                { to: '/about', label: 'About Northgate' },
                { to: '/standards', label: 'Our Standards & Licensing' },
                { to: '/industries', label: 'Industries Served' },
                { to: '/gallery', label: 'Gallery & Operations Footage' },
                { to: '/careers', label: 'Careers & Training' },
                { to: '/quote', label: 'Request a Quote Wizard' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'color var(--dur-fast) var(--ease-standard), padding-left var(--dur-fast) var(--ease-standard)',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.paddingLeft = '4px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Dispatch & Contact */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '18px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ width: '4px', height: '12px', backgroundColor: 'var(--accent)', borderRadius: '2px' }} />
              Dispatch & Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={14} color="var(--accent)" />
                </div>
                <a href="tel:+18005550199" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>
                  1-800-555-0199 (24/7)
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={14} color="var(--accent)" />
                </div>
                <a href="mailto:inquiries@northgatesecurity.demo" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>
                  inquiries@northgatesecurity.demo
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  <MapPin size={14} color="var(--accent)" />
                </div>
                <span>450 Northgate Plaza, Suite 800, Metro City, CA 94105</span>
              </div>

              <div style={{ marginTop: '6px' }}>
                <Link
                  to="/quote"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--accent-text)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'gap var(--dur-fast) ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
                >
                  Start quote request <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Accessibility Statement Link */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {brandTokens.companyName} Inc. All rights reserved. $5M General Liability Insured.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
            <Link
              to="/accessibility"
              style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color var(--dur-fast) ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              Accessibility Statement (WCAG 2.2 AA)
            </Link>
            <Link
              to="/privacy"
              style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color var(--dur-fast) ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              Privacy Policy
            </Link>
            <Link
              to="/standards"
              style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color var(--dur-fast) ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              Licensing & Insurance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
