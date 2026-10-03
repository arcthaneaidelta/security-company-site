import React, { useState } from 'react';
import { usePageMeta } from '../lib/seo';
import { services, serviceCategories, getServicesByCategory } from '../data/services';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Chip } from '../components/ui/Chip';
import { ServiceCard } from '../components/site/ServiceCard';
import { EmptyState } from '../components/ui/EmptyState';

export const Services: React.FC = () => {
  usePageMeta({
    title: 'Security Services & Guard Solutions',
    description: 'Explore our 6 professional guard and patrol services: Unarmed guards, Armed officers, Mobile patrol, Event security, Construction site protection, and Concierge.',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredServices = getServicesByCategory(selectedCategory);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <div style={{ maxWidth: '720px' }}>
            <span className="eyebrow eyebrow-accent">Capabilities</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              Security services structured for your property.
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              From stationary front-desk concierges to marked vehicle patrols and rapid alarm response, our service lines operate under verified post orders.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Chips Bar & Services Grid */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          {/* Category Filter Toolbar */}
          <div
            role="toolbar"
            aria-label="Filter security services by category"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '36px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginRight: '8px' }}>
              Filter by type:
            </span>
            {serviceCategories.map((cat) => (
              <Chip
                key={cat.value}
                label={cat.label}
                selected={selectedCategory === cat.value}
                onClick={() => setSelectedCategory(cat.value)}
              />
            ))}
          </div>

          {/* Grid or Empty State */}
          {filteredServices.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
              }}
              aria-live="polite"
            >
              {filteredServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No services match this category"
              description="Clear your filter selection to view all available protection models."
              actionLabel="Show all services"
              onAction={() => setSelectedCategory('all')}
            />
          )}
        </div>
      </section>
    </div>
  );
};
