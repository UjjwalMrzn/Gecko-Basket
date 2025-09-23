import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default AuthCheck;
