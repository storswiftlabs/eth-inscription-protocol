'use client'

import { ChatContent } from '@/components/pages/Chat/Content'
import { ChatSideBar } from '@/components/pages/Chat/SideBar'
import { ThemeProvider } from 'next-themes'


export default function Home({ params: { type = 'general' } }) {
  return (
    <main className="flex h-screen w-full items-center justify-between bg-grey dark:bg-black">
      <ChatSideBar path={type} />
      <ChatContent type={type} />
    </main>
  )
}
