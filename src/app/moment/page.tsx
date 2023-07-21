'use client'

import { ThemeProvider } from 'next-themes'

export default function Home() {
  return (
    <ThemeProvider attribute='class'>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-red-300 dark:bg-black ">
        1232
      </main>
    </ThemeProvider>
  )
}
