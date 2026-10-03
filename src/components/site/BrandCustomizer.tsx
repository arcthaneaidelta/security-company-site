import React from 'react';
import { Palette, RotateCcw, Check, Sparkles } from 'lucide-react';
import { useUi, BrandTokens } from '../../context/UiContext';
import { useToast } from '../../context/ToastContext';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Field } from '../ui/Field';

const presetPalettes: { name: string; tokens: Partial<BrandTokens> }[] = [
  {
    name: 'Northgate Obsidian & Gold (Default)',
    tokens: {
      companyName: 'Northgate Protective Services',
      primaryColor: '#1E3A5F',
      accentColor: '#D4AF37',
      bgColor: '#0B0F17',
      surfaceColor: '#131B2A',
    },
  },
  {
    name: 'Apex Midnight & Bronze',
    tokens: {
      companyName: 'Apex Security Group',
      primaryColor: '#242F3D',
      accentColor: '#D97706',
      bgColor: '#0D1117',
      surfaceColor: '#161B22',
    },
  },
  {
    name: 'Vanguard Emerald & Brass',
    tokens: {
      companyName: 'Vanguard Patrol & Guard',
      primaryColor: '#1E392A',
      accentColor: '#10B981',
      bgColor: '#08120D',
      surfaceColor: '#102219',
    },
  },
  {
    name: 'Sentinel High-Trust Cobalt',
    tokens: {
      companyName: 'Sentinel Defense Corp',
      primaryColor: '#1E3A8A',
      accentColor: '#38BDF8',
      bgColor: '#080E1A',
      surfaceColor: '#0F1D35',
    },
  },
];

export const BrandCustomizer: React.FC = () => {
  const {
    isBrandPanelOpen,
    setIsBrandPanelOpen,
    brandTokens,
    updateBrandTokens,
    resetBrandTokens,
    isReducedMotionActive,
    toggleReducedMotion,
  } = useUi();
  const { showToast } = useToast();

  const handleApplyPreset = (preset: typeof presetPalettes[0]) => {
    updateBrandTokens(preset.tokens);
    showToast(`Brand swapped to ${preset.name} (live demo)`, 'success');
  };

  const handleReset = () => {
    resetBrandTokens();
    showToast('Reset to default Northgate design tokens', 'info');
  };

  return (
    <Drawer
      isOpen={isBrandPanelOpen}
      onClose={() => setIsBrandPanelOpen(false)}
      title="Live Brand Tokens Swapper"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Intro */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(176, 138, 74, 0.08)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-md)',
            fontSize: '14px',
            lineHeight: '1.5',
            color: 'var(--text)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, marginBottom: '4px', color: 'var(--accent-text)' }}>
            <Sparkles size={16} />
            <span>Recommended Enhancement</span>
          </div>
          This demo is built entirely on decoupled CSS custom properties. Test how effortlessly your actual brand identity, logo name, and color palette can be applied.
        </div>

        {/* Preset Palettes */}
        <div>
          <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            1-Click Client Brand Presets
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            {presetPalettes.map((preset, idx) => {
              const isCurrent = brandTokens.companyName === preset.tokens.companyName;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    backgroundColor: isCurrent ? 'var(--surface)' : 'transparent',
                    border: `1px solid ${isCurrent ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all var(--dur-fast) var(--ease-standard)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
                      {preset.name}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: preset.tokens.primaryColor,
                          border: '1px solid #fff',
                        }}
                      />
                      <span
                        style={{
                          display: 'inline-block',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: preset.tokens.accentColor,
                          border: '1px solid #fff',
                        }}
                      />
                      <span
                        style={{
                          display: 'inline-block',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: preset.tokens.bgColor,
                          border: '1px solid var(--border)',
                        }}
                      />
                    </div>
                  </div>
                  {isCurrent && <Check size={18} color="var(--primary)" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            Live Variable Overrides
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            <Field
              label="Company Name"
              value={brandTokens.companyName}
              onChange={(e) => updateBrandTokens({ companyName: e.target.value })}
              hint="Updates header, logo and footer instantly"
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Primary Color
                </label>
                <input
                  type="color"
                  value={brandTokens.primaryColor}
                  onChange={(e) => updateBrandTokens({ primaryColor: e.target.value })}
                  style={{ width: '100%', height: '40px', padding: '2px', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Brass / Accent Color
                </label>
                <input
                  type="color"
                  value={brandTokens.accentColor}
                  onChange={(e) => updateBrandTokens({ accentColor: e.target.value })}
                  style={{ width: '100%', height: '40px', padding: '2px', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Test Switch */}
        <div style={{ padding: '16px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
            Accessibility Simulation
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
            Test how the site behaves under strict reduced motion preference.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={toggleReducedMotion}
          >
            {isReducedMotionActive ? 'Disable Reduced Motion Sim' : 'Enable Reduced Motion Sim'}
          </Button>
        </div>

        {/* Reset */}
        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
          <Button
            variant="secondary"
            onClick={handleReset}
            leftIcon={<RotateCcw size={14} />}
            style={{ flex: 1 }}
          >
            Reset to default
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsBrandPanelOpen(false)}
            style={{ flex: 1 }}
          >
            Done
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
