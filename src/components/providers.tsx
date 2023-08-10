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
import { sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { ThemeProvider } from 'next-themes'
import { NotificationProvider } from '@web3uikit/core'
import { ProjectId } from '@/utils/getEnv'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()],
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
  connectors,
  publicClient,
  webSocketPublicClient,
})
const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return <img
    src={'/logo.png'}
    width={size}
    height={size}
    style={{ borderRadius: 10 }}
  />
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class'>
      <WagmiConfig config={wagmiConfig}>
        <NotificationProvider>
          <RainbowKitProvider
            chains={chains}
            avatar={CustomAvatar}
            appInfo={demoAppInfo}
          >
            <div className="flex w-screen">{children}</div>
          </RainbowKitProvider>
        </NotificationProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}
