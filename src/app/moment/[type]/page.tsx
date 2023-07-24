'use client'

import '../../../style/moment.css'
import { useState } from 'react'

import Link from 'next/link'
import MomentSideBar from '@/components/pages/Moment/SideBar'
import MomentContent from '@/components/pages/Moment/Content'

export default function Home({ params: { type = 'Find' } }) {
  return (
    <main className="flex h-screen items-center bg-grey dark:bg-black">
      <MomentSideBar type={type} />
      <MomentContent type={type} />
    </main>
    // <ThemeProvider>
    //   <div className="flex">
    //     <main className="nav flex min-h-screen flex-col items-center p-16">
    //       <SelectedFollower />
    //       <div>
    //         {iconData.map((i, j) => {
    //           return iconComponent(i.icon, i.text, i.link)
    //         })}
    //         <Button rounded className="nav-button">
    //           Publish Moment
    //         </Button>
    //       </div>
    //     </main>
    //     <div className="flex relative flex-1 overflow-y-auto h-screen">
    //       <div>1</div>
    //       <div className="absolute top-0 right-0">2</div>
    //     </div>
    //   </div>
    // </ThemeProvider>
  )
}
