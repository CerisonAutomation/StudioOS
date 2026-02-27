'use client';

/**
 * StudioOS Clerk Configuration
 * 
 * Zero-trust authentication with Clerk for enterprise security.
 * MFA enforcement, RBAC, and session management.
 */

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { ReactNode, createContext, useContext, useMemo } from 'react';

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Mock auth context for build/demo mode
interface MockAuthContextType {
  isSignedIn: boolean;
  user: null;
  isLoaded: boolean;
}

const MockAuthContext = createContext<MockAuthContextType>({
  isSignedIn: false,
  user: null,
  isLoaded: true,
});

// Custom hook for auth that works with or without Clerk
function useMockAuth() {
  const ctx = useContext(MockAuthContext);
  return useMemo(() => ({
    isSignedIn: ctx.isSignedIn,
    userId: null,
    sessionId: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: () => false,
    signOut: () => Promise.resolve(),
    getToken: () => Promise.resolve(null),
    isLoaded: ctx.isLoaded,
  }), [ctx]);
}

function useMockUser() {
  const ctx = useContext(MockAuthContext);
  return useMemo(() => ({
    isSignedIn: ctx.isSignedIn,
    user: ctx.user,
    isLoaded: ctx.isLoaded,
  }), [ctx]);
}

// Export hooks that work with or without Clerk
export function useAuth() {
  // Always call hooks unconditionally
  const mockAuth = useMockAuth();
  
  // Only use Clerk hooks if key is available
  if (clerkPublishableKey) {
    try {
      const clerk = require('@clerk/nextjs');
      return clerk.useAuth();
    } catch {
      return mockAuth;
    }
  }
  
  return mockAuth;
}

export function useUser() {
  // Always call hooks unconditionally
  const mockUser = useMockUser();
  
  // Only use Clerk hooks if key is available
  if (clerkPublishableKey) {
    try {
      const clerk = require('@clerk/nextjs');
      return clerk.useUser();
    } catch {
      return mockUser;
    }
  }
  
  return mockUser;
}

interface ClerkConfigProps {
  children: ReactNode;
}

export function ClerkConfig({ children }: ClerkConfigProps) {
  const mockValue = useMemo(() => ({ isSignedIn: false, user: null, isLoaded: true }), []);
  
  // During build time or when key is missing, render with mock context
  if (!clerkPublishableKey) {
    console.warn('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY - running in demo mode');
    return (
      <MockAuthContext.Provider value={mockValue}>
        {children}
      </MockAuthContext.Provider>
    );
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#6366f1',
          colorBackground: '#0f0f0f',
          colorInputBackground: '#1a1a1a',
          colorInputText: '#ffffff',
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/onboarding"
    >
      {children}
    </ClerkProvider>
  );
}

export default ClerkConfig;
