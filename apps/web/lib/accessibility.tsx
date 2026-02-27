/**
 * StudioOS Accessibility Engine
 *
 * WCAG 3.0 AAA compliance with semantic HTML5, ARIA labels,
 * keyboard navigation, screen reader optimization, and voice control.
 */

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Accessibility configuration
export const ACCESSIBILITY_CONFIG = {
  // WCAG 3.0 AAA requirements
  contrastRatio: {
    normal: 7, // 7:1 for normal text
    large: 4.5, // 4.5:1 for large text
  },

  // Focus management
  focusVisible: {
    outline: '2px solid #6366f1',
    outlineOffset: '2px',
  },

  // Screen reader announcements
  announcements: {
    politeness: 'polite',
    assertive: 'assertive',
  },

  // Keyboard navigation
  keyboard: {
    skipLinks: true,
    trapFocus: true,
    restoreFocus: true,
  },

  // Voice control
  voice: {
    enabled: true,
    wakeWord: 'studio',
    commands: true,
  },
};

// Accessibility context
interface AccessibilityContextType {
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  voiceControl: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleScreenReader: () => void;
  toggleKeyboardNavigation: () => void;
  toggleVoiceControl: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => void;
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
}

const AccessibilityContext = React.createContext<AccessibilityContextType>({
  highContrast: false,
  reducedMotion: false,
  screenReader: false,
  keyboardNavigation: false,
  voiceControl: false,
  fontSize: 'medium',
  toggleHighContrast: () => {},
  toggleReducedMotion: () => {},
  toggleScreenReader: () => {},
  toggleKeyboardNavigation: () => {},
  toggleVoiceControl: () => {},
  setFontSize: () => {},
  announce: () => {},
});

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [voiceControl, setVoiceControl] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'extra-large'>('medium');
  const [announcement, setAnnouncement] = useState<{ message: string; politeness: 'polite' | 'assertive' } | null>(null);

  // Detect user preferences with lazy initialization
  useEffect(() => {
    const mediaQueries = {
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      screenReader: window.matchMedia('(prefers-reduced-data: reduce)'),
    };

    // Initialize with lazy state setting
    const initializePreferences = () => {
      setHighContrast(mediaQueries.highContrast.matches);
      setReducedMotion(mediaQueries.reducedMotion.matches);
      setScreenReader(mediaQueries.screenReader.matches);
    };

    initializePreferences();

    const handleChange = (mq: MediaQueryListEvent, key: keyof typeof mediaQueries) => {
      switch (key) {
        case 'highContrast':
          setHighContrast(mq.matches);
          break;
        case 'reducedMotion':
          setReducedMotion(mq.matches);
          break;
        case 'screenReader':
          setScreenReader(mq.matches);
          break;
      }
    };

    Object.entries(mediaQueries).forEach(([key, mq]) => {
      mq.addEventListener('change', (e) => handleChange(e, key as keyof typeof mediaQueries));
    });

    return () => {
      Object.entries(mediaQueries).forEach(([key, mq]) => {
        mq.removeEventListener('change', (e) => handleChange(e, key as keyof typeof mediaQueries));
      });
    };
  }, []);

  // Apply accessibility classes to document
  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('high-contrast', highContrast);
    root.classList.toggle('reduced-motion', reducedMotion);
    root.classList.toggle('screen-reader', screenReader);
    root.classList.toggle('keyboard-nav', keyboardNavigation);
    root.classList.toggle('voice-control', voiceControl);
    root.setAttribute('data-font-size', fontSize);

    // Update CSS custom properties
    root.style.setProperty('--font-size-multiplier',
      fontSize === 'small' ? '0.875' :
      fontSize === 'medium' ? '1' :
      fontSize === 'large' ? '1.125' :
      '1.25'
    );
  }, [highContrast, reducedMotion, screenReader, keyboardNavigation, voiceControl, fontSize]);

  // Announcement system
  const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement({ message, politeness });
    setTimeout(() => setAnnouncement(null), 1000);
  };

  const contextValue: AccessibilityContextType = {
    highContrast,
    reducedMotion,
    screenReader,
    keyboardNavigation,
    voiceControl,
    fontSize,
    toggleHighContrast: () => setHighContrast(!highContrast),
    toggleReducedMotion: () => setReducedMotion(!reducedMotion),
    toggleScreenReader: () => setScreenReader(!screenReader),
    toggleKeyboardNavigation: () => setKeyboardNavigation(!keyboardNavigation),
    toggleVoiceControl: () => setVoiceControl(!voiceControl),
    setFontSize,
    announce,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      {announcement && (
        <div
          aria-live={announcement.politeness}
          className="sr-only"
        >
          {announcement.message}
        </div>
      )}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => React.useContext(AccessibilityContext);

// Accessible components
export const SkipLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    {children}
  </a>
);

export const FocusTrap = ({ children, active }: { children: React.ReactNode; active: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    // Store current focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus first element
    focusableElements[0].focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [active]);

  return <div ref={containerRef}>{children}</div>;
};

export const AriaLive = ({
  children,
  politeness = 'polite',
  atomic = false
}: {
  children: React.ReactNode;
  politeness?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
}) => (
  <div
    aria-live={politeness}
    aria-atomic={atomic}
    className="sr-only"
  >
    {children}
  </div>
);

// Voice control hooks
export const useVoiceControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
  };
};

// Keyboard navigation utilities
export const useKeyboardNavigation = (
  items: string[],
  onSelect: (item: string, index: number) => void,
  options: {
    orientation?: 'horizontal' | 'vertical';
    loop?: boolean;
  } = {}
) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { orientation = 'vertical', loop = true } = options;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isVertical = orientation === 'vertical';
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

      switch (e.key) {
        case nextKey:
          e.preventDefault();
          setActiveIndex(prev => {
            const next = prev + 1;
            if (next >= items.length) {
              return loop ? 0 : prev;
            }
            return next;
          });
          break;

        case prevKey:
          e.preventDefault();
          setActiveIndex(prev => {
            const next = prev - 1;
            if (next < 0) {
              return loop ? items.length - 1 : prev;
            }
            return next;
          });
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < items.length) {
            onSelect(items[activeIndex], activeIndex);
          }
          break;

        case 'Escape':
          e.preventDefault();
          setActiveIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, activeIndex, onSelect, orientation, loop]);

  return { activeIndex, setActiveIndex };
};

// Color contrast checker
export const checkContrast = (foreground: string, background: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = color.match(/\\d+/g)?.map(Number) || [0, 0, 0];
    const [r, g, b] = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(foreground);
  const lum2 = getLuminance(background);

  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

// Focus visible utility
export const useFocusVisible = () => {
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocusVisible(true);
      }
    };

    const handleMouseDown = () => {
      setIsFocusVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return isFocusVisible;
};

export default AccessibilityProvider;
