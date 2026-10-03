import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, AlertTriangle, ShieldCheck, TrendingDown, Clock } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { getIndustryBySlug } from '../data/industries';
import { services } from '../data/services';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';

export const IndustryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug || '');

  usePageMeta({
    title: industry ? `${industry.name} Security Deployment Plan` : 'Industry Not Found',
    description: industry?.tagline || 'Sector-specific security deployments by Northgate Protective Services.',
  });

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const recommendedServiceObjs = services.filter((s) => industry.recommendedServices.includes(s.slug));

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Industries', href: '/industries' },
              { label: industry.name },
            ]}
          />
          <div style={{ maxWidth: '800px' }}>
            <span className="eyebrow eyebrow-accent">Sector Deployment Plan</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              Security for {industry.name}
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              {industry.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          {/* Hero Banner Image */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '380px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <img
              src={industry.heroImage}
              alt={industry.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Risks We Manage (3 cards) */}
          <div>
            <span className="eyebrow eyebrow-accent">Threat Mitigation</span>
            <h2 style={{ marginTop: '8px', marginBottom: '24px' }}>Risks we actively manage</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {industry.risks.map((risk, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-text)', fontWeight: 600 }}>
                    <AlertTriangle size={18} />
                    <span style={{ fontSize: '16px', color: 'var(--text)' }}>{risk.title}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Typical Deployment Timeline */}
          <div>
            <span className="eyebrow eyebrow-accent">Operational Blueprint</span>
            <h2 style={{ marginTop: '8px', marginBottom: '24px' }}>A typical deployment structure</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {industry.deployment.map((dep, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-text)', marginBottom: '6px' }}>
                    Post 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0' }}>
                    {dep.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    {dep.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Case Snapshot (Sample numbers, clearly labelled) */}
          <div
            style={{
              backgroundColor: 'var(--surface-inverse)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)' }}>
              <TrendingDown size={20} />
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {industry.caseSnapshot.title} (Simulated Field Result)
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 500,
                color: '#FFFFFF',
                lineHeight: '1.25',
              }}
            >
              {industry.caseSnapshot.metric}
            </div>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: '1.6', maxWidth: '720px' }}>
              {industry.caseSnapshot.detail}
            </p>
          </div>

          {/* Related Services */}
          <div>
            <h3 style={{ fontSize: '22px', marginBottom: '16px' }}>Recommended service lines for {industry.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {recommendedServiceObjs.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  style={{
                    padding: '20px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    color: 'var(--text)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '17px', display: 'block', marginBottom: '6px' }}>{s.name}</strong>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{s.outcome}</p>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    View service details <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>
              Protect your {industry.name.toLowerCase()} facility
            </h3>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 24px auto' }}>
              Request a customized staffing quote or consult directly with our sector operations manager.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <Link to="/quote" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Request a quote
                </Button>
              </Link>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="lg">
                  Speak with an advisor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
