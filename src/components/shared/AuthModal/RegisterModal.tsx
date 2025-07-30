import { useState } from "react";
import { useAuthModal } from "../../../context/AuthModalContext";
import { useToast } from "../../../context/ToastContext";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { Eye, EyeOff } from "lucide-react";

const RegisterModal = () => {
  const { modalType, closeModal, openModal } = useAuthModal();
  const { addToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (modalType !== "register") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }
      addToast("Registration successful! Please log in.", "success");
      openModal("login");
    } catch (error: any) {
      setFormError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={closeModal}>
      <h2 className="text-2xl font-bold text-[#272343] mb-1 text-center">Register</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">Create a Gecko Basket account</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Full Name" type="text" value={name} placeholder="Your full name" onChange={(e) => setName(e.target.value)} required testId="register-name-input" />
        <Input label="Email" type="email" value={email} placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} required testId="register-email-input" />
        <div className="relative">
          <Input label="Password" type={showPassword ? "text" : "password"} value={password} placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} required testId="register-password-input" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] text-gray-400 hover:text-[#59b143]">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formError && (
          <p className="text-sm text-red-600 text-center -mt-2">{formError}</p>
        )}
        <Button type="submit" fullWidth disabled={isLoading} testId="register-submit-button">
          {isLoading ? 'Creating Account...' : 'Register'}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button type="button" onClick={() => openModal("login")} className="text-[#59b143] hover:underline font-medium" data-testid="go-to-login-button">
          Login
        </button>
      </p>
    </Modal>
  );
};

export default RegisterModal;