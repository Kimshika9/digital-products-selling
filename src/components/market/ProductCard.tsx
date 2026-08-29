import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Product } from '../../types';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  className,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative bg-[#161b22] border border-white/5 rounded-[12px] overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card hover:border-white/15 cursor-pointer',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-white/5">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-shimmer" />
        )}
        <img
          src={product.image}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105',
            !imageLoaded && 'opacity-0'
          )}
          loading="lazy"
        />
        <div className="absolute top-2 left-2 z-10">
          <Badge label={product.productType} variant="accent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col justify-between flex-1 gap-1.5">
        <div>
          <span className="text-[11px] text-[#64748b] font-medium tracking-wide">
            {product.seller.name}
          </span>
          <h4 className="text-sm font-heading font-bold text-white line-clamp-1 group-hover:text-[#6c5ce7] transition-colors">
            {product.title}
          </h4>
        </div>

        <div className="flex items-center justify-between pt-1 mt-auto">
          <span className="text-sm font-bold text-[#6c5ce7]">
            ${product.price}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-[#94a3b8]">
            <Star className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />
            <span>{product.rating}</span>
            <span className="text-[#64748b]">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
