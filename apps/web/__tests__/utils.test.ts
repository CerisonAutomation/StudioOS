import { describe, it, expect, beforeEach, vi } from 'vitest';
import { dbUtils, DatabaseService } from '@/lib/database';
import { QueryClient } from '@tanstack/react-query';

// Mock Supabase
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          in: vi.fn(() => ({
            gt: vi.fn(() => ({
              gte: vi.fn(() => ({
                lt: vi.fn(() => ({
                  lte: vi.fn(() => ({
                    like: vi.fn(() => ({
                      ilike: vi.fn(() => ({
                        contains: vi.fn(() => ({
                          textSearch: vi.fn(() => ({
                            order: vi.fn(() => ({
                              range: vi.fn(() => ({
                                single: vi.fn(() => Promise.resolve({ data: null, error: null })),
                                insert: vi.fn(() => ({
                                  select: vi.fn(() => ({
                                    single: vi.fn(() => Promise.resolve({ data: null, error: null })),
                                  })),
                                })),
                                update: vi.fn(() => ({
                                  select: vi.fn(() => ({
                                    single: vi.fn(() => Promise.resolve({ data: null, error: null })),
                                  })),
                                })),
                                delete: vi.fn(() => Promise.resolve({ error: null })),
                              }))),
                            }))),
                          }))),
                        }))),
                      }))),
                    }))),
                  }))),
                }))),
              }))),
            }))),
          }))),
        }))),
      })),
    })),
  })),
}));

describe('Database Utils', () => {
  let queryClient: QueryClient;
  let dbService: DatabaseService;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    dbService = new DatabaseService(queryClient);
  });

  describe('paginate', () => {
    it('should calculate correct offset and limit', () => {
      const result = dbUtils.paginate(1, 20);
      expect(result).toEqual({ offset: 0, limit: 20 });

      const result2 = dbUtils.paginate(3, 10);
      expect(result2).toEqual({ offset: 20, limit: 10 });
    });

    it('should handle zero-based page numbers', () => {
      const result = dbUtils.paginate(0, 25);
      expect(result).toEqual({ offset: -25, limit: 25 });
    });
  });

  describe('createSearchQuery', () => {
    it('should create search query with proper parameters', async () => {
      const mockResult = [{ id: 1, name: 'Test' }];
      
      // Mock the search method
      vi.spyOn(dbService, 'search').mockResolvedValue({
        success: true,
        data: mockResult,
        meta: { total: 1, page: 1, limit: 50, totalPages: 1 }
      });

      const result = await dbUtils.createSearchQuery(
        'projects',
        'name',
        'test query',
        queryClient
      );

      expect(dbService.search).toHaveBeenCalledWith('projects', 'name', 'test query', {
        limit: 50,
        filters: { deleted_at: null }
      });
    });
  });

  describe('invalidateTable', () => {
    it('should invalidate table cache', () => {
      const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');
      
      dbUtils.invalidateTable('projects', queryClient);
      
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['db', 'projects'] });
    });
  });

  describe('batchOperations', () => {
    it('should execute multiple operations and return successful results', async () => {
      const operations = [
        () => Promise.resolve('result1'),
        () => Promise.resolve('result2'),
        () => Promise.reject(new Error('Operation failed')),
        () => Promise.resolve('result3'),
      ];

      const result = await dbUtils.batchOperations(operations, queryClient);

      expect(result).toEqual(['result1', 'result2', 'result3']);
    });

    it('should handle all successful operations', async () => {
      const operations = [
        () => Promise.resolve(1),
        () => Promise.resolve(2),
        () => Promise.resolve(3),
      ];

      const result = await dbUtils.batchOperations(operations, queryClient);

      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle all failed operations', async () => {
      const operations = [
        () => Promise.reject(new Error('Error 1')),
        () => Promise.reject(new Error('Error 2')),
      ];

      const result = await dbUtils.batchOperations(operations, queryClient);

      expect(result).toEqual([]);
    });
  });
});