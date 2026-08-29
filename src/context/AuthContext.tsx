import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DpsUser,
  AuthProviderType,
  AuthIdentity,
  SecurityEvent,
} from '../types';
import {
  GoogleAuthProvider,
  TelegramAuthProvider,
  PayWellAuthProvider,
} from '../services/authProviders';

const MOCK_CURRENT_USER: DpsUser = {
  id: 'dps-usr-8899',
  username: 'alexrivera',
  email: 'alex@dps.com',
  displayName: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  bio: 'Digital product enthusiast, Web3 builder, and prompt engineer based in SF.',
  emailVerified: true,
  roles: ['user', 'creator'],
  identities: [
    {
      provider: 'email_password',
      providerUserId: 'email-id-101',
      identifier: 'alex@dps.com',
      connectedAt: '2026-01-10T10:00:00.000Z',
      lastUsedAt: '2026-02-28T14:20:00.000Z',
    },
    {
      provider: 'telegram',
      providerUserId: 'tg-user-778811',
      identifier: '@alexrivera',
      connectedAt: '2026-02-01T12:30:00.000Z',
      lastUsedAt: '2026-02-28T14:20:00.000Z',
    },
  ],
  sessions: [
    {
      id: 'sess-current',
      deviceName: 'Telegram Mini App (Mobile)',
      browser: 'Telegram WebApp Client',
      ipAddress: '192.168.1.1',
      location: 'San Francisco, CA',
      isCurrent: true,
      lastActiveAt: 'Active Now',
    },
    {
      id: 'sess-desktop',
      deviceName: 'MacBook Pro 16"',
      browser: 'Chrome 122.0',
      ipAddress: '198.51.100.42',
      location: 'San Francisco, CA',
      isCurrent: false,
      lastActiveAt: 'Yesterday at 18:45',
    },
  ],
  securityEvents: [
    {
      id: 'evt-1',
      type: 'LOGIN_SUCCESS',
      description: 'Signed in via Telegram Mini App',
      timestamp: '2026-02-28T14:20:00.000Z',
      ipAddress: '192.168.1.1',
    },
    {
      id: 'evt-2',
      type: 'AUTH_PROVIDER_LINKED',
      description: 'Linked Telegram account (@alexrivera)',
      timestamp: '2026-02-01T12:30:00.000Z',
      ipAddress: '198.51.100.42',
    },
    {
      id: 'evt-3',
      type: 'EMAIL_VERIFIED',
      description: 'Email address verified (alex@dps.com)',
      timestamp: '2026-01-10T10:05:00.000Z',
      ipAddress: '198.51.100.42',
    },
  ],
  termsAcceptances: [
    {
      documentType: 'terms_of_service',
      version: 'v1.0.2026',
      acceptedAt: '2026-01-10T10:00:00.000Z',
    },
    {
      documentType: 'privacy_policy',
      version: 'v1.0.2026',
      acceptedAt: '2026-01-10T10:00:00.000Z',
    },
  ],
  createdAt: '2026-01-10T10:00:00.000Z',
  twoFactorEnabled: false,
  passkeyConfigured: false,
};

