import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SideBar } from '@/components/SideBar'
import { Providers } from '@/components/providers'

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
  const combinedClassName = `${inter.className} flex max-h-screen w-screen `
  return (
    <html lang="en">
      <body className={combinedClassName}>
        <Providers>
          <SideBar />
          <div className="children-div max-h-full">{children}</div>
          {/* <div className='w-full max-h-full'>{children}</div> */}
        </Providers>
      </body>
    </html>
  )
}
