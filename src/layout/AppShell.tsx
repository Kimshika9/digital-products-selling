import React from 'react';
import { NavTab } from '../types';
import { Header } from '../components/navigation/Header';
import { BottomNavigation } from '../components/navigation/BottomNavigation';

interface AppShellProps {
  children: React.ReactNode;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onNotificationClick?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeTab,
  onTabChange,
  onNotificationClick,
}) => {
  const getHeaderProps = () => {
    switch (activeTab) {
      case 'home':
        return { showUser: true };
      case 'explore':
        return { showUser: false, title: 'Explore', subtitle: 'Search products & categories' };
      case 'market':
        return { showUser: false, title: 'Market', subtitle: 'Discover digital products from creators' };
      case 'library':
        return { showUser: false, title: 'Library', subtitle: 'Your purchased & saved assets' };
      case 'profile':
        return { showUser: false, title: 'Profile', subtitle: 'Manage your account & store' };
      default:
        return { showUser: true };
    }
  };

  return (
    <div className="min-h-screen bg-[#06060c] text-white flex justify-center items-center sm:py-6">
      {/* Telegram Mini App Mobile Viewport Container */}
      <div className="w-full max-w-[430px] h-screen sm:h-[844px] bg-[#0a0a14] sm:rounded-[36px] sm:border sm:border-white/10 shadow-2xl overflow-hidden flex flex-col relative">
        {/* Dynamic Screen Header */}
        <Header
          {...getHeaderProps()}
          onNotificationClick={onNotificationClick}
        />

        {/* Scrollable Active Screen Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar">
          {children}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
};
