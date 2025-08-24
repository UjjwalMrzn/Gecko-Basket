// src/components/ui/Input.tsx

import React from 'react';

type InputProps = {
  label: string;
  type: string;
  value: string | number;
  name?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  error?: string | null;
  min?: number;
  disabled?: boolean;
  testId?: string;
  icon?: React.ReactNode;
  variant?: 'light' | 'dark';
  autoComplete?: string;
};

const Input = ({
  label,
  type,
  value,
  name,
  placeholder,
  onChange,
  required = false,
  className = "",
  error = null,
  min,
  disabled = false,
  testId,
  icon,
  variant = 'light',
  autoComplete,
}: InputProps) => {

  const baseInputStyles = "w-full rounded-lg border px-4 py-2.5 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition disabled:cursor-not-allowed";

  const variantStyles = {
    light: `bg-white text-gray-800 ${error ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-green-500"}`,
    dark: `bg-gray-800 text-white border-gray-700 focus:ring-green-500 placeholder-gray-500`,
  };

  const paddingStyles = icon ? "pl-10" : "pl-4";

  return (
    <div className={`relative ${className}`}>
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-800 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          id={name} 
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          min={min}
          disabled={disabled}
          data-testid={testId}
          className={`${baseInputStyles} ${variantStyles[variant]} ${paddingStyles}`}
          autoComplete={autoComplete}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;