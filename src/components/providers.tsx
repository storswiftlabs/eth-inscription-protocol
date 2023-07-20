'use client'

import * as React from 'react'
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import {
  arbitrum,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zora,
  ],
  [publicProvider()],
)

const projectId = 'bb62d75a085c27d66e3e0d4ca807a16d'

const { wallets } = getDefaultWallets({
  appName: 'eth inscriptions',
  projectId,
  chains,
})

const demoAppInfo = {
  appName: 'eth inscriptions',
}

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
                <div className='flex'>
                    {children}
                </div>
            </RainbowKitProvider>
        </WagmiConfig>
  )
}
