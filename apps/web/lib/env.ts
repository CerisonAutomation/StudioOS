/**
 * StudioOS Environment Configuration
 *
 * Enterprise environment variables with validation and security.
 * Zero-trust configuration with proper secret management.
 */

import { z } from 'zod';

// Environment variable schema validation
const envSchema = z.object({
  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, 'Clerk publishable key is required'),
  CLERK_SECRET_KEY: z.string().min(1, 'Clerk secret key is required'),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().default('/sign-in'),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().default('/sign-up'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().default('/dashboard'),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().default('/onboarding'),
  NEXT_PUBLIC_CLERK_DOMAIN: z.string().optional(),

  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase service role key is required'),
  SUPABASE_DATABASE_URL: z.string().url('Invalid database URL').optional(),

  // Sentry Error Tracking
  SENTRY_DSN: z.string().url('Invalid Sentry DSN').optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url('Invalid public Sentry DSN').optional(),

  // PostHog Analytics
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().default('https://app.posthog.com'),

  // OpenTelemetry Observability
  OTEL_SERVICE_NAME: z.string().default('studioos-web'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url('Invalid OTLP endpoint').optional(),
  NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url('Invalid public OTLP endpoint').optional(),

  // Application Configuration
  NEXT_PUBLIC_APP_URL: z.string().url('Invalid app URL'),
  NEXT_PUBLIC_API_URL: z.string().url('Invalid API URL'),
  NEXT_PUBLIC_WS_URL: z.string().url('Invalid WebSocket URL'),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().default('true').transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_ERROR_TRACKING: z.string().default('true').transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING: z.string().default('true').transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_AI_FEATURES: z.string().default('true').transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_VOICE_FEATURES: z.string().default('true').transform(val => val === 'true'),

  // Security
  NEXTAUTH_SECRET: z.string().min(32, 'NextAuth secret must be at least 32 characters').optional(),
  NEXTAUTH_URL: z.string().url('Invalid NextAuth URL').optional(),

  // Database
  DATABASE_URL: z.string().url('Invalid database URL').optional(),
  DATABASE_POOL_URL: z.string().url('Invalid database pool URL').optional(),

  // Redis (for rate limiting and caching)
  REDIS_URL: z.string().url('Invalid Redis URL').optional(),
  REDIS_TOKEN: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  NEXT_PUBLIC_APP_EMAIL: z.string().email('Invalid app email').optional(),

  // Storage
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().default('us-east-1'),
  AWS_S3_BUCKET: z.string().optional(),

  // AI Services
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  GOOGLE_AI_API_KEY: z.string().optional(),

  // Payment Processing
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Development
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

// Validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Environment validation failed. Check your .env file.');
  }
}

// Export validated environment
export const env = validateEnv();

// Type-safe environment access
export type Env = z.infer<typeof envSchema>;

// Environment-specific configurations
export const config = {
  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',

  // Feature flags
  features: {
    analytics: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    errorTracking: env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING,
    performanceMonitoring: env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING,
    aiFeatures: env.NEXT_PUBLIC_ENABLE_AI_FEATURES,
    voiceFeatures: env.NEXT_PUBLIC_ENABLE_VOICE_FEATURES,
  },

  // URLs
  urls: {
    app: env.NEXT_PUBLIC_APP_URL,
    api: env.NEXT_PUBLIC_API_URL,
    ws: env.NEXT_PUBLIC_WS_URL,
    clerkSignIn: env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    clerkSignUp: env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    clerkAfterSignIn: env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    clerkAfterSignUp: env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  },

  // Service configuration
  services: {
    sentry: {
      dsn: env.SENTRY_DSN,
      publicDsn: env.NEXT_PUBLIC_SENTRY_DSN,
      org: env.SENTRY_ORG,
      project: env.SENTRY_PROJECT,
    },
    posthog: {
      key: env.NEXT_PUBLIC_POSTHOG_KEY,
      host: env.NEXT_PUBLIC_POSTHOG_HOST,
    },
    otel: {
      serviceName: env.OTEL_SERVICE_NAME,
      endpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
      publicEndpoint: env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT,
    },
    supabase: {
      url: env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceKey: env.SUPABASE_SERVICE_ROLE_KEY,
      databaseUrl: env.SUPABASE_DATABASE_URL,
    },
    clerk: {
      publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: env.CLERK_SECRET_KEY,
      domain: env.NEXT_PUBLIC_CLERK_DOMAIN,
    },
  },

  // Security configuration
  security: {
    nextAuthSecret: env.NEXTAUTH_SECRET,
    nextAuthUrl: env.NEXTAUTH_URL,
    databaseUrl: env.DATABASE_URL,
    redisUrl: env.REDIS_URL,
    redisToken: env.REDIS_TOKEN,
  },

  // External services
  external: {
    email: {
      apiKey: env.RESEND_API_KEY,
      fromEmail: env.NEXT_PUBLIC_APP_EMAIL,
    },
    storage: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      region: env.AWS_REGION,
      bucket: env.AWS_S3_BUCKET,
    },
    ai: {
      openai: env.OPENAI_API_KEY,
      anthropic: env.ANTHROPIC_API_KEY,
      google: env.GOOGLE_AI_API_KEY,
    },
    payments: {
      stripePublishableKey: env.STRIPE_PUBLISHABLE_KEY,
      stripeSecretKey: env.STRIPE_SECRET_KEY,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
    },
  },
};

export default config;
