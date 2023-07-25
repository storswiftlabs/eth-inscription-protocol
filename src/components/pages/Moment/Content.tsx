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
      <div style={{ width: '50%' }} className="relative">
        <div className="upper-div sticky h-20 w-full bg-slate-400 flex text-center items-center top-0">
          <div
            onClick={() => isUpperFunction('Recommendation')}
            className={`ju367vy upper w-1/2 ${
              isUpper === 'Recommendation' ? 'upper-color' : ''
            }`}
          >
            Recommendation
          </div>
          <div
            onClick={() => isUpperFunction('Follow')}
            className={`ju367vy w-1/2 ${
              isUpper === 'Follow' ? 'upper-color' : ''
            }`}
          >
            Follow
          </div>
        </div>
        <div className="content-border">{compenentsType(type)}</div>
      </div>
      <div style={{ width: '40%' }}>
        <RightSidebar />
      </div>
    </div>
  )
}

export default MomentContent
