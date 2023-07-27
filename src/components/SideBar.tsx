'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ThemeChanger } from './ThemeChanger'
import '@rainbow-me/rainbowkit/styles.css'

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
        <ConnectButton chainStatus={'none'} accountStatus={'address'} showBalance={false} label='Login' />
        {/* <YourApp /> */}
      </div>
    </div >

  )
}

export function YourApp() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected
          = ready
          && account
          && chain
          && (!authenticationStatus
            || authenticationStatus === 'authenticated')
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                )
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                )
              }
              return (
                <div style={{ display: 'flex', gap: 12 }}>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
