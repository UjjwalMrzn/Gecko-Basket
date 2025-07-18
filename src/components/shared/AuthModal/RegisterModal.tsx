import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import googleLogo from "../../../assets/logos/google.svg";

import { useAuthModal } from "../../../context/AuthModalContext";
import { registerUser } from "../../../api/authApi"; // ✅ IMPORT our new function

import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const RegisterModal = () => {
  const { modalType, closeModal, openModal } = useAuthModal();
  
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

    if (!name.trim() || !email.trim() || !password.trim()) {
      setFormError("All fields are required.");
      return;
    }

    setIsLoading(true);
    try {
      // ✅ CLEAN: Call the centralized API function instead of fetch
      await registerUser({ name, email, password });

      // On success, notify the user and switch to the login modal
      alert("Registration successful! Please log in.");
      openModal("login");

    } catch (error: any) {
      // ✅ CLEAN: The error message now comes directly from our API layer
      setFormError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={closeModal}>
      {/* Close Button */}
      <button onClick={closeModal} className="absolute top-4 right-5 text-xl text-gray-400 hover:text-black">&times;</button>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#272343] mb-1 text-center">Register</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">Create a Gecko Basket account</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          type="text"
          value={name}
          placeholder="Your full name"
          onChange={(e) => setName(e.target.value)}
          required
        />
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

        {formError && (
          <p className="text-sm text-red-600 text-center -mt-2">{formError}</p>
        )}

        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Register'}
        </Button>
      </form>

      {/* Divider and Google Login */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-3 text-sm text-gray-500">or continue with</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>
      <button
        onClick={() => alert("Google register not implemented")}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-[#272343] hover:bg-gray-50 transition"
      >
        <img src={googleLogo} alt="Google" className="h-5 w-5" />
        Continue with Google
      </button>

      {/* Switch to Login */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => openModal("login")}
          className="text-[#59b143] hover:underline font-medium"
        >
          Login
        </button>
      </p>
    </Modal>
  );
};

export default RegisterModal;