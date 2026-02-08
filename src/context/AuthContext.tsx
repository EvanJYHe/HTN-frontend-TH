"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { AUTH_STORAGE_KEY } from "../constants/auth";
import { validateCredentials } from "../lib/auth";
import type { AuthState } from "../types/auth";

const AuthContext = createContext<AuthState | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("auth-change", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("auth-change", onStoreChange);
      };
    },
    () => window.localStorage.getItem(AUTH_STORAGE_KEY) === "true",
    () => false,
  );

  const login = useCallback(
    (username: string, password: string): boolean => {
      const isValid = validateCredentials(username, password);
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(isValid));
      window.dispatchEvent(new Event("auth-change"));
      return isValid;
    },
    [],
  );

  const logout = useCallback(() => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(false));
    window.dispatchEvent(new Event("auth-change"));
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
