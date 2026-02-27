// lib/auth.tsx
import { createContext, useContext, useMemo } from "react";
import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
"use client";
var isClerkConfigured = typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
var mockUser = {
  id: "demo-user-001",
  firstName: "Demo",
  lastName: "User",
  fullName: "Demo User",
  primaryEmailAddress: { emailAddress: "demo@tanti.studio" },
  imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo"
};
var AuthContext = createContext({
  isSignedIn: false,
  isLoaded: true,
  user: null,
  userId: null,
  sessionId: null,
  orgId: null,
  orgRole: null,
  signOut: async () => {},
  getToken: async () => null
});
function DemoAuthProvider({ children }) {
  const value = useMemo(() => ({
    isSignedIn: true,
    isLoaded: true,
    user: mockUser,
    userId: mockUser.id,
    sessionId: "demo-session",
    orgId: null,
    orgRole: null,
    signOut: async () => {
      console.log("Demo mode: sign out called");
    },
    getToken: async () => "demo-token"
  }), []);
  return /* @__PURE__ */ jsxDEV(AuthContext.Provider, {
    value,
    children
  }, undefined, false, undefined, this);
}
function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
function useUser() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useUser must be used within AuthProvider");
  }
  return {
    isSignedIn: ctx.isSignedIn,
    isLoaded: ctx.isLoaded,
    user: ctx.user
  };
}
function AuthProvider({ children }) {
  if (!isClerkConfigured) {
    console.info("[StudioOS] Running in Demo Mode - Clerk not configured");
    return /* @__PURE__ */ jsxDEV(DemoAuthProvider, {
      children
    }, undefined, false, undefined, this);
  }
  return /* @__PURE__ */ jsxDEV(Fragment, {
    children
  }, undefined, false, undefined, this);
}
var auth_default = AuthProvider;
export {
  useUser,
  useAuth,
  auth_default as default,
  AuthProvider
};
