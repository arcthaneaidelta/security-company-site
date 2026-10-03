import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { Header } from '../components/site/Header';
import { MobileMenu } from '../components/site/MobileMenu';
import { Footer } from '../components/site/Footer';
import { CookieNotice } from '../components/site/CookieNotice';
import { BrandCustomizer } from '../components/site/BrandCustomizer';
import { LoadingOverlay } from '../components/site/LoadingOverlay';

export const Layout: React.FC = () => {
  const [showMobileBottomBar, setShowMobileBottomBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Mobile bottom bar appears after 400px of scroll as per PRD
      setShowMobileBottomBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide bottom bar on the quote page itself to avoid redundant CTA
  const isQuotePage = location.pathname === '/quote';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1-Second Adaptive Loading Overlay */}
      <LoadingOverlay />

      {/* WCAG 2.4.1 Skip Link (First focusable item) */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Persistent Global Header */}
      <Header />

      {/* Mobile Navigation Sliding Drawer */}
      <MobileMenu />

      {/* Main Content Landmark */}
      <main id="main" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Cookie Notice */}
      <CookieNotice />

      {/* Brand Customizer Drawer (Live design token testing) */}
      <BrandCustomizer />

      {/* Mobile Bottom-Anchored Bar (Appears on mobile screens after 400px scroll) */}
      {showMobileBottomBar && !isQuotePage && (
        <div
          role="region"
          aria-label="Quick Actions"
          className="mobile-bottom-bar"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 'var(--z-header)',
            backgroundColor: 'var(--surface-inverse)',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            padding: '10px 16px',
            display: 'none', // controlled by media query in CSS
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.15)',
            animation: 'slideUp 200ms var(--ease-standard)',
          }}
        >
          <a
            href="tel:+18005550199"
            style={{
              flex: 1,
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255,255,255,0.12)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <Phone size={16} />
            <span>Call 24/7</span>
          </a>

          <Link
            to="/quote"
            style={{
              flex: 1.2,
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <span>Request Quote</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};
