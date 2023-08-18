'use client'
import ModelViewer from '@metamask/logo'
import { useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import { RegisterProfile } from '@/components/pages/Chat/RegisterProfile'
import { Card } from '@/components/pages/Home/Card'
import { useProfile } from '@/store/useProfile'
import { getProfile } from '@/utils/api'

export default function Home() {
  const { isConnected, address } = useAccount()
  const setProfileStore = useProfile(s => s.setProfile)
  const profileStore = useProfile(s => s.profile)
  const ref = useRef<HTMLDivElement>(null)
  const loadMetaMask = () => {
    const viewer = ModelViewer({
      pxNotRatio: true,
      width: 500,
      height: 400,
      followMouse: false,
      slowDrift: false,
    })
    ref.current?.appendChild(viewer.container)
    viewer.lookAt({
      x: 100,
      y: 100,
    })
    viewer.setFollowMouse(true)
    viewer.stopAnimation()
  }
  useEffect(() => {
    if (isConnected)
      getProfile(address!).then(e => setProfileStore(e))
    loadMetaMask()
  }, [isConnected])

  return (
    <main className="flex min-h-screen justify-start border-indigo-600 min-w-max border-solid  flex-col items-center p-24 bg-white dark:bg-black">
      {isConnected
        ? profileStore.text !== ''
          ? <>

          <h1 className='font-bold text-5xl text-black dark:text-white mb-10'>
            Discover
          </h1>
          <div>
            <Card />
          </div>
        </>
          : <RegisterProfile />
        : <h1 ref={ref} className='flex items-center flex-col'>
        <h1 className='text-3xl font-bold'> Please Login Your Wallet</h1>
      </h1>
      }
    </main>
  )
}
