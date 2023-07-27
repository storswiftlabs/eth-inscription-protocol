'use client'
import React, { useEffect, useState } from 'react'
import RightSidebar from './RightSidebar/RightSidebar'
import Find from './MomentContent/Find'
import { useTheme } from 'next-themes'
import { Navbar, Row } from '@nextui-org/react'
import Bookmark from './MomentContent/Bookmark'
import Message from './MomentContent/Message'
import More from './MomentContent/More'
import Verify from './MomentContent/Verify'
import FindInformation from './MomentContent/FindInformation'
interface MomentContentData {
  type: string // 判断是哪个路由
}

function MomentContent({ type }: MomentContentData) {
  const [isUpper, setIsUpper] = useState('Recommendation')

  const compenentsType = (type: string) => {
    switch (type) {
      case 'find':
        return <Find />
      case 'bookmark':
        return <Bookmark />
      case 'message':
        return <Message />
      case 'more':
        return <More />
      case 'verify':
        return <Verify />
      default:
        return <FindInformation type={type} />
    }
  }

  const isUpperFunction = (s: string) => {
    setIsUpper(s)
  }

  return (
    <div className=" w-full flex relative  overflow-y-auto h-screen ">
      <div style={{ width: '50%' }} className="relative  border-r-[1px] border-tahiti-border-w dark:border-tahiti-border-d">
        <div className="upper-div text-tahiti-color-w dark:text-tahiti-color-d bg-tahiti-100 dark:bg-tahiti-101 sticky h-20 w-full bg-slate-400 flex text-center items-center top-0 z-10" >
          <div onClick={() => isUpperFunction('Recommendation')} className={`ju367vy border-r-[2px] border-r-[#edecf3] dark:border-r-[#262626] w-1/2 ${isUpper === 'Recommendation' ? ' text-[#0f1419] dark:text-[#fffdfd]' : ''}`} >
            Recommendation
          </div>
          <div onClick={() => isUpperFunction('Follow')} className={`ju367vy w-1/2 ${isUpper === 'Follow' ? ' text-[#0f1419] dark:text-[#fffdfd]' : ''}`} >
            Follow
          </div>
        </div>
        <div className=" border-r-[1px] border-tahiti-border-w dark:border-tahiti-border-d">{compenentsType(type)}</div>
      </div>
      <div style={{ width: '40%' }}>
        <RightSidebar />
      </div>
    </div>
  )
}

export default MomentContent
