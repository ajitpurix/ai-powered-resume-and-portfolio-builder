'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';

type InputProps = {
  label?: string;
  error?: string;
  fullWidth?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    label, 
    error, 
    fullWidth = true,
    type = 'text',
    ...props 
  }, ref) => {
    const id = React.useId();
    const inputId = props.id || id;
    
    return (
      <div className={cn('mb-4', fullWidth ? 'w-full' : '')}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={cn(
            'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5',
            error ? 'border-red-500' : 'border-gray-300',
            fullWidth ? 'w-full' : '',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p 
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 