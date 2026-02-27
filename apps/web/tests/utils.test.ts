import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utils', () => {
  describe('cn (className merge)', () => {
    it('should merge simple class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });
    
    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
    });
    
    it('should handle tailwind class conflicts', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4');
    });
    
    it('should handle undefined and null values', () => {
      expect(cn('base', undefined, null, 'extra')).toBe('base extra');
    });
  });
});
