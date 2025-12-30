/**
 * Type definitions for NFT and User management
 * 
 * This file defines the core types used throughout the BosqueGracias application.
 */

export type PointAction = 'VISIT' | 'MINT' | 'SHARE' | 'REFERRAL' | 'MILESTONE';

export type UserRole = 'user' | 'admin' | 'artist';

export interface User extends Record<string, unknown> {
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

