import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/market/ProductCard';
import { Button } from '../components/ui/Button';

interface HomeScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: 'explore' | 'market') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onSelectProduct,
  onNavigate,
}) => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);
  const trendingProducts = products.slice(3, 9);
  const continueExploringProducts = products.slice(0, 4);

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <div className="flex flex-col gap-6 pb-24 animate-in fade-in duration-300">
      {/* 1. Featured Product Carousel */}
      <section className="flex flex-col gap-2 pt-2">
        <div className="flex items-center justify-between px-4">
          <span className="text-xs font-semibold text-[#6c5ce7] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Featured Spotlights
          </span>
          <div className="flex items-center gap-1">
            {featuredProducts.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx
                    ? 'w-5 bg-[#6c5ce7] glow-primary'
                    : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden px-4">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="w-full shrink-0 pr-0"
              >
                <div
                  className="relative aspect-[16/9] w-full rounded-[16px] overflow-hidden border border-white/10 group cursor-pointer shadow-elevated"
                  onClick={() => onSelectProduct(prod)}
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/60 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[11px] font-medium text-[#06b6d4] uppercase tracking-wider mb-0.5">
                      {prod.category} • {prod.productType}
                    </span>
                    <h2 className="text-lg font-heading font-bold text-white line-clamp-1">
                      {prod.title}
                    </h2>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10">
                      <span className="text-base font-bold text-[#6c5ce7]">
                        ${prod.price}
                      </span>
                      <Button variant="glass" size="small" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Product
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Trending Products Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#f59e0b]" /> Trending Now
          </h2>
          <button
            onClick={() => onNavigate('market')}
            className="text-xs text-[#3b82f6] hover:text-[#6c5ce7] font-medium flex items-center gap-0.5 transition-colors"
          >
            See All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1">
          {trendingProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectProduct(item)}
              className="w-[120px] shrink-0 bg-[#161b22] border border-white/5 rounded-[12px] p-2 flex flex-col gap-1.5 cursor-pointer hover:border-white/15 transition-all"
            >
              <div className="w-[104px] h-[104px] rounded-[8px] overflow-hidden bg-white/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h4 className="text-xs font-medium text-white line-clamp-1">
                {item.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#6c5ce7]">
                  ${item.price}
                </span>
                <span className="text-[10px] text-[#64748b] truncate max-w-[50px]">
                  {item.seller.name.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Continue Exploring Section */}
      <section className="flex flex-col gap-3 px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-heading font-bold text-white">
            Continue Exploring
          </h2>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs text-[#3b82f6] hover:text-[#6c5ce7] font-medium transition-colors"
          >
            Categories
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {continueExploringProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onClick={() => onSelectProduct(prod)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
