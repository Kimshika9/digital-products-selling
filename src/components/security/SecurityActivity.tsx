import React from 'react';
import { ShieldCheck, Lock, Link, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SecurityActivity: React.FC = () => {
  const { user } = useAuth();

  if (!user || user.securityEvents.length === 0) return null;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'LOGIN_SUCCESS':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />;
      case 'AUTH_PROVIDER_LINKED':
      case 'AUTH_PROVIDER_REMOVED':
        return <Link className="w-3.5 h-3.5 text-[#3b82f6]" />;
      case 'PASSWORD_CHANGED':
      case 'PASSWORD_RESET_COMPLETED':
        return <Lock className="w-3.5 h-3.5 text-[#6c5ce7]" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b]" />;
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
        Recent Security Activity
      </h4>

      <div className="flex flex-col gap-2">
        {user.securityEvents.slice(0, 4).map((evt) => (
          <div
            key={evt.id}
            className="bg-[#161b22] border border-white/5 rounded-[10px] p-2.5 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-full bg-white/5 shrink-0">
                {getEventIcon(evt.type)}
              </div>
              <span className="text-white font-medium">{evt.description}</span>
            </div>
            <span className="text-[11px] text-[#64748b]">
              {new Date(evt.timestamp).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
