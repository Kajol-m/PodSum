import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?:string;
  onClick?: () => void;
};

const baseClasses =
  "px-6 py-3 rounded-full font-semibold transition-colors duration-150 outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800";

const variants = {
  primary:
    "bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow hover:from-pink-600 hover:to-cyan-600",
  secondary:
    "bg-[#181A31] text-white border border-cyan-400 hover:bg-cyan-900 hover:text-cyan-300",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  loading = false,
  className,
  id,
  onClick,
}) => (
  <button
    type={type}
    className={clsx(
      baseClasses,
      variants[variant],
      "relative",
      disabled && "opacity-50 pointer-events-none",
      className,
      id
    )}
    onClick={onClick}
    disabled={disabled || loading}
    aria-disabled={disabled || loading}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
          />
        </svg>
        Loading...
      </span>
    ) : (
      children
    )}
  </button>
);

export default Button;
