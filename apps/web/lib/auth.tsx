'use client';

/**
 * StudioOS Auth Module
 * 
 * Unified authentication interface that works with or without Clerk.
 * Provides graceful degradation for demo/development mode.
 */

import React, { createContext, useContext, useMemo, ReactNode } from 'react';

// Check if Clerk is configured
const isClerkConfigured = typeof process !== 'undefined' && 
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Mock user type
interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  primaryEmailAddress: { emailAddress: string } | null;
  imageUrl: string;
}

// Default mock user for demo mode
const mockUser: MockUser = {
  id: 'demo-user-001',
  firstName: 'Demo',
  lastName: 'User',
  fullName: 'Demo User',
  primaryEmailAddress: { emailAddress: 'demo@tanti.studio' },
  imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
};

interface AuthContextType {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: MockUser | null;
  userId: string | null;
  sessionId: string | null;
  orgId: string | null;
  orgRole: string | null;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  isLoaded: true,
  user: null,
  userId: null,
  sessionId: null,
  orgId: null,
  orgRole: null,
  signOut: async () => {},
  getToken: async () => null,
});

// Demo provider component
function DemoAuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({
    isSignedIn: true, // Demo mode is always signed in
    isLoaded: true,
    user: mockUser,
    userId: mockUser.id,
    sessionId: 'demo-session',
    orgId: null,
    orgRole: null,
    signOut: async () => {
      console.log('Demo mode: sign out called');
    },
    getToken: async () => 'demo-token',
  }), []);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

// Hook to use user
export function useUser() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useUser must be used within AuthProvider');
  }
  return {
    isSignedIn: ctx.isSignedIn,
    isLoaded: ctx.isLoaded,
    user: ctx.user,
  };
}

// Auth Provider component
// Note: When Clerk is configured, wrap with actual ClerkProvider at the root level
export function AuthProvider({ children }: { children: ReactNode }) {
  // In demo mode, use the demo provider
  if (!isClerkConfigured) {
    console.info('[StudioOS] Running in Demo Mode - Clerk not configured');
    return <DemoAuthProvider>{children}</DemoAuthProvider>;
  }

  // Clerk is configured - this should be wrapped by ClerkProvider at app level
  // Just pass through children since ClerkProvider wraps this component
  return <>{children}</>;
}

export default AuthProvider;
