import React, { useState } from 'react';
import {
  CheckCircle2,
  Bookmark,
  Share2,
  Eye,
  Star,
  ExternalLink,
} from 'lucide-react';
import { Product } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface ProductPostCardProps {
  product: Product;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
  onBuy?: (product: Product) => void;
  onShare?: (product: Product) => void;
  onViewSeller?: (sellerId: string) => void;
  className?: string;
}

export const ProductPostCard: React.FC<ProductPostCardProps> = ({
  product,
  isSaved = false,
  onToggleSave,
  onBuy,
  onShare,
  onViewSeller,
  className,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <div
      className={cn(
        'bg-[#161b22] border border-white/8 rounded-[16px] p-4 flex flex-col gap-3 shadow-card transition-all duration-200 hover:border-white/15',
        className
      )}
    >
      {/* Header: Seller Info & Follow */}
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => onViewSeller && onViewSeller(product.seller.id)}
        >
          <Avatar src={product.seller.avatar} alt={product.seller.name} size={40} />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-white group-hover:text-[#6c5ce7] transition-colors">
                {product.seller.name}
              </span>
              {product.seller.verified && (
                <CheckCircle2 className="w-4 h-4 text-[#3b82f6] fill-[#3b82f6]/20" />
              )}
            </div>
            <span className="text-xs text-[#64748b]">{product.category} Creator</span>
          </div>
        </div>

        <Button
          variant={following ? 'glass' : 'outline'}
          size="small"
          onClick={() => setFollowing(!following)}
        >
          {following ? 'Following' : 'Follow'}
        </Button>
      </div>

      {/* Product Image & Badge */}
      <div className="relative aspect-video w-full rounded-[12px] overflow-hidden bg-white/5">
        {!imageLoaded && <div className="absolute inset-0 animate-shimmer" />}
        <img
          src={product.image}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-transform duration-300 hover:scale-103',
            !imageLoaded && 'opacity-0'
          )}
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-10">
          <Badge label={product.productType} variant="accent" />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-heading font-bold text-white leading-snug">
          {product.title}
        </h3>
        <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-[6px] bg-white/5 text-[#94a3b8] border border-white/5"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Price & Primary CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#64748b] uppercase tracking-wider font-semibold">
            Price
          </span>
          <span className="text-lg font-bold text-[#6c5ce7]">
            ${product.price}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="medium"
            onClick={() => onBuy && onBuy(product)}
            className="px-6"
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* Secondary Actions & Engagement Footer */}
      <div className="flex items-center justify-between text-xs text-[#64748b] pt-2 border-t border-white/5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {product.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-3 text-[#94a3b8]">
          <button
            onClick={() => onToggleSave && onToggleSave(product.id)}
            className={cn(
              'p-1.5 rounded-full hover:bg-white/10 transition-colors',
              isSaved && 'text-[#6c5ce7]'
            )}
            title={isSaved ? 'Unsave' : 'Save'}
          >
            <Bookmark
              className={cn('w-4 h-4', isSaved && 'fill-[#6c5ce7] text-[#6c5ce7]')}
            />
          </button>
          <button
            onClick={() => onShare && onShare(product)}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewSeller && onViewSeller(product.seller.id)}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            title="View Seller Profile"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
