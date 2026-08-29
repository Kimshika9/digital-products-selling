import React, { useState } from 'react';
import { Mail, Chrome, Send, Wallet, Plus, Trash2, Check, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthProviderType } from '../../types';
import { Button } from '../ui/Button';

interface AccountLinkingPanelProps {
  onShowToast?: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

export const AccountLinkingPanel: React.FC<AccountLinkingPanelProps> = ({ onShowToast }) => {
  const { user, linkProvider, unlinkProvider } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<AuthProviderType | null>(null);

  if (!user) return null;

  const connectedProviders = new Set(user.identities.map((i) => i.provider));

  const providers = [
    {
      id: 'email_password' as AuthProviderType,
      name: 'Email & Password',
      description: user.email,
      icon: Mail,
      color: 'text-[#94a3b8]',
      bg: 'bg-white/5',
    },
    {
      id: 'google' as AuthProviderType,
      name: 'Google Authentication',
      description: 'Sign in with your Google account',
      icon: Chrome,
      color: 'text-[#3b82f6]',
      bg: 'bg-[#3b82f6]/15',
    },
    {
      id: 'telegram' as AuthProviderType,
      name: 'Telegram Account',
      description: 'Connect Telegram identity & Mini App',
      icon: Send,
      color: 'text-[#06b6d4]',
      bg: 'bg-[#06b6d4]/15',
    },
    {
      id: 'paywell' as AuthProviderType,
      name: 'PayWell Wallet Identity',
      description: 'Unified ecosystem payment login',
      icon: Wallet,
      color: 'text-[#6c5ce7]',
      bg: 'bg-[#6c5ce7]/15',
    },
  ];

  const handleLink = async (provider: AuthProviderType) => {
    setLoadingProvider(provider);
    const res = await linkProvider(provider);
    setLoadingProvider(null);

    if (res.success) {
      if (onShowToast) onShowToast(`Successfully connected ${provider.toUpperCase()}`, 'success');
    } else {
      if (onShowToast) onShowToast(res.error || 'Connection failed', 'warning');
    }
  };

  const handleUnlink = async (provider: AuthProviderType) => {
    setLoadingProvider(provider);
    const res = await unlinkProvider(provider);
    setLoadingProvider(null);

    if (res.success) {
      if (onShowToast) onShowToast(`Disconnected ${provider.toUpperCase()}`, 'info');
    } else {
      if (onShowToast) onShowToast(res.error || 'Failed to disconnect', 'warning');
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
          Connected Login Methods ({connectedProviders.size}/4)
        </h4>
        {connectedProviders.size === 1 && (
          <span className="text-[10px] text-[#f59e0b] flex items-center gap-1 font-medium">
            <AlertTriangle className="w-3 h-3" /> Lockout Protection Active
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {providers.map((p) => {
          const Icon = p.icon;
          const isConnected = connectedProviders.has(p.id);
          const identity = user.identities.find((i) => i.provider === p.id);
          const isLoading = loadingProvider === p.id;

          return (
            <div
              key={p.id}
              className="bg-[#161b22] border border-white/5 rounded-[12px] p-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 ${p.bg}`}
                >
                  <Icon className={`w-4 h-4 ${p.color}`} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-white">
                      {p.name}
                    </span>
                    {isConnected && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.2 rounded-full bg-[#10b981]/15 text-[#10b981]">
                        <Check className="w-3 h-3" /> Connected
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#64748b] truncate max-w-[180px]">
                    {identity ? identity.identifier : p.description}
                  </span>
                </div>
              </div>

              {isConnected ? (
                <button
                  onClick={() => handleUnlink(p.id)}
                  disabled={isLoading}
                  className="p-2 text-[#64748b] hover:text-[#ef4444] hover:bg-white/5 rounded-[8px] transition-colors focus:outline-none disabled:opacity-50"
                  title="Disconnect Method"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              ) : (
                <Button
                  variant="glass"
                  size="small"
                  disabled={isLoading}
                  onClick={() => handleLink(p.id)}
                  icon={<Plus className="w-3.5 h-3.5 text-[#6c5ce7]" />}
                >
                  Connect
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