interface AuthContextType {
  user: DpsUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithEmail: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signupWithEmail: (username: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithProvider: (provider: AuthProviderType) => Promise<{ success: boolean; error?: string }>;
  linkProvider: (provider: AuthProviderType) => Promise<{ success: boolean; error?: string }>;
  unlinkProvider: (provider: AuthProviderType) => Promise<{ success: boolean; error?: string }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: () => Promise<void>;
  revokeSession: (sessionId: string) => Promise<void>;
  logout: () => void;
  recordSecurityEvent: (type: SecurityEvent['type'], description: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DpsUser | null>(MOCK_CURRENT_USER);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('dps_user_session');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // fallback
      }
    }
  }, []);

  const saveUser = (newUser: DpsUser | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('dps_user_session', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('dps_user_session');
    }
  };

  const recordSecurityEvent = (type: SecurityEvent['type'], description: string) => {
    if (!user) return;
    const newEvent: SecurityEvent = {
      id: `evt-${Date.now()}`,
      type,
      description,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.1',
    };
    const updatedUser = {
      ...user,
      securityEvents: [newEvent, ...user.securityEvents],
    };
    saveUser(updatedUser);
  };

  const loginWithEmail = async (identifier: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);

    if (user) {
      recordSecurityEvent('LOGIN_SUCCESS', `Signed in as ${identifier}`);
      return { success: true };
    }

    const newUser: DpsUser = {
      ...MOCK_CURRENT_USER,
      email: identifier.includes('@') ? identifier : 'user@dps.com',
      username: identifier.includes('@') ? identifier.split('@')[0] : identifier,
    };
    saveUser(newUser);
    return { success: true };
  };

  const signupWithEmail = async (username: string, email: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);

    const newUser: DpsUser = {
      ...MOCK_CURRENT_USER,
      id: `dps-usr-${Date.now()}`,
      username: username.replace('@', ''),
      email,
      displayName: username,
      emailVerified: false,
      identities: [
        {
          provider: 'email_password',
          providerUserId: `email-${Date.now()}`,
          identifier: email,
          connectedAt: new Date().toISOString(),
          lastUsedAt: new Date().toISOString(),
        },
      ],
    };

    saveUser(newUser);
    recordSecurityEvent('EMAIL_VERIFIED', `Account created for ${email}`);
    return { success: true };
  };

  const loginWithProvider = async (provider: AuthProviderType) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsLoading(false);

    if (!user) {
      saveUser(MOCK_CURRENT_USER);
    }
    recordSecurityEvent('LOGIN_SUCCESS', `Signed in via ${provider.toUpperCase()}`);
    return { success: true };
  };

  const linkProvider = async (provider: AuthProviderType) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    if (user.identities.some((i) => i.provider === provider)) {
      return { success: false, error: `${provider} is already linked to your account.` };
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);

    let newIdentity: AuthIdentity | null = null;
    if (provider === 'google') {
      const resp = await new GoogleAuthProvider().authenticate();
      newIdentity = resp.identity || null;
    } else if (provider === 'telegram') {
      const resp = await new TelegramAuthProvider().authenticate();
      newIdentity = resp.identity || null;
    } else if (provider === 'paywell') {
      const resp = await new PayWellAuthProvider().authenticate();
      newIdentity = resp.identity || null;
    }

    if (newIdentity) {
      const updatedUser = {
        ...user,
        identities: [...user.identities, newIdentity],
      };
      saveUser(updatedUser);
      recordSecurityEvent('AUTH_PROVIDER_LINKED', `Linked ${provider.toUpperCase()} provider`);
      return { success: true };
    }

    return { success: false, error: 'Failed to authenticate provider' };
  };

  const unlinkProvider = async (provider: AuthProviderType) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    if (user.identities.length <= 1) {
      return {
        success: false,
        error: 'Cannot remove your only login method. Please add another method first.',
      };
    }

    const updatedIdentities = user.identities.filter((i) => i.provider !== provider);
    const updatedUser = {
      ...user,
      identities: updatedIdentities,
    };
    saveUser(updatedUser);
    recordSecurityEvent('AUTH_PROVIDER_REMOVED', `Removed ${provider.toUpperCase()} provider`);
    return { success: true };
  };

  const requestPasswordReset = async (email: string) => {
    await new Promise((r) => setTimeout(r, 500));
    recordSecurityEvent('PASSWORD_RESET_REQUESTED', `Password reset requested for ${email}`);
    return { success: true };
  };

  const verifyEmail = async () => {
    if (!user) return;
    const updatedUser = { ...user, emailVerified: true };
    saveUser(updatedUser);
    recordSecurityEvent('EMAIL_VERIFIED', 'Email address verified successfully');
  };

  const revokeSession = async (sessionId: string) => {
    if (!user) return;
    const updatedSessions = user.sessions.filter((s) => s.id !== sessionId);
    const updatedUser = { ...user, sessions: updatedSessions };
    saveUser(updatedUser);
    recordSecurityEvent('SESSION_REVOKED', `Session ${sessionId} revoked`);
  };

  const logout = () => {
    saveUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithEmail,
        signupWithEmail,
        loginWithProvider,
        linkProvider,
        unlinkProvider,
        requestPasswordReset,
        verifyEmail,
        revokeSession,
        logout,
        recordSecurityEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
