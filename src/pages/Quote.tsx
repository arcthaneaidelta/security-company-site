import React from 'react';
import { Phone, ShieldCheck, Clock, FileCheck, CheckCircle2 } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { QuoteWizard } from '../features/quote/QuoteWizard';

export const Quote: React.FC = () => {
  usePageMeta({
    title: 'Request a Security Staffing Quote',
    description: 'Get an exact rate schedule and staffing plan for your site in under 90 seconds. Licensed, insured, locally managed.',
  });

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Request a Quote' }]} />
          <div style={{ maxWidth: '780px' }}>
            <span className="eyebrow eyebrow-accent">Fast Proposal</span>
            <h1 style={{ marginTop: '10px', marginBottom: '12px' }}>
              Request a tailored security staffing quote.
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              Complete the 3 short steps below. A field operations consultant will respond within one business day with exact coverage options.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Supporting Sidebar */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Left: Hero Quote Wizard */}
            <div style={{ gridColumn: 'span 1' }}>
              <QuoteWizard />
            </div>

            {/* Right: Direct Assistance & Trust Guarantees */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Direct Phone Card */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-text)', fontWeight: 600, marginBottom: '8px' }}>
                  <Phone size={18} />
                  <span>Prefer to talk immediately?</span>
                </div>
                <h3 style={{ fontSize: '20px', margin: '0 0 10px 0' }}>Direct Dispatch Line</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                  Speak directly with an operations supervisor for short-notice deployments or emergency event coverage.
                </p>
                <a
                  href="tel:+18005550199"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 18px',
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={16} />
                  <span>1-800-555-0199</span>
                </a>
              </div>

              {/* Guarantees Box */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px',
                }}
              >
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Our Proposal Guarantee</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Clock size={18} color="var(--success)" style={{ flexShrink: 0 }} />
                    <span><strong>1 Business Day Response:</strong> We never leave quote requests unacknowledged.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <FileCheck size={18} color="var(--success)" style={{ flexShrink: 0 }} />
                    <span><strong>No Hidden Line Items:</strong> All equipment, uniforms, supervision and insurance are inclusive.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <ShieldCheck size={18} color="var(--success)" style={{ flexShrink: 0 }} />
                    <span><strong>$5M Liability Included:</strong> Full compliance binder supplied with your quote.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
