import React from 'react';
import { Home, Compass, Store, Library, User } from 'lucide-react';
import { NavTab } from '../../types';
import { cn } from '../../utils/cn';

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'explore' as NavTab, label: 'Explore', icon: Compass },
    { id: 'market' as NavTab, label: 'Market', icon: Store, isCenter: true },
    { id: 'library' as NavTab, label: 'Library', icon: Library },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-[430px] mx-auto h-[64px] bg-[#0a0a14]/90 backdrop-blur-xl border-t border-white/8 px-2 flex items-center justify-around pb-[env(safe-area-inset-bottom,0px)] select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (tab.isCenter) {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative -top-3 flex flex-col items-center justify-center focus:outline-none group"
              aria-label={tab.label}
            >
              <div
                className={cn(
                  'w-[48px] h-[48px] rounded-full bg-gradient-to-tr from-[#6c5ce7] to-[#3b82f6] flex items-center justify-center text-white shadow-lg transition-transform duration-200 group-active:scale-95',
                  isActive
                    ? 'glow-primary ring-2 ring-white/20'
                    : 'shadow-[#6c5ce7]/20 hover:scale-105'
                )}
              >
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium mt-1 transition-colors',
                  isActive ? 'text-[#6c5ce7] font-semibold' : 'text-[#94a3b8]'
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex flex-col items-center justify-center w-14 h-full gap-1 transition-all duration-150 focus:outline-none group',
              isActive ? 'text-[#6c5ce7]' : 'text-[#94a3b8] hover:text-white'
            )}
            aria-label={tab.label}
          >
            <div className="relative">
              <Icon
                className={cn(
                  'w-5 h-5 transition-transform duration-200 group-active:scale-90',
                  isActive && 'stroke-[2.5]'
                )}
              />
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6c5ce7] glow-primary" />
              )}
            </div>
            <span
              className={cn(
                'text-[11px] font-medium transition-colors',
                isActive ? 'text-[#6c5ce7] font-semibold' : 'text-[#94a3b8]'
              )}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
