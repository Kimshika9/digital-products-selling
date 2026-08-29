import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  error,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]">
          <Lock className="w-4 h-4" />
        </div>

        <input
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          className={cn(
            'w-full h-[48px] pl-10 pr-10 bg-white/[0.04] border border-white/10 rounded-[12px] text-sm text-white placeholder-[#64748b] backdrop-blur-md focus:outline-none focus:border-[#6c5ce7] focus:ring-1 focus:ring-[#6c5ce7] transition-all',
            error && 'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]',
            className
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#64748b] hover:text-white transition-colors focus:outline-none"
          tabIndex={-1}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {error && <span className="text-xs text-[#ef4444] mt-0.5">{error}</span>}
    </div>
  );
};
