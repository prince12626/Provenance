import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
      label?: string;
      className?: string;
}

const Input = ({ label, className = "", ...props }: InputProps) => {
      return (
            <div className="flex flex-col gap-1.5">
                  {label && (
                        <label className="text-sm font-medium text-white">
                              {label}
                        </label>
                  )}

                  <input
                        {...props}
                        className={`
                              w-full
                              bg-white/10
                              border
                              border-white/20
                              text-white
                              placeholder:text-white/50
                              px-3
                              py-2
                              rounded-none
                              outline-none
                              transition-all
                              focus:border-white/50
                              focus:bg-white/15
                              disabled:opacity-50
                              disabled:cursor-not-allowed
                              ${className}
                        `}
                  />
            </div>
      );
};

export default Input;
