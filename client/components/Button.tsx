import React from "react";

interface ButtonProps {
      children: React.ReactNode;
      onClick?: () => void;
      type?: "button" | "submit" | "reset";
      disabled?: boolean;
      className?: string;
      variant?: "primary" | "secondary" | "ghost";
      size?: "sm" | "md" | "lg";
}

const Button = ({
      children,
      onClick,
      type = "button",
      disabled = false,
      className = "",
      variant = "primary",
      size = "md",
}: ButtonProps) => {
      const variants = {
            primary: "bg-white text-black hover:bg-white/90",
            secondary: "bg-white/30 text-white hover:bg-white",
            ghost: "bg-transparent text-white hover:bg-white/10",
      };

      const sizes = {
            sm: "px-2 py-1 text-sm",
            md: "px-3 py-1.5 text-base",
            lg: "px-5 py-2 text-lg",
      };

      return (
            <button
                  type={type}
                  onClick={onClick}
                  disabled={disabled}
                  className={`
                        font-medium
                        transition-all 
                        disabled:opacity-50 
                        disabled:cursor-not-allowed
                        rounded-md
                        duration-300
                        ${variants[variant]}
                        ${sizes[size]}
                        ${className}
                  `}
            >
                  {children}
            </button>
      );
};

export default Button;
