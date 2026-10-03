import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface StepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  hint?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  label,
  value,
  min = 1,
  max = 20,
  onChange,
  hint,
}) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
        {label}
      </span>
      {hint && (
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{hint}</span>
      )}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-sm)',
          width: 'fit-content',
        }}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text)',
            opacity: value <= min ? 0.4 : 1,
            cursor: value <= min ? 'not-allowed' : 'pointer',
          }}
        >
          <Minus size={16} />
        </button>
        <span
          style={{
            minWidth: '40px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 600,
            fontFamily: 'monospace',
            color: 'var(--text)',
          }}
          aria-live="polite"
        >
          {value}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text)',
            opacity: value >= max ? 0.4 : 1,
            cursor: value >= max ? 'not-allowed' : 'pointer',
          }}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
