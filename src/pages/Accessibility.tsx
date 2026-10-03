import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Mail, Phone, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { useToast } from '../context/ToastContext';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Field } from '../components/ui/Field';
import { Button } from '../components/ui/Button';

export const Accessibility: React.FC = () => {
  usePageMeta({
    title: 'Accessibility Statement & WCAG 2.2 Conformance',
    description: 'Our commitment to digital accessibility conforming to Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.',
  });

  const { showToast } = useToast();
  const [feedback, setFeedback] = useState({ name: '', email: '', barrier: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.barrier.trim()) return;
    setIsSent(true);
    showToast('Accessibility feedback recorded. Thank you for helping us improve!', 'success');
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Accessibility Statement' }]} />
          <div style={{ maxWidth: '780px' }}>
            <span className="eyebrow eyebrow-accent">Inclusion & Standards</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              Accessibility Statement
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Northgate Protective Services is committed to ensuring digital accessibility for people with disabilities, conforming to Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', backgroundColor: 'var(--surface)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            {/* Conformance Status */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                <ShieldCheck size={18} />
                <span>Conformance Target</span>
              </div>
              <h2 style={{ fontSize: '26px', margin: '0 0 12px 0' }}>WCAG 2.2 Level AA Compliance</h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                This website has been designed, coded, and tested to meet the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA, incorporating the newest success criteria including Focus Appearance (2.4.13), Target Size (2.5.8), and Dragging Movements (2.5.7).
              </p>
            </div>

            {/* Measures Taken */}
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Measures Taken to Support Accessibility</h3>
              <ul style={{ margin: 0, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <li><strong>Keyboard Operability:</strong> All navigation, menus, modals, lightboxes, and multi-step forms are 100% operable via keyboard with visible 2px focus rings with offset.</li>
                <li><strong>Skip Links & Landmarks:</strong> A primary "Skip to main content" link is the first focusable element, alongside semantic HTML5 landmarks (`&lt;header&gt;`, `&lt;nav&gt;`, `&lt;main&gt;`, `&lt;footer&gt;`).</li>
                <li><strong>Color Contrast:</strong> Text elements maintain contrast ratios above 4.5:1 on light and dark backgrounds; UI components and focus rings maintain at least 3:1 contrast.</li>
                <li><strong>Motion Reduction:</strong> Ambient hero video can be paused via a dedicated 44×44px button (WCAG 2.2.2), and respects system <code>prefers-reduced-motion</code> settings automatically.</li>
                <li><strong>Captions & Transcripts:</strong> All video content is accompanied by synchronized WebVTT captions and a complete text transcript.</li>
                <li><strong>Touch Target Size:</strong> Interactive targets (buttons, links, inputs) meet or exceed the 44×44px touch guideline.</li>
              </ul>
            </div>

            {/* Why No Overlay Widget */}
            <div style={{ padding: '20px', backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>Our Engineering Philosophy: Native Accessibility over "Overlay Widgets"</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                We deliberately do not install third-party "accessibility overlay" widgets. Accessibility advocates and disability rights organizations consistently note that overlays disrupt native assistive technology. We build accessible HTML, ARIA, and CSS directly into the codebase.
              </p>
            </div>

            {/* Alternative Formats */}
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Request Alternative Formats</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                If you need any document, contract, or post order in an alternative accessible format (large print, braille, audio description, or screen-reader optimized PDF), please contact our accessibility coordinator at <a href="mailto:accessibility@northgatesecurity.demo" style={{ fontWeight: 600 }}>accessibility@northgatesecurity.demo</a> or call <a href="tel:+18005550199" style={{ fontWeight: 600 }}>1-800-555-0199</a>.
              </p>
            </div>

            {/* Report a Barrier Form */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Report an Accessibility Barrier</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Found a barrier or have suggestions? Let us know so our development team can resolve it.
              </p>

              {isSent ? (
                <div style={{ padding: '16px', backgroundColor: 'rgba(47, 107, 79, 0.1)', color: 'var(--success)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} />
                  <span>Thank you! Your feedback has been forwarded to our engineering team.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field
                      label="Your Name (Optional)"
                      placeholder="e.g. Sam Taylor"
                      value={feedback.name}
                      onChange={(e) => setFeedback((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <Field
                      type="email"
                      label="Your Email (Optional)"
                      placeholder="sam@example.com"
                      value={feedback.email}
                      onChange={(e) => setFeedback((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <Field
                    isTextarea
                    label="Description of the Accessibility Barrier"
                    required
                    placeholder="Please specify the page, element, or assistive technology involved..."
                    value={feedback.barrier}
                    onChange={(e) => setFeedback((prev) => ({ ...prev, barrier: e.target.value }))}
                  />

                  <Button type="submit" variant="primary" style={{ width: 'fit-content' }}>
                    Submit Barrier Report
                  </Button>
                </form>
              )}
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Last reviewed and updated: October 2026.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
