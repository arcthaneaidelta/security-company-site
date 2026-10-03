import React, { useState, useEffect } from 'react';
import { Shield, Clock, MapPin, Radio, Activity, CheckCircle2 } from 'lucide-react';
import { coveragePosts } from '../../data/content';
import { useReducedMotion } from '../../lib/useReducedMotion';

export const CoverageCard: React.FC = () => {
  const [posts, setPosts] = useState(coveragePosts);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * posts.length);
      setActiveIdx(randomIdx);

      setTimeout(() => {
        setPosts((prev) => {
          const next = [...prev];
          const currStatus = next[randomIdx].status;
          next[randomIdx] = {
            ...next[randomIdx],
            status: currStatus === 'On post' ? 'Patrol' : 'On post',
          };
          return next;
        });
        setActiveIdx(null);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length, prefersReduced]);

  return (
    <div
      aria-live="off"
      style={{
        background: 'linear-gradient(180deg, rgba(24, 34, 53, 0.85) 0%, rgba(15, 22, 34, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.08)',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        position: 'relative',
        overflow: 'hidden',
        color: '#FFFFFF',
      }}
      className="coverage-card"
    >
      {/* Ambient top gold line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        }}
      />

      {/* Header of the live dashboard */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              position: 'relative',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--success)',
              boxShadow: '0 0 12px var(--success)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}
            >
              Live Operations Console
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Real-time dispatch status
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            background: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--accent-text)',
            fontWeight: 600,
          }}
        >
          <Activity size={12} />
          <span>Active Feed</span>
        </div>
      </div>

      {/* List of 4 Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {posts.map((post, idx) => {
          const isTransitioning = activeIdx === idx;
          const isOnPost = post.status === 'On post';
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '14px',
                transition: 'all 250ms ease',
                opacity: isTransitioning ? 0.4 : 1,
                transform: isTransitioning ? 'scale(0.99)' : 'none',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: '#F1F5F9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} color="var(--accent)" />
                  <span>{post.location}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '22px', marginTop: '2px' }}>
                  {post.area} · <span style={{ color: 'var(--text-secondary)' }}>{post.shift}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  backgroundColor: isOnPost ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                  color: isOnPost ? '#34D399' : '#38BDF8',
                  border: `1px solid ${isOnPost ? 'rgba(16, 185, 129, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`,
                  boxShadow: isOnPost ? '0 0 12px rgba(16, 185, 129, 0.15)' : '0 0 12px rgba(56, 189, 248, 0.15)',
                }}
              >
                {isOnPost ? <Shield size={12} /> : <Radio size={12} />}
                <span>{post.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer of the Live Console */}
      <div
        style={{
          marginTop: '18px',
          paddingTop: '14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={13} color="var(--accent)" />
          <span>Shift Coverage: <strong>100%</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399', fontWeight: 600 }}>
          <CheckCircle2 size={13} />
          <span>All posts verified</span>
        </div>
      </div>
    </div>
  );
};
