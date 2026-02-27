// Cache configuration
const CACHE_TTL = {
  SHORT: 60 * 5, // 5 minutes
  MEDIUM: 60 * 15, // 15 minutes
  LONG: 60 * 60, // 1 hour
  VERY_LONG: 60 * 60 * 24, // 24 hours
};

class CacheService {
  // In-memory cache only (simplified for Engine API hook compatibility)
  private memoryCache = new Map<string, { value: any; expires: number }>();

  private generateKey(prefix: string, ...args: (string | number)[]): string {
    return `${prefix}:${args.join(':')}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const item = this.memoryCache.get(key);
      if (!item) return null;
      
      if (Date.now() > item.expires) {
        this.memoryCache.delete(key);
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.warn('Cache get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl: number = CACHE_TTL.MEDIUM): Promise<void> {
    try {
      this.memoryCache.set(key, {
        value,
        expires: Date.now() + (ttl * 1000),
      });
    } catch (error) {
      console.warn('Cache set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      this.memoryCache.delete(key);
    } catch (error) {
      console.warn('Cache delete error:', error);
    }
  }

  async invalidatePattern(pattern: string): Promise<void> {
    try {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      for (const key of this.memoryCache.keys()) {
        if (regex.test(key)) {
          this.memoryCache.delete(key);
        }
      }
    } catch (error) {
      console.warn('Cache invalidate pattern error:', error);
    }
  }
}

export const cacheService = new CacheService();

// Cache decorators and utilities
export function withCache<T>(
  keyGenerator: (...args: any[]) => string,
  ttl: number = CACHE_TTL.MEDIUM
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<T> {
      const cacheKey = keyGenerator(...args);
      
      // Try to get from cache first
      const cached = await cacheService.get<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }

      // Execute the original method
      const result = await originalMethod.apply(this, args);
      
      // Cache the result
      await cacheService.set(cacheKey, result, ttl);
      
      return result;
    };

    return descriptor;
  };
}

// Cache key generators
export const cacheKeys = {
  user: (userId: string) => `user:${userId}`,
  project: (projectId: string) => `project:${projectId}`,
  client: (clientId: string) => `client:${clientId}`,
  quote: (quoteId: string) => `quote:${quoteId}`,
  invoice: (invoiceId: string) => `invoice:${invoiceId}`,
  search: (query: string, filters: string) => `search:${query}:${filters}`,
  dashboard: (userId: string, date: string) => `dashboard:${userId}:${date}`,
  analytics: (type: string, period: string) => `analytics:${type}:${period}`,
};

// Cache invalidation helpers
export const invalidateCache = {
  user: (userId: string) => cacheService.del(cacheKeys.user(userId)),
  project: (projectId: string) => cacheService.del(cacheKeys.project(projectId)),
  client: (clientId: string) => cacheService.del(cacheKeys.client(clientId)),
  quote: (quoteId: string) => cacheService.del(cacheKeys.quote(quoteId)),
  invoice: (invoiceId: string) => cacheService.del(cacheKeys.invoice(invoiceId)),
  
  // Bulk invalidation
  userRelated: (userId: string) => cacheService.invalidatePattern(`*:${userId}:*`),
  projectRelated: (projectId: string) => cacheService.invalidatePattern(`*:${projectId}:*`),
  clientRelated: (clientId: string) => cacheService.invalidatePattern(`*:${clientId}:*`),
  
  // Search cache
  search: () => cacheService.invalidatePattern('search:*'),
  
  // Dashboard cache
  dashboard: (userId: string) => cacheService.invalidatePattern(`dashboard:${userId}:*`),
  
  // Analytics cache
  analytics: () => cacheService.invalidatePattern('analytics:*'),
};