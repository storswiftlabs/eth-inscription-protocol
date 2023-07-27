'use client'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Follower from './Follower'
import { FindIcon, MessageIcom, BookmarkIcon, VerifyIcon, MoreIcon } from './Icons'
import { useTheme } from 'next-themes'
import { FillColor } from '@/type/Moment'

export default function MomentSideBar({ type = 'find' }) {

  const { theme } = useTheme()

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  useEffect(() => {
    const data = [
      {
        text: 'Find',
        icon: <FindIcon fill={handleFillColor()} />,
        link: '/moment/find',
      },
      {
        text: 'Message',
        icon: <MessageIcom fill={handleFillColor()} />,
        link: '/moment/message',
      },
      {
        icon: <BookmarkIcon fill={handleFillColor()} />,
        text: 'Bookmark',
        link: '/moment/bookmark',
      },
      {
        icon: <VerifyIcon fill={handleFillColor()} />,
        text: 'Verify',
        link: '/moment/verify',
      },
      {
        icon: <MoreIcon fill={handleFillColor()} />,
        text: 'More',
        link: '/moment/more',
      },
    ]
    setIcon(data)
  }, [theme])

  const [iconData, setIcon] = useState([] as any[])
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const iconComponent = (
    svg: React.JSX.Element,
    text: string,
    link: string
  ) => {
    return (
      <Link
        href={link}
        className={`icon-div hover:bg-[#edecf3] dark:hover:bg-[#262626] flex p-2 pr-4 pl-4 ${capitalizeFirstLetter(type) === text ? 'navSelected bg-[#edecf3] dark:bg-[#262626]' : ''
          }`}
      >
        <span className="mr-4" style={{ marginRight: '1rem' }}>
          {svg}
        </span>
        <span>{text}</span>
      </Link>
    )
  }

  return (
    <div className="nav flex flex-col justify-start items-center w-[300px] h-full p-4 border-x border-x-[#edecf3]  dark:bg-[#121212] dark:border-x-[#262626]">
      <div>
        <h1 className="font-bold text-2xl mb-5 mt-10 text-center">Tweet</h1>
        <div className=" w-full flex justify-center flex-col">
          <Follower />
          {iconData.map((i, j) => {
            return iconComponent(i.icon, i.text, i.link)
          })}
          <Button rounded className="nav-button  border-2 border-[#0e76fd] gb-[#0e76fd] dark:bg-[#404040] dark:border-[#696969]">
            Publish Moment
          </Button>
        </div>
      </div>
    </div>
  )
}



