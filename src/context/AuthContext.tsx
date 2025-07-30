import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
    if (userData.role === 'admin') {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem("gecko-user");
    localStorage.removeItem("gecko-token");
    setUser(null);
    setToken(null);
    navigate("/auth"); // Redirect to a login/auth page
  }, [navigate]);

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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};