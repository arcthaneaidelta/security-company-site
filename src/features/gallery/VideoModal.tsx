import React, { useState, useRef } from 'react';
import { Play, Pause, Captions, FileText, ChevronDown } from 'lucide-react';
import { useUi } from '../../context/UiContext';
import { videos } from '../../data/content';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

export const VideoModal: React.FC = () => {
  const { activeVideoId, closeVideoModal } = useUi();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeVideo = videos.find((v) => v.id === activeVideoId) || videos[0];

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (!activeVideoId) return null;

  return (
    <Modal
      isOpen={Boolean(activeVideoId)}
      onClose={() => {
        setIsPlaying(false);
        closeVideoModal();
      }}
      title={activeVideo.title}
      maxWidth="760px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Video Player Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
            backgroundColor: '#000000',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            playsInline
            controls
            poster={activeVideo.poster}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-security-guard-walking-along-a-corridor-42407-large.mp4"
              type="video/mp4"
            />
            {/* Embedded WebVTT Captions simulation */}
            {showCaptions && (
              <track
                kind="captions"
                srcLang="en"
                label="English Captions"
                default
                src="data:text/vtt;charset=utf-8,WEBVTT%0A%0A00:00.000%20-->%2000:04.000%0AAt%20Northgate%20Protective%20Services,%20every%20shift%20begins%20with%20a%20briefing.%0A%0A00:04.000%20-->%2000:08.000%0AOur%20officers%20are%20trained,%20uniformed,%20and%20accountable."
              />
            )}
            Your browser does not support HTML5 video.
          </video>
        </div>

        {/* Accessibility & Caption Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '12px 16px',
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Duration: <strong>{activeVideo.duration}</strong> · HD 1080p
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setShowCaptions(!showCaptions)}
              aria-pressed={showCaptions}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: showCaptions ? 'var(--primary)' : 'var(--surface)',
                color: showCaptions ? '#FFFFFF' : 'var(--text)',
                border: '1px solid var(--border)',
                minHeight: '36px',
              }}
            >
              <Captions size={16} />
              <span>{showCaptions ? 'Captions ON' : 'Captions OFF'}</span>
            </button>
          </div>
        </div>

        {/* Video Transcript Disclosure (WCAG requirement) */}
        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            aria-expanded={isTranscriptOpen}
            aria-controls="video-transcript"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text)',
              backgroundColor: 'var(--surface-elevated)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="var(--accent-text)" />
              <span>Full Video Transcript & Audio Description</span>
            </div>
            <ChevronDown
              size={16}
              style={{
                transform: isTranscriptOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform var(--dur-fast) ease',
              }}
            />
          </button>

          {isTranscriptOpen && (
            <div
              id="video-transcript"
              style={{
                padding: '16px',
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--text-secondary)',
                maxHeight: '160px',
                overflowY: 'auto',
                borderTop: '1px solid var(--border)',
              }}
            >
              <p><strong>[0:00 - 0:15]</strong> [Visual: Security officer in crisp navy uniform walks through a glass corporate lobby during sunrise.]</p>
              <p><strong>Voiceover:</strong> "At Northgate Protective Services, security isn't just about presence. It's about preparedness. Every morning, our officers report on time with verified post orders and direct communications open to dispatch."</p>
              <p><strong>[0:15 - 0:45]</strong> [Visual: Officer checks badges, conducts corridor rounds, and logs patrol scans into a mobile tablet.]</p>
              <p><strong>Voiceover:</strong> "From corporate towers to medical centers and construction sites, our clients receive daily activity reports by 8 AM. Real accountability, every shift."</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
