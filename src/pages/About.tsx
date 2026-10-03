import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Users, BookOpen, Check } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { leadership, companyValues, Person } from '../data/content';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Drawer } from '../components/ui/Drawer';
import { Button } from '../components/ui/Button';

export const About: React.FC = () => {
  usePageMeta({
    title: 'About Our Company & Leadership',
    description: 'Founded 14 years ago on principles of accountability, officer training, and quiet competence. Meet our leadership team.',
  });

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Page Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'About' }]} />
          <div style={{ maxWidth: '780px' }}>
            <span className="eyebrow eyebrow-accent">Company Overview</span>
            <h1 style={{ marginTop: '12px', marginBottom: '20px' }}>
              Built on accountability, not promises.
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Northgate Protective Services was founded to solve a basic problem in corporate security: high guard turnover, zero transparency, and missing accountability.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Split Photo */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <span className="eyebrow eyebrow-accent">Our Origin</span>
              <h2 style={{ marginTop: '8px', marginBottom: '20px' }}>
                Fourteen years of steady, local management.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
                <p style={{ margin: 0 }}>
                  In 2012, our founders noticed that national security conglomerates treated officers as expendable bodies and property managers as numbers on a spreadsheet. Shift logs were fabricated, guards arrived late without post orders, and supervisors were unreachable when incidents occurred.
                </p>
                <p style={{ margin: 0 }}>
                  We built Northgate on the opposite principle: pay officers above market rates, mandate 40 hours of rigorous de-escalation training before their first shift, and give every client direct access to the operations director managing their post.
                </p>
                <p style={{ margin: 0 }}>
                  Today, with over 420 active officers across six service disciplines, Northgate protects Fortune 500 office towers, hospital networks, education campuses, and critical industrial sites throughout the state.
                </p>
              </div>
            </div>

            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Northgate founders and operations team in planning session"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(20, 32, 43, 0.9)',
                  color: '#FFFFFF',
                  padding: '16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                }}
              >
                <div style={{ fontWeight: 600, color: 'var(--accent)' }}>Executive Commitment</div>
                <div>Every account is reviewed monthly by executive leadership.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Grid */}
      <section className="section" style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <span className="eyebrow eyebrow-accent">Leadership</span>
            <h2 style={{ marginTop: '8px' }}>The people behind your security plan.</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', margin: 0 }}>
              Click any leader to view their operational background and qualifications.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {leadership.map((person, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img
                    src={person.image}
                    alt={person.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>
                    {person.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--accent-text)', fontWeight: 600, marginBottom: '12px' }}>
                    {person.role}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', flex: 1, margin: '0 0 16px 0' }}>
                    {person.shortBio}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedPerson(person)}
                  >
                    View full bio
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values as Numbered Statements */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span className="eyebrow eyebrow-accent">Core Principles</span>
            <h2 style={{ marginTop: '8px' }}>Our operational standards.</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {companyValues.map((v) => (
              <div
                key={v.number}
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: '28px',
                    fontWeight: 600,
                    color: 'var(--accent-text)',
                  }}
                >
                  {v.number}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0, color: 'var(--text)' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ backgroundColor: 'var(--surface-inverse)', color: '#FFFFFF', padding: '64px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ color: '#FFFFFF', marginBottom: '16px' }}>
            Ready to experience professional guard service?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
            Receive a transparent quote with complete rate schedules and compliance documentation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Link to="/quote" style={{ textDecoration: 'none' }}>
              <Button variant="accent" size="lg" rightIcon={<ArrowRight size={18} />}>
                Request a quote
              </Button>
            </Link>
            <Link to="/standards" style={{ textDecoration: 'none' }}>
              <Button variant="on-dark" size="lg">
                View our standards
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership Bio Drawer */}
      <Drawer
        isOpen={Boolean(selectedPerson)}
        onClose={() => setSelectedPerson(null)}
        title={selectedPerson?.name || 'Executive Bio'}
      >
        {selectedPerson && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '240px' }}>
              <img
                src={selectedPerson.image}
                alt={selectedPerson.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ fontSize: '14px', color: 'var(--accent-text)', fontWeight: 600 }}>
                {selectedPerson.role}
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '4px 0 12px 0' }}>
                {selectedPerson.name}
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.65', margin: 0 }}>
                {selectedPerson.bio}
              </p>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <Button variant="secondary" onClick={() => setSelectedPerson(null)} style={{ width: '100%' }}>
                Close bio
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
