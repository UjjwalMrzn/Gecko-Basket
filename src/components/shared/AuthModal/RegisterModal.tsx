import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import googleLogo from "../../../assets/logos/google.svg";

import { useAuth } from "../../../context/AuthContext";
import { useAuthModal } from "../../../context/AuthModalContext";

import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const RegisterModal = () => {
  const { modalType, closeModal, openModal } = useAuthModal();
  const { login } = useAuth(); // Simulating login after register

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  if (modalType !== "register") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setFormError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setFormError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }

    // Simulated register then login
    login("demo-token", username);
    closeModal();
  };

  return (
    <Modal isOpen onClose={closeModal}>
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-5 text-xl text-gray-400 hover:text-black"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#272343] mb-1 text-center">Register</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Create a Gecko Basket account
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Username"
          type="text"
          value={username}
          placeholder="Your full name"
          onChange={(e) => setUsername(e.target.value)}
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

        <Button type="submit" fullWidth>
          Register
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-3 text-sm text-gray-500">or continue with</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      {/* Google Login */}
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
