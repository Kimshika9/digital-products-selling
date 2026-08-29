import React from 'react';
import { cn } from '../../utils/cn';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-sm select-none',
        className
      )}
    >
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={cn(
              'px-3.5 py-1.5 rounded-[8px] font-medium whitespace-nowrap transition-all duration-200 text-xs shrink-0',
              isActive
                ? 'bg-[#6c5ce7] text-white shadow-md shadow-[#6c5ce7]/30 glow-primary font-semibold'
                : 'bg-[#161b22] text-[#94a3b8] hover:text-white hover:bg-white/10 border border-white/5'
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
