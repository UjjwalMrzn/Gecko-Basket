// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user"; // Import the centralized User type

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  authIsLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authIsLoading, setAuthIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
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

  const login = (userData: User, tokenData: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setUser(userData);
    setToken(tokenData);
    if (userData.role === 'admin') {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/"); // Navigate to home on logout for a better user experience
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        token,
        authIsLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};