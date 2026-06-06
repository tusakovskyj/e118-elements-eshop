import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', fullWidth, ...props }, ref) => {
    // Ultra-minimal styling variants
    const baseClass = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none text-sm px-5 py-2.5";
    
    const variants = {
      primary: "bg-black text-white hover:bg-neutral-800",
      secondary: "bg-neutral-100 text-black hover:bg-neutral-200",
      outline: "border border-black text-black hover:bg-black hover:text-white",
      ghost: "text-black hover:underline",
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          baseClass,
          variants[variant],
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
