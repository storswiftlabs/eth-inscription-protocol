/* eslint-disable n/prefer-global/buffer */

import { Collapse } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAccount, useSendTransaction, useWalletClient } from 'wagmi'
import { useTheme } from 'next-themes'
import { EmojiDialog } from './EmojiDialog'
import { GroupIcon } from './Icons'
import { type MessageOnChain, sendMessageOnChain } from '@/utils/sendMessageOnChain'
import { FillColor } from '@/type/Chat'
import { getMessageGroupList, getMessageList } from '@/utils/requestApi'
import type { SwiftChatResponse } from '@/utils/InterfaceType'

export function ChatSideBar({ path = 'general' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [sendDataOnChain, setSendDataOnChain] = useState<MessageOnChain>()
  const [submitData, setSubmitData] = useState(false)
  const { data: walletClient } = useWalletClient()
  const { address, isConnected } = useAccount()
  const { theme } = useTheme()
  const [themeColor, setThemeColor] = useState('')
  const [messageList, setMessageList] = useState<SwiftChatResponse[]>([])
  const [messageGroupList, setMessageGroupList] = useState<SwiftChatResponse[]>([])
  useEffect(() => {
    setThemeColor(theme === 'dark' ? FillColor.White : FillColor.Black)
    getMessageList().then(e => setMessageList(e.profiles))
    getMessageGroupList().then(e => setMessageGroupList(e.groups))
  }, [])

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: walletClient?.account.address,
    data: `0x${Buffer.from(JSON.stringify(sendMessageOnChain(sendDataOnChain)), 'utf-8').toString('hex')}`,
  })
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }

  const handleSend = () => {
    !isConnected && alert('Please connect your wallet first')
    sendTransaction()
  }
  function randomNumberFromTime() {
    const timeSeed = new Date().getTime()
    const randomNumber = Math.random() * 10000

    return Math.floor(randomNumber * timeSeed)
  }
  function selectedOK(selected: string[]) {
    setSendDataOnChain({ ...sendDataOnChain, receiver: selected, type: 'create-group', title: randomNumberFromTime().toString() })
    setSubmitData(true)
    closeModal()
  }
  useEffect(() => {
    if (sendDataOnChain?.receiver?.length > 0 && submitData)
      handleSend()
    setSubmitData(false)
  }, [submitData])
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  return <div className="flex flex-col justify-start items-center w-[300px] h-full bg-white dark:bg-black p-4 border-x dark:text-white border-gray-200 dark:border-gray-700">
    <div className=' w-full'>
      <h1 className='font-bold text-2xl mb-5 mt-10 text-center'>
        Chat
      </h1>
      <div className='w-full flex justify-center flex-col'>
        <Link href="/chat/general"> <div className={`m-2 rounded-lg p-2 ${path === 'general' ? 'bg-red-200 dark:bg-slate-500/40' : ''}`}> 💬 General</div></Link>
        <Collapse
          expanded={messageGroupList.filter(t => t.title === path).length > 0}
          css={{ border: 'none', padding: '0 16px' }}
          title={<div className='text-black dark:text-white'>👥 Group</div>}
        >
          {messageGroupList?.map(t => <Link href={`/chat/${t.title}?type=group`}><div className={`m-2 rounded-lg p-2 ${path === t.title ? 'bg-red-200 dark:bg-slate-500/40' : ''}`}>👥 {t.title}</div></Link>)}

        </Collapse>
      </div>

    </div>
    <div className='  w-full '>
      <h1 className='font-bold text-2xl mb-5 mt-10 text-center'>
        Messages
      </h1>
      <div className='w-full flex justify-center flex-col'>
        {messageList.map(t => <Link href={`/chat/${t.sender}?type=message`}><div className={`flex ${path === t.sender ? 'bg-red-200 dark:bg-slate-500/40' : ''} p-2 rounded-lg m-1`}>&nbsp; <Image src='/logo.png' width={20} height={20} alt={''} />&nbsp; {t.sender}</div></Link>)}

        {/* <div className='flex'>&nbsp; <Image src='/logo.png' width={20} height={20} alt={''} />&nbsp; 0xEa...B65c</div> */}

      </div>

    </div>
    <br />
    <div onClick={openModal} className='w-20 h-10 border bg-none hover:bg-slate-200  transition-all dark:hover:bg-slate-500/50 dark:hover:border-none w-full flex justify-center items-center rounded-xl font-bold cursor-pointer'>
      {themeColor && <GroupIcon fill={handleFillColor()} />}
      &nbsp;
      Add Group
      <EmojiDialog isOpen={isOpen} closeModal={closeModal} type={'addGroup'} selectedOK={x => selectedOK(x)} />

    </div>
  </div>
}
