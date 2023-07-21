'use client'
import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
    <ThemeProvider attribute="class">
      <main className="flex min-h-screen  flex-col items-center justify-between p-24 border-x-10 bg-red-200 dark:bg-red-500">
        chat2
      </main>
    </ThemeProvider>
  )
}
