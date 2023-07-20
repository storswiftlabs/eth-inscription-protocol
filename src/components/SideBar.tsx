'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeProvider } from 'next-themes'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ThemeChanger } from './ThemeChanger'
import '@rainbow-me/rainbowkit/styles.css'

export function SideBar() {
  return (
    <ThemeProvider>
      <div className="flex flex-col w-44 h-screen px-4 py-8 border-r border-gray-200 bg-black justify-between items-center">
        <div className="flex flex-col w-44 h-screen border-r border-gray-200 bg-black justify-start items-center">
          <Link href="/"><Image src="/logo.png" width={50} height={50} alt="Logo" /></Link>
          <Link href="/chat"><Image className='my-8' src="/chat.svg" width={30} height={30} alt="Logo" /></Link>
          <Link href="/moment"><Image src="/moment.svg" width={30} height={30} alt="Logo" /></Link>
        </div>
        <div className="flex flex-col items-center mt-6 -mx-2 text-red">
          <ThemeChanger />
          <br />
          <ConnectButton chainStatus={'none'} accountStatus={'address'} showBalance={false} />
        </div>
      </div>
    </ThemeProvider>

  )
}
