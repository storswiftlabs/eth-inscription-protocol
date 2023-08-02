'use client'
import { Button, Dropdown, Text } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Follower from './components/Follower'
import { FindIcon, MessageIcom, BookmarkIcon, VerifyIcon, MoreIcon } from './components/Icons'
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

  /**
   * 判断给定的类型和文本是否符合条件
   * @param type 类型
   * @param text 文本
   * @returns 如果类型不在有效类型列表中且文本为 'Find'，则返回 true；否则返回 false
   */
  const isa = (type: string, text: string) => {
    // 定义有效类型的集合
    const validTypes = new Set(['message', 'bookmark', 'verify', 'more']);
    return !validTypes.has(type) && text === 'Find';
  }


  const iconComponent = (
    svg: React.JSX.Element,
    text: string,
    link: string
  ) => {
    const isSelected = type.toLowerCase() === text.toLowerCase() || isa(type, text);
    const classNames = `icon-div hover:bg-[#edecf3] dark:hover:bg-[#262626] flex p-2 pr-4 pl-4 ${isSelected ? 'navSelected bg-[#edecf3] dark:bg-[#262626]' : ''}`;
    if (text === 'More') {
      return <div className={classNames}>
        <Dropdown placement="bottom">
          <Dropdown.Trigger>
            <span className="mr-4 flex  w-full" style={{ marginRight: '1rem' }}>
              <MoreIcon fill={handleFillColor()} />
              <span className='ml-4'>{'More'}</span>
            </span>
          </Dropdown.Trigger>
          <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
              <Text b color="inherit" css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: 'flex' }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
            <Dropdown.Item key="analytics" withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key="system">System</Dropdown.Item>
            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>
    } else {
      return (
        <Link href={link} className={classNames}>
          <span className="mr-4" style={{ marginRight: '1rem' }}>
            {svg}
          </span>
          <span>{text}</span>
        </Link>
      );
    }

  }

  return (
    <div className="nav flex flex-col justify-start items-center w-[300px] h-full p-4 border-x border-x-[#edecf3] dark:bg-[#121212] dark:border-x-[#262626]">
      <div>
        <h1 className="font-bold text-2xl mb-5 mt-10 text-center">Tweet</h1>
        <div className="w-full flex justify-center flex-col">
          <Follower />
          {iconData.map((i, j) => (
            iconComponent(i.icon, i.text, i.link)
          ))}
          <Button rounded className="nav-button border-2 border-[#0e76fd] gb-[#0e76fd] dark:bg-[#404040] dark:border-[#696969]">
            Publish Moment
          </Button>
        </div>
      </div>
    </div>
  );
}



