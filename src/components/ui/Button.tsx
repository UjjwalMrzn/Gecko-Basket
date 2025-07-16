// src/components/ui/Button.tsx
type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean; // Add the disabled prop
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false, // Add disabled to props
  className = "",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // Pass disabled to the button element
      className={`
        rounded-xl bg-[#59b143] text-white font-medium text-sm py-2.5 px-5 transition 
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#4ca035]"}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;