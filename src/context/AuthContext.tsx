// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { User } from "../types/user";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  authIsLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authIsLoading, setAuthIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("gecko-token");
      const savedUser = localStorage.getItem("gecko-user");
      if (savedToken && savedUser) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setAuthIsLoading(false);
    }
  }, []);

  const login = useCallback((userData: User, tokenData: string) => {
    localStorage.setItem("gecko-user", JSON.stringify(userData));
    localStorage.setItem("gecko-token", tokenData);

    if (userData.role === 'admin') {
      window.location.href = "/admin/dashboard";
    } else {
      // ✅ DEFINITIVE FIX: A full page reload is a robust way to ensure all contexts re-sync
      window.location.href = "/";
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("gecko-user");
    localStorage.removeItem("gecko-token");
    localStorage.removeItem("gecko-cart"); // Clear guest data too
    localStorage.removeItem("gecko-wishlist");
    // ✅ DEFINITIVE FIX: A full page reload ensures all state is cleared
    window.location.href = "/auth";
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, token, authIsLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};