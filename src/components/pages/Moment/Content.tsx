'use client'
import React, { useEffect, useState } from 'react'
import RightSidebar from './components/RightSidebar/RightSidebar'
import Find from './components/MomentContent/Find'
import Bookmark from './components/MomentContent/Bookmark'
import Message from './components/MomentContent/Message'
import More from './components/MomentContent/More'
import RightMessage from './components/RightSidebar/RightMessage'
import VerifyModal from './components/VerifyModal'
import { useRouter } from 'next/navigation'
import FindInformation from './components/FindInformation'

interface MomentContentData {
  type: string // 判断是哪个路由
}

function MomentContent({ type }: MomentContentData) {


  const [isUpper, setIsUpper] = useState('Recommendation')
  const router = useRouter();


  const closeHandler = () => {
    router.back()
  };


  /**
   * 根据给定的类型返回对应的组件
   * @param type 类型
   * @returns 根据类型返回对应的组件
   */
  const compenentsType = (type: string) => {


    switch (type.toLowerCase()) {
      case 'find':
        return <Find isUpper={isUpper} />
      case 'bookmark':
        return <Bookmark />
      case 'message':
        return <Message />
      case 'more':
        return <More />
      case 'verify':
        if (true) {
          return <VerifyModal visible={true} closeHandler={closeHandler} />
        } else {
          return null;
        }
      default:
        return <FindInformation type={type} />
    }
  }




  /**
   * 根据给定的类型返回对应的右侧组件
   * @param type 类型
   * @returns 根据类型返回对应的右侧组件
   */
  const rigTypecomponent = (type: string) => {
    switch (type.toLowerCase()) {
      case 'find':
      case 'bookmark':
        return <RightSidebar />
      case 'message':
        return <RightMessage />
      case 'more':
        return <More />
      default:
        return <RightSidebar />
    }
  }

  /**
   * 判断在关注动态还是推荐动态
   * @param s 字符串
   */

  const isUpperFunction = (s: string) => {
    setIsUpper(s)
  }

  /**
   * 判断给定的类型是否为 'find'
   * @param type 类型
   * @returns 若给定的类型为 'find'，返回 true；否则返回 false
   */
  const isNavaFunction = (type: string) => {
    return type === 'find';
  }


  return (
    <div className="w-full flex relative  min-h-screen">
      <div style={{ width: '100%', height: "100vh", overflowY: "auto", display: "flex" }} id='gund' className=" relative border-r-[1px] border-tahiti-border-w dark:border-tahiti-border-d">
        <div className=' flex-1'>
          {isNavaFunction(type) && (
            <div className="upper-div text-tahiti-color-w dark:text-tahiti-color-d bg-tahiti-100 dark:bg-tahiti-101 sticky h-20 w-full bg-slate-400 flex text-center items-center top-0 z-10">
              <div onClick={() => isUpperFunction('Recommendation')} className={`ju367vy border-r-[2px] border-r-[#edecf3] dark:border-r-[#262626] w-1/2 ${isUpper === 'Recommendation' ? 'font-bold text-[#0f1419] dark:text-[#fffdfd]' : ''}`}>
                Recommendation
              </div>
              <div onClick={() => isUpperFunction('Follow')} className={`ju367vy w-1/2 ${isUpper === 'Follow' ? 'text-[#0f1419] font-bold dark:text-[#fffdfd]' : ''}`}>
                Follow
              </div>
            </div>
          )}
          <div style={{}} className="border-r-[1px] border-tahiti-border-w dark:border-tahiti-border-d">{compenentsType(type)}</div>
        </div>
        <div style={{ width: '40%' }}>
          {rigTypecomponent(type)}
        </div>
      </div>

    </div>
  );

}

export default MomentContent
