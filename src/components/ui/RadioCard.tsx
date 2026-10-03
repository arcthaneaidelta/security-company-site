import React from 'react';
import { Check } from 'lucide-react';

export interface RadioCardProps {
  name: string;
  value: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  checked: boolean;
  onChange: (value: string) => void;
}

export const RadioCard: React.FC<RadioCardProps> = ({
  name,
  value,
  title,
  description,
  icon,
  checked,
  onChange,
}) => {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '16px 18px',
        backgroundColor: checked ? 'rgba(212, 175, 55, 0.08)' : 'rgba(24, 34, 53, 0.6)',
        border: `1.5px solid ${checked ? 'var(--accent)' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'all var(--dur-fast) var(--ease-standard)',
        position: 'relative',
        boxShadow: checked ? '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 16px rgba(212, 175, 55, 0.15)' : 'none',
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        style={{
          width: '18px',
          height: '18px',
          marginTop: '3px',
          accentColor: 'var(--accent)',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <span style={{ fontWeight: 600, fontSize: '16px', color: checked ? '#FFFFFF' : 'var(--text)' }}>{title}</span>
          {checked && <Check size={16} color="var(--accent)" aria-hidden="true" />}
        </div>
        {description && (
          <p style={{ margin: '4px 0 0', fontSize: '14px', color: checked ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)', lineHeight: '1.45' }}>
            {description}
          </p>
        )}
      </div>
    </label>
  );
};
