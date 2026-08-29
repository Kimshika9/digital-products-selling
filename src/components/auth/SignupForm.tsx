import React, { useState } from 'react';
import { User, Mail, Sparkles, Chrome, Send, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { PasswordInput } from './PasswordInput';
import { PasswordStrength } from './PasswordStrength';

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const { signupWithEmail, loginWithProvider, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreeTerms || !agreePrivacy) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setError('');
    const res = await signupWithEmail(username, email, password);
    if (res.success) {
      if (onSuccess) onSuccess();
    } else {
      setError(res.error || 'Failed to create account');
    }
  };

  const handleProviderSignup = async (provider: 'google' | 'telegram' | 'paywell') => {
    setError('');
    const res = await loginWithProvider(provider);
    if (res.success && onSuccess) onSuccess();
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-heading font-bold text-white">
          CREATE YOUR DPS ACCOUNT
        </h2>
        <p className="text-xs text-[#94a3b8]">
          One Account. Multiple Ways In. One Connected Ecosystem.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {error && (
          <div className="p-3 rounded-[10px] bg-[#ef4444]/15 border border-[#ef4444]/30 text-xs text-[#ef4444]">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
            Username
          </label>
          <div className="relative w-full">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="alexrivera"
              className="w-full h-[48px] pl-10 pr-4 bg-white/[0.04] border border-white/10 rounded-[12px] text-sm text-white placeholder-[#64748b] backdrop-blur-md focus:outline-none focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative w-full">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full h-[48px] pl-10 pr-4 bg-white/[0.04] border border-white/10 rounded-[12px] text-sm text-white placeholder-[#64748b] backdrop-blur-md focus:outline-none focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a strong passphrase"
          />
          <PasswordStrength password={password} />
        </div>

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat your password"
        />

        {/* Policy Acceptances */}
        <div className="flex flex-col gap-2 pt-1 text-xs">
          <label className="flex items-center gap-2 text-[#94a3b8] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded bg-white/10 border-white/20 text-[#6c5ce7] focus:ring-[#6c5ce7]"
            />
            I agree to the Terms of Service
          </label>

          <label className="flex items-center gap-2 text-[#94a3b8] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={(e) => setAgreePrivacy(e.target.checked)}
              className="rounded bg-white/10 border-white/20 text-[#6c5ce7] focus:ring-[#6c5ce7]"
            />
            I acknowledge the Privacy Policy
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="medium"
          fullWidth
          disabled={isLoading}
          icon={<Sparkles className="w-4 h-4" />}
          className="mt-1"
        >
          {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </Button>
      </form>

      {/* Provider Divider */}
      <div className="relative flex items-center justify-center my-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <span className="relative px-3 bg-[#161b22] text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">
          OR REGISTER WITH
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          variant="glass"
          size="medium"
          fullWidth
          onClick={() => handleProviderSignup('google')}
          icon={<Chrome className="w-4 h-4 text-[#3b82f6]" />}
        >
          Continue with Google
        </Button>

        <Button
          variant="glass"
          size="medium"
          fullWidth
          onClick={() => handleProviderSignup('telegram')}
          icon={<Send className="w-4 h-4 text-[#06b6d4]" />}
        >
          Continue with Telegram
        </Button>

        <Button
          variant="glass"
          size="medium"
          fullWidth
          onClick={() => handleProviderSignup('paywell')}
          icon={<Wallet className="w-4 h-4 text-[#6c5ce7]" />}
        >
          Continue with PayWell
        </Button>
      </div>

      {/* Switch to Login */}
      <div className="text-center text-xs text-[#94a3b8] pt-1">
        Already have a DPS account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#6c5ce7] hover:underline font-semibold"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
