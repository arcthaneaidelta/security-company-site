import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryImage } from '../../data/content';

export interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = currentIndex !== null && currentIndex >= 0;
  const currentImage = isOpen ? images[currentIndex] : null;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll-locked');
      containerRef.current?.focus();
    } else {
      document.body.classList.remove('scroll-locked');
    }
    return () => {
      document.body.classList.remove('scroll-locked');
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || currentIndex === null) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !currentImage || currentIndex === null) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left -> next
        onNavigate((currentIndex + 1) % images.length);
      } else {
        // swipe right -> prev
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)',
        backgroundColor: 'rgba(10, 16, 22, 0.94)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 180ms var(--ease-standard)',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFFFF',
          zIndex: 10,
        }}
      >
        <div
          style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}
          aria-live="polite"
        >
          {currentIndex + 1} of {images.length}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Image Area with Previous / Next Arrows */}
      <div
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
          aria-label="Previous photo"
          style={{
            position: 'absolute',
            left: '-60px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
          className="lightbox-nav-btn"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Display Image */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        />

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onNavigate((currentIndex + 1) % images.length)}
          aria-label="Next photo"
          style={{
            position: 'absolute',
            right: '-60px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
          className="lightbox-nav-btn"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Caption Bottom Bar */}
      <div
        style={{
          marginTop: '20px',
          textAlign: 'center',
          color: '#FFFFFF',
          maxWidth: '600px',
        }}
      >
        <p style={{ fontSize: '15px', fontWeight: 500, margin: '0 0 4px 0' }}>
          {currentImage.caption}
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          {currentImage.alt}
        </p>
      </div>
    </div>
  );
};
