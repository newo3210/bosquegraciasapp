/**
 * Type definitions for NFT and User management
 */

export type PointAction = 'VISIT' | 'MINT' | 'SHARE' | 'REFERRAL' | 'MILESTONE';

export type UserRole = 'user' | 'admin' | 'artist';

export interface User {
  walletAddress: string;
  createdAt: number;
  lastActive: number;
  appPoints: number;
  role: UserRole;
  farcasterId?: string;
  username?: string;
  displayName?: string;
  avatar?: string;
}

export interface Artist {
  walletAddress: string;
  signature: string;
  createdAt: number;
  isActive: boolean;
}

