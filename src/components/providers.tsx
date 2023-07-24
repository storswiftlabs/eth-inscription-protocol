'use client'

import * as React from 'react'
import type { AvatarComponent } from '@rainbow-me/rainbowkit'
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
import { arbitrum, mainnet, optimism, polygon, zora } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { ThemeProvider } from 'next-themes'
import { ProjectId } from '@/utils/getEnv'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [publicProvider()]
)

const projectId = ProjectId || ''

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
  // connectors,
  publicClient,
  webSocketPublicClient,
})
const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const color = 'f2f2f2'
  return true ? (
    <img
      src={'/logo.png'}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 999,
        height: size,
        width: size,
      }}
    >
      :^)
    </div>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider >
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} avatar={CustomAvatar} appInfo={demoAppInfo}>
          <div className='flex w-screen max-h-screen'>
            {children}
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}
