import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, authIsLoading } = useAuth(); // 1. Get the loading state

  // 2. If the auth state is still loading, render a loading message (or a spinner)
  if (authIsLoading) {
    return <div>Loading...</div>;
  }

  // 3. Once loading is false, perform the check
  const isAdmin = user && user.role === 'admin';

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;