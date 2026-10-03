import React, { InputHTMLAttributes, forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
  hint?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, hint, required, id: customId, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label
          htmlFor={id}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            fontSize: '15px',
            color: 'var(--text)',
            lineHeight: '1.5',
            userSelect: 'none',
          }}
        >
          <input
            id={id}
            ref={ref}
            type="checkbox"
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            style={{
              width: '20px',
              height: '20px',
              marginTop: '2px',
              accentColor: 'var(--primary)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            {...props}
          />
          <span>{label}</span>
        </label>
        {hint && (
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '32px' }}>
            {hint}
          </span>
        )}
        {error && (
          <div
            id={errorId}
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: 'var(--error)',
              marginLeft: '32px',
            }}
          >
            <AlertCircle size={14} aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
