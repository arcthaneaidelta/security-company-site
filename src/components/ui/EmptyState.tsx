import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No results found',
  description = 'Try adjusting your filters or search terms to find what you need.',
  actionLabel,
  onAction,
  icon = <SearchX size={36} color="var(--text-muted)" />,
}) => {
  return (
    <div
      role="status"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '48px 24px',
        backgroundColor: 'var(--surface)',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--radius-md)',
        margin: '24px 0',
      }}
    >
      <div style={{ marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: actionLabel ? '20px' : '0' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
