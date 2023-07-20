import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SideBar } from '@/components/SideBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inscription Protocol',
  description: 'ETH Inscription Protocol',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const combinedClassName = `${inter.className} flex`
  return (
    <html lang="en">
      <body className={combinedClassName}>
        <SideBar />
        {children}
      </body>
    </html>
  )
}
