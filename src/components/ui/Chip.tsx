import React, { ButtonHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  label: string;
}

export const Chip: React.FC<ChipProps> = ({ selected = false, label, onClick, className = '', ...props }) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '14px',
        fontWeight: 500,
        backgroundColor: selected ? 'rgba(212, 175, 55, 0.15)' : 'rgba(24, 34, 53, 0.7)',
        color: selected ? '#FFFFFF' : 'var(--text-secondary)',
        border: `1px solid ${selected ? 'var(--accent)' : 'rgba(255, 255, 255, 0.1)'}`,
        cursor: 'pointer',
        transition: 'all var(--dur-fast) var(--ease-standard)',
        minHeight: '40px',
        whiteSpace: 'nowrap',
        boxShadow: selected ? '0 0 14px rgba(212, 175, 55, 0.2)' : 'none',
      }}
      className={className}
      {...props}
    >
      {selected && <Check size={14} color="var(--accent)" aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );
};
