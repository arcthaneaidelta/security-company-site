import React, { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  isTextarea?: false;
}

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  isTextarea: true;
  maxCharacters?: number;
  currentCharacters?: number;
}

export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps | TextareaFieldProps>(
  (props, ref) => {
    const { label, error, hint, required, id: customId, className = '', ...rest } = props;
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    const isTextarea = props.isTextarea;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
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
          {isTextarea && (props as TextareaFieldProps).maxCharacters && (
            <span
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
              }}
              aria-live="polite"
            >
              {((props as TextareaFieldProps).value?.toString().length || 0)} / {(props as TextareaFieldProps).maxCharacters}
            </span>
          )}
        </div>

        {hint && (
          <span id={hintId} style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '-2px' }}>
            {hint}
          </span>
        )}

        {isTextarea ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            aria-invalid={Boolean(error)}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            required={required}
            rows={4}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '16px',
              fontFamily: 'inherit',
              color: 'var(--text)',
              backgroundColor: 'var(--surface)',
              border: `1px solid ${error ? 'var(--error)' : 'var(--border-strong)'}`,
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              resize: 'vertical',
              minHeight: '96px',
              boxSizing: 'border-box',
              transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
            }}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            aria-invalid={Boolean(error)}
            aria-describedby={`${error ? errorId : ''} ${hint ? hintId : ''}`.trim() || undefined}
            required={required}
            style={{
              width: '100%',
              height: '46px',
              padding: '10px 14px',
              fontSize: '16px',
              fontFamily: 'inherit',
              color: 'var(--text)',
              backgroundColor: 'var(--surface)',
              border: `1px solid ${error ? 'var(--error)' : 'var(--border-strong)'}`,
              borderRadius: 'var(--radius-sm)',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
            }}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
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

Field.displayName = 'Field';
