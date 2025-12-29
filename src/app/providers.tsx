'use client';

import type { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Toaster } from 'sonner';
import { ONCHAINKIT_API_KEY, ONCHAINKIT_PROJECT_ID } from './config/onchainkit';
import { config, activeChain, queryClient } from '@/lib/wagmi';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={ONCHAINKIT_API_KEY}
          projectId={ONCHAINKIT_PROJECT_ID}
          chain={activeChain}
          config={{
            appearance: {
              name: 'BosqueGracias',
              logo: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9756b3248bdd48d596519e7d98958e9df5588654dadf0bb17a71fc435bcb37b3',
              mode: 'auto',
              theme: 'default',
            },
          }}
        >
          {children}
          <Toaster position="bottom-center" />
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
