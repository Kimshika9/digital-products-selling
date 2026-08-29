import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, verifyEmail } = useAuth();
  const [verifying, setVerifying] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleVerifyNow = async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 1000));
    await verifyEmail();
    setVerifying(false);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[380px] bg-[#161b22] border border-white/10 rounded-[20px] p-6 shadow-elevated flex flex-col gap-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#94a3b8] hover:text-white rounded-full focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white">
                VERIFY YOUR EMAIL
              </h3>
              <p className="text-xs text-[#94a3b8]">
                A verification email was sent to <strong className="text-white">{user.email}</strong>. Please confirm your email address to unlock full marketplace features.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="primary"
                size="medium"
                fullWidth
                onClick={handleVerifyNow}
                disabled={verifying}
                icon={<RefreshCw className={`w-4 h-4 ${verifying ? 'animate-spin' : ''}`} />}
              >
                {verifying ? 'VERIFYING...' : 'SIMULATE CLICK VERIFY LINK'}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-2 py-3">
            <div className="w-12 h-12 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 flex items-center justify-center glow-primary">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-heading font-bold text-white">
              Email Verified!
            </h3>
            <p className="text-xs text-[#94a3b8]">
              Your email identity is now verified across the DPS ecosystem.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
