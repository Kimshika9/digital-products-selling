import { useState } from 'react';
import { NavTab, Product, ToastMessage } from './types';
import { MOCK_PRODUCTS } from './data/products';
import { AuthProvider } from './context/AuthContext';
import { AppShell } from './layout/AppShell';
import { HomeScreen } from './screens/HomeScreen';
import { ExploreScreen } from './screens/ExploreScreen';
import { MarketScreen } from './screens/MarketScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SecurityCenter } from './components/security/SecurityCenter';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ForgotPasswordModal } from './components/auth/ForgotPasswordModal';
import { EmailVerificationModal } from './components/auth/EmailVerificationModal';
import { Toast } from './components/ui/Toast';
import { X } from 'lucide-react';

function DpsAppContent() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(
    new Set(['prod-1', 'prod-2'])
  );
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Identity Modal States
  const [authModal, setAuthModal] = useState<'none' | 'login' | 'signup'>('none');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [emailVerifyOpen, setEmailVerifyOpen] = useState(false);
  const [viewingSecurity, setViewingSecurity] = useState(false);

  const showToast = (
    title: string,
    type: 'info' | 'success' | 'warning' = 'info'
  ) => {
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
    if (viewingSecurity) {
      return (
        <SecurityCenter
          onBack={() => setViewingSecurity(false)}
          onShowToast={showToast}
          onOpenVerifyModal={() => setEmailVerifyOpen(true)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            products={MOCK_PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onNavigate={(tab) => {
              setViewingSecurity(false);
              setActiveTab(tab);
            }}
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
            onNavigateToMarket={() => {
              setViewingSecurity(false);
              setActiveTab('market');
            }}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onShowToast={showToast}
            onOpenAuthModal={() => setAuthModal('login')}
            onOpenSecurityCenter={() => setViewingSecurity(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppShell
      activeTab={activeTab}
      onTabChange={(tab) => {
        setViewingSecurity(false);
        setActiveTab(tab);
      }}
      onNotificationClick={() => showToast('You have 2 new seller notifications')}
    >
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main Content View */}
      {renderActiveScreen()}

      {/* Unified Auth Modal */}
      {authModal !== 'none' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-[400px] bg-[#161b22] border border-white/10 rounded-[24px] p-6 shadow-elevated overflow-y-auto max-h-[90vh] no-scrollbar">
            <button
              onClick={() => setAuthModal('none')}
              className="absolute top-4 right-4 p-1.5 text-[#94a3b8] hover:text-white bg-white/5 rounded-full focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {authModal === 'login' ? (
              <LoginForm
                onSuccess={() => {
                  setAuthModal('none');
                  showToast('Welcome to DPS Identity', 'success');
                }}
                onSwitchToSignup={() => setAuthModal('signup')}
                onForgotPassword={() => {
                  setAuthModal('none');
                  setForgotPasswordOpen(true);
                }}
              />
            ) : (
              <SignupForm
                onSuccess={() => {
                  setAuthModal('none');
                  showToast('DPS Account Created', 'success');
                  setEmailVerifyOpen(true);
                }}
                onSwitchToLogin={() => setAuthModal('login')}
              />
            )}
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        onBackToLogin={() => {
          setForgotPasswordOpen(false);
          setAuthModal('login');
        }}
      />

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={emailVerifyOpen}
        onClose={() => setEmailVerifyOpen(false)}
      />
    </AppShell>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DpsAppContent />
    </AuthProvider>
  );
}
