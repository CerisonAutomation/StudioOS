/**
 * Performance monitoring and optimization utilities
 */
import * as React from 'react';

// Performance metrics collection
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    this.setupObservers();
  }

  private setupObservers(): void {
    // Monitor navigation timing
    if ('PerformanceObserver' in window) {
      try {
        // Monitor largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('lcp', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);

        // Monitor first input delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            this.recordMetric('fid', (entry as any).processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);

        // Monitor cumulative layout shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.recordMetric('cls', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);

      } catch (error) {
        console.warn('Performance observers not supported:', error);
      }
    }
  }

  // Record custom performance metric
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  // Get performance metrics
  getMetrics(): Record<string, number[]> {
    return Object.fromEntries(this.metrics);
  }

  // Get average metric value
  getAverageMetric(name: string): number {
    const values = this.metrics.get(name) || [];
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics.clear();
  }

  // Cleanup observers
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.clearMetrics();
  }
}

// Resource loading optimization
export class ResourceOptimizer {
  private static instance: ResourceOptimizer;
  private preloadedResources: Set<string> = new Set();

  static getInstance(): ResourceOptimizer {
    if (!ResourceOptimizer.instance) {
      ResourceOptimizer.instance = new ResourceOptimizer();
    }
    return ResourceOptimizer.instance;
  }

  // Preload critical resources
  preloadCriticalResources(): void {
    const criticalResources = [
      '/fonts/inter-var.woff2',
      '/fonts/inter-var.woff',
      '/images/logo.svg',
      '/images/hero-bg.jpg',
    ];

    criticalResources.forEach(resource => {
      if (!this.preloadedResources.has(resource)) {
        this.preloadResource(resource);
      }
    });
  }

  private preloadResource(url: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    if (url.endsWith('.woff2') || url.endsWith('.woff')) {
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    } else if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.svg')) {
      link.as = 'image';
    }

    document.head.appendChild(link);
    this.preloadedResources.add(url);
  }

  // Lazy load non-critical resources
  lazyLoadResource(url: string, type: 'image' | 'script' | 'stylesheet'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(url)) {
        resolve();
        return;
      }

      let element: HTMLElement;

      switch (type) {
        case 'image':
          element = new Image();
          (element as HTMLImageElement).src = url;
          break;
        case 'script':
          element = document.createElement('script');
          (element as HTMLScriptElement).src = url;
          break;
        case 'stylesheet':
          element = document.createElement('link');
          (element as HTMLLinkElement).rel = 'stylesheet';
          (element as HTMLLinkElement).href = url;
          break;
      }

      element.onload = () => {
        this.preloadedResources.add(url);
        resolve();
      };

      element.onerror = () => reject(new Error(`Failed to load ${type}: ${url}`));

      if (type === 'script' || type === 'stylesheet') {
        document.head.appendChild(element);
      }
    });
  }

  // Optimize images
  optimizeImage(src: string, width?: number, height?: number): string {
    if (!src) return '';
    
    // Add WebP support detection
    const supportsWebP = this.checkWebPSupport();
    
    // Add responsive image parameters
    let optimizedSrc = src;
    
    if (width && height) {
      optimizedSrc += `?w=${width}&h=${height}&fit=crop`;
    }
    
    if (supportsWebP) {
      optimizedSrc += '&fm=webp';
    }
    
    return optimizedSrc;
  }

  private checkWebPSupport(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
}

// Bundle size optimization
export class BundleOptimizer {
  private static instance: BundleOptimizer;
  private chunkSizes: Map<string, number> = new Map();

  static getInstance(): BundleOptimizer {
    if (!BundleOptimizer.instance) {
      BundleOptimizer.instance = new BundleOptimizer();
    }
    return BundleOptimizer.instance;
  }

  // Measure chunk size
  measureChunkSize(chunkName: string, size: number): void {
    this.chunkSizes.set(chunkName, size);
  }

  // Get bundle analysis
  getBundleAnalysis(): { totalSize: number; chunks: Record<string, number> } {
    const totalSize = Array.from(this.chunkSizes.values()).reduce((sum, size) => sum + size, 0);
    return {
      totalSize,
      chunks: Object.fromEntries(this.chunkSizes),
    };
  }

  // Check if bundle size is within limits
  isWithinSizeLimit(limitKB: number): boolean {
    const { totalSize } = this.getBundleAnalysis();
    return totalSize <= limitKB * 1024;
  }
}

// Memory management
export class MemoryManager {
  private static instance: MemoryManager;
  private cleanupCallbacks: (() => void)[] = [];

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  // Register cleanup callback
  registerCleanup(callback: () => void): void {
    this.cleanupCallbacks.push(callback);
  }

  // Cleanup resources
  cleanup(): void {
    this.cleanupCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.warn('Cleanup callback failed:', error);
      }
    });
    this.cleanupCallbacks = [];
  }

  // Monitor memory usage
  getMemoryUsage(): { used: number; total: number; percentage: number } | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
      };
    }
    return null;
  }
}

// Export singleton instances
export const performanceMonitor = PerformanceMonitor.getInstance();
export const resourceOptimizer = ResourceOptimizer.getInstance();
export const bundleOptimizer = BundleOptimizer.getInstance();
export const memoryManager = MemoryManager.getInstance();

// Performance monitoring hook
export function usePerformanceMonitoring(componentName: string) {
  React.useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      performanceMonitor.recordMetric(`${componentName}-render-time`, renderTime);
      
      // Log slow renders
      if (renderTime > 16) { // More than one frame at 60fps
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);
}

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Preload critical resources on app start
  resourceOptimizer.preloadCriticalResources();
  
  // Monitor initial page load
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    performanceMonitor.recordMetric('page-load-time', loadTime);
  });
}