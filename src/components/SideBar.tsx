'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeChanger } from './ThemeChanger'
import '@rainbow-me/rainbowkit/styles.css'
import { CustomConnectButton } from './CustomConnectWallet'

export function SideBar() {
  return (
    < div className="flex flex-col w-[130px] h-screen px-4 py-8 border-x-1 bg-grey dark:bg-black justify-between items-center" >
      <div className="flex flex-col w-44 h-screen  border-gray-200 bg-grey dark:bg-black justify-start items-center">
        <Link href="/"><Image src="/logo.png" width={50} height={50} alt="Logo" /></Link>
        <Link href="/chat/general"><Image className='my-8' src="/chat.svg" width={30} height={30} alt="Logo" /></Link>
        <Link href="/moment/find"><Image src="/moment.svg" width={30} height={30} alt="Logo" /></Link>
      </div>
      <div className="flex flex-col items-center mt-6 -mx-2 text-red">
        <ThemeChanger />
        <br />
        <CustomConnectButton />
      </div>
    </div >

  )
}
