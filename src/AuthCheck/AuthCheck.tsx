import { Navigate, useLocation } from "react-router-dom";
import React from "react";

const AuthCheck: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuthenticate = true;
  const location = useLocation();

  if (!isAuthenticate) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
      />
    );
  }

  return <>{children}</>;
};

export default AuthCheck;
