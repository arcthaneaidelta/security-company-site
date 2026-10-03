import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { industries } from '../data/industries';
import { services } from '../data/services';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Tabs } from '../components/ui/Tabs';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';

export const Industries: React.FC = () => {
  usePageMeta({
    title: 'Industries & Sectors Served',
    description: 'Specialized security deployment plans for Corporate Offices, Retail & Malls, Healthcare Facilities, Education Campuses, Residential & HOAs, and Construction Sites.',
  });

  const tabItems = industries.map((ind) => ({
    id: ind.slug,
    label: ind.name,
    content: (
      <div
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
          <img
            src={ind.heroImage}
            alt={ind.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(20,32,43,0.9) 0%, transparent 60%)',
            }}
          />
          <div style={{ position: 'absolute', bottom: '24px', left: '28px', right: '28px', color: '#FFFFFF' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', fontWeight: 600 }}>
              Sector Risk Profile
            </span>
            <h3 style={{ color: '#FFFFFF', fontSize: '28px', margin: '4px 0 0 0' }}>
              {ind.name}
            </h3>
          </div>
        </div>

        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
            {ind.tagline}
          </p>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>
              Specific Vulnerabilities We Address:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {ind.risks.map((risk, idx) => (
                <div key={idx} style={{ padding: '16px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--text)', fontSize: '14px', marginBottom: '4px' }}>
                    <AlertTriangle size={14} color="var(--accent-text)" />
                    <span>{risk.title}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px' }}>
              Recommended Service Mix:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ind.recommendedServices.map((serviceSlug) => {
                const s = services.find((srv) => srv.slug === serviceSlug);
                return s ? (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text)',
                      textDecoration: 'none',
                    }}
                  >
                    <ShieldCheck size={14} color="var(--success)" />
                    <span>{s.name}</span>
                  </Link>
                ) : null;
              })}
            </div>
          </div>

          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to={`/industries/${ind.slug}`} style={{ textDecoration: 'none' }}>
              <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
                View complete {ind.name} deployment plan
              </Button>
            </Link>
            <Link to="/quote" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-text)', textDecoration: 'none' }}>
              Request sector estimate &rarr;
            </Link>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Industries' }]} />
          <div style={{ maxWidth: '720px' }}>
            <span className="eyebrow eyebrow-accent">Sector Specialization</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              Security built for your specific operating environment.
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Explore how we tailor officer post orders, access protocols, and reporting metrics across commercial, healthcare, educational, and construction sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Explorer */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <Tabs
            items={tabItems}
            orientation="vertical"
            ariaLabel="Industry sectors list"
          />
        </div>
      </section>
    </div>
  );
};
