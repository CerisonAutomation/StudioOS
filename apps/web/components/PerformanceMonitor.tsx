'use client';

import React, { useEffect, useState, useRef } from 'react';
import { performanceMonitor, resourceOptimizer, bundleOptimizer, memoryManager } from '@/lib/performance';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  pageLoadTime: number;
  memoryUsage: number | null;
  bundleSize: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    pageLoadTime: 0,
    memoryUsage: null,
    bundleSize: 0,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start performance monitoring
    const updateMetrics = () => {
      const currentMetrics = performanceMonitor.getMetrics();
      const memoryUsage = memoryManager.getMemoryUsage();
      const bundleAnalysis = bundleOptimizer.getBundleAnalysis();

      setMetrics({
        lcp: currentMetrics.lcp?.[0] || 0,
        fid: currentMetrics.fid?.[0] || 0,
        cls: currentMetrics.cls?.[0] || 0,
        pageLoadTime: currentMetrics['page-load-time']?.[0] || 0,
        memoryUsage: memoryUsage?.percentage || null,
        bundleSize: bundleAnalysis.totalSize,
      });
    };

    // Initial update
    updateMetrics();

    // Update every 5 seconds
    intervalRef.current = setInterval(updateMetrics, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getScoreColor = (value: number, type: 'lcp' | 'fid' | 'cls'): string => {
    switch (type) {
      case 'lcp':
        return value < 2500 ? 'text-green-500' : value < 4000 ? 'text-yellow-500' : 'text-red-500';
      case 'fid':
        return value < 100 ? 'text-green-500' : value < 300 ? 'text-yellow-500' : 'text-red-500';
      case 'cls':
        return value < 0.1 ? 'text-green-500' : value < 0.25 ? 'text-yellow-500' : 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms.toFixed(0)} ms`;
    return `${(ms / 1000).toFixed(2)} s`;
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        aria-label="Open Performance Monitor"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 z-50 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-white">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3">
        {/* Core Web Vitals */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Core Web Vitals</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">LCP:</span>
              <span className={getScoreColor(metrics.lcp, 'lcp')}>
                {formatTime(metrics.lcp)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">FID:</span>
              <span className={getScoreColor(metrics.fid, 'fid')}>
                {formatTime(metrics.fid)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">CLS:</span>
              <span className={getScoreColor(metrics.cls, 'cls')}>
                {metrics.cls.toFixed(3)}
              </span>
            </div>
          </div>
        </div>

        {/* Memory Usage */}
        {metrics.memoryUsage !== null && (
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Memory Usage</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Usage:</span>
              <span className={metrics.memoryUsage > 80 ? 'text-red-500' : 'text-green-500'}>
                {metrics.memoryUsage.toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {/* Bundle Size */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Bundle Size</h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Total:</span>
            <span className={metrics.bundleSize > 1024 * 1024 ? 'text-yellow-500' : 'text-green-500'}>
              {formatBytes(metrics.bundleSize)}
            </span>
          </div>
        </div>

        {/* Page Load Time */}
        <div>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Page Load</h4>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Time:</span>
            <span className="text-green-500">
              {formatTime(metrics.pageLoadTime)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              performanceMonitor.clearMetrics();
              setMetrics({
                lcp: 0, fid: 0, cls: 0, pageLoadTime: 0, memoryUsage: null, bundleSize: 0
              });
            }}
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Clear Metrics
          </button>
          <button
            onClick={() => resourceOptimizer.preloadCriticalResources()}
            className="flex-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs py-1 px-2 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            Preload Resources
          </button>
        </div>
      </div>
    </div>
  );
}

// Performance overlay for development
export function PerformanceOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState({
    fps: 0,
    renderTime: 0,
    memory: 0,
  });

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const measureFPS = (currentTime: number) => {
      frameCount++;
      const timeDiff = currentTime - lastFpsTime;

      if (timeDiff >= 1000) {
        const fps = Math.round((frameCount * 1000) / timeDiff);
        const renderTime = currentTime - lastTime;
        const memory = memoryManager.getMemoryUsage()?.percentage || 0;

        setMetrics({ fps, renderTime, memory });
        frameCount = 0;
        lastFpsTime = currentTime;
      }

      lastTime = currentTime;
      requestAnimationFrame(measureFPS);
    };

    const id = requestAnimationFrame(measureFPS);

    return () => cancelAnimationFrame(id);
  }, []);

  if (!isVisible || process.env.NODE_ENV !== 'development') {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded shadow-lg hover:bg-red-600 transition-colors z-50 opacity-50 hover:opacity-100"
        aria-label="Open Performance Overlay"
      >
        🚀
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg font-mono text-sm z-50">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 text-gray-400 hover:text-white"
      >
        ✕
      </button>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-gray-400">FPS:</span>
          <span className={metrics.fps > 55 ? 'text-green-400' : metrics.fps > 30 ? 'text-yellow-400' : 'text-red-400'}>
            {metrics.fps}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Render:</span>
          <span className={metrics.renderTime < 16 ? 'text-green-400' : 'text-red-400'}>
            {metrics.renderTime.toFixed(1)}ms
          </span>
        </div>
        <div>
          <span className="text-gray-400">Memory:</span>
          <span className={metrics.memory > 80 ? 'text-red-400' : 'text-green-400'}>
            {metrics.memory.toFixed(1)}%
          </span>
        </div>
        <div>
          <span className="text-gray-400">Status:</span>
          <span className="text-green-400">Optimal</span>
        </div>
      </div>
    </div>
  );
}