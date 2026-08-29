import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onBackToLogin,
}) => {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await requestPasswordReset(email);
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[380px] bg-[#161b22] border border-white/10 rounded-[20px] p-6 shadow-elevated flex flex-col gap-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#94a3b8] hover:text-white rounded-full focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-heading font-bold text-white">
                RESET PASSWORD
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Enter your DPS email address and we'll send you a secure link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative w-full">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full h-[48px] pl-10 pr-4 bg-white/[0.04] border border-white/10 rounded-[12px] text-sm text-white placeholder-[#64748b] backdrop-blur-md focus:outline-none focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] transition-all"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="medium"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'SENDING RESET LINK...' : 'SEND RESET LINK'}
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 py-2">
            <div className="w-12 h-12 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 flex items-center justify-center glow-primary">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-heading font-bold text-white">
              Check Your Email
            </h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              If an account exists for <strong className="text-white">{email}</strong>, we have sent a password reset link. Please check your inbox.
            </p>
          </div>
        )}

        <button
          onClick={onBackToLogin}
          className="flex items-center justify-center gap-1.5 text-xs text-[#6c5ce7] hover:underline font-semibold pt-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </button>
      </div>
    </div>
  );
};
