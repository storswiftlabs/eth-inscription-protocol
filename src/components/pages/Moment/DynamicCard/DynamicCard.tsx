'use client'
import Image from 'next/image'
import { Textarea } from '@nextui-org/react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { FillColor } from '@/type/Moment'
import { ILoveIcon, LoveIcon, MessagesIcon, ShareIcon } from '../Icons'
export default function DynamicCard() {
  const [love, setLove] = useState(false)
  const router = useRouter()

  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  return (
    <div onClick={() => router.push((`/moment/${1}`))} className="DynamicCard-grid bg-[#f7f9f9] dark:bg-[#1e1e1e] hover:bg-[#edecf3] dark:hover:bg-[#262626]" >
      <img
        src="https://console.xyz/cdn-cgi/image/width=40,height=40,fit=crop,quality=75,dpr=2/https://images.gamma.io/ipfs/Qmb84UcaMr1MUwNbYBnXWHM3kEaDcYrKuPWwyRLVTNKELC/3066.png"
        alt={''}
        width={35}
        height={35}
      ></img>
      <div className="flex ju367v10">
        <div>
          <div className=" mb-1">
            <span>0x23af....dsdsd</span>
            <span>@Tushdhs junds 7</span>
          </div>

          <div className="max-w-xs overflow-hidden overflow-ellipsis line-clamp-3 mb-2">
            Playing the guitar has also taught me discipline and patience.
            Learning new chords and songs takes time and practice. It's a
            constant journey of improvement. When I finally master a
            difficult1difficult1difficult1difficult1difficult1difficult1123
          </div>
          <div style={{ height: '14.857rem', width: '100%' }}>
            <img
              width={'100%'}
              height={'100%'}
              src="https://pbs.twimg.com/media/F1yPk5VXoAA3rGZ?format=jpg&name=medium"
              alt=""
            />
          </div>
          <div className="border-[1px] border-[#cfd9de] dark:border-[#404040]"></div>
          <div className="mt-8 flex justify-between">
            <ShareIcon fill={handleFillColor()} />
            <MessagesIcon fill={handleFillColor()} />
            <span onClick={(e) => { setLove(!love); e.stopPropagation() }}>
              {love ? <ILoveIcon fill={handleFillColor()} /> : <LoveIcon fill={handleFillColor()} />}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}


