export type ProductType = 'E-book' | 'Template' | 'AI Prompt' | 'Course' | 'Software' | 'Graphics';

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  seller: Seller;
  category: string;
  productType: ProductType;
  tags: string[];
  rating: number;
  reviews: number;
  views: number;
  saves: number;
  createdAt: string;
  featured?: boolean;
}

export type NavTab = 'home' | 'explore' | 'market' | 'library' | 'profile';

export interface ToastMessage {
  id: string;
  title: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

// --- DPS Identity & Security Models ---

export type AuthProviderType = 'email_password' | 'google' | 'telegram' | 'paywell';

export interface AuthIdentity {
  provider: AuthProviderType;
  providerUserId: string;
  identifier: string; // email, telegram handle, or paywell ID
  connectedAt: string;
  lastUsedAt: string;
}

export interface TermsAcceptance {
  documentType: 'terms_of_service' | 'privacy_policy' | 'seller_agreement';
  version: string;
  acceptedAt: string;
}

export interface UserSession {
  id: string;
  deviceName: string;
  browser: string;
  ipAddress: string;
  location: string;
  isCurrent: boolean;
  lastActiveAt: string;
}

export interface SecurityEvent {
  id: string;
  type:
    | 'LOGIN_SUCCESS'
    | 'LOGIN_FAILURE'
    | 'PASSWORD_CHANGED'
    | 'PASSWORD_RESET_REQUESTED'
    | 'PASSWORD_RESET_COMPLETED'
    | 'EMAIL_VERIFIED'
    | 'AUTH_PROVIDER_LINKED'
    | 'AUTH_PROVIDER_REMOVED'
    | 'SESSION_REVOKED';
  description: string;
  timestamp: string;
  ipAddress: string;
}

export interface DpsUser {
  id: string; // Unified Core DPS User ID
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  bio?: string;
  emailVerified: boolean;
  roles: ('user' | 'seller' | 'creator' | 'admin')[];
  identities: AuthIdentity[];
  sessions: UserSession[];
  securityEvents: SecurityEvent[];
  termsAcceptances: TermsAcceptance[];
  createdAt: string;
  twoFactorEnabled?: boolean;
  passkeyConfigured?: boolean;
}
