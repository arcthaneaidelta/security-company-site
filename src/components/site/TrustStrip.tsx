import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileCheck, Award, Users, ExternalLink } from 'lucide-react';
import { useInView } from '../../lib/useInView';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export const TrustStrip: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const prefersReduced = useReducedMotion();

  const [yearsCount, setYearsCount] = useState(prefersReduced ? 14 : 0);
  const [officersCount, setOfficersCount] = useState(prefersReduced ? 420 : 0);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  useEffect(() => {
    if (!inView || prefersReduced) return;

    let startTime: number | null = null;
    const duration = 900;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setYearsCount(Math.floor(progress * 14));
      setOfficersCount(Math.floor(progress * 420));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setYearsCount(14);
        setOfficersCount(420);
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, prefersReduced]);

  return (
    <section
      id="trust-strip"
      ref={ref}
      aria-label="Verified credentials and company scale"
      style={{
        backgroundColor: '#0F1622',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '36px 0',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
          }}
        >
          {/* 1. Licence */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700 }}>
                State Licence No.
              </div>
              <div style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Newsreader', Georgia, serif" }}>
                0041-2279
              </div>
              <button
                type="button"
                onClick={() => setIsVerifyModalOpen(true)}
                style={{
                  fontSize: '12.5px',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '2px',
                  padding: 0,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span>Verify Credentials</span>
                <ExternalLink size={11} />
              </button>
            </div>
          </div>

          {/* 2. Liability Insurance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34D399',
                flexShrink: 0,
              }}
            >
              <FileCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700 }}>
                General Liability
              </div>
              <div style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Newsreader', Georgia, serif" }}>
                $5,000,000
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                Workers' comp on file
              </div>
            </div>
          </div>

          {/* 3. Years Operating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0.05) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38BDF8',
                flexShrink: 0,
              }}
            >
              <Award size={24} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700 }}>
                Years In Operation
              </div>
              <div style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Newsreader', Georgia, serif" }}>
                {yearsCount}+ Years
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                Continuous ownership
              </div>
            </div>
          </div>

          {/* 4. Officers on Staff */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                flexShrink: 0,
              }}
            >
              <Users size={24} />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 700 }}>
                Officers On Staff
              </div>
              <div style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', fontFamily: "'Newsreader', Georgia, serif" }}>
                {officersCount}+ Officers
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                40-hr training certified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regulatory Modal */}
      <Modal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        title="Official Regulatory & Licensing Verification"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Northgate Protective Services operates under full state regulatory accreditation and maintains comprehensive liability protection for commercial, institutional, and residential clients.
          </p>

          <div
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
              <div>
                <strong style={{ color: 'var(--accent)', display: 'block' }}>Licence Number:</strong>
                <div style={{ color: '#F1F5F9', marginTop: '2px' }}>PPO-0041-2279 (Active & In Good Standing)</div>
              </div>
              <div>
                <strong style={{ color: 'var(--accent)', display: 'block' }}>Issuing Authority:</strong>
                <div style={{ color: '#F1F5F9', marginTop: '2px' }}>Bureau of Security & Investigative Services</div>
              </div>
              <div>
                <strong style={{ color: 'var(--accent)', display: 'block' }}>General Liability:</strong>
                <div style={{ color: '#F1F5F9', marginTop: '2px' }}>$5,000,000 Aggregate ($2M Per Occurrence)</div>
              </div>
              <div>
                <strong style={{ color: 'var(--accent)', display: 'block' }}>Workers' Compensation:</strong>
                <div style={{ color: '#F1F5F9', marginTop: '2px' }}>Policy #WC-984210-CA (Statutory Complete)</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
            <Button variant="primary" onClick={() => setIsVerifyModalOpen(false)}>
              Close Verification
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
