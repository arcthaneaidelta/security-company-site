import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '24px' }}>
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: 'var(--text-muted)',
          margin: 0,
          padding: 0,
          listStyle: 'none',
        }}
      >
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            <Home size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>
                <ChevronRight size={14} />
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                {isLast || !item.href ? (
                  <span aria-current="page" style={{ color: 'var(--text)', fontWeight: 600 }}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
