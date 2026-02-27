// Enterprise-grade TypeScript Type Definitions

import { Database } from '@/database.types';

// Core Domain Types
export type UserRole = 'admin' | 'designer' | 'client' | 'supplier' | 'guest';
export type ProjectStatus = 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type MediaType = 'image' | 'video' | 'document' | '3d_model';

// Enhanced User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

// Enhanced Client Types
export interface Client extends Database['public']['Tables']['clients']['Row'] {
  fullName: string;
  primaryContact?: User;
  projects?: Project[];
  createdAt: string;
  updatedAt: string;
}

// Enhanced Project Types
export interface Project extends Database['public']['Tables']['projects']['Row'] {
  client?: Client;
  teamMembers?: User[];
  tasks?: Task[];
  media?: MediaFile[];
  budgetFormatted?: string;
  createdAt: string;
  updatedAt: string;
}

// Enhanced Task Types
export interface Task extends Database['public']['Tables']['tasks']['Row'] {
  assignee?: User;
  project?: Project;
  comments?: Comment[];
  dependencies?: Task[];
  createdAt: string;
  updatedAt: string;
}

// Media and File Types
export interface MediaFile {
  id: string;
  name: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  size: number;
  projectId?: string;
  taskId?: string;
  uploadedBy: string;
  metadata?: {
    dimensions?: { width: number; height: number };
    duration?: number;
    format?: string;
    tags?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

// Comment Types
export interface Comment {
  id: string;
  content: string;
  author: User;
  taskId?: string;
  projectId?: string;
  parentId?: string;
  replies?: Comment[];
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

// Supplier Types
export interface Supplier extends Database['public']['Tables']['suppliers']['Row'] {
  projects?: Project[];
  contacts?: User[];
  createdAt: string;
  updatedAt: string;
}

// Audit and Logging Types
export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  actorId: string;
  actorName: string;
  changes: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  stack?: string;
}

// Pagination and Filtering Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string | string[];
  dateRange?: {
    start?: string;
    end?: string;
  };
  assignedTo?: string[];
  priority?: TaskPriority[];
  tags?: string[];
}

// Form and Validation Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'file';
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | undefined;
  };
  options?: Array<{ label: string; value: string }>;
}

// Performance and Monitoring Types
export interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  bundleSize: number;
  memoryUsage: number;
  renderCount: number;
  timestamp: number;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  errorId?: string;
}

// Feature Flag Types
export interface FeatureFlags {
  darkMode: boolean;
  notifications: boolean;
  analytics: boolean;
  realtime: boolean;
  aiFeatures: boolean;
  collaboration: boolean;
  advancedAnalytics: boolean;
  exportFeatures: boolean;
  integrations: boolean;
}

// Configuration Types
export interface AppConfig {
  database: {
    poolMax: number;
    poolTimeout: number;
    retryAttempts: number;
    retryDelay: number;
  };
  api: {
    timeout: number;
    rateLimit: {
      windowMs: number;
      maxRequests: number;
    };
  };
  security: {
    jwt: {
      expiresIn: string;
      algorithm: 'HS256' | 'RS256';
    };
    rateLimiting: {
      enabled: boolean;
      windowMs: number;
      maxRequests: number;
    };
  };
  performance: {
    caching: {
      enabled: boolean;
      ttl: number;
      maxSize: number;
    };
    compression: {
      enabled: boolean;
      level: number;
    };
    monitoring: {
      enabled: boolean;
      metricsInterval: number;
    };
  };
  features: FeatureFlags;
  integrations: {
    supabase: {
      enabled: boolean;
    };
    sentry: {
      enabled: boolean;
    };
    posthog: {
      enabled: boolean;
    };
  };
}

// WebSocket and Real-time Types
export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: number;
  userId?: string;
}

export interface RealtimeEvent {
  channel: string;
  event: string;
  data: unknown;
  timestamp: number;
}

// AI and ML Types
export interface AIAnalysis {
  id: string;
  type: 'design_recommendation' | 'color_palette' | 'layout_optimization' | 'material_suggestion';
  confidence: number;
  recommendations: Array<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    metadata?: Record<string, unknown>;
  }>;
  createdAt: string;
}

// Export all database types
export type {
  clients,
  projects,
  tasks,
  suppliers,
  media_files,
  comments,
  audit_logs,
  users,
} from '@/database.types';

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type EntityWithRelations<T> = T & {
  _relations?: string[];
};

// Redux/State Management Types (if using)
export interface RootState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  };
  projects: {
    projects: Project[];
    selectedProject: Project | null;
    isLoading: boolean;
    error: string | null;
  };
  tasks: {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
  };
  ui: {
    theme: 'light' | 'dark';
    sidebarCollapsed: boolean;
    notifications: Array<{
      id: string;
      type: 'info' | 'success' | 'warning' | 'error';
      message: string;
      timestamp: number;
    }>;
  };
}

// Event Types for Event-Driven Architecture
export interface DomainEvent {
  id: string;
  type: string;
  aggregateId: string;
  aggregateType: string;
  payload: unknown;
  metadata: {
    userId: string;
    timestamp: number;
    version: number;
  };
}

// Command Types for CQRS
export interface Command {
  id: string;
  type: string;
  aggregateId: string;
  payload: unknown;
  metadata: {
    userId: string;
    timestamp: number;
  };
}

// Query Types for CQRS
export interface Query {
  id: string;
  type: string;
  filters?: FilterParams;
  pagination?: PaginationParams;
  metadata: {
    userId: string;
    timestamp: number;
  };
}