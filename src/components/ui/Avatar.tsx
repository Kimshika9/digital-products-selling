import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: 24 | 32 | 40 | 80;
  className?: string;
  gradientBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 40,
  className,
  gradientBorder = false,
}) => {
  const sizeMap = {
    24: 'w-6 h-6',
    32: 'w-8 h-8',
    40: 'w-10 h-10',
    80: 'w-20 h-20',
  };

  if (gradientBorder) {
    return (
      <div
        className={cn(
          'p-[2px] rounded-full bg-gradient-to-tr from-[#6c5ce7] via-[#3b82f6] to-[#06b6d4] shadow-lg shadow-[#6c5ce7]/20 shrink-0',
          sizeMap[size],
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full bg-[#0a0a14]"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'rounded-full object-cover border border-white/10 shrink-0',
        sizeMap[size],
        className
      )}
      loading="lazy"
    />
  );
};
