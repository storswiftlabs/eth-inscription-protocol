'use client'

import { ChatContent } from '@/components/pages/Chat/Content'
import { ChatSideBar } from '@/components/pages/Chat/SideBar'

export default function Home({ params: { type = 'general' } }) {
  return (
    <main className="flex h-screen items-center justify-between bg-grey dark:bg-black">
      <ChatSideBar type={type} />
      <ChatContent type={type} />
    </main>

  )
}
