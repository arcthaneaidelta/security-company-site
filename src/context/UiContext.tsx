import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BrandTokens {
  companyName: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
}

interface UiContextType {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  activeVideoId: string | null;
  openVideoModal: (videoId: string) => void;
  closeVideoModal: () => void;
  isCookieNoticeDismissed: boolean;
  dismissCookieNotice: () => void;
  brandTokens: BrandTokens;
  updateBrandTokens: (tokens: Partial<BrandTokens>) => void;
  resetBrandTokens: () => void;
  isBrandPanelOpen: boolean;
  setIsBrandPanelOpen: (open: boolean) => void;
  isReducedMotionActive: boolean;
  toggleReducedMotion: () => void;
}

const defaultBrandTokens: BrandTokens = {
  companyName: 'Northgate Protective Services',
  primaryColor: '#1E3A5F',
  accentColor: '#D4AF37',
  bgColor: '#0B0F17',
  surfaceColor: '#131B2A',
};

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isCookieNoticeDismissed, setIsCookieNoticeDismissed] = useState(false);
  const [brandTokens, setBrandTokens] = useState<BrandTokens>(defaultBrandTokens);
  const [isBrandPanelOpen, setIsBrandPanelOpen] = useState(false);
  const [isReducedMotionActive, setIsReducedMotionActive] = useState(false);

  // Check URL parameters for ?brand=1 or ?fail=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('brand') === '1') {
      setIsBrandPanelOpen(true);
    }
  }, []);

  // Update CSS variables when brand tokens change
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', brandTokens.primaryColor);
    root.style.setProperty('--accent', brandTokens.accentColor);
    root.style.setProperty('--bg', brandTokens.bgColor);
    root.style.setProperty('--surface', brandTokens.surfaceColor);
  }, [brandTokens]);

  const openVideoModal = (videoId: string) => setActiveVideoId(videoId);
  const closeVideoModal = () => setActiveVideoId(null);
  const dismissCookieNotice = () => setIsCookieNoticeDismissed(true);

  const updateBrandTokens = (tokens: Partial<BrandTokens>) => {
    setBrandTokens((prev) => ({ ...prev, ...tokens }));
  };

  const resetBrandTokens = () => {
    setBrandTokens(defaultBrandTokens);
  };

  const toggleReducedMotion = () => {
    setIsReducedMotionActive((prev) => !prev);
  };

  return (
    <UiContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        activeVideoId,
        openVideoModal,
        closeVideoModal,
        isCookieNoticeDismissed,
        dismissCookieNotice,
        brandTokens,
        updateBrandTokens,
        resetBrandTokens,
        isBrandPanelOpen,
        setIsBrandPanelOpen,
        isReducedMotionActive,
        toggleReducedMotion,
      }}
    >
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
}
