import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'solid-purple' | 'solid-grey';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const baseStyles = 'font-quantico font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 border';
  
  const variants = {
    primary: 'bg-[#6b21a8] text-white hover:bg-white hover:!text-black active:bg-gray-100 border-[#6b21a8] hover:border-gray-300 focus:ring-purple-600 shadow-sm hover:shadow-md transition-colors',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 border-gray-600 focus:ring-gray-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-[#6b21a8] bg-white text-[#6b21a8] hover:bg-purple-50 active:bg-purple-100 focus:ring-purple-600',
    ghost: 'text-[#6b21a8] hover:bg-purple-50 active:bg-purple-100 focus:ring-purple-600 border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
    'solid-purple': 'bg-[#6b21a8] text-white hover:bg-[#7c3aed] active:bg-[#5b1a96] border-[#6b21a8] focus:ring-purple-600 shadow-sm',
    'solid-grey': 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 border-gray-300 focus:ring-gray-400 shadow-sm'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-8 py-3 text-xl'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  // Get the text color based on variant and hover state
  const getTextColor = () => {
    if (variant === 'primary') {
      return isHovered ? '#000000' : '#ffffff';
    }
    if (variant === 'secondary' || variant === 'danger' || variant === 'solid-purple') {
      return '#ffffff';
    }
    if (variant === 'outline' || variant === 'ghost') {
      return '#6b21a8';
    }
    return '#1f2937'; // solid-grey
  };

  // Get background color for hover
  const getBackgroundColor = () => {
    if (variant === 'primary' && isHovered) {
      return '#ffffff';
    }
    return undefined;
  };

  // Get border color for hover
  const getBorderColor = () => {
    if (variant === 'primary' && isHovered) {
      return '#000000';
    }
    return undefined;
  };

  // Inline styles for xl size and color
  const inlineStyles: React.CSSProperties = {
    color: getTextColor(),
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    ...(size === 'xl' ? { fontSize: '1.25rem', padding: '0.75rem 2rem' } : {})
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      style={inlineStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
