import React from 'react';
import { Smartphone, Monitor, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';

export const SessionList: React.FC = () => {
  const { user, revokeSession } = useAuth();

  if (!user || user.sessions.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
        Active Sessions ({user.sessions.length})
      </h4>

      <div className="flex flex-col gap-2">
        {user.sessions.map((session) => {
          const isMobile =
            session.deviceName.toLowerCase().includes('mobile') ||
            session.deviceName.toLowerCase().includes('app');
          const DeviceIcon = isMobile ? Smartphone : Monitor;

          return (
            <div
              key={session.id}
              className="bg-[#161b22] border border-white/5 rounded-[12px] p-3 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-white/5 flex items-center justify-center text-[#6c5ce7] shrink-0">
                  <DeviceIcon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">
                      {session.deviceName}
                    </span>
                    {session.isCurrent && (
                      <Badge label="This Device" variant="accent" icon={<Shield className="w-3 h-3 text-[#6c5ce7]" />} />
                    )}
                  </div>
                  <span className="text-xs text-[#64748b]">
                    {session.browser} • {session.location} ({session.lastActiveAt})
                  </span>
                </div>
              </div>

              {!session.isCurrent && (
                <button
                  onClick={() => revokeSession(session.id)}
                  className="p-2 text-[#64748b] hover:text-[#ef4444] hover:bg-white/5 rounded-[8px] transition-colors focus:outline-none"
                  title="Revoke Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
