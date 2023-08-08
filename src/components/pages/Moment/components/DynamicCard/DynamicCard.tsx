'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ILoveIcon, LoveIcon, MessagesIcon, ShareIcon } from '../Icons'
import { FillColor } from '@/type/Moment'

/**
 * @WhatsHappening - 动态内容卡片组件
 * @param {string} props.avatar - 头像
 * @param {string} props.name - 名称
 * @param {string} props.time - 时间
 * @param {string} props.text - 内容
 * @param {string} props.img -  图片
 */

interface Props {
  avatar: string
  name: string
  time: string
  text: string
  img: string
}

export default function DynamicCard({ avatar, name, time, text, img }: Props) {
  const [love, setLove] = useState(false)
  const router = useRouter()

  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  return (
    <div onClick={() => router.push((`/moment/${1}`))} className="DynamicCard-grid bg-[#f7f9f9] dark:bg-[#1e1e1e] hover:bg-[#edecf3] dark:hover:bg-[#262626]" >
      <img src={avatar} alt={''} width={35} height={35} ></img>
      <div className="flex ju367v10">
        <div>
          <div className="flex mb-1 gap-4">
            <span className='hover:underline text-[.8rem]' onClick={e => e.stopPropagation()}>{name}</span>
            <span>·</span>
            <span className=' ml-[-.6rem]'>{time}</span>
          </div>

          <div className="overflow-hidden overflow-ellipsis line-clamp-3 mb-2">
            {text}
          </div>
          <div className=' w-full' >
            <img className=' w-full' src={img} alt="" />
          </div>
          <br></br>
          <div className="border-[1px] border-[#cfd9de] dark:border-[#404040]"></div>
          <div className="mt-8 flex justify-between">
            <ShareIcon fill={handleFillColor()} />
            <MessagesIcon fill={handleFillColor()} />
            <span onClick={(e) => {
              setLove(!love)
              e.stopPropagation()
            }}>
              {love ? <ILoveIcon fill={handleFillColor()} /> : <LoveIcon fill={handleFillColor()} />}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
