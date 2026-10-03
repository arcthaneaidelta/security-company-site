import React, { SelectHTMLAttributes, forwardRef, useId } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, required, id: customId, className = '', ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        <label
          htmlFor={id}
          style={{
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span>}
        </label>

        {hint && (
          <span id={hintId} style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '-2px' }}>
            {hint}
          </span>
        )}

        <div style={{ position: 'relative', width: '100%' }}>
          <select
            id={id}
            ref={ref}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            style={{
              width: '100%',
              height: '46px',
              padding: '10px 40px 10px 14px',
              fontSize: '16px',
              fontFamily: 'inherit',
              color: 'var(--text)',
              backgroundColor: 'var(--surface)',
              border: `1px solid ${error ? 'var(--error)' : 'var(--border-strong)'}`,
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
              pointerEvents: 'none',
            }}
          />
        </div>

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
              fontWeight: 500,
            }}
          >
            <AlertCircle size={16} aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
