import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useUser, useAuth } from '@/lib/auth';
import React from 'react';

// Test component that uses auth hooks
function TestComponent() {
  const { isSignedIn, isLoaded, user } = useUser();
  const auth = useAuth();
  
  return (
    <div>
      <div data-testid="is-loaded">{isLoaded ? 'loaded' : 'loading'}</div>
      <div data-testid="is-signed-in">{isSignedIn ? 'signed-in' : 'signed-out'}</div>
      <div data-testid="user-name">{user?.fullName || 'no-user'}</div>
      <div data-testid="has-auth">{auth ? 'has-auth' : 'no-auth'}</div>
    </div>
  );
}

describe('Auth Module', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset modules to ensure fresh state
    vi.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should provide auth context', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('is-loaded')).toHaveTextContent('loaded');
    expect(screen.getByTestId('has-auth')).toHaveTextContent('has-auth');
  });
  
  it('should work without Clerk configured (demo mode)', () => {
    // Remove Clerk key to trigger demo mode
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    // Auth should still be available even without Clerk
    expect(screen.getByTestId('is-loaded')).toHaveTextContent('loaded');
    expect(screen.getByTestId('has-auth')).toHaveTextContent('has-auth');
  });
});
