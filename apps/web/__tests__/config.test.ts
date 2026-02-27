import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getConfig, validateConfigForProduction, isDevelopment, isProduction } from '@/lib/config';

// Mock environment variables
vi.mock('process', () => ({
  env: {
    NODE_ENV: 'development',
    NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-key',
    JWT_SECRET: 'test-secret',
    DB_POOL_MAX: '20',
    DB_TIMEOUT: '60000',
    API_RATE_LIMIT_WINDOW: '120000',
    API_RATE_LIMIT_MAX: '2000',
  },
}));

describe('Configuration', () => {
  beforeEach(() => {
    // Reset environment variables
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
    process.env.JWT_SECRET = 'test-secret';
    process.env.DB_POOL_MAX = '20';
    process.env.DB_TIMEOUT = '60000';
    process.env.API_RATE_LIMIT_WINDOW = '120000';
    process.env.API_RATE_LIMIT_MAX = '2000';
  });

  describe('getConfig', () => {
    it('should load configuration with default values', () => {
      const config = getConfig();
      
      expect(config).toBeDefined();
      expect(config.database.poolMax).toBe(20);
      expect(config.database.poolTimeout).toBe(60000);
      expect(config.api.rateLimit.windowMs).toBe(120000);
      expect(config.api.rateLimit.maxRequests).toBe(2000);
      expect(config.security.jwt.secret).toBe('test-secret');
      expect(config.features.darkMode).toBe(true);
    });

    it('should use defaults when environment variables are missing', () => {
      delete process.env.DB_POOL_MAX;
      delete process.env.DB_TIMEOUT;
      
      const config = getConfig();
      
      expect(config.database.poolMax).toBe(10);
      expect(config.database.poolTimeout).toBe(30000);
    });

    it('should parse boolean feature flags correctly', () => {
      process.env.NEXT_PUBLIC_FEATURE_DARK_MODE = 'false';
      process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS = 'true';
      
      const config = getConfig();
      
      expect(config.features.darkMode).toBe(false);
      expect(config.features.notifications).toBe(true);
    });

    it('should parse CORS origins correctly', () => {
      process.env.CORS_ORIGINS = 'https://app1.com,https://app2.com,https://app3.com';
      
      const config = getConfig();
      
      expect(config.api.cors.origins).toEqual([
        'https://app1.com',
        'https://app2.com', 
        'https://app3.com'
      ]);
    });
  });

  describe('validateConfigForProduction', () => {
    it('should show warnings for development secrets in production', () => {
      process.env.NODE_ENV = 'production';
      process.env.JWT_SECRET = 'fallback-secret-key-for-development-only';
      process.env.ENCRYPTION_KEY = 'fallback-encryption-key-for-development';
      process.env.SENTRY_ENABLED = 'false';
      process.env.POSTHOG_ENABLED = 'false';
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      validateConfigForProduction();

      expect(consoleSpy).toHaveBeenCalledWith('Configuration Warnings:');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('JWT secret is using default value')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Encryption key is using default value')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Sentry is disabled')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('PostHog analytics is disabled')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Database URL is not configured')
      );

      consoleSpy.mockRestore();
    });

    it('should not show warnings for properly configured production', () => {
      process.env.NODE_ENV = 'production';
      process.env.JWT_SECRET = 'super-secret-production-key-change-this';
      process.env.ENCRYPTION_KEY = 'super-secure-encryption-key-for-production';
      process.env.SENTRY_ENABLED = 'true';
      process.env.POSTHOG_ENABLED = 'true';
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://prod.supabase.co';

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      validateConfigForProduction();

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Environment utilities', () => {
    it('should correctly identify development environment', () => {
      process.env.NODE_ENV = 'development';
      expect(isDevelopment).toBe(true);
      expect(isProduction).toBe(false);
    });

    it('should correctly identify production environment', () => {
      process.env.NODE_ENV = 'production';
      expect(isDevelopment).toBe(false);
      expect(isProduction).toBe(true);
    });

    it('should correctly identify test environment', () => {
      process.env.NODE_ENV = 'test';
      expect(isDevelopment).toBe(false);
      expect(isProduction).toBe(false);
    });
  });

  describe('Configuration validation', () => {
    it('should validate poolMax is within range', () => {
      process.env.DB_POOL_MAX = '150'; // Above max of 100
      
      expect(() => getConfig()).toThrow();
    });

    it('should validate poolTimeout is within range', () => {
      process.env.DB_TIMEOUT = '700000'; // Above max of 600000
      
      expect(() => getConfig()).toThrow();
    });

    it('should validate JWT algorithm is valid', () => {
      process.env.JWT_ALGORITHM = 'invalid-algo';
      
      expect(() => getConfig()).toThrow();
    });

    it('should validate encryption algorithm is valid', () => {
      process.env.ENCRYPTION_ALGORITHM = 'invalid-cipher';
      
      expect(() => getConfig()).toThrow();
    });
  });
});