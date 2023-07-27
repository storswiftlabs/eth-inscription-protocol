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
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ProjectId } from '@/utils/getEnv'
import { createTheme, NextUIProvider } from "@nextui-org/react"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
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
    <NextThemesProvider attribute="class" >
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          avatar={CustomAvatar}
          appInfo={demoAppInfo}
        >
          <div className="flex w-screen">{children}</div>
        </RainbowKitProvider>
      </WagmiConfig>
    </NextThemesProvider>
  )
}
