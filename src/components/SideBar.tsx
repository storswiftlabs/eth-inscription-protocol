'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeProvider } from 'next-themes'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ThemeChanger } from './ThemeChanger'
import '@rainbow-me/rainbowkit/styles.css'

export function SideBar() {
  return (
    <ThemeProvider attribute='class'>
      {/* //TODO:  w-20VW 未生效 已处理 */}
      <div className="flex flex-col w-[140px] h-screen px-4 py-8 border-x-1 bg-grey dark:bg-black justify-between items-center">
        <div className="flex flex-col w-44 h-screen  border-gray-200 bg-grey dark:bg-black justify-start items-center">
          <Link href="/"><Image src="/logo.png" width={50} height={50} alt="Logo" /></Link>
          <Link href="/chat/general"><Image className='my-8' src="/chat.svg" width={30} height={30} alt="Logo" /></Link>
          <Link href="/moment/find"><Image src="/moment.svg" width={30} height={30} alt="Logo" /></Link>
        </div>
        <div className="flex flex-col items-center mt-6 -mx-2 text-red">
          <ThemeChanger />
          <br />
          <ConnectButton chainStatus={'none'} accountStatus={'address'} showBalance={false} label='Login' />
        </div>
      </div>
    </ThemeProvider>

  )
}
