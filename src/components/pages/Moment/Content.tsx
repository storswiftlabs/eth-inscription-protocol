'use client'
import React, { useEffect, useState } from 'react'
import RightSidebar from './components/RightSidebar/RightSidebar'
import Find from './components/MomentContent/Find'
import Bookmark from './components/MomentContent/Bookmark'
import Message from './components/MomentContent/Message'
import More from './components/MomentContent/More'
import Verify from './components/MomentContent/Verify'
import FindInformation from './components/FindInformation'
import RightMessage from './components/RightSidebar/RightMessage'
interface MomentContentData {
  type: string // 判断是哪个路由
}

function MomentContent({ type }: MomentContentData) {
  const [isUpper, setIsUpper] = useState('Recommendation')

  const compenentsType = (type: string) => {
    switch (type) {
      case 'find':
        return <Find isUpper={isUpper} />
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

  const rigTypecomponent = (type: string) => {
    switch (type) {
      case 'find':
      case 'bookmark':
        return <RightSidebar />
      case 'message':
        return <RightMessage />
      case 'more':
        return <More />
      case 'verify':
        return <Verify />
      default:
        return <RightSidebar />
    }
  }

  const isUpperFunction = (s: string) => {
    setIsUpper(s)
  }

  const isNavaFunction = (type: string) => {
    if (type === 'find') {
      return true
    } else {
      return false
    }
  }

  return (
    <div className=" w-full flex relative  overflow-y-auto h-screen ">
      <div style={{ width: '60%' }} className="relative  border-r-[1px] border-tahiti-border-w dark:border-tahiti-border-d">
        <div style={{ display: isNavaFunction(type) ? 'flex' : "none" }} className="upper-div text-tahiti-color-w dark:text-tahiti-color-d bg-tahiti-100 dark:bg-tahiti-101 sticky h-20 w-full bg-slate-400 flex text-center items-center top-0 z-10" >
          <div onClick={() => isUpperFunction('Recommendation')} className={`ju367vy border-r-[2px] border-r-[#edecf3] dark:border-r-[#262626] w-1/2 ${isUpper === 'Recommendation' ? 'font-bold text-[#0f1419] dark:text-[#fffdfd]' : ''}`} >
            Recommendation
          </div>
          <div onClick={() => isUpperFunction('Follow')} className={`ju367vy w-1/2 ${isUpper === 'Follow' ? ' text-[#0f1419] font-bold dark:text-[#fffdfd]' : ''}`} >
            Follow
          </div>
        </div>
        <div className=" border-r-[1px] border-tahiti-border-w dark:border-tahiti-border-d">{compenentsType(type)}</div>
      </div>
      <div style={{ width: '40%' }}>
        {rigTypecomponent(type)}
      </div>
    </div>
  )
}

export default MomentContent
