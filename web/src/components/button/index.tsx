import React from "react";

import "./button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;

  const classes = [baseClass, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...props} className={classes} disabled={disabled || isLoading}>
      {isLoading && <span className="btn-loading-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
