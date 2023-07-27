import { Row, Text, Col, Spacer, Button } from '@nextui-org/react'
import React from 'react'
import { EmailIcom, ShezhiIcon } from '../Icons'
import { useTheme } from 'next-themes'
import { FillColor } from '@/type/Moment'

/**
 * @Message - 邮箱
 * @param {string} props. - 
 */

interface Props {

}

function Message() {

  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  return (
    <div className=' p-[1rem]'>
      <Row align='center' justify='space-between' >
        <p className=' text-[1.5rem] font-bold'>Messages</p>
        <span className='flex gap-[1rem]'>
          <ShezhiIcon fill={handleFillColor()} />
          <EmailIcom fill={handleFillColor()} />
        </span>
      </Row>
      <div className=' p-[2rem]'>
        <p className=' font-bold text-[2rem]'>Welcome to your inbox !</p>
        <Spacer y={0.5} />
        <p>Drop a line, share Tweets and more with private conversations between you and others on Twitter. </p>
        <Spacer y={1} />
        <Button css={{ height: "3rem" }} rounded className="nav-button  border-2 border-[#0e76fd] gb-[#0e76fd] dark:bg-[#404040] dark:border-[#696969]">
          Write a message
        </Button>
      </div>
    </div>
  )
}

export default Message