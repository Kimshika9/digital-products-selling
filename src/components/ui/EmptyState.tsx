import React from 'react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  className,
  compact = false,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-6 rounded-[16px] border border-white/5 bg-white/[0.02]',
        compact ? 'py-8' : 'py-12',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#6c5ce7] mb-4 glow-primary',
          compact ? 'w-12 h-12' : 'w-16 h-16'
        )}
      >
        {icon}
      </div>
      <h3
        className={cn(
          'font-heading font-bold text-white mb-1',
          compact ? 'text-base' : 'text-lg'
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'text-[#94a3b8] max-w-xs mb-5',
          compact ? 'text-xs' : 'text-sm'
        )}
      >
        {subtitle}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="medium" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
