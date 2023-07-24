import React, { useEffect } from 'react'
import RightSidebar from './RightSidebar/RightSidebar'
import Find from './MomentContent/Find'
import { useTheme } from 'next-themes'
import Layout from '@/app/layout'
import { Navbar } from '@nextui-org/react'
interface MomentContentData {
  type: string // 判断是哪个路由
}

function MomentContent({ type }: MomentContentData) {
  const { theme } = useTheme()

  const compenentsType = (type: string) => {
    switch (type) {
      case 'find':
        return <Find />
      default:
        return <></>
    }
  }

  return (
    <div className="flex relative flex-1 overflow-y-auto h-screen">
      <div style={{ width: '48%' }}>
        <div className="absolute h-40 bg-slate-400 ">123</div>
        {compenentsType(type)}
      </div>
      <div style={{ width: '52%' }}>
        <RightSidebar />
      </div>
    </div>
  )
}

export default MomentContent
