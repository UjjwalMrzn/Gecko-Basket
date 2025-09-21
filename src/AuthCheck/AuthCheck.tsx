// src/AuthCheck/AuthCheck.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

interface DecodedToken {
  exp: number;
}

const AuthCheck = () => {
  const { token, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [location, token, logout]);

  return null;
};

export default AuthCheck;