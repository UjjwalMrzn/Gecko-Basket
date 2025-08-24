// src/pages/Admin/AdminLoginPage.tsx

import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const AdminLoginPage = () => {
  const { login, isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (isLoggedIn && user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed.");
      if (data.user?.role !== 'admin') throw new Error("Access denied. Admins only.");
      
      login(data.user, data.token);

      // Navigate to where the user was trying to go, or the dashboard.
      const from = location.state?.from?.pathname || "/admin/dashboard";
      navigate(from, { replace: true });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
      <p className="text-sm text-gray-500 mt-2 mb-8">Welcome back. Please enter your credentials.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          testId="admin-login-email-input"
          icon={<Mail size={16} />}
          autoComplete="email"
        />
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium text-gray-800">Password</label>
            <Link to="#" className="text-xs font-medium text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              label=""
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
              testId="admin-login-password-input"
              icon={<Lock size={16} />}
              autoComplete="current-password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 text-center" data-testid="admin-login-error">
            {error}
          </p>
        )}
        <Button type="submit" fullWidth disabled={isLoading} testId="admin-login-submit-button">
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default AdminLoginPage;