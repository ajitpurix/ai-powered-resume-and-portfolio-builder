'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
      secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
      outline: 'bg-transparent border border-slate-300 hover:bg-slate-100',
      ghost: 'bg-transparent hover:bg-slate-100',
      danger: 'bg-red-600 text-white hover:bg-red-700'
    };
    
    const sizes = {
      sm: 'py-1.5 px-3 text-sm rounded-lg',
      md: 'py-2 px-4 text-md rounded-lg',
      lg: 'py-3 px-6 text-lg rounded-lg'
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          widthClass,
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 