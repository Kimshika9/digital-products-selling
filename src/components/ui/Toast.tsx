import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { ToastMessage } from '../../types';

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[360px] w-[90%] animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="glass-panel-elevated rounded-[12px] p-3 flex items-center justify-between gap-3 shadow-elevated border border-white/15">
        <div className="flex items-center gap-2.5">
          {isSuccess ? (
            <CheckCircle className="w-5 h-5 text-[#10b981] shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#f59e0b] shrink-0" />
          )}
          <span className="text-xs font-medium text-white">{toast.title}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-[#94a3b8] hover:text-white rounded-full focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
