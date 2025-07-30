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
}: InputProps) => {
  
  const baseInputStyles = "w-full rounded-2xl border px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition disabled:bg-gray-100 disabled:cursor-not-allowed";
  const stateStyles = error ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-[#59b143]";

  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-[#272343] mb-1.5">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        min={min}
        disabled={disabled}
        data-testid={testId} 
        className={`${baseInputStyles} ${stateStyles}`}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;