import React, { useState, useMemo } from 'react';
import {
  Search,
  Palette,
  Bot,
  LayoutTemplate,
  GraduationCap,
  Music,
  Gamepad2,
  Code2,
  Megaphone,
  X,
  Compass,
} from 'lucide-react';
import { Product } from '../types';
import { ProductPostCard } from '../components/market/ProductPostCard';
import { EmptyState } from '../components/ui/EmptyState';

interface ExploreScreenProps {
  products: Product[];
  savedProductIds: Set<string>;
  onToggleSaveProduct: (id: string) => void;
  onBuyProduct: (product: Product) => void;
  onShareProduct: (product: Product) => void;
}

const CATEGORIES = [
  { name: 'Design', icon: Palette, color: 'text-[#6c5ce7]', bg: 'bg-[#6c5ce7]/15 border-[#6c5ce7]/30', count: '140+ Products' },
  { name: 'AI Tools', icon: Bot, color: 'text-[#06b6d4]', bg: 'bg-[#06b6d4]/15 border-[#06b6d4]/30', count: '95+ Products' },
  { name: 'Templates', icon: LayoutTemplate, color: 'text-[#3b82f6]', bg: 'bg-[#3b82f6]/15 border-[#3b82f6]/30', count: '210+ Products' },
  { name: 'Courses', icon: GraduationCap, color: 'text-[#10b981]', bg: 'bg-[#10b981]/15 border-[#10b981]/30', count: '80+ Products' },
  { name: 'Music', icon: Music, color: 'text-[#ec4899]', bg: 'bg-[#ec4899]/15 border-[#ec4899]/30', count: '65+ Products' },
  { name: 'Gaming', icon: Gamepad2, color: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/15 border-[#f59e0b]/30', count: '110+ Products' },
  { name: 'Development', icon: Code2, color: 'text-[#6366f1]', bg: 'bg-[#6366f1]/15 border-[#6366f1]/30', count: '175+ Products' },
  { name: 'Marketing', icon: Megaphone, color: 'text-[#ef4444]', bg: 'bg-[#ef4444]/15 border-[#ef4444]/30', count: '90+ Products' },
];

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  products,
  savedProductIds,
  onToggleSaveProduct,
  onBuyProduct,
  onShareProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.seller.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col gap-6 p-4 pb-24 animate-in fade-in duration-300">
      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, creators, tags..."
          className="w-full h-[48px] pl-10 pr-10 bg-white/[0.04] border border-white/10 rounded-[12px] text-sm text-white placeholder-[#64748b] backdrop-blur-md focus:outline-none focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#64748b] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Selected Filter Banner */}
      {selectedCategory && (
        <div className="flex items-center justify-between px-3 py-2 bg-[#6c5ce7]/15 border border-[#6c5ce7]/30 rounded-[10px]">
          <span className="text-xs text-white font-medium">
            Category: <strong className="text-[#6c5ce7]">{selectedCategory}</strong>
          </span>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs text-[#94a3b8] hover:text-white flex items-center gap-1"
          >
            Clear Filter <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Categories Grid (Shown when not actively searching) */}
      {!searchQuery && (
        <section className="flex flex-col gap-3">
          <h2 className="text-base font-heading font-bold text-white">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;

              return (
                <div
                  key={cat.name}
                  onClick={() =>
                    setSelectedCategory(isSelected ? null : cat.name)
                  }
                  className={`p-3 rounded-[12px] border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#6c5ce7]/20 border-[#6c5ce7] glow-primary'
                      : 'bg-[#161b22] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-[10px] border flex items-center justify-center shrink-0 ${cat.bg}`}
                  >
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-white truncate">
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-[#64748b]">
                      {cat.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Products Feed Section */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-heading font-bold text-white">
            {searchQuery || selectedCategory ? 'Filtered Products' : 'New Releases'}
          </h2>
          <span className="text-xs text-[#64748b]">
            {filteredProducts.length} items
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="flex flex-col gap-4">
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
        ) : (
          <EmptyState
            icon={<Compass className="w-8 h-8" />}
            title="No products found"
            subtitle="Try adjusting your search criteria or clear category filters."
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
          />
        )}
      </section>
    </div>
  );
};
