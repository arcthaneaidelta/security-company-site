import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
}) => {
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        padding: '18px 20px',
        backgroundColor: '#FFF5F5',
        border: '1px solid #FED7D7',
        borderRadius: 'var(--radius-md)',
        color: 'var(--error)',
        margin: '16px 0',
      }}
    >
      <AlertCircle size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--error)', margin: 0 }}>
          {title}
        </h4>
        <p style={{ fontSize: '14px', color: '#742A2A', margin: '4px 0 0', lineHeight: '1.5' }}>
          {message}
        </p>
        {onRetry && (
          <div style={{ marginTop: '12px' }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={onRetry}
              leftIcon={<RotateCcw size={14} />}
              style={{
                borderColor: 'var(--error)',
                color: 'var(--error)',
                backgroundColor: '#FFFFFF',
              }}
            >
              Retry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
