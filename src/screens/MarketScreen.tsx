import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { CategoryFilter } from '../components/market/CategoryFilter';
import { ProductPostCard } from '../components/market/ProductPostCard';

interface MarketScreenProps {
  products: Product[];
  savedProductIds: Set<string>;
  onToggleSaveProduct: (id: string) => void;
  onBuyProduct: (product: Product) => void;
  onShareProduct: (product: Product) => void;
}

const CATEGORIES = [
  'All',
  'Design',
  'AI Tools',
  'Templates',
  'Courses',
  'Music',
  'Gaming',
  'Development',
  'Marketing',
];

export const MarketScreen: React.FC<MarketScreenProps> = ({
  products,
  savedProductIds,
  onToggleSaveProduct,
  onBuyProduct,
  onShareProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
  }, [products, activeCategory]);

  return (
    <div className="flex flex-col gap-4 p-4 pb-24 animate-in fade-in duration-300">
      {/* Category Filter Horizontal Scroll */}
      <div className="sticky top-[57px] z-20 bg-[#0a0a14]/90 backdrop-blur-md -mx-4 px-4 py-2 border-b border-white/5">
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* Product Feed */}
      <div className="flex flex-col gap-4 mt-1">
        {filteredProducts.map((product) => (
          <ProductPostCard
            key={product.id}
            product={product}
            isSaved={savedProductIds.has(product.id)}
            onToggleSave={onToggleSaveProduct}
            onBuy={onBuyProduct}
            onShare={onShareProduct}
          />
        ))}
      </div>
    </div>
  );
};
