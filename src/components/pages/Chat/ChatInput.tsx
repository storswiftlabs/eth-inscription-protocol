/* eslint-disable n/prefer-global/buffer */
'use client'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useAccount, useSendTransaction, useWalletClient } from 'wagmi'
import { Loading } from '@nextui-org/react'
import Image from 'next/image'
import { AtIcon, EmojiIcon, PictureIcon, SendIcon } from './Icons'
import { EmojiDialog } from './EmojiDialog'
import { FillColor } from '@/type/Chat'
import { Notifications } from '@/components/Notifications'
import type { MessageOnChain } from '@/utils/sendMessageOnChain'
import { sendMessageOnChain } from '@/utils/sendMessageOnChain'
import { useChatMessageReply } from '@/store/useChatMessage'

interface Props {
  type: string
}
export function ChatInput({ type }: Props) {
  const { theme } = useTheme()
  const [inputData, setInputData] = useState('')
  const [themeColor, setThemeColor] = useState('')
  const [pictureArr, setPictureArr] = useState<string[]>([])
  const { data: walletClient } = useWalletClient()
  const fileRef = useRef<HTMLInputElement>(null)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [atMember, setAtMember] = useState<string[]>([])
  const { address, isConnected } = useAccount()
  const [sendDataOnChain, setSendDataOnChain] = useState<MessageOnChain>({ type: 'im' })
  const replyMessage = useChatMessageReply(state => state.reply)
  const clearReplyMessage = useChatMessageReply(state => state.clearReplyMessage)

  function closeModal() {
    setIsOpen(false)
  }
  function closeModal2() {
    setIsOpen2(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  function openModal2() {
    setIsOpen2(true)
  }
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(sendMessageOnChain(sendDataOnChain)), 'utf-8').toString('hex')}`,
  })
  const handleSend = () => {
    !isConnected && alert('Please connect your wallet first')
    sendTransaction()
  }
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter')
      handleSend()
  }

  useEffect(() => {
    replyMessage.txHash && setSendDataOnChain({ ...sendDataOnChain, with: replyMessage.txHash })
    pictureArr.length > 0 && setSendDataOnChain({ ...sendDataOnChain, image: pictureArr })
  }, [replyMessage, pictureArr])

  useEffect(() => {
    const clearData = () => {
      setInputData('')
      clearReplyMessage()
    }
    isSuccess && clearData()
  }, [isSuccess])

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  useEffect(() => {
    setThemeColor(theme === 'dark' ? FillColor.White : FillColor.Black)
    setSendDataOnChain({ ...sendDataOnChain, title: type.substring(0, 2) === '0x' ? '' : type, type: 'im' })
  }, [])

  function selectedOK(selected: string) {
    closeModal()
    const newValue = chatInputRef.current?.value.substring(0, chatInputRef.current?.selectionStart as number | undefined)
      + selected
      + chatInputRef.current?.value.substring(chatInputRef.current?.selectionEnd as number)
    setInputData(newValue)
    setSendDataOnChain({ ...sendDataOnChain, text: newValue })
  }
  function selectedOK2(selected: string) {
    closeModal2()
    setAtMember([...atMember, selected])
  }

  return <div className='p-4  w-full  min-h-[130px] '>
    <EmojiDialog isOpen={isOpen} closeModal={closeModal} selectedOK={x => selectedOK(x)} type='emoji' />
    <EmojiDialog isOpen={isOpen2} closeModal={closeModal2} selectedOK={x => selectedOK2(x)} type='at' />

    {isSuccess ? <Notifications data={data?.hash} /> : null}
    <div className='bg-neutral-200/40 dark:bg-neutral-500/30 h-full rounded-xl flex justify-between flex-col p-2 '>
      {isLoading
        ? <div className='h-full w-full mx-4'> <Loading /></div>
        : <input
          ref={chatInputRef}
          className="w-full mx-4 h-full bg-transparent outline-none"
          onKeyDown={handleKeyDown}
          value={inputData}
          onChange={(e) => { setInputData(e.target.value) }}
          type="text"
        />}
      {replyMessage.txHash.length > 0 && <div className='relative'>
        <div className='bg-neutral-700/70 text-sm rounded-md p-1 mx-2 mt-2 '>{replyMessage.text}</div>
        <div onClick={() => clearReplyMessage()} className='absolute right-1 top-1 bg-slate-400 rounded-full cursor-pointer' >
          <svg className="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2477" width="12" height="12"><path d="M16.943988 16.886615C3.127666 31.214652 0.569088 37.35524 0.569088 58.33558v25.074065l213.385411 214.408842 213.385411 214.408843-199.569089 200.59252c-110.018857 110.018857-206.221392 208.268255-213.385411 217.479136-20.468625 25.585781-18.933478 53.218424 3.582009 75.733911 22.515487 22.515487 50.14813 24.050634 75.733911 3.58201 9.210881-7.164019 107.460279-103.366554 217.479136-213.385412L512.284702 596.14869l201.104236 200.080805c110.018857 110.018857 208.268255 206.221392 217.479136 213.385412 25.585781 20.468625 53.218424 18.933478 75.733911-3.58201 22.515487-22.515487 24.050634-50.14813 3.58201-75.733911-7.164019-9.210881-103.366554-107.460279-213.385412-217.990851L596.717778 511.715614l200.080805-201.104236c110.018857-110.018857 206.221392-208.268255 213.385412-217.479136 22.003771-27.120928 16.886615-63.964452-11.76946-86.479939-4.093725-3.582009-18.933478-6.652303-32.749799-6.652303h-25.585781l-213.897126 213.385411L512.284702 426.770822 298.387575 213.385411 84.490449 0h-25.585781C36.389181 0 31.272025 2.046862 16.943988 16.886615z" p-id="2478"></path></svg>

        </div>
      </div>}
      {atMember.length > 0 && <div className='px-2'>

        {atMember.map(t => <span className='bg-slate-300 rounded-md p-1 mx-1'>@{t}</span>)}
      </div>}
      {pictureArr.length > 0 && replyMessage.txHash.length === 0
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
        reader.onload = function () {
          const dataURL = reader.result as string
          setPictureArr([...pictureArr, dataURL])
        }
        file && reader.readAsDataURL(file)
      }} className='w-0 h-0 none' />
      <div className=' border-b m-2 border-neutral-300 dark:border-neutral-600' />
      <div className="h-full mx-3 flex items-center justify-between">
        <div className="h-full  flex items-center gap-4">
          {themeColor && <>
            <EmojiIcon onClick={() => openModal()} fill={handleFillColor()}></EmojiIcon>
            {/* <LockIcon fill={handleFillColor()}></LockIcon> */}
            <PictureIcon onClick={() => fileRef.current?.click()} fill={handleFillColor()}></PictureIcon>
            <AtIcon onClick={() => openModal2()} fill={handleFillColor()} />
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
