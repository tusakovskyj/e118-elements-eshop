import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          "w-full px-4 py-2 text-sm border-b border-black outline-none bg-transparent placeholder-neutral-400 focus:border-black transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
