'use client'
import { ThemeProvider } from 'next-themes'
import { Card } from '@/components/pages/Home/Card'

export default function Home() {
  return (
    <ThemeProvider attribute="class">
      <main className="flex min-h-screen justify-start border-indigo-600 min-w-max border-solid  flex-col items-center p-24 bg-white dark:bg-black">
        <h1 className='font-bold text-5xl text-black dark:text-white mb-10'>
          Discover
        </h1>
        <div>
          <Card></Card>
        </div>
      </main>
    </ThemeProvider>
  )
}
