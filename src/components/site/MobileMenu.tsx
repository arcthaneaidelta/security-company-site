import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Phone, ArrowRight, ShieldCheck, Palette, FileText } from 'lucide-react';
import { useUi } from '../../context/UiContext';
import { Button } from '../ui/Button';

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, setIsBrandPanelOpen } = useUi();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('scroll-locked');
      menuRef.current?.focus();
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMobileMenuOpen) return;
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  if (!isMobileMenuOpen) return null;

  const close = () => setIsMobileMenuOpen(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      ref={menuRef}
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-menu)' as any,
        backgroundColor: '#0B1118',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 280ms var(--ease-standard)',
        overflowY: 'auto',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <Link
          to="/"
          onClick={close}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '7px',
              background: 'linear-gradient(145deg, #1E2D44 0%, #0F1827 100%)',
              border: '1px solid rgba(212,175,55,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldCheck size={16} color="#D4AF37" />
          </div>
          <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '19px', fontWeight: 600, color: '#FFFFFF' }}>
            Northgate
          </span>
        </Link>

        <button
          type="button"
          onClick={close}
          aria-label="Close menu"
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'rgba(241,245,249,0.8)',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Nav Links */}
      <nav style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {[
          { to: '/', label: 'Home' },
          { to: '/about', label: 'About Us' },
          { to: '/standards', label: 'Our Standards & Licensing' },
          { to: '/services', label: 'Services' },
          { to: '/industries', label: 'Industries' },
          { to: '/gallery', label: 'Gallery & Videos' },
          { to: '/careers', label: 'Careers' },
          { to: '/contact', label: 'Contact' },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={close}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '13px 16px',
              fontSize: '17px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#FFFFFF' : 'rgba(241,245,249,0.75)',
              backgroundColor: isActive ? 'rgba(212,175,55,0.07)' : 'transparent',
              borderRadius: '8px',
              borderLeft: isActive ? '2px solid #D4AF37' : '2px solid transparent',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            })}
          >
            <span>{link.label}</span>
            <ArrowRight size={15} color="rgba(212,175,55,0.45)" />
          </NavLink>
        ))}

        <div style={{ margin: '12px 0 16px 0', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

        {/* Action Buttons inside mobile menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/quote" onClick={close} style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg" style={{ width: '100%' }}>
              Request a quote
            </Button>
          </Link>

          <a
            href="tel:+18005550199"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 600,
              color: 'rgba(241,245,249,0.88)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              textDecoration: 'none',
              backgroundColor: 'rgba(255,255,255,0.04)',
            }}
          >
            <Phone size={16} color="#D4AF37" />
            <span>Call 1-800-555-0199</span>
          </a>

          {/* Live Brand Token Swapper Demo Button */}
          <button
            type="button"
            onClick={() => {
              close();
              setIsBrandPanelOpen(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--accent-text)',
              backgroundColor: 'rgba(176, 138, 74, 0.1)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--accent)',
            }}
          >
            <Palette size={16} />
            <span>Live Brand Token Swapper (?brand=1)</span>
          </button>
        </div>
      </nav>

      {/* Footer info */}
      <div
        style={{
          padding: '20px 24px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          backgroundColor: 'rgba(7,11,18,0.6)',
          fontSize: '13px',
          color: 'rgba(148,163,184,0.7)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <ShieldCheck size={14} color="#34D399" />
          <span>State Licence #0041-2279 · $5M Liability Insured</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
          <Link to="/accessibility" onClick={close} style={{ color: 'rgba(148,163,184,0.6)', textDecoration: 'none' }}>
            Accessibility
          </Link>
          <Link to="/privacy" onClick={close} style={{ color: 'rgba(148,163,184,0.6)', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};
