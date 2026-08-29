import React from 'react';
import {
  Settings,
  History,
  CreditCard,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface ProfileScreenProps {
  onShowToast: (message: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onShowToast }) => {
  const menuItems = [
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'history', label: 'Order History', icon: History },
    { id: 'payment', label: 'Payment Methods & Wallet', icon: CreditCard },
    { id: 'support', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 pb-24 animate-in fade-in duration-300">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center gap-3 pt-2">
        <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
          alt="Alex Rivera"
          size={80}
          gradientBorder
        />
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-heading font-bold text-white">
            Alex Rivera
          </h2>
          <span className="text-xs text-[#94a3b8]">@alexrivera</span>
        </div>

        <p className="text-xs text-[#94a3b8] max-w-xs leading-relaxed">
          Digital product enthusiast, Web3 builder, and prompt engineer based in SF.
        </p>

        <div className="flex items-center gap-2">
          <Badge label="DPS Member" variant="accent" icon={<ShieldCheck className="w-3 h-3 text-[#6c5ce7]" />} />
          <Badge label="Early Access" variant="cyan" icon={<Zap className="w-3 h-3 text-[#06b6d4]" />} />
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
          onClick={() => onShowToast('Seller Onboarding Portal coming soon!')}
        >
          Become a Seller
        </Button>
      </div>

      {/* Settings Menu List */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider px-1">
          Preferences
        </span>

        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onShowToast(`${item.label} opened`)}
                className="w-full bg-[#161b22] hover:bg-white/[0.04] border border-white/5 rounded-[12px] p-3.5 flex items-center justify-between transition-all active:scale-98"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[8px] bg-white/5 flex items-center justify-center text-[#94a3b8]">
                    <Icon className="w-4 h-4 text-[#6c5ce7]" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#64748b]" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
