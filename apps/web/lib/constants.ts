// Enterprise Constants and Configuration

// Application Constants
export const APP_CONFIG = {
  name: 'StudioOS',
  version: '2.0.0',
  description: 'Professional interior design project management platform',
  author: 'Tanti Studio',
  supportEmail: 'support@tanti.studio',
  website: 'https://tanti.studio',
  documentationUrl: 'https://docs.tanti.studio',
  logoUrl: '/assets/logo.svg',
};

// API Constants
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 60000,
  retryAttempts: 3,
  retryDelay: 1000,
  maxPageSize: 100,
  defaultPageSize: 20,
  endpoints: {
    auth: '/auth',
    users: '/users',
    clients: '/clients',
    projects: '/projects',
    tasks: '/tasks',
    suppliers: '/suppliers',
    media: '/media',
    comments: '/comments',
    analytics: '/analytics',
    audit: '/audit',
    realtime: '/realtime',
  },
};

// Database Constants
export const DATABASE_CONFIG = {
  poolMax: 10,
  poolTimeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  maxQueryLength: 10000,
  maxBatchSize: 1000,
  indexes: {
    projects: ['id', 'clientId', 'status', 'createdAt'],
    tasks: ['id', 'projectId', 'assigneeId', 'status', 'priority', 'createdAt'],
    clients: ['id', 'createdAt'],
    users: ['id', 'email', 'role', 'createdAt'],
  },
};

// Security Constants
export const SECURITY_CONFIG = {
  jwt: {
    expiresIn: '24h',
    algorithm: 'HS256',
    secretKey: process.env.JWT_SECRET || 'fallback-secret-key',
  },
  encryption: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
  },
  rateLimiting: {
    windowMs: 900000, // 15 minutes
    maxRequests: 100,
    skipSuccessfulRequests: false,
  },
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
  session: {
    timeout: 24 * 60 * 60 * 1000, // 24 hours
    rememberMeTimeout: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
};

// Feature Flags
export const FEATURE_FLAGS = {
  darkMode: process.env.NEXT_PUBLIC_FEATURE_DARK_MODE !== 'false',
  notifications: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATIONS !== 'false',
  analytics: process.env.NEXT_PUBLIC_FEATURE_ANALYTICS !== 'false',
  realtime: process.env.NEXT_PUBLIC_FEATURE_REALTIME !== 'false',
  aiFeatures: process.env.NEXT_PUBLIC_FEATURE_AI !== 'false',
  collaboration: process.env.NEXT_PUBLIC_FEATURE_COLLABORATION !== 'false',
  advancedAnalytics: process.env.NEXT_PUBLIC_FEATURE_ADVANCED_ANALYTICS !== 'false',
  exportFeatures: process.env.NEXT_PUBLIC_FEATURE_EXPORT !== 'false',
  integrations: process.env.NEXT_PUBLIC_FEATURE_INTEGRATIONS !== 'false',
};

// UI/UX Constants
export const UI_CONFIG = {
  theme: {
    default: 'light',
    supported: ['light', 'dark'],
  },
  breakpoints: {
    xs: 480,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536,
  },
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      loose: 1.75,
    },
  },
};

// Validation Constants
export const VALIDATION_CONFIG = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  phone: {
    pattern: /^\+?[\d\s\-\(\)]{10,}$/,
    message: 'Please enter a valid phone number',
  },
  password: {
    minLength: 8,
    maxLength: 128,
    patterns: {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      numbers: /\d/,
      specialChars: /[!@#$%^&*(),.?":{}|<>]/,
    },
  },
  projectName: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_&]+$/,
  },
  clientName: {
    minLength: 2,
    maxLength: 100,
  },
  taskName: {
    minLength: 2,
    maxLength: 200,
  },
};

