'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: any | null;
  userId: string | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userId: null,
  isLoading: true,
  signOut: async () => {},
  refreshSession: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, userId, signOut: clerkSignOut } = useAuth();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    // Use setTimeout to defer state updates and avoid cascading renders
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isLoaded]);

  const signOut = async () => {
    try {
      await clerkSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const refreshSession = async () => {
    // Clerk handles session refresh automatically
  };

  return (
    <AuthContext.Provider value={{
      user,
      userId: userId || null,
      isLoading,
      signOut,
      refreshSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
