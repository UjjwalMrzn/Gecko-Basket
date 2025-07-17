// src/components/ui/Button.tsx
import React from 'react';

type ButtonVariant = 'solid' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

type Props = {
  children: React.ReactNode;
  // Corrected onClick type to accept the React MouseEvent
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
};

const Button = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
  className = "",
  variant = "solid",
  size = "md",
  icon,
}: Props) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";
  const sizeStyles = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  const variantStyles = {
    solid: `bg-[#59b143] text-white border border-transparent hover:bg-[#4ca035] focus:ring-[#59b143] ${disabled ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' : ''}`,
    outline: `bg-transparent text-[#59b143] border border-[#59b143] hover:bg-green-50 focus:ring-[#59b143] ${disabled ? 'text-gray-400 border-gray-300 hover:bg-transparent cursor-not-allowed' : ''}`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;