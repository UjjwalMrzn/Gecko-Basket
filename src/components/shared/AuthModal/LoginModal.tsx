import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAuthModal } from "../../../context/AuthModalContext";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { Eye, EyeOff } from "lucide-react";

const LoginModal = () => {
  const { modalType, closeModal, openModal } = useAuthModal();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (modalType !== "login") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }
      login(data.user, data.token);
      closeModal();
    } catch (error: any) {
      setFormError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={closeModal}>
      <h2 className="text-2xl font-bold text-[#272343] mb-1 text-center">Login</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">Access your Gecko Basket account</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          testId="login-email-input"
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
            testId="login-password-input"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-gray-400 hover:text-[#59b143]">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formError && (
          <p className="text-sm text-red-600 text-center -mt-2">{formError}</p>
        )}
        <Button type="submit" fullWidth disabled={isLoading} testId="login-submit-button">
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Don’t have an account?{" "}
        <button type="button" onClick={() => openModal("register")} className="text-[#59b143] hover:underline font-medium" data-testid="go-to-register-button">
          Register
        </button>
      </p>
    </Modal>
  );
};

export default LoginModal;