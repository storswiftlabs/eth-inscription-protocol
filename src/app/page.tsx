'use client'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { RegisterProfile } from '@/components/pages/Chat/RegisterProfile'
import { Card } from '@/components/pages/Home/Card'
import { useProfile } from '@/store/useProfile'
import { getProfile } from '@/utils/api'

export default function Home() {
  const { isConnected, address } = useAccount()
  const setProfileStore = useProfile(s => s.setProfile)
  const profileStore = useProfile(s => s.profile)
  useEffect(() => {
    if (isConnected)
      getProfile(address!).then(e => setProfileStore(e))
  }, [])

  return (
    <main className="flex min-h-screen justify-start border-indigo-600 min-w-max border-solid  flex-col items-center p-24 bg-white dark:bg-black">
      {profileStore.text !== ''
        ? <>

          <h1 className='font-bold text-5xl text-black dark:text-white mb-10'>
            Discover
          </h1>
          <div>
            <Card />
          </div>
        </>
        : <RegisterProfile />
      }
    </main>
  )
}
