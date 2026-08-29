import React from 'react';

interface PasswordStrengthProps {
  password?: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = '' }) => {
  if (!password) return null;

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (pass.length >= 12) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    return score;
  };

  const score = calculateStrength(password);

  const getStrengthInfo = () => {
    if (score <= 1) return { label: 'Weak', color: 'bg-[#ef4444]', text: 'text-[#ef4444]', width: 'w-1/4' };
    if (score === 2) return { label: 'Fair', color: 'bg-[#f59e0b]', text: 'text-[#f59e0b]', width: 'w-2/4' };
    if (score === 3 || score === 4) return { label: 'Good', color: 'bg-[#3b82f6]', text: 'text-[#3b82f6]', width: 'w-3/4' };
    return { label: 'Strong (Passphrase)', color: 'bg-[#10b981]', text: 'text-[#10b981]', width: 'w-full' };
  };

  const info = getStrengthInfo();

  return (
    <div className="flex flex-col gap-1 w-full mt-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-[#64748b]">Password strength</span>
        <span className={`font-semibold ${info.text}`}>{info.label}</span>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${info.color} ${info.width} transition-all duration-300`} />
      </div>
    </div>
  );
};
