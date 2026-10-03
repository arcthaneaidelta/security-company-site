import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Play,
  Users,
  Clock,
  FileCheck,
  ShieldCheck,
  Star,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { useUi } from '../context/UiContext';
import { Hero } from '../components/site/Hero';
import { TrustStrip } from '../components/site/TrustStrip';
import { ServiceCard } from '../components/site/ServiceCard';
import { services } from '../data/services';
import { industries } from '../data/industries';
import { testimonials, processSteps } from '../data/content';
import { useInView } from '../lib/useInView';
import { useReducedMotion } from '../lib/useReducedMotion';

/* ── Fade-in section wrapper ── */
const FadeSection: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({
  children,
  delay = 0,
  style,
}) => {
  const [ref, inView] = useInView({ threshold: 0.12 });
  const prefersReduced = useReducedMotion();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView || prefersReduced ? 1 : 0,
        transform: inView || prefersReduced ? 'none' : 'translateY(24px)',
        transition: prefersReduced ? 'none' : `opacity 600ms ${delay}ms ease, transform 600ms ${delay}ms var(--ease-standard)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Home: React.FC = () => {
  usePageMeta({
    title: 'Licensed Guard & Patrol Services',
    description:
      'Trained, uniformed security officers and mobile patrols for commercial, industrial, healthcare, and education facilities.',
  });

  const { openVideoModal } = useUi();
  const prefersReduced = useReducedMotion();
  const [selectedIndustryIdx, setSelectedIndustryIdx] = useState(0);
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const testimonialIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const previewServices = services.slice(0, 3);
  const currentIndustry = industries[selectedIndustryIdx];

  useEffect(() => {
    if (prefersReduced) return;
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    };
  }, [prefersReduced]);

  const prevTestimonial = () => {
    if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    setCurrentTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  };
  const nextTestimonial = () => {
    if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    setCurrentTestimonialIdx((i) => (i + 1) % testimonials.length);
  };

  return (
    <div>
      {/* ── 1. Hero ── */}
      <Hero />

      {/* ── 2. Trust Strip ── */}
      <TrustStrip />

      {/* ── 3. Services Preview ── */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: 'clamp(64px,8vw,112px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient background detail */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '30%',
            right: '-8%',
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container">
          <FadeSection>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '24px',
                marginBottom: '52px',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '2px',
                      background: 'var(--accent-gradient)',
                      borderRadius: '2px',
                    }}
                  />
                  <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                    What We Do
                  </span>
                </div>
                <h2
                  style={{
                    maxWidth: '520px',
                    margin: 0,
                    color: '#FFFFFF',
                    fontSize: 'clamp(28px,3.5vw,44px)',
                    lineHeight: 1.12,
                  }}
                >
                  Every post has a plan.{' '}
                  <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Every shift has a log.</span>
                </h2>
              </div>
              <Link to="/services" style={{ textDecoration: 'none', flexShrink: 0 }}>
                <button
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '11px 22px',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    color: 'rgba(241,245,249,0.85)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 160ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = 'rgba(241,245,249,0.85)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  }}
                >
                  View all 6 services
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {previewServices.map((service, i) => (
                <FadeSection key={service.slug} delay={i * 80}>
                  <ServiceCard service={service} />
                </FadeSection>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── 4. Why Us — Horizontal Split ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--surface) 0%, rgba(19,27,42,0.6) 100%)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(64px,8vw,112px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '64px',
                alignItems: 'center',
              }}
            >
              {/* Text column */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '2px',
                      background: 'var(--accent-gradient)',
                      borderRadius: '2px',
                    }}
                  />
                  <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                    Operational Rigor
                  </span>
                </div>
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: '20px',
                    color: '#FFFFFF',
                    fontSize: 'clamp(26px,3vw,38px)',
                    lineHeight: 1.15,
                  }}
                >
                  Quiet competence over militaristic theater.
                </h2>
                <p
                  style={{
                    fontSize: '17px',
                    color: 'rgba(148,163,184,0.9)',
                    lineHeight: 1.7,
                    marginBottom: '32px',
                  }}
                >
                  Most security companies win contracts with promises, then assign unprepared guards with zero context. Northgate was founded to provide transparent, trained, and locally managed protection.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '36px' }}>
                  {[
                    {
                      title: '40-Hour Pre-Deployment Training',
                      desc: 'Every officer is trained in verbal de-escalation, emergency evacuation, and post-specific orders.',
                    },
                    {
                      title: 'Daily 8 AM Digital Activity Logs',
                      desc: 'Timestamped checkpoint scans and incident summaries delivered directly to your inbox.',
                    },
                    {
                      title: 'Dedicated Local Account Supervisor',
                      desc: 'One direct number to the operations manager who writes and manages your post orders.',
                    },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'rgba(16,185,129,0.1)',
                          border: '1px solid rgba(16,185,129,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle2 size={16} color="#34D399" strokeWidth={2.5} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '15.5px',
                            fontWeight: 600,
                            color: '#F1F5F9',
                            marginBottom: '4px',
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: '14px', color: 'rgba(148,163,184,0.85)', lineHeight: 1.55 }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/about" style={{ textDecoration: 'none' }}>
                  <button
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '13px 28px',
                      fontSize: '15px',
                      fontWeight: 600,
                      fontFamily: 'inherit',
                      color: '#0B0F17',
                      background: 'linear-gradient(135deg, #F0D878 0%, #D4AF37 50%, #B8942B 100%)',
                      border: 'none',
                      borderRadius: '6px',
                      boxShadow: '0 3px 16px rgba(212,175,55,0.3)',
                      cursor: 'pointer',
                      transition: 'all 160ms ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 22px rgba(212,175,55,0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 3px 16px rgba(212,175,55,0.3)';
                    }}
                  >
                    Meet Our Leadership
                    <ArrowRight size={15} />
                  </button>
                </Link>
              </div>

              {/* Image column */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
                    position: 'relative',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=680&fit=crop&q=80"
                    alt="Northgate operations supervisor reviewing site orders"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  {/* Overlay scrim */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(7,11,18,0.7) 0%, transparent 50%)',
                    }}
                  />
                  {/* Floating stat card */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      right: '20px',
                      backgroundColor: 'rgba(7,11,18,0.88)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(212,175,55,0.22)',
                      color: '#FFFFFF',
                      padding: '16px 20px',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: '#D4AF37',
                          marginBottom: '4px',
                        }}
                      >
                        Field Operations Standard
                      </div>
                      <div style={{ fontSize: '13.5px', color: 'rgba(241,245,249,0.85)' }}>
                        Unannounced supervisor audits — every active post, weekly.
                      </div>
                    </div>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(212,175,55,0.12)',
                        border: '1px solid rgba(212,175,55,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginLeft: '16px',
                      }}
                    >
                      <Award size={20} color="#D4AF37" />
                    </div>
                  </div>
                </div>

                {/* Accent badge — top right */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    right: '-16px',
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0.04) 100%)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#D4AF37',
                      fontFamily: "'Newsreader', Georgia, serif",
                      lineHeight: 1,
                    }}
                  >
                    14+
                  </span>
                  <span style={{ fontSize: '9.5px', color: 'rgba(241,245,249,0.6)', marginTop: '3px', letterSpacing: '0.04em' }}>
                    Years Active
                  </span>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── 5. Industries / Sector Matcher ── */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          padding: 'clamp(64px,8vw,112px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '480px',
            height: '480px',
            background: 'radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <div style={{ marginBottom: '52px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '24px', height: '2px', background: 'var(--accent-gradient)', borderRadius: '2px' }} />
                <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                  Where We Work
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: '#FFFFFF',
                    fontSize: 'clamp(26px,3vw,38px)',
                    lineHeight: 1.15,
                    maxWidth: '520px',
                  }}
                >
                  Security tailored to{' '}
                  <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>your environment.</span>
                </h2>
                <p
                  style={{
                    fontSize: '16px',
                    color: 'rgba(148,163,184,0.85)',
                    maxWidth: '360px',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Hospital ERs, corporate towers, and construction sites face radically different risks.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '32px',
                alignItems: 'start',
              }}
            >
              {/* Selector list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {industries.map((ind, idx) => {
                  const isSelected = selectedIndustryIdx === idx;
                  return (
                    <button
                      key={ind.slug}
                      type="button"
                      onClick={() => setSelectedIndustryIdx(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        backgroundColor: isSelected ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isSelected ? 'rgba(212,175,55,0.35)' : 'rgba(255,255,255,0.07)'}`,
                        borderRadius: '10px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 180ms var(--ease-standard)',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.02)';
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                        }
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: isSelected ? '#FFFFFF' : 'rgba(241,245,249,0.8)',
                          }}
                        >
                          {ind.name}
                        </div>
                        <div style={{ fontSize: '13px', color: 'rgba(148,163,184,0.7)', marginTop: '3px' }}>
                          {ind.risks[0].title}
                        </div>
                      </div>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: isSelected ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.05)',
                          border: `1px solid ${isSelected ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.1)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 180ms ease',
                        }}
                      >
                        <ArrowRight
                          size={13}
                          color={isSelected ? '#D4AF37' : 'rgba(255,255,255,0.4)'}
                          style={{
                            transform: isSelected ? 'translateX(2px)' : 'none',
                            transition: 'transform 180ms ease',
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic showcase panel */}
              <div
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                }}
              >
                <div style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={currentIndustry.image}
                    alt={currentIndustry.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 300ms ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(19,27,42,0.95) 0%, rgba(19,27,42,0.4) 55%, transparent 100%)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '10.5px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#D4AF37',
                        fontWeight: 700,
                        marginBottom: '6px',
                      }}
                    >
                      Sector Focus
                    </span>
                    <h3 style={{ color: '#FFFFFF', fontSize: '26px', margin: 0, lineHeight: 1.1 }}>
                      {currentIndustry.name}
                    </h3>
                  </div>
                </div>

                <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <p style={{ fontSize: '15px', color: 'rgba(148,163,184,0.9)', margin: 0, lineHeight: 1.6 }}>
                    {currentIndustry.tagline}
                  </p>

                  <div>
                    <div
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(148,163,184,0.5)',
                        fontWeight: 700,
                        marginBottom: '12px',
                      }}
                    >
                      Key Vulnerabilities Addressed
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentIndustry.risks.slice(0, 3).map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <div
                            style={{
                              width: '5px',
                              height: '5px',
                              borderRadius: '50%',
                              backgroundColor: '#D4AF37',
                              marginTop: '7px',
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ fontSize: '13.5px', color: 'rgba(241,245,249,0.75)', lineHeight: 1.5 }}>
                            <strong style={{ color: 'rgba(241,245,249,0.9)' }}>{r.title}: </strong>
                            {r.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      paddingTop: '18px',
                      borderTop: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <Link
                      to={`/industries/${currentIndustry.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#D4AF37',
                        textDecoration: 'none',
                        transition: 'gap 150ms ease',
                      }}
                    >
                      Read full deployment case
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── 6. Process Timeline ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)',
          borderTop: '1px solid var(--border)',
          padding: 'clamp(64px,8vw,112px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px auto' }}>
              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}
              >
                <div style={{ width: '24px', height: '2px', background: 'var(--accent-gradient)', borderRadius: '2px' }} />
                <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                  Onboarding Process
                </span>
                <div style={{ width: '24px', height: '2px', background: 'var(--accent-gradient)', borderRadius: '2px' }} />
              </div>
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: '16px',
                  color: '#FFFFFF',
                  fontSize: 'clamp(26px,3vw,38px)',
                }}
              >
                How we start every engagement.
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(148,163,184,0.85)', margin: 0, lineHeight: 1.65 }}>
                From initial site assessment to active shift reporting — our timeline is transparent and predictable.
              </p>
            </div>
          </FadeSection>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {processSteps.map((step, i) => (
              <FadeSection key={step.number} delay={i * 80}>
                <div
                  style={{
                    background: 'linear-gradient(160deg, rgba(24,34,53,0.7) 0%, rgba(15,22,34,0.85) 100%)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 200ms ease, transform 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.3)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                  }}
                >
                  {/* Top gold accent line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '24px',
                      right: '24px',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
                    }}
                  />

                  <div
                    style={{
                      fontFamily: "'Newsreader', Georgia, serif",
                      fontSize: '40px',
                      fontWeight: 500,
                      color: 'rgba(212,175,55,0.18)',
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    0{step.number}
                  </div>

                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: 600,
                      margin: 0,
                      color: '#F1F5F9',
                      lineHeight: 1.3,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'rgba(148,163,184,0.8)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Testimonials ── */}
      <section
        style={{
          backgroundColor: 'var(--bg)',
          borderTop: '1px solid var(--border)',
          padding: 'clamp(64px,8vw,112px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '24px', height: '2px', background: 'var(--accent-gradient)', borderRadius: '2px' }} />
                <span className="eyebrow" style={{ color: 'var(--accent)' }}>
                  Client Feedback
                </span>
                <div style={{ width: '24px', height: '2px', background: 'var(--accent-gradient)', borderRadius: '2px' }} />
              </div>
              <h2
                style={{
                  margin: 0,
                  color: '#FFFFFF',
                  fontSize: 'clamp(26px,3vw,38px)',
                  lineHeight: 1.15,
                }}
              >
                Trusted across commercial &amp; healthcare facilities.
              </h2>
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '32px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={20} color="#D4AF37" fill="#D4AF37" />
              ))}
            </div>

            <div
              style={{
                maxWidth: '820px',
                margin: '0 auto',
                backgroundColor: 'var(--surface)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '16px',
                padding: 'clamp(32px,4vw,52px)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                position: 'relative',
              }}
            >
              {/* Decorative quote mark */}
              <div
                style={{
                  position: 'absolute',
                  top: '24px',
                  left: '36px',
                  color: 'rgba(212,175,55,0.12)',
                }}
              >
                <Quote size={64} fill="currentColor" />
              </div>

              {/* Top gold accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '60px',
                  right: '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
                  borderRadius: '2px',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <blockquote
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: 'clamp(19px,2.2vw,25px)',
                    lineHeight: 1.5,
                    color: '#F1F5F9',
                    margin: '0 0 28px 0',
                    fontStyle: 'italic',
                    fontWeight: 400,
                  }}
                >
                  "{testimonials[currentTestimonialIdx].quote}"
                </blockquote>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)',
                        border: '2px solid rgba(212,175,55,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Users size={22} color="#D4AF37" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15.5px', color: '#FFFFFF' }}>
                        {testimonials[currentTestimonialIdx].name}
                      </div>
                      <div style={{ fontSize: '13.5px', color: 'rgba(148,163,184,0.8)' }}>
                        {testimonials[currentTestimonialIdx].title} ·{' '}
                        <span style={{ color: '#D4AF37' }}>{testimonials[currentTestimonialIdx].company}</span>
                      </div>
                    </div>
                  </div>

                  {/* Nav controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={prevTestimonial}
                      aria-label="Previous testimonial"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        color: 'rgba(241,245,249,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 140ms ease',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212,175,55,0.12)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)';
                        (e.currentTarget as HTMLElement).style.color = '#D4AF37';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                        (e.currentTarget as HTMLElement).style.color = 'rgba(241,245,249,0.7)';
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setCurrentTestimonialIdx(i)}
                          aria-label={`Testimonial ${i + 1}`}
                          style={{
                            width: currentTestimonialIdx === i ? '20px' : '7px',
                            height: '7px',
                            borderRadius: '999px',
                            backgroundColor: currentTestimonialIdx === i ? '#D4AF37' : 'rgba(255,255,255,0.18)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'all 300ms var(--ease-standard)',
                          }}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={nextTestimonial}
                      aria-label="Next testimonial"
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        color: 'rgba(241,245,249,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 140ms ease',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(212,175,55,0.12)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)';
                        (e.currentTarget as HTMLElement).style.color = '#D4AF37';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                        (e.currentTarget as HTMLElement).style.color = 'rgba(241,245,249,0.7)';
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── 8. Video Banner ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #070B12 0%, #0F1622 40%, #131B2A 100%)',
          borderTop: '1px solid rgba(212,175,55,0.12)',
          padding: 'clamp(64px,8vw,112px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Large decorative circle */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(212,175,55,0.06) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '52px',
            alignItems: 'center',
          }}
        >
          <FadeSection>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                marginBottom: '14px',
              }}
            >
              <div style={{ width: '20px', height: '1.5px', background: '#D4AF37', borderRadius: '2px' }} />
              Documentary Overview
            </span>
            <h2
              style={{
                color: '#FFFFFF',
                marginTop: 0,
                marginBottom: '18px',
                fontSize: 'clamp(26px,3vw,38px)',
                lineHeight: 1.15,
              }}
            >
              See our officers in action.
            </h2>
            <p
              style={{
                fontSize: '16.5px',
                color: 'rgba(148,163,184,0.85)',
                lineHeight: 1.7,
                marginBottom: '28px',
                maxWidth: '440px',
              }}
            >
              Watch a 1-minute look into our pre-shift briefings, uniform standards, and daily operations management. Fully captioned with accessible transcript.
            </p>
            <button
              type="button"
              onClick={() => openVideoModal('v1')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'inherit',
                color: '#0B0F17',
                background: 'linear-gradient(135deg, #F0D878 0%, #D4AF37 50%, #B8942B 100%)',
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
                cursor: 'pointer',
                transition: 'all 160ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(212,175,55,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.35)';
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Play size={13} style={{ marginLeft: '2px' }} fill="currentColor" />
              </div>
              Play company overview (1:42)
            </button>
          </FadeSection>

          <FadeSection delay={120}>
            <div
              onClick={() => openVideoModal('v1')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openVideoModal('v1'); }}
              aria-label="Play video: Company Overview"
              style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 28px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.15)',
                transition: 'transform 220ms var(--ease-standard), box-shadow 220ms ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.015)';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 32px 72px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'none';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 28px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.15)';
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=520&fit=crop&q=80"
                alt="Company overview video poster"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(7,11,18,0.42)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.4), 0 0 40px rgba(212,175,55,0.2)',
                    transition: 'transform 200ms ease',
                  }}
                >
                  <Play size={26} color="#0B0F17" style={{ marginLeft: '4px' }} fill="#0B0F17" />
                </div>
              </div>

              {/* Duration badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  padding: '5px 12px',
                  backgroundColor: 'rgba(7,11,18,0.82)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#D4AF37',
                  backdropFilter: 'blur(8px)',
                  letterSpacing: '0.04em',
                }}
              >
                1:42
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── 9. Final CTA Band ── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(64px,8vw,112px) 0',
          background: 'linear-gradient(160deg, var(--surface) 0%, rgba(24,34,53,0.9) 100%)',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Pattern grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ maxWidth: '720px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 16px',
                backgroundColor: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '999px',
                marginBottom: '24px',
              }}
            >
              <TrendingUp size={14} color="#D4AF37" />
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: '#D4AF37', textTransform: 'uppercase' }}>
                Get Started Today
              </span>
            </div>

            <h2
              style={{
                margin: '0 0 18px 0',
                color: '#FFFFFF',
                fontSize: 'clamp(30px,4vw,50px)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
              }}
            >
              Tell us about your site.{' '}
              <br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>We'll tell you what it needs.</span>
            </h2>

            <p
              style={{
                fontSize: '17.5px',
                color: 'rgba(148,163,184,0.85)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              Fill out our 3-step quote wizard in under 90 seconds. A security operations consultant will respond within one business day with exact coverage options and pricing.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '14px',
              }}
            >
              <Link to="/quote" style={{ textDecoration: 'none' }}>
                <button
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    padding: '16px 36px',
                    fontSize: '16px',
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    color: '#0B0F17',
                    background: 'linear-gradient(135deg, #F0D878 0%, #D4AF37 50%, #B8942B 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 24px rgba(212,175,55,0.35)',
                    cursor: 'pointer',
                    transition: 'all 160ms ease',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(212,175,55,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(212,175,55,0.35)';
                  }}
                >
                  Request a Quote
                  <ArrowRight size={17} />
                </button>
              </Link>

              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '9px',
                    padding: '15px 32px',
                    fontSize: '16px',
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    color: 'rgba(241,245,249,0.88)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 160ms ease',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.backgroundColor = 'rgba(212,175,55,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                    e.currentTarget.style.color = 'rgba(241,245,249,0.88)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                  }}
                >
                  Talk to Our Dispatch
                </button>
              </Link>
            </div>

            {/* Trust micro-copy */}
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              {['No obligation', 'Response within 24 hrs', '14 years in business'].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: 'rgba(148,163,184,0.65)',
                  }}
                >
                  <CheckCircle2 size={13} color="rgba(16,185,129,0.6)" strokeWidth={2.5} />
                  {item}
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
};
