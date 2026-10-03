import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../../lib/useReducedMotion';

export const LoadingOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<'initial' | 'drawing' | 'text' | 'exiting' | 'done'>('initial');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    try {
      const hasLoaded = sessionStorage.getItem('nps_loaded');
      if (hasLoaded) {
        setPhase('done');
        return;
      }
    } catch {
      // Storage unavailable, proceed
    }

    if (prefersReduced) {
      setPhase('done');
      return;
    }

    setIsVisible(true);

    const t1 = setTimeout(() => setPhase('drawing'), 120);
    const t2 = setTimeout(() => setPhase('text'), 400);
    const t3 = setTimeout(() => {
      setPhase('exiting');
      try {
        sessionStorage.setItem('nps_loaded', 'true');
      } catch {}
    }, 950);

    const t4 = setTimeout(() => {
      setPhase('done');
      setIsVisible(false);
    }, 1450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [prefersReduced]);

  const handleSkip = () => {
    setPhase('exiting');
    setTimeout(() => {
      setPhase('done');
      setIsVisible(false);
      try {
        sessionStorage.setItem('nps_loaded', 'true');
      } catch {}
    }, 300);
  };

  if (phase === 'done' || !isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Northgate Protective Services"
      onClick={handleSkip}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') handleSkip();
      }}
      tabIndex={0}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-loader)',
        backgroundColor: 'var(--surface-inverse)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        transform: phase === 'exiting' ? 'translateY(-100%)' : 'translateY(0)',
        transition: phase === 'exiting' ? 'transform 500ms cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '320px',
          width: '100%',
          padding: '0 24px',
        }}
      >
        {/* Animated Brass SVG Logo Mark */}
        <div style={{ position: 'relative', width: '64px', height: '64px' }}>
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%' }}
          >
            {/* Rotated Square with Gate Line */}
            <rect
              x="32"
              y="6"
              width="36"
              height="36"
              transform="rotate(45 32 6)"
              stroke="var(--accent)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="160"
              strokeDashoffset={phase === 'initial' ? 160 : 0}
              style={{
                transition: 'stroke-dashoffset 600ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            />
            {/* Gate Bar in Center */}
            <path
              d="M32 20V44M24 32H40"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="40"
              strokeDashoffset={phase === 'initial' || phase === 'drawing' ? 40 : 0}
              style={{
                transition: 'stroke-dashoffset 400ms cubic-bezier(0.22, 1, 0.36, 1) 300ms',
              }}
            />
          </svg>
        </div>

        {/* Wordmark */}
        <div
          style={{
            textAlign: 'center',
            opacity: phase === 'text' || phase === 'exiting' ? 1 : 0,
            transform:
              phase === 'text' || phase === 'exiting'
                ? 'translateY(0)'
                : 'translateY(8px)',
            transition: 'opacity 350ms cubic-bezier(0.22, 1, 0.36, 1), transform 350ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: '24px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: '#FFFFFF',
            }}
          >
            Northgate
          </div>
          <div
            style={{
              fontFamily: "'Public Sans', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginTop: '4px',
            }}
          >
            Protective Services
          </div>
        </div>

        {/* 1px Hairline Progress Bar */}
        <div
          style={{
            width: '120px',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '8px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: phase === 'initial' ? '0%' : phase === 'drawing' ? '40%' : '100%',
              backgroundColor: 'var(--accent)',
              transition: 'width 600ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>

        <span
          style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.4)',
            marginTop: '12px',
          }}
        >
          Click or press any key to skip
        </span>
      </div>
    </div>
  );
};
