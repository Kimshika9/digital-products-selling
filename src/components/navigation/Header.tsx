import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar } from '../ui/Avatar';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showUser?: boolean;
  onNotificationClick?: () => void;
  hasUnreadNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showUser = true,
  onNotificationClick,
  hasUnreadNotifications = true,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0a0a14]/90 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
      {showUser ? (
        <div className="flex items-center gap-3">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="User Avatar"
            size={32}
            gradientBorder
          />
          <div className="flex flex-col">
            <span className="text-[11px] text-[#94a3b8] font-medium leading-tight">
              Good morning
            </span>
            <span className="text-base font-heading font-bold text-white leading-tight">
              Alex Rivera
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {title && (
            <h1 className="text-xl font-heading font-bold text-white leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <span className="text-xs text-[#94a3b8] leading-tight mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}

      <button
        onClick={onNotificationClick}
        className="relative p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-[#94a3b8]" />
        {hasUnreadNotifications && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
        )}
      </button>
    </header>
  );
};
