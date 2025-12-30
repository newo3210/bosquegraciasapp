/**
 * Upstash Redis Database Integration
 * Provides functions for user management, points tracking, and artist whitelist
 */

import { Redis } from '@upstash/redis';
import type { User, PointAction } from '@/types/nft';

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Key prefixes for organized data storage
const KEYS = {
  user: (address: string) => `user:${address.toLowerCase()}`,
  allUsers: 'users:all',
  artist: (address: string) => `artist:${address.toLowerCase()}`,
  allArtists: 'artists:all',
  points: (address: string) => `points:${address.toLowerCase()}`,
} as const;

// Points awarded for each action
export const POINTS_CONFIG: Record<PointAction, number> = {
  VISIT: 10,
  MINT: 50,
  SHARE: 25,
  REFERRAL: 100,
  MILESTONE: 200,
};

/**
 * Get a user by wallet address
 */
export async function getUser(address: string): Promise<User | null> {
  try {
    const user = await redis.hgetall(KEYS.user(address)) as User | null;
    return user && Object.keys(user).length > 0 ? user : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Create or update a user
 */
export async function upsertUser(userData: Omit<User, 'createdAt' | 'lastActive'>): Promise<User> {
  try {
    const address = userData.walletAddress.toLowerCase();
    const existingUser = await getUser(address);
    
    const user: User = {
      ...userData,
      walletAddress: address,
      createdAt: existingUser?.createdAt || Date.now(),
      lastActive: Date.now(),
      appPoints: existingUser?.appPoints || 0,
      role: userData.role || existingUser?.role || 'user',
    };

    // Save user data
    await redis.hset(KEYS.user(address), user as Record<string, string | number>);
    
    // Add to users set
    await redis.sadd(KEYS.allUsers, address);

    return user;
  } catch (error) {
    console.error('Error upserting user:', error);
    throw new Error('Failed to save user');
  }
}

// Additional functions: getAllUsers, addPointsToUser, updateUserRole, etc.
// See full implementation in the Configure tab or exported code
