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
const AUTH_CHANGE_EVENT = "auth-change";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const setAuthenticationState = useCallback((authenticated: boolean) => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticated));
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }, []);

  const isAuthenticated = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
      };
    },
    () => window.localStorage.getItem(AUTH_STORAGE_KEY) === "true",
    () => false,
  );

  const login = useCallback(
    (username: string, password: string): boolean => {
      const isValid = validateCredentials(username, password);
      setAuthenticationState(isValid);
      return isValid;
    },
    [setAuthenticationState],
  );

  const logout = useCallback(() => {
    setAuthenticationState(false);
  }, [setAuthenticationState]);

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
