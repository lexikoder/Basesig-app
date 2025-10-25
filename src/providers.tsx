"use client";
import { http, createConfig } from 'wagmi';
import { baseSepolia,base } from 'wagmi/chains';
import { coinbaseWallet, metaMask } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'
 
export const getConfig = createConfig({
  chains: [baseSepolia,base],
  multiInjectedProviderDiscovery: false,
  connectors: [
    metaMask({ dappMetadata: { name: "My DApp" } }),
    // coinbaseWallet({ appName: 'Create Wagmi', preference: 'smartWalletOnly' }),
  ],
  transports: {
   
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});
 
declare module 'wagmi' {
  interface Register {
    config: typeof getConfig;
  }
}

export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [config] = useState(() => getConfig)
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      {/* <QueryClientProvider client={queryClient}> */}
        {props.children}
      {/* </QueryClientProvider> */}
    </WagmiProvider>
  )
}
