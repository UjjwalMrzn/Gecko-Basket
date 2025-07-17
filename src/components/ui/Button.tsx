import React from 'react';

// ✅ DEFINE the possible variants for the button
type ButtonVariant = 'solid' | 'outline';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant; // ✅ ADD the new variant prop
};

const Button = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
  className = "",
  variant = "solid", // ✅ Default to 'solid'
}: Props) => {
  
  // ✅ DEFINE base styles that apply to all variants
  const baseStyles = "rounded-lg font-medium text-sm py-2.5 px-5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // ✅ DEFINE styles specific to each variant
  const variantStyles = {
    solid: `bg-[#59b143] hover:bg-[#4ca035] text-white border border-transparent focus:ring-[#59b143] ${disabled ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : ''}`,
    outline: `bg-transparent hover:bg-gray-100 text-[#59b143] border border-[#59b143] focus:ring-[#59b143] ${disabled ? 'text-gray-400 border-gray-300 hover:bg-transparent cursor-not-allowed' : ''}`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;