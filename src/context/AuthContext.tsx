// src/context/AuthContext.tsx

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  authIsLoading: boolean;
  login: (user: User, token: string) => void;
  logout: (options?: { fromAdmin?: boolean }) => void;
  updateUserContext: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authIsLoading, setAuthIsLoading] = useState(true);
  const navigate = useNavigate();

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
    setUser(userData);
    setToken(tokenData);

    // This is the critical fix. It now correctly checks the user's role
    // and navigates to the correct page after the state is set.
    if (userData.role === 'admin') {
      navigate("/admin/dashboard");
    } else {
      // For regular users, reloading the page is a robust way to ensure
      // all components (like the navbar) update with the new login state.
      window.location.href = "/";
    }
  }, [navigate]);

  const logout = useCallback((options?: { fromAdmin?: boolean }) => {
    localStorage.removeItem("gecko-user");
    localStorage.removeItem("gecko-token");
    setUser(null);
    setToken(null);
    if (options?.fromAdmin) {
      navigate("/admin/login");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const updateUserContext = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("gecko-user", JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        token,
        authIsLoading,
        login,
        logout,
        updateUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};