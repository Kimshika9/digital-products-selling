import React from 'react';
import { cn } from '../../utils/cn';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevated?: boolean;
  glow?: 'primary' | 'secondary' | 'cyan' | 'none';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  elevated = false,
  glow = 'none',
  className,
  ...props
}) => {
  const glowStyles = {
    primary: 'glow-primary',
    secondary: 'glow-secondary',
    cyan: 'glow-cyan',
    none: '',
  };

  return (
    <div
      className={cn(
        elevated ? 'glass-panel-elevated rounded-[16px] p-4' : 'glass-panel rounded-[16px] p-4',
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
