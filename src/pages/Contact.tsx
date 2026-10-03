import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertTriangle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { useToast } from '../context/ToastContext';
import { mockApi, ContactSubmission } from '../lib/mockApi';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Field } from '../components/ui/Field';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { Button } from '../components/ui/Button';
import { ErrorBanner } from '../components/ui/ErrorBanner';

export const Contact: React.FC = () => {
  usePageMeta({
    title: 'Contact Dispatch & Headquarters',
    description: 'Reach Northgate Protective Services 24/7 dispatch, general inquiries, or emergency security staffing support.',
  });

  const { showToast } = useToast();

  const [form, setForm] = useState<ContactSubmission>({
    name: '',
    email: '',
    phone: '',
    topic: 'quote',
    message: '',
    consent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const errs: { [key: string]: string } = {};

    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Valid email address is required.';
    }
    if (!form.message.trim()) errs.message = 'Please provide details for your message.';
    if (!form.consent) errs.consent = 'Please confirm consent to be contacted.';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await mockApi.submitContact(form);
      setIsSent(true);
      showToast('Message sent! Our operations desk will respond promptly.', 'success');
    } catch (err: any) {
      setSubmitError(err?.message || 'We could not deliver your message right now. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <div style={{ maxWidth: '720px' }}>
            <span className="eyebrow eyebrow-accent">Headquarters & Dispatch</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              Connect with our operations team.
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Whether you need to request a quote, schedule a site assessment, or reach 24/7 emergency dispatch, our team is ready.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
            {/* Left: Contact Form */}
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
              {isSent ? (
                <div style={{ padding: '32px 0', textAlign: 'center' }}>
                  <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 16px auto' }} />
                  <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
                    Message Received
                  </h3>
                  <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 24px auto' }}>
                    Thank you for reaching out. A representative from our operations desk will review your message and reply shortly.
                  </p>
                  <Button variant="secondary" onClick={() => { setIsSent(false); setForm({ name: '', email: '', phone: '', topic: 'quote', message: '', consent: false, honeypot: '' }); }}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>
                    Send a Message
                  </h2>

                  {submitError && (
                    <ErrorBanner message={submitError} onRetry={handleSubmit} />
                  )}

                  <input
                    type="text"
                    name="honeypot"
                    value={form.honeypot}
                    onChange={(e) => setForm((prev) => ({ ...prev, honeypot: e.target.value }))}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field
                      label="Your Name"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      error={errors.name}
                    />

                    <Field
                      type="email"
                      label="Email Address"
                      required
                      placeholder="alex.m@company.com"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      error={errors.email}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field
                      type="tel"
                      label="Phone (Optional)"
                      placeholder="(555) 012-3456"
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    />

                    <Select
                      label="Inquiry Topic"
                      value={form.topic}
                      onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
                      options={[
                        { value: 'quote', label: 'Security Quote & Proposal' },
                        { value: 'emergency', label: 'Urgent / Short-Notice Coverage' },
                        { value: 'billing', label: 'Billing & Accounting' },
                        { value: 'feedback', label: 'Feedback / Accessibility Barrier' },
                      ]}
                    />
                  </div>

                  <Field
                    isTextarea
                    label="Message or Specific Facility Requirements"
                    required
                    rows={4}
                    placeholder="Provide details regarding your site, square footage, hours needed, or any specific concerns..."
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    error={errors.message}
                  />

                  <Checkbox
                    required
                    label="I agree to receive communications regarding my inquiry per the Privacy Policy."
                    checked={form.consent}
                    onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
                    error={errors.consent}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    style={{ marginTop: '8px' }}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Right: Emergency Callout & Office Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Emergency Urgent Callout */}
              <div
                style={{
                  backgroundColor: '#FFF8ED',
                  border: '1.5px solid var(--accent)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-text)', fontWeight: 700, marginBottom: '6px' }}>
                  <AlertTriangle size={20} />
                  <span>24/7 Urgent Dispatch</span>
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                  Need urgent guard deployment within 24 hours? Our dispatch supervisors are available around the clock.
                </p>
                <a
                  href="tel:+18005550199"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 18px',
                    backgroundColor: 'var(--primary)',
                    color: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '16px',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={16} />
                  <span>Call 1-800-555-0199</span>
                </a>
              </div>

              {/* Office Details */}
              <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 16px 0' }}>
                  Headquarters & Operations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <MapPin size={18} color="var(--accent-text)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Northgate Protective Services Inc.</strong>
                      <div>450 Northgate Plaza, Suite 800</div>
                      <div>Metro City, CA 94105</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Mail size={18} color="var(--accent-text)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div>inquiries@northgatesecurity.demo</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Typical email reply: 2 hours</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Clock size={18} color="var(--accent-text)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <div><strong>Office Hours:</strong> Mon–Fri, 8:00 AM – 6:00 PM PST</div>
                      <div><strong>Dispatch Desk:</strong> 24 Hours / 7 Days / 365 Days</div>
                    </div>
                  </div>
                </div>

                {/* Static Map Graphic with Open in Maps Link (Per PRD section 6.11 to protect privacy & performance) */}
                <div style={{ marginTop: '24px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=280&fit=crop"
                    alt="Map showing Northgate headquarters at 450 Northgate Plaza"
                    style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        backgroundColor: 'rgba(20, 32, 43, 0.9)',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        textDecoration: 'none',
                      }}
                    >
                      <span>Open in Maps</span>
                      <ExternalLink size={12} />
                    </a>
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
