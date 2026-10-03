import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileCheck, Download, Award, CheckCircle2, Lock, FileText, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Accordion } from '../components/ui/Accordion';
import { Button } from '../components/ui/Button';

export const Standards: React.FC = () => {
  usePageMeta({
    title: 'Licensing, Insurance & Operational Standards',
    description: 'Procurement-ready verification of our state security licences, $5M liability insurance, 40-hr training syllabus, and background screening.',
  });

  const { showToast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCredentials = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      showToast('Credentials pack ready (sample PDF generated)', 'success');
    }, 1200);
  };

  const trainingModules = [
    {
      id: 'deescalation',
      title: 'Module 1: Verbal De-escalation & Conflict Resolution (12 Hours)',
      content:
        'Officers are trained in tactical communication, behavioral recognition, spatial awareness, and non-violent de-escalation protocols before facing any public interactions.',
    },
    {
      id: 'emergency',
      title: 'Module 2: Emergency Response & Medical Aid (10 Hours)',
      content:
        'Certified CPR/AED, first aid, fire panel monitoring, active shooter response procedures, and building evacuation coordination in partnership with municipal first responders.',
    },
    {
      id: 'access',
      title: 'Module 3: Access Control & Perimeter Defense (10 Hours)',
      content:
        'Visitor badge verification, electronic keycard systems, vehicle gate logging, contraband detection, and incident escalation pathways.',
    },
    {
      id: 'reporting',
      title: 'Module 4: Legal Protocols & Shift Reporting (8 Hours)',
      content:
        'Jurisdiction boundaries, evidence preservation, chain of custody, digital log entry, and daily 8 AM client briefing delivery standards.',
    },
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Our Standards' }]} />
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
            <div style={{ maxWidth: '720px' }}>
              <span className="eyebrow eyebrow-accent">Procurement & Compliance</span>
              <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
                Standards you can audit, verify and trust.
              </h1>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Every licence, insurance binder, and background screening protocol is documented and accessible for risk officers and procurement teams.
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              isLoading={isDownloading}
              onClick={handleDownloadCredentials}
              leftIcon={<Download size={18} />}
            >
              Download credentials pack (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content: Sticky Navigation Left & Content Right */}
      <div className="container" style={{ marginTop: '48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Left Sticky Navigation */}
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
              Compliance Checklist
            </span>
            <ul style={{ margin: '16px 0 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '#licensing', label: '1. State Licensing' },
                { href: '#insurance', label: '2. Insurance Coverage' },
                { href: '#training', label: '3. 40-Hour Training Syllabus' },
                { href: '#background', label: '4. Background Screening' },
                { href: '#reporting', label: '5. Daily Activity Reporting' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '15px',
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--success)" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
                Need a formal Certificate of Insurance (COI) listing your property as additional insured?
              </p>
              <Link to="/contact" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Request custom COI <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Detailed Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {/* 1. Licensing Section & Table */}
            <section id="licensing" style={{ scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <ShieldCheck size={24} color="var(--accent-text)" />
                <h2 style={{ fontSize: '28px', margin: 0 }}>1. State Licensing</h2>
              </div>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                Northgate Protective Services holds active, clean regulatory standing with all mandated state licensing agencies.
              </p>

              {/* Credentials Table */}
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--surface-elevated)', borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 600 }}>Type</th>
                      <th style={{ padding: '14px 18px', fontWeight: 600 }}>Licence #</th>
                      <th style={{ padding: '14px 18px', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '14px 18px', fontWeight: 600 }}>Issuing Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>Private Patrol Operator</td>
                      <td style={{ padding: '14px 18px', fontFamily: 'monospace' }}>PPO-0041-2279</td>
                      <td style={{ padding: '14px 18px', color: 'var(--success)', fontWeight: 600 }}>Active / Good Standing</td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>Bureau of Security Services</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>Firearms Qualification</td>
                      <td style={{ padding: '14px 18px', fontFamily: 'monospace' }}>FQ-9021-0081</td>
                      <td style={{ padding: '14px 18px', color: 'var(--success)', fontWeight: 600 }}>Quarterly Certified</td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>State POST Division</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '14px 18px', fontWeight: 600 }}>Alarm Company Operator</td>
                      <td style={{ padding: '14px 18px', fontFamily: 'monospace' }}>ACO-7832-1140</td>
                      <td style={{ padding: '14px 18px', color: 'var(--success)', fontWeight: 600 }}>Active / Unrestricted</td>
                      <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>Dept. of Consumer Affairs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 2. Insurance Coverage */}
            <section id="insurance" style={{ scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <FileCheck size={24} color="var(--success)" />
                <h2 style={{ fontSize: '28px', margin: 0 }}>2. $5M Comprehensive Insurance</h2>
              </div>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                We protect our clients with top-tier underwriting. Every deployment includes general liability, umbrella coverage, and full statutory workers' compensation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '18px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>General Liability</div>
                  <div style={{ fontSize: '22px', fontWeight: 600, fontFamily: "'Newsreader', serif", margin: '4px 0' }}>$5,000,000</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Aggregate coverage</div>
                </div>

                <div style={{ padding: '18px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Each Occurrence</div>
                  <div style={{ fontSize: '22px', fontWeight: 600, fontFamily: "'Newsreader', serif", margin: '4px 0' }}>$2,000,000</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Per incident policy</div>
                </div>

                <div style={{ padding: '18px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Workers' Comp</div>
                  <div style={{ fontSize: '22px', fontWeight: 600, fontFamily: "'Newsreader', serif", margin: '4px 0' }}>Statutory</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>All 420+ employees</div>
                </div>
              </div>
            </section>

            {/* 3. Training Syllabus */}
            <section id="training" style={{ scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Award size={24} color="var(--info)" />
                <h2 style={{ fontSize: '28px', margin: 0 }}>3. 40-Hour Mandatory Training</h2>
              </div>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                While state minimums require as little as 8 hours of video instruction, every Northgate officer completes 40 hours of instructor-led coursework.
              </p>

              <Accordion items={trainingModules} defaultOpenId="deescalation" />
            </section>

            {/* 4. Background Checks */}
            <section id="background" style={{ scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Lock size={24} color="var(--primary)" />
                <h2 style={{ fontSize: '28px', margin: 0 }}>4. Rigorous Background Screening</h2>
              </div>
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  <li><strong>DOJ & FBI Live Scan Fingerprinting:</strong> Federal criminal record search across all 50 states.</li>
                  <li><strong>10-Panel Drug Screening:</strong> Mandatory pre-hire testing plus randomized quarterly screenings.</li>
                  <li><strong>7-Year Employment & Residence Verification:</strong> In-depth reference audits by our HR compliance director.</li>
                  <li><strong>Driving Record Checks (MVR):</strong> Clean driving records required for all mobile patrol officers.</li>
                </ul>
              </div>
            </section>

            {/* 5. Daily Reporting */}
            <section id="reporting" style={{ scrollMarginTop: '100px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <FileText size={24} color="var(--accent-text)" />
                <h2 style={{ fontSize: '28px', margin: 0 }}>5. Daily Activity Reporting (DAR)</h2>
              </div>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                You never have to guess what happened during the night shift. Every client receives timestamped checkpoint logs, GPS patrol tracks, and high-resolution photo logs by 8:00 AM every morning.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
