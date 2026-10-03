import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ArrowRight, ShieldCheck, ChevronDown, Check, Phone } from 'lucide-react';
import { useUi } from '../../context/UiContext';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { CoverageCard } from './CoverageCard';

export const Hero: React.FC = () => {
  const { openVideoModal } = useUi();
  const prefersReduced = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(!prefersReduced);
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToNext = () => {
    const trustStrip = document.getElementById('trust-strip');
    if (trustStrip) {
      trustStrip.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      aria-label="Welcome and company overview"
      style={{
        position: 'relative',
        minHeight: 'clamp(700px, 95vh, 980px)',
        backgroundColor: '#070B12',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      className="hero-section"
    >
      {/* ── Background Media Layer ── */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Poster/fallback */}
        <img
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=2000&h=1100&fit=crop&q=80"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.32,
            filter: 'brightness(0.75) contrast(1.2) saturate(0.9)',
          }}
        />

        {/* Ambient video */}
        {!prefersReduced && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isPlaying ? 0.28 : 0,
              transition: 'opacity 800ms ease',
              filter: 'brightness(0.7) contrast(1.2) saturate(0.8)',
            }}
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-security-guard-walking-along-a-corridor-42407-large.mp4"
              type="video/mp4"
            />
          </video>
        )}

        {/* Complex multi-layer scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, rgba(7,11,18,0.97) 0%, rgba(7,11,18,0.88) 38%, rgba(7,11,18,0.55) 65%, rgba(7,11,18,0.30) 100%)',
          }}
        />
        {/* Bottom gradient for content readability */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '280px',
            background: 'linear-gradient(to top, rgba(7,11,18,1) 0%, rgba(7,11,18,0.4) 60%, transparent 100%)',
          }}
        />

        {/* Radial gold ambient glow — top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '-8%',
            width: '55vw',
            height: '55vw',
            background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        {/* Subtle blue-cyan ambient glow — right */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '40vw',
            height: '40vw',
            background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Fine grain texture overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <div
        className="container hero-flex-layout"
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          paddingTop: '96px',
          paddingBottom: '56px',
          gap: '48px',
        }}
      >
        {/* Left column — headline copy */}
        <div
          className="hero-copy-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(20px)',
            transition: prefersReduced ? 'none' : 'opacity 700ms ease, transform 700ms var(--ease-standard)',
          }}
        >
          {/* Luxury eyebrow badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px 6px 10px',
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.28)',
                borderRadius: '999px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <ShieldCheck size={15} color="var(--accent)" strokeWidth={2.5} />
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.11em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-text)',
                }}
              >
                Licensed · $5M Insured · Locally Operated
              </span>
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '999px',
              }}
            >
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 8px rgba(16,185,129,0.8)',
                  animation: prefersReduced ? 'none' : 'pulseGreen 2s ease infinite',
                }}
              />
              <span style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.06em', color: '#34D399' }}>
                24/7 Dispatch Active
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div>
            <h1
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(44px, 5.8vw, 76px)',
                fontWeight: 500,
                lineHeight: 1.03,
                letterSpacing: '-0.03em',
                margin: 0,
                maxWidth: '680px',
              }}
            >
              Security that shows up,{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  background: 'linear-gradient(135deg, #F0D878 0%, #C89B30 60%, #9E7820 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                every shift.
              </span>
            </h1>
            {/* Subtle underline accent */}
            <div
              style={{
                height: '2px',
                width: '80px',
                background: 'var(--accent-gradient)',
                marginTop: '20px',
                borderRadius: '2px',
              }}
            />
          </div>

          <p
            style={{
              fontSize: 'clamp(17px, 1.7vw, 20px)',
              lineHeight: 1.65,
              color: 'rgba(241, 245, 249, 0.82)',
              maxWidth: '560px',
              margin: 0,
            }}
          >
            Trained, uniformed officers and responsive mobile patrols for offices, campuses, job sites, and private estates. One accountable team from first call to final report.
          </p>

          {/* Proof checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              '40-hour state-certified officer training',
              'Daily digital activity logs at 8 AM',
              'Dedicated local operations supervisor',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(212,175,55,0.12)',
                    border: '1px solid rgba(212,175,55,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={11} color="var(--accent)" strokeWidth={3} />
                </div>
                <span style={{ fontSize: '14.5px', color: 'rgba(241,245,249,0.80)', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
              marginTop: '4px',
            }}
          >
            <Link to="/quote" style={{ textDecoration: 'none' }}>
              <button
                type="button"
                className="hero-primary-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  color: '#0B0F17',
                  background: 'linear-gradient(135deg, #F0D878 0%, #D4AF37 40%, #B8942B 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  boxShadow: '0 4px 20px rgba(212,175,55,0.35), 0 1px 0 rgba(255,255,255,0.25) inset',
                  cursor: 'pointer',
                  transition: 'all 200ms var(--ease-standard)',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,175,55,0.5), 0 1px 0 rgba(255,255,255,0.25) inset';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35), 0 1px 0 rgba(255,255,255,0.25) inset';
                }}
              >
                Request a Quote
                <ArrowRight size={17} strokeWidth={2.5} />
              </button>
            </Link>

            <button
              type="button"
              onClick={() => openVideoModal('v1')}
              aria-label="Watch how we work — company overview video"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 24px',
                backgroundColor: 'rgba(255,255,255,0.055)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: '6px',
                color: 'rgba(255,255,255,0.92)',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'inherit',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transition: 'all 200ms var(--ease-standard)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.10)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.055)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F0D878 0%, #C89B30 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#0B0F17',
                }}
              >
                <Play size={12} style={{ marginLeft: '2px' }} fill="currentColor" />
              </div>
              Watch How We Work
            </button>

            <a
              href="tel:+18005550199"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              <Phone size={14} />
              <span>(800) 555-0199</span>
            </a>
          </div>
        </div>

        {/* Right column — Live operations card */}
        <div
          className="hero-card-col"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(24px)',
            transition: prefersReduced
              ? 'none'
              : 'opacity 700ms 200ms ease, transform 700ms 200ms var(--ease-standard)',
          }}
        >
          <CoverageCard />
        </div>
      </div>

      {/* ── Bottom Controls Bar ── */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          paddingBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '7px 14px',
            backgroundColor: 'rgba(7,11,18,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            color: 'rgba(241,245,249,0.7)',
            fontSize: '12px',
            fontWeight: 600,
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 150ms ease',
            letterSpacing: '0.03em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(7,11,18,0.85)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(7,11,18,0.6)';
            e.currentTarget.style.color = 'rgba(241,245,249,0.7)';
          }}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          <span>{isPlaying ? 'Pause Motion' : 'Play Motion'}</span>
        </button>

        {!prefersReduced && (
          <button
            type="button"
            onClick={scrollToNext}
            aria-label="Scroll down to company credentials"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              color: 'rgba(255,255,255,0.38)',
              fontSize: '11px',
              fontWeight: 700,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.12em',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
          >
            <span>Scroll</span>
            <ChevronDown size={14} />
          </button>
        )}
      </div>

      <style>{`
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 8px rgba(16,185,129,0.8); }
          50% { box-shadow: 0 0 14px rgba(16,185,129,1); }
        }

        .hero-flex-layout {
          flex-direction: row;
        }

        .hero-copy-col {
          flex: 0 0 58%;
          max-width: 58%;
        }

        .hero-card-col {
          flex: 0 0 40%;
          max-width: 40%;
        }

        @media (max-width: 1024px) {
          .hero-copy-col {
            flex: 0 0 62%;
            max-width: 62%;
          }
          .hero-card-col {
            flex: 0 0 36%;
            max-width: 36%;
          }
        }

        @media (max-width: 768px) {
          .hero-flex-layout {
            flex-direction: column;
            padding-top: 76px !important;
          }
          .hero-copy-col,
          .hero-card-col {
            flex: unset !important;
            max-width: 100% !important;
            width: 100%;
          }
          .hero-card-col {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
