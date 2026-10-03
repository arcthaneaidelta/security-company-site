import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Link } from 'react-router-dom';

export const Privacy: React.FC = () => {
  usePageMeta({
    title: 'Privacy Policy & Data Protection',
    description: 'How Northgate Protective Services protects your personal data, site parameters, and security inquiry details.',
  });

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          <div style={{ maxWidth: '780px' }}>
            <span className="eyebrow eyebrow-accent">Legal & Trust</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              We treat client security information with strict confidentiality. This policy outlines how information submitted through quote requests and applications is protected.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Sticky Outline */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start' }}>
            {/* Left Sticky Outline */}
            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                position: 'sticky',
                top: '96px',
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                Policy Sections
              </span>
              <ul style={{ margin: '16px 0 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { href: '#collection', label: '1. Information We Collect' },
                  { href: '#use', label: '2. How We Use Site Details' },
                  { href: '#retention', label: '3. Data Retention & Deletion' },
                  { href: '#thirdparty', label: '4. No Sale of Client Data' },
                  { href: '#security', label: '5. Information Security' },
                  { href: '#contact', label: '6. Privacy Contact' },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      style={{ fontSize: '14px', color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Long-Form Policy */}
            <div style={{ backgroundColor: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              <section id="collection" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
                  1. Information We Collect
                </h2>
                <p>
                  When you submit a quote request, contact message, or employment application on this website, we collect contact information (name, work email, phone number) and facility parameters (building type, square footage, staffing requirements).
                </p>
              </section>

              <section id="use" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
                  2. How We Use Site Details
                </h2>
                <p>
                  Information gathered is used solely to generate security staffing estimates, conduct risk assessments, and coordinate operations. We do not use your property details for unrelated marketing.
                </p>
              </section>

              <section id="retention" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
                  3. Data Retention & Deletion
                </h2>
                <p>
                  Quote request records are retained for 12 months for historical bidding reference. You may request immediate deletion of your submitted facility information at any time by contacting our privacy officer.
                </p>
              </section>

              <section id="thirdparty" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
                  4. No Sale of Client Data
                </h2>
                <p>
                  Northgate Protective Services does not sell, rent, or trade client personal or facility data to any third-party data brokers or advertisers.
                </p>
              </section>

              <section id="security" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
                  5. Information Security
                </h2>
                <p>
                  All transmissions are encrypted via TLS 1.3. Facility floorplans, access codes, and key lists are stored in segregated, access-controlled vault environments.
                </p>
              </section>

              <section id="contact" style={{ scrollMarginTop: '100px' }}>
                <h2 style={{ fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
                  6. Privacy Inquiries
                </h2>
                <p>
                  For privacy requests, email <a href="mailto:privacy@northgatesecurity.demo" style={{ fontWeight: 600 }}>privacy@northgatesecurity.demo</a> or write to: Northgate Protective Services, Attn: Compliance Officer, 450 Northgate Plaza, Suite 800, Metro City, CA 94105.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
