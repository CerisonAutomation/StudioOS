// Enterprise Configuration Management
import { z } from 'zod';

// Environment variable schema with comprehensive validation
const AppConfigSchema = z.object({
  // Database Configuration
  database: z.object({
    url: z.string().url().optional(),
    poolMax: z.number().min(1).max(100).default(10),
    poolTimeout: z.number().min(1000).max(600000).default(30000),
    retryAttempts: z.number().min(1).max(10).default(3),
    retryDelay: z.number().min(100).max(30000).default(1000),
  }),
  
  // API Configuration
  api: z.object({
    baseUrl: z.string().default('/api'),
    timeout: z.number().min(1000).max(300000).default(60000),
    rateLimit: z.object({
      windowMs: z.number().min(1000).default(60000),
      maxRequests: z.number().min(10).max(10000).default(1000),
    }),
    cors: z.object({
      origins: z.array(z.string()).default(['http://localhost:3000']),
      methods: z.array(z.string()).default(['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']),
      credentials: z.boolean().default(true),
    }),
  }),
  
  // Security Configuration
  security: z.object({
    jwt: z.object({
      secret: z.string().min(32),
      expiresIn: z.string().default('24h'),
      algorithm: z.enum(['HS256', 'RS256']).default('HS256'),
    }),
    encryption: z.object({
      key: z.string().min(32),
      algorithm: z.enum(['aes-256-gcm', 'aes-256-cbc']).default('aes-256-gcm'),
    }),
    rateLimiting: z.object({
      enabled: z.boolean().default(true),
      windowMs: z.number().min(1000).default(900000), // 15 minutes
      maxRequests: z.number().min(10).max(1000).default(100),
    }),
  }),
  
  // Performance Configuration
  performance: z.object({
    caching: z.object({
      enabled: z.boolean().default(true),
      ttl: z.number().min(60).max(86400).default(3600), // 1 hour
      maxSize: z.number().min(100).max(10000).default(1000),
    }),
    compression: z.object({
      enabled: z.boolean().default(true),
      level: z.number().min(1).max(9).default(6),
    }),
    monitoring: z.object({
      enabled: z.boolean().default(true),
      metricsInterval: z.number().min(1000).max(300000).default(60000),
    }),
  }),
  
  // Feature Flags
  features: z.object({
    darkMode: z.boolean().default(true),
    notifications: z.boolean().default(true),
    analytics: z.boolean().default(true),
    realtime: z.boolean().default(true),
    aiFeatures: z.boolean().default(true),
    collaboration: z.boolean().default(true),
  }),
  
  // Third-party Integrations
  integrations: z.object({
    supabase: z.object({
      enabled: z.boolean().default(true),
      url: z.string().url().optional(),
      key: z.string().optional(),
    }),
    sentry: z.object({
      enabled: z.boolean().default(true),
      dsn: z.string().optional(),
      environment: z.enum(['development', 'staging', 'production']).default('development'),
    }),
    posthog: z.object({
      enabled: z.boolean().default(true),
      apiKey: z.string().optional(),
      apiHost: z.string().default('https://app.posthog.com'),
    }),
  }),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

// Environment-based configuration loading
function loadConfig(): AppConfig {
  try {
    const config = AppConfigSchema.parse({
      database: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        poolMax: parseInt(process.env.DB_POOL_MAX || '10', 10),
        poolTimeout: parseInt(process.env.DB_TIMEOUT || '30000', 10),
        retryAttempts: parseInt(process.env.DB_RETRY_ATTEMPTS || '3', 10),
        retryDelay: parseInt(process.env.DB_RETRY_DELAY || '1000', 10),
      },
      api: {
        baseUrl: process.env.API_BASE_URL || '/api',
        timeout: parseInt(process.env.API_TIMEOUT || '60000', 10),
        rateLimit: {
          windowMs: parseInt(process.env.API_RATE_LIMIT_WINDOW || '60000', 10),
          maxRequests: parseInt(process.env.API_RATE_LIMIT_MAX || '1000', 10),
        },
        cors: {
          origins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
          methods: process.env.CORS_METHODS?.split(',') || ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          credentials: process.env.CORS_CREDENTIALS !== 'false',
        },
      },
      security: {
        jwt: {
          secret: process.env.JWT_SECRET || 'fallback-secret-key-for-development-only',
          expiresIn: process.env.JWT_EXPIRES_IN || '24h',
          algorithm: (process.env.JWT_ALGORITHM as 'HS256' | 'RS256') || 'HS256',
        },
        encryption: {
          key: process.env.ENCRYPTION_KEY || 'fallback-encryption-key-for-development',
          algorithm: (process.env.ENCRYPTION_ALGORITHM as 'aes-256-gcm' | 'aes-256-cbc') || 'aes-256-gcm',
        },
        rateLimiting: {
          enabled: process.env.RATE_LIMITING_ENABLED !== 'false',
          windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000', 10),
          maxRequests: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
        },
      },
      performance: {
        caching: {
          enabled: process.env.CACHING_ENABLED !== 'false',
          ttl: parseInt(process.env.CACHE_TTL || '3600', 10),
          maxSize: parseInt(process.env.CACHE_MAX_SIZE || '1000', 10),
        },
        compression: {
          enabled: process.env.COMPRESSION_ENABLED !== 'false',
          level: parseInt(process.env.COMPRESSION_LEVEL || '6', 10),
        },
        monitoring: {
          enabled: process.env.MONITORING_ENABLED !== 'false',
          metricsInterval: parseInt(process.env.METRICS_INTERVAL || '60000', 10),
        },
      },
      features: {
        darkMode: process.env.FEATURE_DARK_MODE !== 'false',
        notifications: process.env.FEATURE_NOTIFICATIONS !== 'false',
        analytics: process.env.FEATURE_ANALYTICS !== 'false',
        realtime: process.env.FEATURE_REALTIME !== 'false',
        aiFeatures: process.env.FEATURE_AI !== 'false',
        collaboration: process.env.FEATURE_COLLABORATION !== 'false',
      },
      integrations: {
        supabase: {
          enabled: process.env.SUPABASE_ENABLED !== 'false',
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
        sentry: {
          enabled: process.env.SENTRY_ENABLED !== 'false',
          dsn: process.env.SENTRY_DSN,
          environment: (process.env.SENTRY_ENVIRONMENT as 'development' | 'staging' | 'production') || 'development',
        },
        posthog: {
          enabled: process.env.POSTHOG_ENABLED !== 'false',
          apiKey: process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
          apiHost: process.env.NEXT_PUBLIC_POSTHOG_API_HOST || 'https://app.posthog.com',
        },
      },
    });

    return config;
  } catch (error) {
    console.error('Configuration validation failed:', error);
    
    // Return safe defaults for development
    return {
      database: {
        url: undefined,
        poolMax: 10,
        poolTimeout: 30000,
        retryAttempts: 3,
        retryDelay: 1000,
      },
      api: {
        baseUrl: '/api',
        timeout: 60000,
        rateLimit: {
          windowMs: 60000,
          maxRequests: 1000,
        },
        cors: {
          origins: ['http://localhost:3000'],
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          credentials: true,
        },
      },
      security: {
        jwt: {
          secret: 'development-secret-key-change-in-production',
          expiresIn: '24h',
          algorithm: 'HS256',
        },
        encryption: {
          key: 'development-encryption-key-change-in-production',
          algorithm: 'aes-256-gcm',
        },
        rateLimiting: {
          enabled: true,
          windowMs: 900000,
          maxRequests: 100,
        },
      },
      performance: {
        caching: {
          enabled: true,
          ttl: 3600,
          maxSize: 1000,
        },
        compression: {
          enabled: true,
          level: 6,
        },
        monitoring: {
          enabled: true,
          metricsInterval: 60000,
        },
      },
      features: {
        darkMode: true,
        notifications: true,
        analytics: true,
        realtime: true,
        aiFeatures: true,
        collaboration: true,
      },
      integrations: {
        supabase: {
          enabled: true,
          url: undefined,
          key: undefined,
        },
        sentry: {
          enabled: false,
          dsn: undefined,
          environment: 'development',
        },
        posthog: {
          enabled: false,
          apiKey: undefined,
          apiHost: 'https://app.posthog.com',
        },
      },
    };
  }
}

// Singleton configuration instance
let configInstance: AppConfig | null = null;

export function getConfig(): AppConfig {
  if (!configInstance) {
    configInstance = loadConfig();
  }
  return configInstance;
}

// Configuration validation and warnings for production
export function validateConfigForProduction(): void {
  const config = getConfig();
  
  const warnings: string[] = [];
  
  if (process.env.NODE_ENV === 'production') {
    if (config.security.jwt.secret === 'fallback-secret-key-for-development-only') {
      warnings.push('JWT secret is using default value - CHANGE FOR PRODUCTION');
    }
    
    if (config.security.encryption.key === 'fallback-encryption-key-for-development') {
      warnings.push('Encryption key is using default value - CHANGE FOR PRODUCTION');
    }
    
    if (!config.integrations.sentry.enabled) {
      warnings.push('Sentry is disabled - enable for production monitoring');
    }
    
    if (!config.integrations.posthog.enabled) {
      warnings.push('PostHog analytics is disabled - consider enabling for user insights');
    }
    
    if (config.database.url === undefined) {
      warnings.push('Database URL is not configured');
    }
  }
  
  if (warnings.length > 0) {
    console.warn('Configuration Warnings:');
    warnings.forEach(warning => console.warn(`  ⚠️  ${warning}`));
  }
}

// Configuration utilities
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTesting = process.env.NODE_ENV === 'test';

// Configuration exports for different layers
export const databaseConfig = () => getConfig().database;
export const apiConfig = () => getConfig().api;
export const securityConfig = () => getConfig().security;
export const performanceConfig = () => getConfig().performance;
export const featureConfig = () => getConfig().features;
export const integrationConfig = () => getConfig().integrations;