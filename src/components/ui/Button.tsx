import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  icon,
  fullWidth = false,
  className,
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#6c5ce7] focus:ring-offset-2 focus:ring-offset-[#0a0a14] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary:
      'bg-[#6c5ce7] text-white hover:bg-[#5b4bc4] shadow-md hover:shadow-[#6c5ce7]/30 glow-primary',
    secondary:
      'bg-white/10 text-white hover:bg-white/15 border border-white/10 backdrop-blur-md',
    outline:
      'bg-transparent border border-[#6c5ce7] text-white hover:bg-[#6c5ce7]/10',
    glass:
      'bg-white/5 text-white border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20',
  };

  const sizes = {
    small: 'h-8 px-3 text-xs rounded-[8px] gap-1.5',
    medium: 'h-[44px] px-4 text-sm rounded-[8px] gap-2',
    large: 'h-[52px] px-6 text-base rounded-[12px] gap-2.5',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
