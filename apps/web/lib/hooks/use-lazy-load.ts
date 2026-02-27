import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Lazy loading hook with intersection observer
 * Optimizes performance by only loading data when needed
 */
export function useLazyLoad<T>(
  loadFunction: () => Promise<T>,
  options: {
    threshold?: number;
    rootMargin?: string;
    enabled?: boolean;
    cacheKey?: string;
  } = {}
) {
  const { threshold = 0.1, rootMargin = '50px', enabled = true, cacheKey } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const targetRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadPromiseRef = useRef<Promise<T> | null>(null);

  // Cache mechanism
  const cache = useRef<Map<string, { data: T; timestamp: number }>>(new Map());
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const load = useCallback(async () => {
    if (!enabled || hasLoaded || loading) return;

    setLoading(true);
    setError(null);

    try {
      // Check cache first
      if (cacheKey && cache.current.has(cacheKey)) {
        const cached = cache.current.get(cacheKey)!;
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
          setData(cached.data);
          setHasLoaded(true);
          setLoading(false);
          return;
        }
      }

      // Load data
      if (!loadPromiseRef.current) {
        loadPromiseRef.current = loadFunction();
      }

      const result = await loadPromiseRef.current;
      
      setData(result);
      setHasLoaded(true);

      // Cache the result
      if (cacheKey) {
        cache.current.set(cacheKey, {
          data: result,
          timestamp: Date.now(),
        });
      }

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load data'));
    } finally {
      setLoading(false);
      loadPromiseRef.current = null;
    }
  }, [loadFunction, enabled, hasLoaded, loading, cacheKey]);

  useEffect(() => {
    if (!enabled || hasLoaded) return;

    const target = targetRef.current;
    if (!target) return;

    // Use Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          // Disconnect observer after loading
          observerRef.current?.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current.observe(target);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [enabled, hasLoaded, load, threshold, rootMargin]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    setHasLoaded(false);
    loadPromiseRef.current = null;
  }, []);

  const refetch = useCallback(() => {
    reset();
    load();
  }, [reset, load]);

  return {
    data,
    loading,
    error,
    hasLoaded,
    targetRef,
    reset,
    refetch,
  };
}

/**
 * Virtualization hook for long lists
 */
export function useVirtualization<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalItems = items.length;

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    totalHeight,
    startIndex,
    endIndex,
    totalItems,
    handleScroll,
    scrollTop,
  };
}

/**
 * Debounced search hook
 */
export function useDebouncedSearch<T>(
  searchFunction: (query: string) => Promise<T[]>,
  delay: number = 300
) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const debouncedSearch = useCallback(
    async (searchQuery: string) => {
      setQuery(searchQuery);
      
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Abort previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      timeoutRef.current = setTimeout(async () => {
        try {
          abortControllerRef.current = new AbortController();
          
          const data = await searchFunction(searchQuery);
          
          if (!abortControllerRef.current.signal.aborted) {
            setResults(data);
          }
        } catch (err) {
          if (!abortControllerRef.current?.signal.aborted) {
            setError(err instanceof Error ? err : new Error('Search failed'));
            setResults([]);
          }
        } finally {
          if (!abortControllerRef.current?.signal.aborted) {
            setLoading(false);
          }
        }
      }, delay);
    },
    [searchFunction, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    query,
    results,
    loading,
    error,
    search: debouncedSearch,
    setQuery: (q: string) => {
      setQuery(q);
      debouncedSearch(q);
    },
  };
}

/**
 * Infinite scroll hook
 */
export function useInfiniteScroll<T>(
  fetchFunction: (page: number) => Promise<T[]>,
  options: {
    initialPage?: number;
    threshold?: number;
    enabled?: boolean;
  } = {}
) {
  const { initialPage = 1, threshold = 0.8, enabled = true } = options;
  
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (!enabled || loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newItems = await fetchFunction(page);
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more items'));
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, page, loading, hasMore, enabled]);

  useEffect(() => {
    const lastItem = lastItemRef.current;
    if (!lastItem || !enabled) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold }
    );

    observerRef.current.observe(lastItem);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items.length, hasMore, loading, threshold, loadMore, enabled]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(initialPage);
    setHasMore(true);
    setLoading(false);
    setError(null);
  }, [initialPage]);

  return {
    items,
    loading,
    hasMore,
    error,
    lastItemRef,
    reset,
  };
}