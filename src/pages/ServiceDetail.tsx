import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, Shield, Clock, HelpCircle } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { getServiceBySlug, services } from '../data/services';
import { industries } from '../data/industries';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');

  usePageMeta({
    title: service ? `${service.name} — Service Details` : 'Service Not Found',
    description: service?.outcome || 'Detailed overview of Northgate Protective Services security programs.',
  });

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedInds = industries.filter((ind) => service.relatedIndustries.includes(ind.slug));

  const faqAccordionItems = service.faq.map((item, idx) => ({
    id: `faq-${idx}`,
    title: item.question,
    content: item.answer,
  }));

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header Banner */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: service.name },
            ]}
          />
          <div style={{ maxWidth: '800px' }}>
            <span className="eyebrow eyebrow-accent">{service.category} security service</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              {service.name}
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              {service.outcome}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="container" style={{ marginTop: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Left Column: Details & Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* 16:9 Hero Image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <img
                src={service.heroImage}
                alt={service.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* What's Included */}
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>What's included in every deployment</h2>
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  {service.included.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={18} color="var(--success)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '15px', color: 'var(--text)', lineHeight: '1.5' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How a Shift Works (3-step explainer) */}
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>How a shift works</h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Operational discipline from pre-shift briefing to final handoff log.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {service.shiftSteps.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '20px',
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-text)' }}>
                      Step 0{idx + 1}
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '6px 0 8px 0' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <HelpCircle size={22} color="var(--accent-text)" />
                <h2 style={{ fontSize: '28px', margin: 0 }}>Frequently asked questions</h2>
              </div>
              <Accordion items={faqAccordionItems} defaultOpenId="faq-0" />
            </div>

            {/* Related Industries */}
            {relatedInds.length > 0 && (
              <div>
                <h3 style={{ fontSize: '22px', marginBottom: '16px' }}>Related industry deployments</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  {relatedInds.map((ind) => (
                    <Link
                      key={ind.slug}
                      to={`/industries/${ind.slug}`}
                      style={{
                        padding: '16px',
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        textDecoration: 'none',
                        color: 'var(--text)',
                      }}
                    >
                      <strong style={{ fontSize: '16px', display: 'block', marginBottom: '4px' }}>{ind.name}</strong>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>View sector risks & plan &rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Quote Card */}
          <div style={{ position: 'sticky', top: '96px' }}>
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1.5px solid var(--primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div>
                <span className="eyebrow eyebrow-accent">Fast Deployment</span>
                <h3 style={{ fontSize: '22px', marginTop: '6px', marginBottom: '8px' }}>
                  Request coverage for this service
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                  Pre-selects <strong>{service.name}</strong> in our 3-step quote wizard for an instant estimate.
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--surface-elevated)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Lead Time:</span>
                  <span style={{ fontWeight: 600 }}>5–7 Business Days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Emergency Staffing:</span>
                  <span style={{ fontWeight: 600, color: 'var(--success)' }}>Available in 24h</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Supervision:</span>
                  <span style={{ fontWeight: 600 }}>Dedicated Manager</span>
                </div>
              </div>

              <Link to={`/quote?service=${service.slug}`} style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="lg" style={{ width: '100%' }} rightIcon={<ArrowRight size={18} />}>
                  Get a quote for this service
                </Button>
              </Link>

              <div style={{ textAlign: 'center' }}>
                <a
                  href="tel:+18005550199"
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={14} />
                  <span>Or call 1-800-555-0199 directly</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
