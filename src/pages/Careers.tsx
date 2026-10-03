import React, { useState } from 'react';
import { Briefcase, DollarSign, MapPin, ChevronDown, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { useToast } from '../context/ToastContext';
import { roles, Role } from '../data/content';
import { mockApi, ApplicationSubmission } from '../lib/mockApi';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Drawer } from '../components/ui/Drawer';
import { Field } from '../components/ui/Field';
import { Checkbox } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import { ErrorBanner } from '../components/ui/ErrorBanner';

export const Careers: React.FC = () => {
  usePageMeta({
    title: 'Careers & Security Officer Training Pathway',
    description: 'Join Northgate Protective Services. Above-market pay, 40-hour paid training, health benefits, and clear promotion pathways to supervisor roles.',
  });

  const { showToast } = useToast();
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);
  const [activeApplyRole, setActiveApplyRole] = useState<Role | null>(null);
  const [appliedRoleIds, setAppliedRoleIds] = useState<string[]>([]);

  // Application Form State
  const [appForm, setAppForm] = useState<ApplicationSubmission>({
    roleId: '',
    name: '',
    email: '',
    phone: '',
    experienceYears: '1-3',
    licenseNumber: '',
    consent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleOpenApply = (role: Role) => {
    setActiveApplyRole(role);
    setAppForm((prev) => ({ ...prev, roleId: role.id }));
    setErrors({});
    setSubmitError(null);
  };

  const handleApplySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!appForm.name.trim()) errs.name = 'Full name is required.';
    if (!appForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appForm.email.trim())) {
      errs.email = 'Valid email address is required.';
    }
    if (!appForm.phone.trim()) errs.phone = 'Contact phone number is required.';
    if (!appForm.consent) errs.consent = 'Please confirm consent to review your application.';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await mockApi.submitApplication(appForm);
      if (activeApplyRole) {
        setAppliedRoleIds((prev) => [...prev, activeApplyRole.id]);
      }
      showToast('Application received! Our recruiting team will follow up.', 'success');
      setTimeout(() => {
        setActiveApplyRole(null);
      }, 600);
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to submit application. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Careers' }]} />
          <div style={{ maxWidth: '720px' }}>
            <span className="eyebrow eyebrow-accent">Join Our Team</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              A career in protection, treated with respect.
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Above-market wages, 40 hours of paid initial training, full medical benefits, and predictable shift schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work Here 3 Points */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '56px' }}>
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(47, 107, 79, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <DollarSign size={22} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0' }}>Competitive, Transparent Pay</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                Hourly rates start at $21–$26/hr with automatic overtime premiums, weekly direct deposit, and holiday pay differentials.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(47, 93, 138, 0.1)', color: 'var(--info)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0' }}>Paid 40-Hour Training Academy</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                We pay you for all training time including MOAB conflict de-escalation, CPR/First Aid certification, and site procedures.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(176, 138, 74, 0.1)', color: 'var(--accent-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Briefcase size={22} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0' }}>Supervisor Promotion Pathway</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                Over 70% of our field supervisors, dispatchers, and operations managers were promoted from posted security officers.
              </p>
            </div>
          </div>

          {/* Open Roles Section */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <span className="eyebrow eyebrow-accent">Open Positions</span>
              <h2 style={{ marginTop: '8px' }}>Current career opportunities</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {roles.map((role) => {
                const isExpanded = expandedRoleId === role.id;
                const isApplied = appliedRoleIds.includes(role.id);

                return (
                  <div
                    key={role.id}
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div
                      style={{
                        padding: '24px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <h3 style={{ fontSize: '22px', fontWeight: 600, margin: 0 }}>
                            {role.title}
                          </h3>
                          {isApplied && (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '3px 10px',
                                backgroundColor: 'rgba(47, 107, 79, 0.12)',
                                color: 'var(--success)',
                                fontSize: '12px',
                                fontWeight: 600,
                                borderRadius: 'var(--radius-pill)',
                              }}
                            >
                              <CheckCircle2 size={12} /> Applied
                            </span>
                          )}
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '6px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text)' }}>{role.pay}</span>
                          <span>·</span>
                          <span>{role.type}</span>
                          <span>·</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={14} color="var(--accent-text)" /> {role.location}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                          aria-expanded={isExpanded}
                          rightIcon={
                            <ChevronDown
                              size={16}
                              style={{
                                transform: isExpanded ? 'rotate(180deg)' : 'none',
                                transition: 'transform var(--dur-fast) ease',
                              }}
                            />
                          }
                        >
                          {isExpanded ? 'Hide details' : 'View requirements'}
                        </Button>

                        <Button
                          variant="primary"
                          size="sm"
                          disabled={isApplied}
                          onClick={() => handleOpenApply(role)}
                        >
                          {isApplied ? 'Application Sent' : 'Apply now'}
                        </Button>
                      </div>
                    </div>

                    {/* Expandable Role Details */}
                    {isExpanded && (
                      <div
                        style={{
                          padding: '0 24px 24px 24px',
                          borderTop: '1px solid var(--border)',
                          backgroundColor: 'var(--surface-elevated)',
                          paddingTop: '20px',
                        }}
                      >
                        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                          {role.description}
                        </p>
                        <strong style={{ fontSize: '14px', color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                          Role Requirements:
                        </strong>
                        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {role.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Application Drawer */}
      <Drawer
        isOpen={Boolean(activeApplyRole)}
        onClose={() => setActiveApplyRole(null)}
        title={activeApplyRole ? `Apply: ${activeApplyRole.title}` : 'Quick Application'}
      >
        {activeApplyRole && (
          <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Position: <strong>{activeApplyRole.title}</strong> ({activeApplyRole.pay})
            </div>

            {submitError && (
              <ErrorBanner message={submitError} onRetry={handleApplySubmit} />
            )}

            {/* Hidden honeypot anti-spam field */}
            <input
              type="text"
              name="honeypot"
              value={appForm.honeypot}
              onChange={(e) => setAppForm((prev) => ({ ...prev, honeypot: e.target.value }))}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <Field
              label="Full Name"
              required
              placeholder="e.g. Jordan Miller"
              value={appForm.name}
              onChange={(e) => setAppForm((prev) => ({ ...prev, name: e.target.value }))}
              error={errors.name}
            />

            <Field
              type="email"
              label="Email Address"
              required
              placeholder="jordan.miller@email.com"
              value={appForm.email}
              onChange={(e) => setAppForm((prev) => ({ ...prev, email: e.target.value }))}
              error={errors.email}
            />

            <Field
              type="tel"
              label="Phone Number"
              required
              placeholder="(555) 234-5678"
              value={appForm.phone}
              onChange={(e) => setAppForm((prev) => ({ ...prev, phone: e.target.value }))}
              error={errors.phone}
            />

            <Field
              label="State Guard Card / License # (Optional)"
              placeholder="e.g. 1290481 (or leave blank if uncertified)"
              value={appForm.licenseNumber}
              onChange={(e) => setAppForm((prev) => ({ ...prev, licenseNumber: e.target.value }))}
              hint="We provide paid licensing assistance for qualifying candidates"
            />

            <Checkbox
              required
              label="I certify that the information provided is accurate and consent to background pre-screening."
              checked={appForm.consent}
              onChange={(e) => setAppForm((prev) => ({ ...prev, consent: e.target.checked }))}
              error={errors.consent}
            />

            <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                style={{ width: '100%' }}
              >
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </Drawer>
    </div>
  );
};
