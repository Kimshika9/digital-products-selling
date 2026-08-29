import React, { useState } from 'react';
import { Folder, Bookmark } from 'lucide-react';
import { Product } from '../types';
import { EmptyState } from '../components/ui/EmptyState';
import { ProductPostCard } from '../components/market/ProductPostCard';

interface LibraryScreenProps {
  products: Product[];
  savedProductIds: Set<string>;
  onToggleSaveProduct: (id: string) => void;
  onBuyProduct: (product: Product) => void;
  onShareProduct: (product: Product) => void;
  onNavigateToMarket: () => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  products,
  savedProductIds,
  onToggleSaveProduct,
  onBuyProduct,
  onShareProduct,
  onNavigateToMarket,
}) => {
  const [activeTab, setActiveTab] = useState<'purchased' | 'saved'>('purchased');

  const savedProducts = products.filter((p) => savedProductIds.has(p.id));

  return (
    <div className="flex flex-col gap-5 p-4 pb-24 animate-in fade-in duration-300">
      {/* Tab Switcher */}
      <div className="flex bg-[#161b22] border border-white/5 p-1 rounded-[12px]">
        <button
          onClick={() => setActiveTab('purchased')}
          className={`flex-1 py-2 text-xs font-semibold rounded-[8px] transition-all ${
            activeTab === 'purchased'
              ? 'bg-[#6c5ce7] text-white shadow-md glow-primary'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Purchased
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-2 text-xs font-semibold rounded-[8px] transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'saved'
              ? 'bg-[#6c5ce7] text-white shadow-md glow-primary'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Saved Items
          {savedProducts.length > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-white/20 text-white">
              {savedProducts.length}
            </span>
          )}
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'purchased' && (
        <div className="pt-4">
          <EmptyState
            icon={<Folder className="w-8 h-8" />}
            title="No purchases yet"
            subtitle="Your purchased digital products, license keys, and downloadable assets will appear here."
            actionLabel="Browse Marketplace"
            onAction={onNavigateToMarket}
          />
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="flex flex-col gap-4">
          {savedProducts.length > 0 ? (
            savedProducts.map((product) => (
              <ProductPostCard
                key={product.id}
                product={product}
                isSaved={true}
                onToggleSave={onToggleSaveProduct}
                onBuy={onBuyProduct}
                onShare={onShareProduct}
              />
            ))
          ) : (
            <EmptyState
              icon={<Bookmark className="w-8 h-8" />}
              title="No saved products"
              subtitle="Tap the bookmark icon on any product in the market to save it for later."
              actionLabel="Explore Marketplace"
              onAction={onNavigateToMarket}
            />
          )}
        </div>
      )}
    </div>
  );
};
