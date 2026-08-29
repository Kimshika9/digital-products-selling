import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonLoaderProps {
  variant?: 'card' | 'post' | 'text' | 'avatar' | 'image';
  className?: string;
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  className,
  count = 1,
}) => {
  const renderItem = (key: number) => {
    if (variant === 'text') {
      return (
        <div
          key={key}
          className={cn('h-4 w-full rounded-[4px] animate-shimmer', className)}
        />
      );
    }

    if (variant === 'avatar') {
      return (
        <div
          key={key}
          className={cn('w-10 h-10 rounded-full animate-shimmer', className)}
        />
      );
    }

    if (variant === 'image') {
      return (
        <div
          key={key}
          className={cn('w-full aspect-video rounded-[12px] animate-shimmer', className)}
        />
      );
    }

    if (variant === 'post') {
      return (
        <div
          key={key}
          className="bg-[#161b22] border border-white/5 rounded-[16px] p-4 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full animate-shimmer shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="h-3.5 w-1/3 rounded animate-shimmer" />
              <div className="h-2.5 w-1/4 rounded animate-shimmer" />
            </div>
          </div>
          <div className="w-full aspect-video rounded-[12px] animate-shimmer" />
          <div className="h-4 w-3/4 rounded animate-shimmer" />
          <div className="h-3 w-1/2 rounded animate-shimmer" />
          <div className="flex justify-between items-center pt-2 border-t border-white/5">
            <div className="h-5 w-16 rounded animate-shimmer" />
            <div className="h-8 w-24 rounded-[8px] animate-shimmer" />
          </div>
        </div>
      );
    }

    // Default 'card'
    return (
      <div
        key={key}
        className="bg-[#161b22] border border-white/5 rounded-[12px] overflow-hidden flex flex-col"
      >
        <div className="w-full aspect-video animate-shimmer" />
        <div className="p-3 flex flex-col gap-2">
          <div className="h-4 w-3/4 rounded animate-shimmer" />
          <div className="h-3 w-1/2 rounded animate-shimmer" />
          <div className="h-4 w-1/3 rounded animate-shimmer mt-2" />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {Array.from({ length: count }).map((_, index) => renderItem(index))}
    </div>
  );
};
