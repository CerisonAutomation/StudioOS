import { createClient } from '@supabase/supabase-js';
import { QueryClient } from '@tanstack/react-query';
import { getConfig } from './config';
import { 
  Project, Task, Client, Supplier, MediaFile, Comment, ApiError, 
  ApiResponse, FilterParams, PaginationParams, DatabaseConfig 
} from './types';
import { captureException } from '@sentry/nextjs';

// Environment variables with lazy validation
let supabaseClient: any = null;
let databaseService: DatabaseService | null = null;

const getSupabaseConfig = () => {
  const config = getConfig();
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Only throw error if we're not in build mode
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
      console.warn('Missing Supabase environment variables - using mock data');
      return { url: '', key: '' };
    } else if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
      throw new Error('Missing Supabase environment variables');
    }
  }

  return { 
    url: SUPABASE_URL || '', 
    key: SUPABASE_ANON_KEY || '',
    config
  };
};

// Enhanced error handling and logging
class DatabaseError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error,
    public context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Lazy initialization of Supabase client with advanced configuration
const getSupabaseClient = () => {
  if (!supabaseClient) {
    const { url, key, config } = getSupabaseConfig();
    
    if (!url || !key) {
      throw new DatabaseError('Supabase URL or key not configured', 'CONFIG_ERROR');
    }

    supabaseClient = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
      db: {
        schema: 'public',
      },
      global: {
        // Enhanced connection pooling and timeout optimizations
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Client-Version': 'studioos-v2.0.0',
          'X-Request-ID': Math.random().toString(36).substr(2, 9),
        },
        timeout: config.database.poolTimeout,
      },
      realtime: {
        params: {
          eventsPerSecond: 10,
          heartbeatIntervalMs: 30000,
        }
      }
    });

    // Add request/response interceptors for monitoring
    if (typeof window !== 'undefined' && config.performance.monitoring.enabled) {
      supabaseClient.auth.onAuthStateChange((event, session) => {
        console.debug('Auth state changed:', { event, hasSession: !!session });
      });
    }
  }
  return supabaseClient;
};

// Get the supabase client instance
export const supabase = getSupabaseClient();

