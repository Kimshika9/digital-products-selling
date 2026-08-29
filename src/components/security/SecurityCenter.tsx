import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Fingerprint,
  ArrowLeft,
  MailWarning,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AccountLinkingPanel } from './AccountLinkingPanel';
import { SessionList } from './SessionList';
import { SecurityActivity } from './SecurityActivity';

interface SecurityCenterProps {
  onBack: () => void;
  onShowToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
  onOpenVerifyModal: () => void;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({
  onBack,
  onShowToast,
  onOpenVerifyModal,
}) => {
  const { user } = useAuth();
  const [passkeyModal, setPasskeyModal] = useState(false);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 p-4 pb-24 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-3">
        <button
          onClick={onBack}
          className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <h2 className="text-lg font-heading font-bold text-white">
            SECURITY CENTER
          </h2>
          <span className="text-xs text-[#94a3b8]">
            Manage DPS Identity, login methods & active sessions
          </span>
        </div>
      </div>

      {/* Security Protection Status Banner */}
      <div className="p-4 rounded-[16px] bg-gradient-to-r from-[#10b981]/15 via-[#3b82f6]/15 to-[#6c5ce7]/15 border border-[#10b981]/30 flex items-center justify-between shadow-elevated">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center glow-primary shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">
              DPS Identity Protected
            </span>
            <span className="text-xs text-[#94a3b8]">
              {user.identities.length} login methods connected • Email Verified
            </span>
          </div>
        </div>
        <Badge label="Healthy" variant="success" />
      </div>

      {!user.emailVerified && (
        <div className="p-3 rounded-[12px] bg-[#f59e0b]/15 border border-[#f59e0b]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#f59e0b]">
            <MailWarning className="w-4 h-4 shrink-0" />
            <span>Email verification pending ({user.email})</span>
          </div>
          <Button variant="glass" size="small" onClick={onOpenVerifyModal}>
            Verify
          </Button>
        </div>
      )}

      {/* Account Linking Section */}
      <AccountLinkingPanel onShowToast={onShowToast} />

      {/* Session Management */}
      <SessionList />

      {/* Future Security Readiness: Passkeys & 2FA */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
          Advanced Security
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onShowToast('2FA setup coming in Phase 1B', 'info')}
            className="p-3 bg-[#161b22] border border-white/5 hover:border-white/15 rounded-[12px] flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <KeyRound className="w-5 h-5 text-[#3b82f6]" />
              <Badge label="Coming Soon" variant="default" />
            </div>
            <span className="text-xs font-bold text-white">
              Two-Factor Auth (2FA)
            </span>
            <span className="text-[10px] text-[#64748b]">
              Authenticator app or backup codes
            </span>
          </div>

          <div
            onClick={() => setPasskeyModal(true)}
            className="p-3 bg-[#161b22] border border-white/5 hover:border-white/15 rounded-[12px] flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <Fingerprint className="w-5 h-5 text-[#06b6d4]" />
              <Badge label="WebAuthn" variant="cyan" />
            </div>
            <span className="text-xs font-bold text-white">
              Passkeys & Biometrics
            </span>
            <span className="text-[10px] text-[#64748b]">
              Face ID, Touch ID or YubiKey
            </span>
          </div>
        </div>
      </div>

      {/* Security Activity Feed */}
      <SecurityActivity />

      {/* Passkey Information Modal */}
      {passkeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#161b22] border border-white/10 rounded-[20px] p-5 max-w-[360px] flex flex-col gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] flex items-center justify-center mx-auto glow-cyan">
              <Fingerprint className="w-6 h-6" />
            </div>
            <h3 className="text-base font-heading font-bold text-white">
              DPS Passkey Architecture
            </h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              DPS Identity is WebAuthn-ready. You will soon be able to sign in passwordlessly using hardware security keys and device biometrics.
            </p>
            <Button
              variant="primary"
              size="medium"
              fullWidth
              onClick={() => setPasskeyModal(false)}
            >
              GOT IT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
