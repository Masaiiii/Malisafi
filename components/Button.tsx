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
  const baseStyles = 'px-4 py-3 rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-ocean text-white hover:bg-deepBlue shadow-lg shadow-ocean/30',
    secondary: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50',
    ocean: 'bg-deepBlue text-white hover:bg-ocean',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
    whatsapp: 'bg-whatsapp text-white hover:brightness-110 shadow-lg shadow-whatsapp/30 flex items-center justify-center gap-2',
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