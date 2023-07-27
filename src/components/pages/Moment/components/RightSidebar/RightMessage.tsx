import { Button, Row, Spacer } from '@nextui-org/react'
import React from 'react'

function RightMessage() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='px-[20%]'>
        <span className=' font-bold text-[2rem]'>Select a message </span>
        <Spacer y={0.5} />
        <span>Choose from your existing conversations, start a new one, or just keep swimming.</span>
        <Spacer y={1} />
        <Button css={{ height: "3rem" }} rounded className="nav-button  border-2 border-[#0e76fd] gb-[#0e76fd] dark:bg-[#404040] dark:border-[#696969]">
          New message
        </Button>
      </div>
    </div>
  )
}

export default RightMessage