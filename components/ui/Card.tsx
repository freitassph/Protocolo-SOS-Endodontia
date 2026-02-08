import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-accent-500/30' : ''} ${className}`}
    >
      {children}
    </div>
  );
};