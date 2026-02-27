'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create optimized query client with performance settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Performance optimizations
      staleTime: 10 * 60 * 1000, // 10 minutes - longer cache for better performance
      gcTime: 30 * 60 * 1000, // 30 minutes - garbage collection time
      refetchOnWindowFocus: false, // Disable to prevent unnecessary refetches
      refetchOnReconnect: true, // Only refetch on reconnect
      refetchOnMount: true, // Refetch on mount for fresh data
      retry: (failureCount, error) => {
        // Smart retry logic - don't retry on 401/403/404 errors
        const status = (error as any)?.status;
        if (status === 401 || status === 403 || status === 404) {
          return false;
        }
        return failureCount < 3; // Retry up to 3 times
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      // Prefetching for better UX
      placeholderData: (previousData: any) => previousData, // Keep previous data while fetching
    },
    mutations: {
      retry: 1, // Fewer retries for mutations
      retryDelay: 1000,
    },
  },
});

// Custom hook for query invalidation with performance optimization
export function useOptimizedQueryClient() {
  return queryClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