// Error Constants
export const ERROR_CODES = {
  // Authentication
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  
  // Business Logic
  PROJECT_NOT_FOUND: 'PROJECT_NOT_FOUND',
  TASK_NOT_FOUND: 'TASK_NOT_FOUND',
  CLIENT_NOT_FOUND: 'CLIENT_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  SUPPLIER_NOT_FOUND: 'SUPPLIER_NOT_FOUND',
  
  // System
  DATABASE_ERROR: 'DATABASE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
  
  // File Upload
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  STORAGE_QUOTA_EXCEEDED: 'STORAGE_QUOTA_EXCEEDED',
};

// Notification Constants
export const NOTIFICATION_CONFIG = {
  types: {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
  },
  duration: {
    short: 3000,
    medium: 5000,
    long: 10000,
  },
  maxQueueSize: 10,
};

// Real-time Constants
export const REALTIME_CONFIG = {
  channels: {
    PROJECT_UPDATES: 'projects',
    TASK_UPDATES: 'tasks',
    USER_PRESENCES: 'presence',
    NOTIFICATIONS: 'notifications',
  },
  events: {
    CREATED: 'created',
    UPDATED: 'updated',
    DELETED: 'deleted',
    ASSIGNED: 'assigned',
    STATUS_CHANGED: 'status_changed',
  },
  reconnectInterval: 5000,
  maxReconnectAttempts: 10,
  heartbeatInterval: 30000,
};

// Analytics Constants
export const ANALYTICS_CONFIG = {
  trackingId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
  events: {
    PAGE_VIEW: 'page_view',
    USER_LOGIN: 'user_login',
    USER_LOGOUT: 'user_logout',
    PROJECT_CREATED: 'project_created',
    PROJECT_UPDATED: 'project_updated',
    TASK_CREATED: 'task_created',
    TASK_COMPLETED: 'task_completed',
    FILE_UPLOADED: 'file_uploaded',
    COMMENT_ADDED: 'comment_added',
  },
};

// Export Constants
export const EXPORT_CONFIG = {
  formats: {
    PDF: 'pdf',
    EXCEL: 'xlsx',
    CSV: 'csv',
    JSON: 'json',
  },
  maxExportSize: 50000, // rows
  maxExportTime: 300000, // 5 minutes
};

// AI/ML Constants
export const AI_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_AI_ENABLED === 'true',
  models: {
    DESIGN_RECOMMENDATION: 'gpt-4',
    COLOR_ANALYSIS: 'vision-model',
    LAYOUT_OPTIMIZATION: 'optimization-model',
  },
  confidenceThreshold: 0.7,
  maxRecommendations: 10,
};

// Colors and Styling
export const COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'studioos-theme',
  USER_PREFERENCES: 'studioos-user-preferences',
  LAST_ROUTE: 'studioos-last-route',
  NOTIFICATIONS: 'studioos-notifications',
  PROJECT_FILTERS: 'studioos-project-filters',
  TASK_FILTERS: 'studioos-task-filters',
  SIDEBAR_STATE: 'studioos-sidebar-state',
};

// Date and Time Constants
export const DATE_CONFIG = {
  formats: {
    DATE: 'MMM dd, yyyy',
    TIME: 'HH:mm',
    DATETIME: 'MMM dd, yyyy HH:mm',
    FULL: 'EEEE, MMMM dd, yyyy HH:mm:ss',
  },
  locales: {
    EN: 'en-US',
    ES: 'es-ES',
    FR: 'fr-FR',
    DE: 'de-DE',
    IT: 'it-IT',
  },
  timezone: 'UTC',
};

// File Upload Constants
export const FILE_UPLOAD_CONFIG = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    spreadsheets: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    presentations: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
  },
  maxConcurrentUploads: 3,
  retryAttempts: 3,
};

// Internationalization
export const I18N_CONFIG = {
  defaultLocale: 'en',
  supportedLocales: ['en', 'es', 'fr', 'de', 'it'],
  fallbackLocale: 'en',
  ns: ['common', 'auth', 'projects', 'tasks', 'clients', 'settings'],
};