"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Session } from "@/lib/auth/types";

type LoginInput = {
  email: string;
  password: string;
};

type LoginOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

type LogoutOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export type AuthContextType = {
  session: Session | null;
  loading: boolean;
  login: (input: LoginInput, options?: LoginOptions) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
  refetchSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Récupération de la session + refresh automatique
   */
  const refetchSession = useCallback(async () => {
    try {
      let res = await fetch("/api/auth/session");

      if (res.status === 401) {
        await fetch("/api/auth/refresh", { method: "POST" });
        res = await fetch("/api/auth/session");
      }

      const data = await res.json();
      setSession(data.session ?? null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Initial load
   */
  useEffect(() => {
    refetchSession();
  }, [refetchSession]);

  /**
   * Login
   */
  const login = async (input: LoginInput, options?: LoginOptions) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      await refetchSession();
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error as Error);
      throw error;
    }
  };

  /**
   * Logout
   */
  const logout = async (options?: LogoutOptions) => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setSession(null);
      options?.onSuccess?.();
    } catch (error) {
      options?.onError?.(error as Error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        login,
        logout,
        refetchSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Accès sécurisé au contexte
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
