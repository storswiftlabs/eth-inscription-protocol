/* eslint-disable n/prefer-global/buffer */
'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useSendTransaction, useWalletClient } from 'wagmi'
import { Loading } from '@nextui-org/react'

import { CloudIcon, EmojiIcon, LockIcon, PictureIcon, SendIcon, SpeechIcon } from './Icons'
import { FillColor } from '@/type/Chat'
import '@/style/chat/ChatInput.css'
import { Notifications } from '@/components/Notifications'

export function ChatInput() {
  const { theme } = useTheme()
  const [inputData, setInputData] = useState('')
  const [themeColor, setThemeColor] = useState('')
  const { data: walletClient } = useWalletClient()
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(inputData, 'utf-8').toString('hex')}` || undefined,
  })
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter')
      sendTransaction()
  }
  useEffect(() => {
    isSuccess && setInputData('')
  }, [isSuccess])

  const handleSend = () => {
    sendTransaction()
  }
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  useEffect(() => {
    setThemeColor(theme === 'dark' ? FillColor.White : FillColor.Black)
  }, [])

  return <div className='p-4  w-full  h-[130px] '>
    {isSuccess ? <Notifications data={data?.hash} /> : null}
    <div className='chat-input h-full rounded-xl flex justify-between flex-col p-2'>
      {isLoading
        ? <div className='h-full w-full mx-4'> <Loading /></div>
        : <input
          className="w-full mx-4 h-full bg-transparent outline-none"
          onKeyDown={handleKeyDown}
          value={inputData}
          onChange={(e) => { setInputData(e.target.value) }}
          type="text"
        />}
      <div className=' border-b m-2 division-line' />
      <div className="h-full mx-3 flex items-center justify-between">
        <div className="h-full  flex items-center gap-4">
          {themeColor && <>
            <EmojiIcon fill={handleFillColor()}></EmojiIcon>
            <LockIcon fill={handleFillColor()}></LockIcon>
            <PictureIcon fill={handleFillColor()}></PictureIcon>
            <SpeechIcon fill={handleFillColor()}></SpeechIcon>
            <CloudIcon fill={handleFillColor()}></CloudIcon>
          </>}

        </div>
        <div className='cursor-pointer' onClick={handleSend}>
          {themeColor && <SendIcon fill={handleFillColor()} />}
        </div>
      </div>
    </div>
  </div>
}