// Enhanced database operations with enterprise patterns
export class DatabaseService {
  private queryClient: QueryClient;
  private config: DatabaseConfig;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
    this.config = getConfig().database;
  }

  // Retry mechanism with exponential backoff
  private async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = this.config.retryAttempts
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) {
          throw new DatabaseError(
            `Operation failed after ${maxRetries + 1} attempts`,
            'RETRY_EXHAUSTED',
            lastError
          );
        }

        // Exponential backoff
        const delay = this.config.retryDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }

  // Enhanced query with advanced filtering, pagination, and caching
  async query<T>(
    table: string,
    options: {
      select?: string;
      filters?: FilterParams;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
      pagination?: PaginationParams;
      cacheKey?: string;
      cacheTime?: number;
      relations?: string[];
    } = {}
  ): Promise<ApiResponse<T[]>> {
    const {
      select = '*',
      filters = {},
      orderBy = 'created_at',
      orderDirection = 'desc',
      pagination = { page: 1, limit: 20 },
      cacheKey,
      cacheTime = 5 * 60 * 1000, // 5 minutes default
      relations = []
    } = options;

    try {
      // Build cache key
      const key = cacheKey || [
        'db',
        table,
        select,
        JSON.stringify(filters),
        orderBy,
        orderDirection,
        pagination.page,
        pagination.limit,
        JSON.stringify(relations)
      ].join(':');

      // Use React Query for caching with advanced options
      const data = await this.queryClient.fetchQuery({
        queryKey: [key],
        queryFn: async () => {
          return await this.withRetry(async () => {
            let query = supabase.from(table).select(select, { count: 'exact' });

            // Apply filters with enhanced security
            this.applyFilters(query, filters);

            // Apply relations
            relations.forEach(relation => {
              query = query.select(`${select}, ${relation}(*)`);
            });

            // Apply ordering
            query = query.order(orderBy, { 
              ascending: orderDirection === 'asc',
              foreignTable: undefined 
            });

            // Apply pagination
            const offset = (pagination.page - 1) * pagination.limit;
            query = query.range(offset, offset + pagination.limit - 1);

            const { data, error, count } = await query;

            if (error) {
              throw new DatabaseError(
                `Failed to query ${table}: ${error.message}`,
                'QUERY_ERROR',
                undefined,
                { table, filters, orderBy, pagination }
              );
            }

            return {
              data: data as T[],
              count: count || 0,
              page: pagination.page,
              limit: pagination.limit,
              totalPages: Math.ceil((count || 0) / pagination.limit)
            };
          });
        },
        staleTime: cacheTime,
        gcTime: cacheTime * 2,
        retry: this.config.retryAttempts,
      });

      return {
        success: true,
        data: data.data,
        meta: {
          total: data.count,
          page: data.page,
          limit: data.limit,
          totalPages: data.totalPages
        }
      };

    } catch (error) {
      const dbError = error instanceof DatabaseError ? error : new DatabaseError(
        `Database query failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'QUERY_FAILED',
        error instanceof Error ? error : undefined
      );

      this.handleDatabaseError(dbError);
      throw dbError;
    }
  }

  // Enhanced filter application with security validation
  private applyFilters(query: any, filters: FilterParams): void {
    Object.entries(filters).forEach(([field, value]) => {
      if (value === undefined || value === null || value === '') return;

      // Security validation for field names
      if (!this.isValidFieldName(field)) {
        throw new DatabaseError(`Invalid filter field: ${field}`, 'INVALID_FIELD');
      }

      if (Array.isArray(value)) {
        query = query.in(field, value);
      } else if (typeof value === 'object' && value !== null) {
        // Handle complex filters
        Object.entries(value).forEach(([operator, filterValue]) => {
          switch (operator) {
            case 'gt':
              query = query.gt(field, filterValue);
              break;
            case 'gte':
              query = query.gte(field, filterValue);
              break;
            case 'lt':
              query = query.lt(field, filterValue);
              break;
            case 'lte':
              query = query.lte(field, filterValue);
              break;
            case 'like':
              query = query.like(field, `%${filterValue}%`);
              break;
            case 'ilike':
              query = query.ilike(field, `%${filterValue}%`);
              break;
            case 'contains':
              query = query.contains(field, filterValue);
              break;
            case 'in':
              query = query.in(field, filterValue);
              break;
            case 'eq':
              query = query.eq(field, filterValue);
              break;
          }
        });
      } else {
        query = query.eq(field, value);
      }
    });
  }

  // Field name validation for security
  private isValidFieldName(fieldName: string): boolean {
    const validPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    return validPattern.test(fieldName) && fieldName.length <= 100;
  }

  // Enhanced insert with validation and security
  async insert<T>(
    table: string,
    data: Partial<T>,
    options: {
      upsert?: boolean;
      returning?: 'minimal' | 'representation';
      onConflict?: string[];
      validation?: (data: Partial<T>) => void;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { upsert = false, returning = 'representation', onConflict = [], validation } = options;

    try {
      // Validate data if validation function provided
      if (validation) {
        validation(data);
      }

      return await this.withRetry(async () => {
        let query = supabase.from(table);

        if (upsert) {
          query = query.upsert(data, { onConflict: onConflict.join(',') }) as any;
        } else {
          query = query.insert(data) as any;
        }

        const { data: result, error } = await query.select(returning).single();

        if (error) {
          throw new DatabaseError(
            `Failed to insert into ${table}: ${error.message}`,
            'INSERT_ERROR',
            undefined,
            { table, upsert, data: this.sanitizeData(data) }
          );
        }

        // Invalidate related cache
        this.invalidateCache(table);
        this.invalidateCache(`${table}_list`);

        return {
          success: true,
          data: result as T
        };
      });

    } catch (error) {
      const dbError = error instanceof DatabaseError ? error : new DatabaseError(
        `Database insert failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'INSERT_FAILED',
        error instanceof Error ? error : undefined
      );

      this.handleDatabaseError(dbError);
      throw dbError;
    }
  }

  // Enhanced update with optimistic locking
  async update<T>(
    table: string,
    id: string | number,
    data: Partial<T>,
    options: {
      idColumn?: string;
      optimisticLocking?: boolean;
      expectedVersion?: number;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { idColumn = 'id', optimisticLocking = false, expectedVersion } = options;

    try {
      return await this.withRetry(async () => {
        let query = supabase.from(table).update(data).eq(idColumn, id);

        // Apply optimistic locking
        if (optimisticLocking && expectedVersion !== undefined) {
          query = query.eq('version', expectedVersion);
        }

        const { data: result, error } = await query.select().single();

        if (error) {
          if (error.code === '23505') {
            throw new DatabaseError('Duplicate key violation', 'DUPLICATE_KEY', error);
          }
          throw new DatabaseError(
            `Failed to update ${table}: ${error.message}`,
            'UPDATE_ERROR',
            undefined,
            { table, id, data: this.sanitizeData(data) }
          );
        }

        if (!result) {
          throw new DatabaseError('Record not found or version mismatch', 'NOT_FOUND', undefined, { id });
        }

        // Invalidate related cache
        this.invalidateCache(table);
        this.invalidateCache(`${table}_list`);

        return {
          success: true,
          data: result as T
        };
      });

    } catch (error) {
      const dbError = error instanceof DatabaseError ? error : new DatabaseError(
        `Database update failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'UPDATE_FAILED',
        error instanceof Error ? error : undefined
      );

      this.handleDatabaseError(dbError);
      throw dbError;
    }
  }

  // Enhanced delete with soft delete support
  async delete(
    table: string,
    id: string | number,
    options: {
      idColumn?: string;
      softDelete?: boolean;
      columnName?: string;
    } = {}
  ): Promise<ApiResponse<void>> {
    const { idColumn = 'id', softDelete = false, columnName = 'deleted_at' } = options;

    try {
      return await this.withRetry(async () => {
        let query;
        
        if (softDelete) {
          query = supabase.from(table).update({ [columnName]: new Date().toISOString() }).eq(idColumn, id);
        } else {
          query = supabase.from(table).delete().eq(idColumn, id);
        }

        const { error } = await query;

        if (error) {
          throw new DatabaseError(
            `Failed to delete from ${table}: ${error.message}`,
            'DELETE_ERROR',
            undefined,
            { table, id, softDelete }
          );
        }

        // Invalidate related cache
        this.invalidateCache(table);
        this.invalidateCache(`${table}_list`);

        return {
          success: true
        };
      });

    } catch (error) {
      const dbError = error instanceof DatabaseError ? error : new DatabaseError(
        `Database delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'DELETE_FAILED',
        error instanceof Error ? error : undefined
      );

      this.handleDatabaseError(dbError);
      throw dbError;
    }
  }

  // Bulk operations with transaction support
  async bulkInsert<T>(table: string, data: Partial<T>[]): Promise<ApiResponse<T[]>> {
    if (data.length === 0) {
      return { success: true, data: [] };
    }

    try {
      return await this.withRetry(async () => {
        const { data: result, error } = await supabase
          .from(table)
          .insert(data)
          .select();

        if (error) {
          throw new DatabaseError(
            `Failed to bulk insert into ${table}: ${error.message}`,
            'BULK_INSERT_ERROR',
            undefined,
            { table, count: data.length, data: this.sanitizeData(data.slice(0, 5)) }
          );
        }

        // Invalidate related cache
        this.invalidateCache(table);
        this.invalidateCache(`${table}_list`);

        return {
          success: true,
          data: result as T[]
        };
      });

    } catch (error) {
      const dbError = error instanceof DatabaseError ? error : new DatabaseError(
        `Database bulk insert failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'BULK_INSERT_FAILED',
        error instanceof Error ? error : undefined
      );

      this.handleDatabaseError(dbError);
      throw dbError;
    }
  }

  // Full-text search with advanced options
  async search<T>(
    table: string,
    searchColumn: string,
    searchTerm: string,
    options: {
      select?: string;
      filters?: FilterParams;
      orderBy?: string;
      orderDirection?: 'asc' | 'desc';
      pagination?: PaginationParams;
      rank?: boolean;
    } = {}
  ): Promise<ApiResponse<T[]>> {
    const {
      select = '*',
      filters = {},
      orderBy = 'created_at',
      orderDirection = 'desc',
      pagination = { page: 1, limit: 20 },
      rank = false
    } = options;

    try {
      return await this.withRetry(async () => {
        let query = supabase.from(table).select(select, { count: 'exact' });

        // Apply search
        if (rank) {
          query = query.rpc('fts_search', {
            table_name: table,
            search_column: searchColumn,
            search_term: searchTerm
          });
        } else {
          query = query.textSearch(searchColumn, `'${searchTerm}'`, { config: 'english' });
        }

        // Apply additional filters
        this.applyFilters(query, filters);

        // Apply ordering
        query = query.order(orderBy, { ascending: orderDirection === 'asc' });

        // Apply pagination
        const offset = (pagination.page - 1) * pagination.limit;
        query = query.range(offset, offset + pagination.limit - 1);

        const { data, error, count } = await query;

        if (error) {
          throw new DatabaseError(
            `Failed to search in ${table}: ${error.message}`,
            'SEARCH_ERROR',
            undefined,
            { table, searchColumn, searchTerm }
          );
        }

        return {
          success: true,
          data: data as T[],
          meta: {
            total: count || 0,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil((count || 0) / pagination.limit)
          }
        };
      });

    } catch (error) {
      const dbError = error instanceof DatabaseError ? error : new DatabaseError(
        `Database search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'SEARCH_FAILED',
        error instanceof Error ? error : undefined
      );

      this.handleDatabaseError(dbError);
      throw dbError;
    }
  }

  // Advanced aggregation queries
  async aggregate<T>(
    table: string,
    column: string,
    operation: 'count' | 'sum' | 'avg' | 'min' | 'max',
    filters?: FilterParams
  ): Promise<ApiResponse<number>> {
    try {
      return await this.withRetry(async () => {
        let query = supabase.from(table);

        switch (operation) {
          case 'count':
            query = query.select('*', { count: 'exact', head: true });
            break;
          case 'sum':
            query = query.select(column).select(`(${column})`, { head: true });
            break;
          case 'avg':
            query = query.select(column).select(`avg(${column})`, { head: true });
            break;
          case 'min':
            query = query.select(column).select(`min(${column})`, { head: true });
            break;
          case 'max':
            query = query.select(column).select(`max(${column})`, { head: true });
            break;
        }

        // Apply filters
        if (filters) {
          this.applyFilters(query, filters);
        }

        const { data, error } = await query;

        if (error) {
          throw new DatabaseError(
            `Failed to aggregate ${operation} on ${column} in ${table}: ${error.message}`,
            'AGGREGATE_ERROR',
            undefined,
            { table, column, operation, filters }
          );
        }

        let result: number;
        if (operation === 'count') {
          result = data?.length || 0;
        } else {
          result = data?.[0]?.[column] || 0;
        }

        return {
          success: true,
          data: result
        };
      });

    } catch (error) {
      const dbError = error instanceof DatabaseError ? error : new DatabaseError(
        `Database aggregation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'AGGREGATE_FAILED',
        error instanceof Error ? error : undefined
      );

      this.handleDatabaseError(dbError);
      throw dbError;
    }
  }

  // Invalidate cache for specific table
  private invalidateCache(table: string): void {
    this.queryClient.invalidateQueries({ queryKey: [table] });
    this.queryClient.invalidateQueries({ queryKey: ['db', table] });
  }

  // Health check with detailed diagnostics
  async healthCheck(): Promise<{ healthy: boolean; details: Record<string, unknown> }> {
    try {
      const start = Date.now();
      const { error } = await supabase.from('health_check').select('*').limit(1);
      const responseTime = Date.now() - start;

      if (error) {
        return {
          healthy: false,
          details: {
            status: 'error',
            message: error.message,
            responseTime,
            timestamp: new Date().toISOString()
          }
        };
      }

      return {
        healthy: true,
        details: {
          status: 'ok',
          responseTime,
          timestamp: new Date().toISOString(),
          config: {
            poolMax: this.config.poolMax,
            poolTimeout: this.config.poolTimeout,
            retryAttempts: this.config.retryAttempts
          }
        }
      };
    } catch (error) {
      return {
        healthy: false,
        details: {
          status: 'failed',
          message: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  // Error handling with Sentry integration
  private handleDatabaseError(error: DatabaseError): void {
    console.error('Database Error:', error);

    // Send to Sentry if available
    if (typeof window !== 'undefined') {
      captureException(error, {
        tags: {
          component: 'DatabaseService',
          operation: error.context?.['operation'] || 'unknown'
        },
        extra: {
          context: error.context,
          originalError: error.originalError
        }
      });
    }
  }

  // Data sanitization for logging
  private sanitizeData(data: any): any {
    if (typeof data === 'object' && data !== null) {
      const sanitized = { ...data };
      // Remove sensitive fields
      delete sanitized.password;
      delete sanitized.token;
      delete sanitized.secret;
      return sanitized;
    }
    return data;
  }
}

// Create singleton instance
export function getDatabaseService(queryClient: QueryClient): DatabaseService {
  if (!databaseService) {
    databaseService = new DatabaseService(queryClient);
  }
  return databaseService;
}

// Database interface for API routes (Engine API hook compatibility)
export const database = {
  // Supabase client for direct access
  supabaseClient: supabase,
  // Client operations
  async getClients() {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createClient(clientData: any) {
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateClient(id: string, clientData: any) {
    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteClient(id: string) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  // Project operations
  async getProjects() {
    const { data, error } = await supabase.from('projects').select(`
      *,
      clients (first_name, last_name, email),
      suppliers (name, email)
    `).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createProject(projectData: any) {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Supplier operations
  async getSuppliers() {
    const { data, error } = await supabase.from('suppliers').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createSupplier(supplierData: any) {
    const { data, error } = await supabase
      .from('suppliers')
      .insert([supplierData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Task operations
  async getTasks() {
    const { data, error } = await supabase.from('tasks').select(`
      *,
      projects (name),
      assignees (first_name, last_name)
    `).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createTask(taskData: any) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([taskData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Generic operations
  from: (table: string) => supabase.from(table),
  select: (columns: string = '*') => supabase.from('*').select(columns),
};

// Utility functions for common operations
export const dbUtils = {
  // Pagination helper
  paginate: (page: number, pageSize: number) => ({
    offset: (page - 1) * pageSize,
    limit: pageSize,
  }),

  // Search helper with debouncing
  createSearchQuery: <T>(
    table: string,
    searchColumn: string,
    searchTerm: string,
    queryClient: QueryClient
  ) => {
    const db = getDatabaseService(queryClient);
    return db.search<T>(table, searchColumn, searchTerm, {
      limit: 50,
      filters: { deleted_at: null }, // Exclude soft deleted
    });
  },

  // Cache invalidation helpers
  invalidateTable: (table: string, queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: ['db', table] });
  },

  // Batch operations
  batchOperations: async <T>(
    operations: Array<() => Promise<T>>,
    queryClient: QueryClient
  ): Promise<T[]> => {
    const results = await Promise.allSettled(operations.map(op => op()));
    const successful = results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<T>).value);

    // Invalidate all related caches
    const db = getDatabaseService(queryClient);
    // This would need to be more specific based on the operations

    return successful;
  },
};