'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useAccount } from 'wagmi'
import { EmojiDialog } from './EmojiDialog'
import { ReplyIcon } from './Icons'
import { FillColor } from '@/type/Chat'
import type { ChatContentMessageType, ProfileResponse } from '@/type/Chat'
import { useChatMessageReply } from '@/store/useChatMessage'
import { getProfile } from '@/utils/requestApi'

export function ChatContentMessage({ data, me }: { data: ChatContentMessageType; me: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const { address, isConnected } = useAccount()
  const [messageData, setMessageData] = useState<ChatContentMessageType[]>()
  const [profileData, setProfileData] = useState<ProfileResponse>()
  const setReplyMessage = useChatMessageReply(state => state.setReplyMessage)

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  function selectedOK(selected: string) {
    closeModal()
  }
  useEffect(() => {
    (async () => {
      setProfileData(await getProfile(data.sender))
    })()
  }, [])

  return <div className={`min-h-[100px] w-full flex ${data.sender !== address ? 'justify-start' : 'justify-end'}`} >
    <div className={`flex m-4  ${data.sender !== address ? '' : 'flex-row-reverse'}`}>
      <div className="relative w-10 m-2  h-10 rounded-xl bg-neutral-200 dark:bg-neutral-500" />
      <div className={`flex flex-col ${data.sender !== address ? '' : 'items-end'} group relative`}>
        {profileData?.text}
        <div className='max-w-[800px] text-sm'>
          <div className={`rounded-xl p-2   ${data.sender !== address ? 'bg-neutral-200 dark:bg-neutral-700' : 'bg-green-300 dark:bg-[#48BD67]'}`}>
            <div>
              {data.text}
            </div>
            <br />
            <div className='flex gap-2 flex-wrap'>
              {data.image.map((t, index) => {
                return <Image src={'https://i.pravatar.cc/150?u=a042581f4e29026704d'} alt='' className='rounded-xl' width={150} height={150}></Image>
              })}
            </div>
          </div>
          <div className='bg-neutral-300/20 text-gray-500/70 dark:text-gray-500 rounded-md p-1 mt-1'>{data.text}</div>

        </div>

        <Image onClick={openModal} className={`w-10 h-10 cursor-pointer absolute top-0 ${data.sender !== address ? 'right-0' : 'left-0'}  group-hover:visible invisible`} src='/emoji.svg' alt='' width={20} height={20}></Image>
        <div onClick={() => { setReplyMessage({ text: data.text, txHash: '0x00002' }) }} className={`w-10 h-10 cursor-pointer absolute top-10 ${data.sender !== address ? 'right-0' : 'left-0'}  group-hover:visible invisible`}>
          <ReplyIcon fill={handleFillColor()}></ReplyIcon>
        </div>

      </div>

    </div>
    <EmojiDialog isOpen={isOpen} closeModal={closeModal} selectedOK={x => selectedOK(x)} type='emoji' />
  </div >
}
