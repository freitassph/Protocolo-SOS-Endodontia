import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  // Added min-h-[44px] for accessibility on mobile (Apple Guidelines)
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[44px]";
  
  const variants = {
    primary: "bg-primary-900 text-white hover:bg-primary-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 focus:ring-primary-900",
    secondary: "bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-lg shadow-accent-500/20",
    danger: "bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500",
    ghost: "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
    outline: "bg-transparent border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-slate-500"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3.5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};