// src/routes/ProtectedRoute.tsx

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ adminOnly = false }: { adminOnly?: boolean }) => {
  const { user, isLoggedIn, authIsLoading } = useAuth();
  const location = useLocation();

  if (authIsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  // If trying to access a protected route and not logged in
  if (!isLoggedIn) {
    // If it's an admin page, send to admin login.
    // Otherwise, redirecting to home is a safe fallback (the login modal will handle user login).
    const redirectTo = adminOnly ? "/admin/login" : "/";
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If it's an admin-only route and the logged-in user is NOT an admin
  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />; // Kick out non-admins to the homepage
  }

  // If all checks pass, show the page
  return <Outlet />;
};

export default ProtectedRoute;