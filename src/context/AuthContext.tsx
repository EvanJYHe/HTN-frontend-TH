"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { AUTH_STORAGE_KEY } from "../constants/auth";
import { validateCredentials } from "../lib/auth";
import type { AuthState } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext<AuthState | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>(
    AUTH_STORAGE_KEY,
    false,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(storedValue === "true");
  }, [setIsAuthenticated]);

  const login = useCallback(
    (username: string, password: string): boolean => {
      const isValid = validateCredentials(username, password);
      setIsAuthenticated(isValid);
      return isValid;
    },
    [setIsAuthenticated],
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

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
