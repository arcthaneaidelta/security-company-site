import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'on-dark' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    // Base styles according to luxury dark design system
    let bg = 'var(--primary)';
    let text = '#FFFFFF';
    let border = '1px solid rgba(255, 255, 255, 0.12)';
    let hoverBg = 'var(--primary-hover)';
    let activeBg = 'var(--primary-active)';
    let boxShadow = 'var(--shadow-sm)';

    if (variant === 'primary') {
      bg = 'linear-gradient(135deg, #1E3A5F 0%, #152B47 100%)';
      text = '#FFFFFF';
      border = '1px solid rgba(212, 175, 55, 0.35)';
      hoverBg = 'linear-gradient(135deg, #245180 0%, #1A375A 100%)';
      activeBg = '#14253A';
      boxShadow = '0 4px 14px rgba(0, 0, 0, 0.4), 0 0 12px rgba(212, 175, 55, 0.1)';
    } else if (variant === 'secondary') {
      bg = 'rgba(24, 34, 53, 0.7)';
      text = '#F1F5F9';
      border = '1px solid rgba(255, 255, 255, 0.14)';
      hoverBg = 'rgba(32, 45, 70, 0.9)';
      activeBg = 'rgba(19, 27, 42, 0.95)';
      boxShadow = 'var(--shadow-sm)';
    } else if (variant === 'ghost') {
      bg = 'transparent';
      text = 'var(--text-secondary)';
      border = '1px solid transparent';
      hoverBg = 'rgba(255, 255, 255, 0.06)';
      activeBg = 'rgba(255, 255, 255, 0.1)';
      boxShadow = 'none';
    } else if (variant === 'on-dark') {
      bg = 'rgba(255, 255, 255, 0.08)';
      text = '#FFFFFF';
      border = '1px solid rgba(255, 255, 255, 0.2)';
      hoverBg = 'rgba(255, 255, 255, 0.15)';
      activeBg = 'rgba(255, 255, 255, 0.22)';
      boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else if (variant === 'accent') {
      bg = 'linear-gradient(135deg, #E6CA65 0%, #C29B38 50%, #9E7820 100%)';
      text = '#070B12';
      border = '1px solid rgba(255, 255, 255, 0.3)';
      hoverBg = 'linear-gradient(135deg, #EBD075 0%, #D4AF37 50%, #AA8428 100%)';
      activeBg = '#9E7820';
      boxShadow = '0 4px 20px rgba(212, 175, 55, 0.35)';
    }

    const padding =
      size === 'sm'
        ? '8px 16px'
        : size === 'lg'
        ? '16px 28px'
        : '12px 22px';

    const fontSize = size === 'sm' ? '14px' : size === 'lg' ? '17px' : '16px';
    const minHeight = '44px'; // 44px minimum touch target WCAG 2.2

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding,
          fontSize,
          fontWeight: 600,
          fontFamily: 'inherit',
          color: text,
          backgroundColor: bg,
          border,
          borderRadius: 'var(--radius-sm)',
          boxShadow,
          minHeight,
          cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          transition:
            'background-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), opacity var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
          textDecoration: 'none',
          boxSizing: 'border-box',
          ...style,
        }}
        className={`custom-btn ${className}`}
        onMouseEnter={(e) => {
          if (!disabled && !isLoading) {
            e.currentTarget.style.backgroundColor = hoverBg;
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !isLoading) {
            e.currentTarget.style.backgroundColor = bg;
          }
        }}
        onMouseDown={(e) => {
          if (!disabled && !isLoading) {
            e.currentTarget.style.backgroundColor = activeBg;
            e.currentTarget.style.transform = 'translateY(1px)';
          }
        }}
        onMouseUp={(e) => {
          if (!disabled && !isLoading) {
            e.currentTarget.style.backgroundColor = hoverBg;
            e.currentTarget.style.transform = 'none';
          }
        }}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            <span>Processing…</span>
          </>
        ) : (
          <>
            {leftIcon}
            <span>{children}</span>
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
