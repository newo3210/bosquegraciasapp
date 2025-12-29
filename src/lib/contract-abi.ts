/**
 * BosqueGracias Smart Contract ABI and Configuration
 * 
 * IMPORTANT: Update BOSQUE_NFT_ADDRESS after deploying the contract
 */

import type { Address } from 'viem';

export const BOSQUE_NFT_ADDRESS: Address = '0x0000000000000000000000000000000000000000';
export const BLIND_MINT_PRICE = '700000000000000'; // 0.0007 ETH in wei
export const MILESTONE_THRESHOLD = '7000000000000000'; // 0.007 ETH in wei

// Full ABI - see Configure tab for complete implementation
export const BOSQUE_ABI = [
  // Read functions
  {
    inputs: [],
    name: 'BLIND_MINT_PRICE',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  // ... more functions - see full file in Configure tab
] as const;
