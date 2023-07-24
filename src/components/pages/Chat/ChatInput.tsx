'use client'
import Image from 'next/image'
import { useState } from 'react'

export function ChatInput() {
  const inputIcon = ['emojy', 'picture', 'lock', 'cloud', 'speech']
  const [inputData, setInputData] = useState('')
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      // console.log(inputData)
    }
  }
  const handleSend = () => {
    // console.log(inputData)
  }
  return <div className='p-4  w-full  h-[130px] '>
        <div className='bg-neutral-500/25 h-full rounded-xl flex justify-between flex-col p-2'>
            <input
                className="w-full mx-4 h-full bg-transparent outline-none"
                onKeyDown={handleKeyDown}
                onChange={(e) => { setInputData(e.target.value) }}
                type="text"
            />
            <div className=' border-b m-2 border-neutral-700' />
            <div className="h-full mx-3 flex items-center justify-between">
                <div className="h-full  flex items-center">
                    {inputIcon.map((icon: string) => <Image src={`/${icon}.svg`} alt='' width={20} height={20} className='mx-2' />)}
                </div>
                <Image src={`/${'send'}.svg`} alt='' width={20} height={20} className='mx-2 cursor-pointer' onClick={handleSend} />
            </div>
        </div>
    </div>
}
