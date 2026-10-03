import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, RotateCcw, Shield, Clock, Phone, Building } from 'lucide-react';
import { services } from '../../data/services';
import { industries } from '../../data/industries';
import { mockApi, QuoteSubmission } from '../../lib/mockApi';
import { Field } from '../../components/ui/Field';
import { Select } from '../../components/ui/Select';
import { RadioCard } from '../../components/ui/RadioCard';
import { Stepper } from '../../components/ui/Stepper';
import { Chip } from '../../components/ui/Chip';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { ErrorBanner } from '../../components/ui/ErrorBanner';

export const QuoteWizard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || 'unarmed-guard-services';

  // Step index (0, 1, 2)
  const [step, setStep] = useState(0);

  // Form State
  const [formData, setFormData] = useState<QuoteSubmission>({
    service: preselectedService,
    industry: 'corporate-offices',
    startDate: '',
    coverage: '24/7',
    siteName: '',
    zipCode: '',
    officersNeeded: 2,
    notes: '',
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    consent: false,
  });

  // Errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

  // Pre-fill from query parameters
  useEffect(() => {
    if (searchParams.get('service')) {
      const match = services.find((s) => s.slug === searchParams.get('service'));
      if (match) {
        setFormData((prev) => ({ ...prev, service: match.slug }));
      }
    }
  }, [searchParams]);

  // Validate current step
  const validateStep = (currentStep: number): boolean => {
    const errs: { [key: string]: string } = {};

    if (currentStep === 0) {
      if (!formData.service) errs.service = 'Please select a security service.';
      if (!formData.startDate) {
        errs.startDate = 'Please select a projected start date.';
      } else {
        const selected = new Date(formData.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          errs.startDate = 'Start date cannot be in the past.';
        }
      }
    } else if (currentStep === 1) {
      if (!formData.siteName.trim()) errs.siteName = 'Site name or property address is required.';
      if (!formData.zipCode.trim()) {
        errs.zipCode = 'ZIP / Postal code is required.';
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode.trim())) {
        errs.zipCode = 'Please enter a valid 5-digit ZIP code.';
      }
    } else if (currentStep === 2) {
      if (!formData.name.trim()) errs.name = 'Your full name is required.';
      if (!formData.email.trim()) {
        errs.email = 'Work email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
      if (!formData.consent) {
        errs.consent = 'Please confirm consent to be contacted regarding this quote.';
      }
    }

    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Focus error summary
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
      setTimeout(() => {
        stepHeadingRef.current?.focus();
      }, 50);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(0, prev - 1));
    setTimeout(() => {
      stepHeadingRef.current?.focus();
    }, 50);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(2)) return;

    setIsLoading(true);
    setSubmitError(null);

    try {
      const res = await mockApi.submitQuote(formData);
      setSuccessRef(res.referenceNumber);
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong on our side. Your answers are saved. Try again or call us.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      service: 'unarmed-guard-services',
      industry: 'corporate-offices',
      startDate: '',
      coverage: '24/7',
      siteName: '',
      zipCode: '',
      officersNeeded: 2,
      notes: '',
      name: '',
      email: '',
      phone: '',
      preferredContact: 'email',
      consent: false,
    });
    setStep(0);
    setErrors({});
    setSubmitError(null);
    setSuccessRef(null);
  };

  // Success State Screen
  if (successRef) {
    return (
      <div
        role="region"
        aria-label="Quote request confirmation"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          boxShadow: 'var(--shadow-sm)',
          maxWidth: '680px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <CheckCircle2 size={36} color="var(--success)" />
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 600, margin: 0 }}>
              Request Received
            </h2>
            <div style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
              Reference Number: <strong style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '17px' }}>{successRef}</strong>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.6', margin: '16px 0 24px 0' }}>
          A senior security consultant will review your site parameters and call you within <strong>one business day</strong> with a tailored staffing plan and estimate.
        </p>

        {/* 3-Step What Happens Next */}
        <div
          style={{
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '16px' }}>
            What happens next
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
                1
              </div>
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--text)' }}>Site Review & Rate Estimate</strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  We assess your location's threat profile, square footage and coverage requirements.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
                2
              </div>
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--text)' }}>Walkthrough & Post Orders</strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  A field operations supervisor walks your facility to draft custom post orders.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>
                3
              </div>
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--text)' }}>Deployment & 8 AM Shift Reports</strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  Vetted officers deploy on schedule with digital activity logs sent to you daily.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Link to="/" style={{ textDecoration: 'none', flex: 1 }}>
            <Button variant="primary" style={{ width: '100%' }}>
              Back to home
            </Button>
          </Link>
          <Button variant="secondary" onClick={handleReset} style={{ flex: 1 }}>
            Start another request
          </Button>
        </div>
      </div>
    );
  }

  const selectedServiceObj = services.find((s) => s.slug === formData.service);

  return (
    <div style={{ width: '100%' }}>
      {/* Progress Indicator: 3 Segments */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
            Step {step + 1} of 3:{' '}
            <span style={{ color: 'var(--accent-text)' }}>
              {step === 0 ? 'What you need' : step === 1 ? 'Your site' : 'How to reach you'}
            </span>
          </span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Target: ~90 seconds
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px', height: '6px' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: '3px',
                backgroundColor: i <= step ? 'var(--primary)' : 'var(--border)',
                transition: 'background-color var(--dur-med) var(--ease-standard)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Screen Reader Error Summary */}
      {Object.keys(errors).length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          style={{
            padding: '16px 20px',
            backgroundColor: '#FFF5F5',
            border: '1px solid #FED7D7',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
            color: 'var(--error)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '15px' }}>
            <AlertCircle size={18} />
            <span>Please correct the errors below before continuing:</span>
          </div>
          <ul style={{ margin: '8px 0 0 24px', padding: 0, fontSize: '14px', lineHeight: '1.5' }}>
            {Object.values(errors).map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Server/Mock Submission Error Banner */}
      {submitError && (
        <ErrorBanner
          title="Submission Notice"
          message={submitError}
          onRetry={handleSubmit}
        />
      )}

      {/* Main Wizard Form Card */}
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* STEP 1: What you need */}
        {step === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                style={{ fontSize: '26px', fontWeight: 600, margin: '0 0 8px 0' }}
              >
                1. What security service do you need?
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
                Select the primary service model. You can customize post orders later.
              </p>
            </div>

            {/* Service Selection Radio Cards */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                Select Service <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {services.map((s) => (
                  <RadioCard
                    key={s.slug}
                    name="service"
                    value={s.slug}
                    title={s.name}
                    description={s.tagline}
                    checked={formData.service === s.slug}
                    onChange={(val) => setFormData((prev) => ({ ...prev, service: val }))}
                  />
                ))}
              </div>
              {errors.service && (
                <span style={{ fontSize: '13px', color: 'var(--error)', marginTop: '6px', display: 'block' }}>
                  {errors.service}
                </span>
              )}
            </div>

            {/* Industry and Start Date */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <Select
                label="Facility / Sector Type"
                value={formData.industry}
                onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                options={industries.map((ind) => ({ value: ind.slug, label: ind.name }))}
                hint="Helps match officers with relevant sector training"
              />

              <Field
                type="date"
                label="Projected Start Date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                error={errors.startDate}
                hint="Standard deployments take 5–7 business days"
              />
            </div>

            {/* Coverage Timing Chips */}
            <div>
              <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Coverage Timing Needed
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['24/7 Around-the-clock', 'Day shift only', 'Night shift only', 'Weekends & Holidays', 'One-off event'].map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    selected={formData.coverage === c}
                    onClick={() => setFormData((prev) => ({ ...prev, coverage: c }))}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Your site */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                style={{ fontSize: '26px', fontWeight: 600, margin: '0 0 8px 0' }}
              >
                2. Tell us about your site
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
                Provide site location and staffing scope. (Tip: Enter "error" as site name to test simulated error handling).
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              <Field
                label="Site / Building Name or Street Address"
                required
                placeholder="e.g. Harbor Point Tower or 100 Main St"
                value={formData.siteName}
                onChange={(e) => setFormData((prev) => ({ ...prev, siteName: e.target.value }))}
                error={errors.siteName}
              />

              <Field
                label="ZIP / Postal Code"
                required
                placeholder="e.g. 94105"
                value={formData.zipCode}
                onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                error={errors.zipCode}
              />
            </div>

            {/* Stepper: Approx Officers Needed */}
            <Stepper
              label="Approx. Officers Needed Per Shift"
              value={formData.officersNeeded}
              min={1}
              max={20}
              onChange={(val) => setFormData((prev) => ({ ...prev, officersNeeded: val }))}
              hint="We can help size this during the site walkthrough"
            />

            {/* Special Instructions / Notes */}
            <Field
              isTextarea
              label="Special Site Hazards, Hours, or Specific Requirements"
              maxCharacters={500}
              placeholder="e.g. Parking structure after-hours patrol, loading dock keycard logging, badge checks at elevators..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
            />
          </div>
        )}

        {/* STEP 3: How to reach you & Summary Review */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                style={{ fontSize: '26px', fontWeight: 600, margin: '0 0 8px 0' }}
              >
                3. How should we deliver your estimate?
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', margin: 0 }}>
                Review your selections below and confirm your contact details.
              </p>
            </div>

            {/* Review Summary Box */}
            <div
              style={{
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                  Summary of your request
                </span>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  style={{ fontSize: '13px', color: 'var(--accent-text)', fontWeight: 600, textDecoration: 'underline' }}
                >
                  Edit requirements
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', fontSize: '14px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Service:</span>
                  <div style={{ fontWeight: 600 }}>{selectedServiceObj?.name || formData.service}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Start Date:</span>
                  <div style={{ fontWeight: 600 }}>{formData.startDate || 'Not specified'}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Site Name / ZIP:</span>
                  <div style={{ fontWeight: 600 }}>{formData.siteName} ({formData.zipCode})</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Officers & Shift:</span>
                  <div style={{ fontWeight: 600 }}>{formData.officersNeeded} officer(s) · {formData.coverage}</div>
                </div>
              </div>
            </div>

            {/* Contact Details Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field
                label="Your Full Name"
                required
                placeholder="Marcus Vance"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                error={errors.name}
              />

              <Field
                type="email"
                label="Work Email Address"
                required
                placeholder="m.vance@company.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                error={errors.email}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Field
                type="tel"
                label="Phone Number (Optional)"
                placeholder="(555) 019-2831"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                hint="For same-day scheduling discussions"
              />

              <div>
                <label style={{ fontSize: '14px', fontWeight: 600, display: 'block', marginBottom: '10px' }}>
                  Preferred Contact Method
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['email', 'phone'].map((method) => (
                    <label
                      key={method}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={() => setFormData((prev) => ({ ...prev, preferredContact: method as any }))}
                      />
                      <span style={{ textTransform: 'capitalize' }}>{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <Checkbox
              required
              label="I confirm I am an authorized representative requesting security services for this property and agree to be contacted with pricing information."
              checked={formData.consent}
              onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
              error={errors.consent}
            />
          </div>
        )}

        {/* Wizard Controls Footer */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {step > 0 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={handleBack}
              leftIcon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 2 ? (
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
              rightIcon={<ArrowRight size={16} />}
            >
              Continue to {step === 0 ? 'Site details' : 'Contact info'}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              rightIcon={<ArrowRight size={18} />}
            >
              Submit Quote Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
