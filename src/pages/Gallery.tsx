import React, { useState } from 'react';
import { Play, Image as ImageIcon, Video, Filter, Maximize2 } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import { useUi } from '../context/UiContext';
import { galleryImages, galleryCategories, videos, GalleryImage } from '../data/content';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Chip } from '../components/ui/Chip';
import { Lightbox } from '../features/gallery/Lightbox';
import { VideoModal } from '../features/gallery/VideoModal';

export const Gallery: React.FC = () => {
  usePageMeta({
    title: 'Photo Gallery & Operations Video',
    description: 'Documentary photography and operational video of Northgate Protective Services officers, campus patrols, and training facilities.',
  });

  const { openVideoModal } = useUi();
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0' }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Gallery & Videos' }]} />
          <div style={{ maxWidth: '720px' }}>
            <span className="eyebrow eyebrow-accent">Field Operations</span>
            <h1 style={{ marginTop: '12px', marginBottom: '16px' }}>
              Gallery & Operations Footage
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Documentary photography of our officers on post, campus patrols, emergency briefings, and classroom training modules.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="section" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="container">
          {/* Photos vs Videos Top Switcher */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '16px',
              marginBottom: '32px',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('photos')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'photos' ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'photos' ? 'var(--surface)' : 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
              }}
            >
              <ImageIcon size={16} />
              <span>Photography ({galleryImages.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('videos')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                fontSize: '15px',
                fontWeight: 600,
                color: activeTab === 'videos' ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'videos' ? 'var(--surface)' : 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
              }}
            >
              <Video size={16} />
              <span>Operations Footage ({videos.length})</span>
            </button>
          </div>

          {/* TAB 1: Photos */}
          {activeTab === 'photos' && (
            <div>
              {/* Category Filter Chips */}
              <div
                role="toolbar"
                aria-label="Filter gallery photos by environment"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}
              >
                {galleryCategories.map((cat) => (
                  <Chip
                    key={cat.value}
                    label={cat.label}
                    selected={selectedCategory === cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                  />
                ))}
              </div>

              {/* Masonry / Grid of Photos */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px',
                }}
              >
                {filteredImages.map((img, idx) => (
                  <div
                    key={img.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open photo: ${img.caption}`}
                    onClick={() => setLightboxIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setLightboxIndex(idx);
                    }}
                    style={{
                      position: 'relative',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    className="gallery-item-card"
                  >
                    <div style={{ position: 'relative', width: '100%', paddingTop: '66%', overflow: 'hidden' }}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 350ms var(--ease-standard)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(20, 32, 43, 0.75)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Maximize2 size={14} />
                      </div>
                    </div>
                    <div style={{ padding: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', margin: '0 0 4px 0' }}>
                        {img.caption}
                      </p>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                        Category: {img.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Videos */}
          {activeTab === 'videos' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {videos.map((vid) => (
                <div
                  key={vid.id}
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openVideoModal(vid.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') openVideoModal(vid.id);
                    }}
                    aria-label={`Play video: ${vid.title}`}
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '56.25%',
                      backgroundColor: '#000000',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={vid.poster}
                      alt={vid.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(20, 32, 43, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--surface-inverse)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                        }}
                      >
                        <Play size={22} style={{ marginLeft: '3px' }} fill="currentColor" />
                      </div>
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        padding: '3px 8px',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      {vid.duration}
                    </div>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0' }}>{vid.title}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                        {vid.description}
                      </p>
                    </div>

                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => openVideoModal(vid.id)}
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Play size={14} fill="currentColor" />
                        <span>Watch with captions & transcript</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* Video Modal Component */}
      <VideoModal />
    </div>
  );
};
