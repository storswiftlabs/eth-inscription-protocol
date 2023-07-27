'use client'
import MomentSideBar from '@/components/pages/Moment/SideBar'
import MomentContent from '@/components/pages/Moment/Content'
import '@/style/moment/moment.css'

export default function Home({ params: { type = 'Find' } }) {
  return (
    <main className="flex  h-screen items-center bg-grey dark:bg-black">
      <MomentSideBar type={type} />
      <MomentContent type={type} />
    </main>
  )
}
