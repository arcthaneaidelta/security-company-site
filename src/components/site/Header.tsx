import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Menu, ChevronDown, Shield, ArrowRight } from 'lucide-react';
import { useUi } from '../../context/UiContext';
import { MegaMenu } from './MegaMenu';

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/standards', label: 'Standards' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export const Header: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, brandTokens } = useUi();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'services' | 'industries' | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveMegaMenu(null);
  }, [location.pathname]);

  const openMega = (type: 'services' | 'industries') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMegaMenu(type), 100);
  };

  const closeMega = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 160);
  };

  const navLinkStyle = (isActive: boolean) => ({
    display: 'inline-flex',
    alignItems: 'center',
    height: '36px',
    padding: '0 12px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'inherit',
    color: isActive ? '#FFFFFF' : 'rgba(241,245,249,0.72)',
    textDecoration: 'none',
    borderRadius: '6px',
    backgroundColor: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
    letterSpacing: '-0.01em',
    transition: 'color 140ms ease, background-color 140ms ease',
    whiteSpace: 'nowrap' as const,
  });

  return (
    <header
      role="banner"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-header)' as any,
        height: isScrolled ? '68px' : '80px',
        backgroundColor: isScrolled
          ? 'rgba(7, 11, 18, 0.97)'
          : 'rgba(7, 11, 18, 0.82)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: isScrolled
          ? '1px solid rgba(212, 175, 55, 0.18)'
          : '1px solid rgba(255, 255, 255, 0.055)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.45)' : 'none',
        transition: 'height 220ms var(--ease-standard), background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
      }}
    >
      {/* Inner wrapper — single flex row, vertically centered */}
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0',
        }}
      >
        {/* ── LOGO ── */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            flexShrink: 0,
            marginRight: '32px',
          }}
          aria-label="Northgate Protective Services — Home"
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(145deg, #1E2D44 0%, #0F1827 100%)',
              border: '1px solid rgba(212,175,55,0.38)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.45), 0 0 12px rgba(212,175,55,0.08)',
              flexShrink: 0,
            }}
          >
            <Shield size={18} color="#D4AF37" strokeWidth={2} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1,
                letterSpacing: '-0.015em',
              }}
            >
              {brandTokens.companyName.split(' ')[0]}
            </span>
            <span
              style={{
                fontSize: '8.5px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C29B38',
                lineHeight: 1,
              }}
            >
              Protective Services
            </span>
          </div>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="header-desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            flex: 1,
          }}
        >
          {/* Services mega-menu trigger */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => openMega('services')}
            onMouseLeave={closeMega}
          >
            <button
              type="button"
              aria-expanded={activeMegaMenu === 'services'}
              aria-haspopup="true"
              onClick={() => setActiveMegaMenu((p) => (p === 'services' ? null : 'services'))}
              style={{
                ...navLinkStyle(false),
                display: 'inline-flex',
                gap: '5px',
                color:
                  activeMegaMenu === 'services'
                    ? '#FFFFFF'
                    : 'rgba(241,245,249,0.72)',
                backgroundColor:
                  activeMegaMenu === 'services' ? 'rgba(255,255,255,0.07)' : 'transparent',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <span>Services</span>
              <ChevronDown
                size={13}
                style={{
                  transform: activeMegaMenu === 'services' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 150ms ease',
                  opacity: 0.65,
                }}
              />
            </button>
            <MegaMenu
              type="services"
              isOpen={activeMegaMenu === 'services'}
              onClose={() => setActiveMegaMenu(null)}
            />
          </div>

          {/* Industries mega-menu trigger */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => openMega('industries')}
            onMouseLeave={closeMega}
          >
            <button
              type="button"
              aria-expanded={activeMegaMenu === 'industries'}
              aria-haspopup="true"
              onClick={() => setActiveMegaMenu((p) => (p === 'industries' ? null : 'industries'))}
              style={{
                ...navLinkStyle(false),
                display: 'inline-flex',
                gap: '5px',
                color:
                  activeMegaMenu === 'industries'
                    ? '#FFFFFF'
                    : 'rgba(241,245,249,0.72)',
                backgroundColor:
                  activeMegaMenu === 'industries' ? 'rgba(255,255,255,0.07)' : 'transparent',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <span>Industries</span>
              <ChevronDown
                size={13}
                style={{
                  transform: activeMegaMenu === 'industries' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 150ms ease',
                  opacity: 0.65,
                }}
              />
            </button>
            <MegaMenu
              type="industries"
              isOpen={activeMegaMenu === 'industries'}
              onClose={() => setActiveMegaMenu(null)}
            />
          </div>

          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => navLinkStyle(isActive)}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (!el.classList.contains('active')) {
                  el.style.color = '#FFFFFF';
                  el.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (!el.classList.contains('active')) {
                  el.style.color = 'rgba(241,245,249,0.72)';
                  el.style.backgroundColor = 'transparent';
                }
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── RIGHT ACTIONS ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Phone — desktop only */}
          <a
            href="tel:+18005550199"
            className="header-phone"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 14px',
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'rgba(241,245,249,0.82)',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              letterSpacing: '-0.005em',
              transition: 'all 140ms ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.35)';
              (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(241,245,249,0.82)';
            }}
          >
            <Phone size={13} color="#D4AF37" strokeWidth={2.5} />
            <span>(800) 555-0199</span>
          </a>

          {/* CTA Button — desktop */}
          <Link to="/quote" className="header-cta" style={{ textDecoration: 'none' }}>
            <button
              type="button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 20px',
                fontSize: '13.5px',
                fontWeight: 700,
                fontFamily: 'inherit',
                color: '#0B0F17',
                background: 'linear-gradient(135deg, #F0D878 0%, #D4AF37 50%, #B8942B 100%)',
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 2px 14px rgba(212,175,55,0.28)',
                cursor: 'pointer',
                transition: 'all 160ms var(--ease-standard)',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.42)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 14px rgba(212,175,55,0.28)';
              }}
            >
              <span>Get a Quote</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile navigation"
            className="header-hamburger"
            style={{
              width: '44px',
              height: '44px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: 'rgba(241,245,249,0.85)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* ── Responsive overrides scoped to this component ── */}
      <style>{`
        @media (max-width: 1080px) {
          .header-desktop-nav { display: none !important; }
          .header-phone { display: none !important; }
          .header-cta { display: none !important; }
          .header-hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .header-hamburger { width: 40px !important; height: 40px !important; }
        }
      `}</style>
    </header>
  );
};
