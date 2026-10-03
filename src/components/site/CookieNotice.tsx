import React from 'react';
import { Shield, Check, Settings } from 'lucide-react';
import { useUi } from '../../context/UiContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';

export const CookieNotice: React.FC = () => {
  const { isCookieNoticeDismissed, dismissCookieNotice } = useUi();
  const { showToast } = useToast();

  if (isCookieNoticeDismissed) return null;

  const handleAccept = () => {
    dismissCookieNotice();
    showToast('Cookie preferences saved (demo)', 'success');
  };

  const handleManage = () => {
    dismissCookieNotice();
    showToast('Preferences updated: essential only (demo)', 'info');
  };

  return (
    <div
      role="region"
      aria-label="Privacy and cookies notice"
      style={{
        position: 'fixed',
        bottom: '84px',
        left: '20px',
        zIndex: 'var(--z-toast)',
        maxWidth: '360px',
        width: 'calc(100% - 40px)',
        backgroundColor: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        padding: '20px',
        animation: 'slideUp 250ms var(--ease-standard)',
      }}
      className="cookie-notice"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Shield size={16} color="var(--accent-text)" />
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
          Privacy & Essential Cookies
        </span>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.45', margin: '0 0 16px 0' }}>
        We use essential cookies to maintain security settings and anonymous analytics. We never sell your data or track across sites.
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAccept}
          style={{ flex: 1 }}
        >
          Accept all
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleManage}
          style={{ flex: 1 }}
        >
          Essential only
        </Button>
      </div>
    </div>
  );
};
