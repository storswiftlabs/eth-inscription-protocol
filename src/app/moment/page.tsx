'use client'

import { ThemeProvider } from 'next-themes'
import { ThemeChanger } from '@/components/ThemeChanger'

export default function Home() {
  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ThemeChanger />
      </main>
    </ThemeProvider>
  )
}
