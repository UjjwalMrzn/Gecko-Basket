// src/components/shared/AuthModal/LoginModal.tsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import googleLogo from "../../../assets/logos/google.svg";
import { useAuth } from "../../../context/AuthContext";
import { useAuthModal } from "../../../context/AuthModalContext";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { loginUser } from "../../../api/authApi"; // Import the new API function

const LoginModal = () => {
  const { modalType, closeModal, openModal } = useAuthModal();
  const { login } = useAuth(); // From AuthContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (modalType !== "login") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setFormError("Email and password are required.");
      setIsLoading(false);
      return;
    }

    try {
      // Use the abstracted API function
      const data = await loginUser({ email, password });
      // On success, update the global auth state
      login(data.user, data.token);
      closeModal();
    } catch (error: any) {
      setFormError(error.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <button
        onClick={closeModal}
        className="absolute top-4 right-5 text-xl text-gray-400 hover:text-black"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold text-[#272343] mb-1 text-center">Login</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Access your Gecko Basket account
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          value={email}
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-400 hover:text-[#59b143]"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-[#59b143] h-4 w-4 rounded"
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-[#59b143] hover:underline"
            onClick={() => alert("Forgot password flow not implemented")}
          >
            Forgot password?
          </button>
        </div>

        {formError && (
          <p className="text-sm text-red-600 text-center -mt-2">{formError}</p>
        )}

        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-3 text-sm text-gray-500">or continue with</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <button
        onClick={() => alert("Google login not implemented")}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-[#272343] hover:bg-gray-50 transition"
      >
        <img src="/assets/logos/google.svg" alt="Google" className="h-5 w-5" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => openModal("register")}
          className="text-[#59b143] hover:underline font-medium"
        >
          Register
        </button>
      </p>
    </Modal>
  );
};

export default LoginModal;