import React, { useState } from 'react';
import {
  Settings,
  History,
  CreditCard,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Zap,
  Shield,
  LogOut,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface ProfileScreenProps {
  onShowToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
  onOpenAuthModal: () => void;
  onOpenSecurityCenter: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onShowToast,
  onOpenAuthModal,
  onOpenSecurityCenter,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const menuItems = [
    { id: 'security', label: 'Security & Connected Methods', icon: Shield, isSecurity: true },
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'history', label: 'Order History', icon: History },
    { id: 'payment', label: 'Payment Methods & Wallet', icon: CreditCard },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
  ];

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 py-16 gap-5 animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#6c5ce7] to-[#06b6d4] p-[2px] shadow-glow-primary">
          <div className="w-full h-full rounded-full bg-[#0a0a14] flex items-center justify-center text-[#6c5ce7]">
            <Shield className="w-8 h-8" />
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-xs">
          <h2 className="text-xl font-heading font-bold text-white">
            DPS IDENTITY
          </h2>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            One DPS Identity. Multiple Ways In. One Connected Ecosystem. Sign in to access your digital assets and security preferences.
          </p>
        </div>

        <Button
          variant="primary"
          size="large"
          fullWidth
          className="max-w-xs"
          onClick={onOpenAuthModal}
          icon={<UserPlus className="w-4 h-4" />}
        >
          SIGN IN / REGISTER
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4 pb-24 animate-in fade-in duration-300">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center gap-3 pt-2">
        <Avatar
          src={user.avatar}
          alt={user.displayName}
          size={80}
          gradientBorder
        />
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-heading font-bold text-white">
            {user.displayName}
          </h2>
          <span className="text-xs text-[#94a3b8]">@{user.username}</span>
        </div>

        {user.bio && (
          <p className="text-xs text-[#94a3b8] max-w-xs leading-relaxed">
            {user.bio}
          </p>
        )}

        <div className="flex items-center gap-2">
          <Badge label="DPS Identity Verified" variant="accent" icon={<ShieldCheck className="w-3 h-3 text-[#6c5ce7]" />} />
          <Badge label={`${user.identities.length} Connected`} variant="cyan" icon={<Zap className="w-3 h-3 text-[#06b6d4]" />} />
        </div>
      </div>

      {/* Become a Seller Banner Card */}
      <div className="relative overflow-hidden rounded-[16px] p-5 bg-gradient-to-r from-[#6c5ce7]/20 via-[#3b82f6]/20 to-[#06b6d4]/20 border border-white/10 flex flex-col gap-3 shadow-elevated">
        <div className="flex flex-col gap-1 z-10">
          <span className="text-[11px] font-bold text-[#06b6d4] uppercase tracking-wider">
            Monetize Your Skills
          </span>
          <h3 className="text-base font-heading font-bold text-white">
            Start selling your digital products
          </h3>
          <p className="text-xs text-[#94a3b8]">
            Publish templates, e-books, prompts, and software directly to Telegram users.
          </p>
        </div>

        <Button
          variant="primary"
          size="medium"
          className="bg-white text-[#6c5ce7] hover:bg-white/90 shadow-none font-semibold z-10 self-start"
          onClick={() => onShowToast('Seller Onboarding Portal coming soon!', 'info')}
        >
          Become a Seller
        </Button>
      </div>

      {/* Settings Menu List */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider px-1">
          Identity & Preferences
        </span>

        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isSecurity) {
                    onOpenSecurityCenter();
                  } else {
                    onShowToast(`${item.label} opened`, 'info');
                  }
                }}
                className={`w-full bg-[#161b22] hover:bg-white/[0.04] border rounded-[12px] p-3.5 flex items-center justify-between transition-all active:scale-98 ${
                  item.isSecurity
                    ? 'border-[#6c5ce7]/40 bg-[#6c5ce7]/10'
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[8px] bg-white/5 flex items-center justify-center text-[#94a3b8]">
                    <Icon className="w-4 h-4 text-[#6c5ce7]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-white">
                      {item.label}
                    </span>
                    {item.isSecurity && (
                      <span className="text-[10px] text-[#06b6d4]">
                        {user.identities.length} login methods connected
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748b]" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Sign Out Action */}
      {!confirmLogout ? (
        <Button
          variant="glass"
          size="medium"
          fullWidth
          onClick={() => setConfirmLogout(true)}
          icon={<LogOut className="w-4 h-4 text-[#ef4444]" />}
          className="text-[#ef4444] border-[#ef4444]/20 hover:bg-[#ef4444]/10"
        >
          SIGN OUT OF DPS
        </Button>
      ) : (
        <div className="p-3 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-[12px] flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-white">Confirm Sign Out?</span>
          <div className="flex items-center gap-2">
            <Button
              variant="glass"
              size="small"
              onClick={() => setConfirmLogout(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="small"
              className="bg-[#ef4444] hover:bg-[#dc2626]"
              onClick={() => {
                logout();
                onShowToast('Signed out successfully', 'info');
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
