// src/components/ui/Button.tsx
type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  className = "",
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        fullWidth ? "w-full" : ""
      } rounded-xl bg-[#59b143] hover:bg-[#4ca035] text-white font-medium text-sm py-2.5 px-5 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
