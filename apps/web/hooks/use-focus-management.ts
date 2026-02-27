'use client';

import { useRef, useEffect, useCallback } from 'react';

interface FocusManagementOptions {
  restoreFocus?: boolean;
  trapFocus?: boolean;
  autoFocus?: boolean;
}

export const useFocusManagement = (options: FocusManagementOptions = {}) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Store current focus before opening modal/drawer
  const captureFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  }, []);

  // Restore focus to previous element
  const restoreFocus = useCallback(() => {
    if (options.restoreFocus && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [options.restoreFocus]);

  // Announce to screen readers
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  // Focus trap implementation
  const createFocusTrap = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  // Auto-focus first focusable element
  const autoFocusFirstElement = useCallback((container: HTMLElement) => {
    if (!options.autoFocus) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }, [options.autoFocus]);

  // Setup focus management for a container
  const setupFocusManagement = useCallback((container: HTMLElement) => {
    containerRef.current = container;

    captureFocus();

    let cleanupFocusTrap: (() => void) | undefined;

    if (options.trapFocus) {
      cleanupFocusTrap = createFocusTrap(container);
    }

    autoFocusFirstElement(container);

    return () => {
      cleanupFocusTrap?.();
      restoreFocus();
    };
  }, [captureFocus, restoreFocus, createFocusTrap, autoFocusFirstElement, options.trapFocus]);

  // Skip link functionality
  const createSkipLinks = useCallback(() => {
    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#navigation', text: 'Skip to navigation' },
    ];

    return skipLinks.map((link) => ({
      ...link,
      className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-200'
    }));
  }, []);

  // Keyboard navigation enhancement
  const enhanceKeyboardNavigation = useCallback(() => {
    document.addEventListener('keydown', (e) => {
      // Alt + S: Skip to main content
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        mainContent?.focus();
      }

      // Alt + N: Skip to navigation
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        const navigation = document.getElementById('navigation');
        navigation?.focus();
      }

      // Escape: Close modals/drawers
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        const closeButton = activeElement?.closest('[data-close-on-escape]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    });
  }, []);

  // High contrast mode detection
  const detectHighContrastMode = useCallback(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    return mediaQuery.matches;
  }, []);

  // Reduced motion detection
  const detectReducedMotion = useCallback(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mediaQuery.matches;
  }, []);

  // Screen reader detection
  const detectScreenReader = useCallback(() => {
    // Common screen reader detection patterns
    const hasScreenReaderStyles = window.getComputedStyle(document.body).position === 'absolute';
    const hasVoiceOver = navigator.userAgent.includes('VoiceOver');
    const hasNVDA = navigator.userAgent.includes('NVDA');
    const hasJAWS = navigator.userAgent.includes('JAWS');

    return hasScreenReaderStyles || hasVoiceOver || hasNVDA || hasJAWS;
  }, []);

  // Initialize accessibility features
  useEffect(() => {
    enhanceKeyboardNavigation();

    // Announce page load to screen readers
    setTimeout(() => {
      announceToScreenReader('StudioOS application loaded');
    }, 100);
  }, [enhanceKeyboardNavigation, announceToScreenReader]);

  return {
    captureFocus,
    restoreFocus,
    announceToScreenReader,
    setupFocusManagement,
    createSkipLinks,
    detectHighContrastMode,
    detectReducedMotion,
    detectScreenReader,
    previousFocusRef,
    containerRef,
  };
};
