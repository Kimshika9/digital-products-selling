import React, { useState } from 'react';
import { User, Lock, Chrome, Send, Wallet } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { PasswordInput } from './PasswordInput';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToSignup,
  onForgotPassword,
}) => {
  const { loginWithEmail, loginWithProvider, isLoading } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please enter your username or email and password');
      return;
    }
    setError('');
    const res = await loginWithEmail(identifier, password);
    if (res.success) {
      if (onSuccess) onSuccess();
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'telegram' | 'paywell') => {
    setError('');
    const res = await loginWithProvider(provider);
    if (res.success && onSuccess) onSuccess();
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-xl font-heading font-bold text-white">
          WELCOME BACK
        </h2>
        <p className="text-xs text-[#94a3b8]">
          Sign in to access your DPS Identity & Digital Library
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="p-3 rounded-[10px] bg-[#ef4444]/15 border border-[#ef4444]/30 text-xs text-[#ef4444]">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
            Username or Email
          </label>
          <div className="relative w-full">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
            <input
              type="text"
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="@username or email@domain.com"
              className="w-full h-[48px] pl-10 pr-4 bg-white/[0.04] border border-white/10 rounded-[12px] text-sm text-white placeholder-[#64748b] backdrop-blur-md focus:outline-none focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] transition-all"
            />
          </div>
        </div>

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-[#94a3b8] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-white/10 border-white/20 text-[#6c5ce7] focus:ring-[#6c5ce7]"
            />
            Keep me signed in
          </label>

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[#6c5ce7] hover:underline font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="medium"
          fullWidth
          disabled={isLoading}
          icon={<Lock className="w-4 h-4" />}
        >
          {isLoading ? 'SIGNING IN...' : 'SIGN IN TO DPS'}
        </Button>
      </form>

      {/* Provider Divider */}
      <div className="relative flex items-center justify-center my-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <span className="relative px-3 bg-[#161b22] text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">
          OR CONTINUE WITH
        </span>
      </div>

      {/* Social / Provider Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="glass"
          size="medium"
          fullWidth
          onClick={() => handleProviderLogin('google')}
          icon={<Chrome className="w-4 h-4 text-[#3b82f6]" />}
        >
          Continue with Google
        </Button>

        <Button
          variant="glass"
          size="medium"
          fullWidth
          onClick={() => handleProviderLogin('telegram')}
          icon={<Send className="w-4 h-4 text-[#06b6d4]" />}
        >
          Continue with Telegram
        </Button>

        <Button
          variant="glass"
          size="medium"
          fullWidth
          onClick={() => handleProviderLogin('paywell')}
          icon={<Wallet className="w-4 h-4 text-[#6c5ce7]" />}
        >
          Continue with PayWell
        </Button>
      </div>

      {/* Switch to Signup */}
      <div className="text-center text-xs text-[#94a3b8] pt-2">
        Don't have a DPS Identity yet?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-[#6c5ce7] hover:underline font-semibold"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
