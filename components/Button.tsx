
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ocean' | 'danger' | 'whatsapp';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide shadow-lg transform hover:-translate-y-0.5';
  
  const variants = {
    primary: 'bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-ocean hover:shadow-teal-500/40',
    secondary: 'bg-white dark:bg-white/5 text-charcoal dark:text-white border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm',
    ocean: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-blue-500/30',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30',
    whatsapp: 'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-green-500/30 flex items-center justify-center gap-2',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
