import { useState } from 'react';
import { NavTab, Product, ToastMessage } from './types';
import { MOCK_PRODUCTS } from './data/products';
import { AppShell } from './layout/AppShell';
import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { MarketScreen } from './screens/MarketScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Toast } from './components/ui/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(
    new Set(['prod-1', 'prod-2'])
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (title: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, title, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleToggleSaveProduct = (productId: string) => {
    setSavedProductIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast('Removed from saved items');
      } else {
        next.add(productId);
        showToast('Saved to your Library', 'success');
      }
      return next;
    });
  };

  const handleBuyProduct = (product: Product) => {
    showToast(`Order initiated for ${product.title}!`, 'success');
  };

  const handleShareProduct = (_product: Product) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'success');
    } else {
      showToast('Share link ready', 'info');
    }
  };

  const handleSelectProduct = (product: Product) => {
    showToast(`Opening ${product.title}`, 'info');
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            products={MOCK_PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case 'explore':
        return (
          <ExploreScreen
            products={MOCK_PRODUCTS}
            savedProductIds={savedProductIds}
            onToggleSaveProduct={handleToggleSaveProduct}
            onBuyProduct={handleBuyProduct}
            onShareProduct={handleShareProduct}
          />
        );
      case 'market':
        return (
          <MarketScreen
            products={MOCK_PRODUCTS}
            savedProductIds={savedProductIds}
            onToggleSaveProduct={handleToggleSaveProduct}
            onBuyProduct={handleBuyProduct}
            onShareProduct={handleShareProduct}
          />
        );
      case 'library':
        return (
          <LibraryScreen
            products={MOCK_PRODUCTS}
            savedProductIds={savedProductIds}
            onToggleSaveProduct={handleToggleSaveProduct}
            onBuyProduct={handleBuyProduct}
            onShareProduct={handleShareProduct}
            onNavigateToMarket={() => setActiveTab('market')}
          />
        );
      case 'profile':
        return <ProfileScreen onShowToast={(msg) => showToast(msg)} />;
      default:
        return null;
    }
  };

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onNotificationClick={() => showToast('You have 2 new seller notifications')}
    >
      <Toast toast={toast} onClose={() => setToast(null)} />
      {renderActiveScreen()}
    </AppShell>
  );
}
