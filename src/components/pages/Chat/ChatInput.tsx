/* eslint-disable n/prefer-global/buffer */
'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useSendTransaction, useWalletClient } from 'wagmi'
import { Loading } from '@nextui-org/react'
import Image from 'next/image'
import { EmojiIcon, PictureIcon, SendIcon } from './Icons'
import { FillColor } from '@/type/Chat'
import { Notifications } from '@/components/Notifications'

export function ChatInput() {
  const { theme } = useTheme()
  const [inputData, setInputData] = useState('')
  const [themeColor, setThemeColor] = useState('')
  const [pictureArr, setPictureArr] = useState<string[]>([])
  const { data: walletClient } = useWalletClient()
  const fileRef = useRef<HTMLInputElement>(null)
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

  return <div className='p-4  w-full  min-h-[130px] '>
    {isSuccess ? <Notifications data={data?.hash} /> : null}
    <div className='bg-neutral-200/40 dark:bg-neutral-500/30 h-full rounded-xl flex justify-between flex-col p-2 '>
      {isLoading
        ? <div className='h-full w-full mx-4'> <Loading /></div>
        : <input
          className="w-full mx-4 h-full bg-transparent outline-none"
          onKeyDown={handleKeyDown}
          value={inputData}
          onChange={(e) => { setInputData(e.target.value) }}
          type="text"
        />}
      {pictureArr.length > 0
        && <>
          <br />
          <div className='flex gap-4 px-4'>
            {pictureArr.map((t, index) => {
              return <div className='relative'>
                <Image src={t} width={50} height={50} alt="" />
                <div className='absolute w-5 h-5 bg-neutral-400/90 cursor-pointer top-[-10px] right-[-10px] z-10 rounded-full flex items-center justify-center' onClick={() => setPictureArr([...pictureArr.filter(s => s !== t)])} >
                  <svg className="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2477" width="13" height="13"><path d="M16.943988 16.886615C3.127666 31.214652 0.569088 37.35524 0.569088 58.33558v25.074065l213.385411 214.408842 213.385411 214.408843-199.569089 200.59252c-110.018857 110.018857-206.221392 208.268255-213.385411 217.479136-20.468625 25.585781-18.933478 53.218424 3.582009 75.733911 22.515487 22.515487 50.14813 24.050634 75.733911 3.58201 9.210881-7.164019 107.460279-103.366554 217.479136-213.385412L512.284702 596.14869l201.104236 200.080805c110.018857 110.018857 208.268255 206.221392 217.479136 213.385412 25.585781 20.468625 53.218424 18.933478 75.733911-3.58201 22.515487-22.515487 24.050634-50.14813 3.58201-75.733911-7.164019-9.210881-103.366554-107.460279-213.385412-217.990851L596.717778 511.715614l200.080805-201.104236c110.018857-110.018857 206.221392-208.268255 213.385412-217.479136 22.003771-27.120928 16.886615-63.964452-11.76946-86.479939-4.093725-3.582009-18.933478-6.652303-32.749799-6.652303h-25.585781l-213.897126 213.385411L512.284702 426.770822 298.387575 213.385411 84.490449 0h-25.585781C36.389181 0 31.272025 2.046862 16.943988 16.886615z" p-id="2478"></path></svg>
                </div>
              </div>
            })}
          </div>
        </>}
      <input type="file" ref={fileRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files && e.target?.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
          const dataURL = reader.result as string
          setPictureArr([...pictureArr, dataURL])
        }
        file && reader.readAsDataURL(file)
      }} className='w-0 h-0 none' />
      <div className=' border-b m-2 border-neutral-300 dark:border-neutral-600' />
      <div className="h-full mx-3 flex items-center justify-between">
        <div className="h-full  flex items-center gap-4">
          {themeColor && <>
            <EmojiIcon fill={handleFillColor()}></EmojiIcon>
            {/* <LockIcon fill={handleFillColor()}></LockIcon> */}
            <PictureIcon onClick={() => fileRef.current?.click()} fill={handleFillColor()}></PictureIcon>
            {/* <SpeechIcon fill={status === 'recording' ? FillColor.Orange : handleFillColor()}></SpeechIcon> */}
            {/* <CloudIcon fill={handleFillColor()}></CloudIcon> */}
          </>}

        </div>
        <div className='cursor-pointer' onClick={handleSend}>
          {themeColor && <SendIcon fill={handleFillColor()} />}
        </div>
      </div>
    </div>
  </div>
}
