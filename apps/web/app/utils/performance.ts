'use client';

import { useCallback, useMemo, useRef, useEffect, useState } from 'react';

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const [currentRenderCount, setCurrentRenderCount] = useState(0);
  const lastRenderTime = useRef(() => Date.now());

  useEffect(() => {
    renderCount.current += 1;
    const now = Date.now();
    const timeSinceLastRender = now - lastRenderTime.current();

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 ${componentName} render #${renderCount.current}, time since last: ${timeSinceLastRender}ms`);
    }

    lastRenderTime.current = () => now;
    setCurrentRenderCount(renderCount.current);
  }, [componentName]);

  return { renderCount: currentRenderCount };
}

// Debounced hook for performance optimization
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
}

// Virtual scrolling hook for large lists
export function useVirtualScrolling<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const visibleCount = useMemo(() => Math.ceil(containerHeight / itemHeight), [containerHeight, itemHeight]);

  return useMemo(() => {
    const totalCount = items.length;

    return {
      visibleItems: items.slice(0, visibleCount),
      totalCount,
      itemHeight,
      visibleCount,
    };
  }, [items, itemHeight, visibleCount]);
}

// Intersection Observer for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  callback: () => void,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, callback, options]);
}

// Performance metrics collector
export class PerformanceMetrics {
  private static instance: PerformanceMetrics;
  private metrics: Map<string, number[]> = new Map();

  static getInstance() {
    if (!PerformanceMetrics.instance) {
      PerformanceMetrics.instance = new PerformanceMetrics();
    }
    return PerformanceMetrics.instance;
  }

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  getAverageMetric(name: string): number {
    const values = this.metrics.get(name) || [];
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }

  getMetrics() {
    const result: Record<string, { avg: number; min: number; max: number; count: number }> = {};

    for (const [name, values] of this.metrics.entries()) {
      if (values.length > 0) {
        result[name] = {
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          count: values.length,
        };
      }
    }

    return result;
  }
}

// Bundle size monitoring
export function useBundleSizeMonitor() {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          PerformanceMetrics.getInstance().recordMetric(
            `resource-${resource.name}`,
            resource.transferSize || 0
          );
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });
    return () => observer.disconnect();
  }, []);
}

// Memory leak detection
export function useMemoryLeakDetector(componentName: string) {
  const cleanupRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    const currentCleanup = cleanupRef.current;
    return () => {
      if (process.env.NODE_ENV === 'development' && currentCleanup.length === 0) {
        console.warn(`⚠️ Potential memory leak in ${componentName}: no cleanup functions registered`);
      }
      currentCleanup.forEach(cleanup => cleanup());
    };
  }, [componentName]);

  const registerCleanup = useCallback((cleanup: () => void) => {
    cleanupRef.current.push(cleanup);
  }, []);

  return { registerCleanup };
}

// Optimized image loading
export function useOptimizedImage(src: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setLoaded(true);
      setError(null);
      PerformanceMetrics.getInstance().recordMetric('image-load-time', performance.now());
    };

    img.onerror = () => {
      setError('Failed to load image');
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error };
}
