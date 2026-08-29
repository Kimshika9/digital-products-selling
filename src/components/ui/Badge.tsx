import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent' | 'cyan';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  className,
  icon,
}) => {
  const variants = {
    default: 'bg-white/5 text-[#94a3b8] border border-white/10 backdrop-blur-md',
    success: 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 backdrop-blur-md',
    warning: 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 backdrop-blur-md',
    danger: 'bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30 backdrop-blur-md',
    accent: 'bg-[#6c5ce7]/20 text-white border border-[#6c5ce7]/40 backdrop-blur-md',
    cyan: 'bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/40 backdrop-blur-md',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-[8px] select-none leading-none',
        variants[variant],
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </span>
  );
};
