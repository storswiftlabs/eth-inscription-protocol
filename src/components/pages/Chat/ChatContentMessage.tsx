'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { EmojiDialog } from './EmojiDialog'
import { ReplyIcon } from './Icons'
import { FillColor } from '@/type/Chat'
import type { ChatContentMessageType, ProfileResponse } from '@/type/Chat'
import { useChatMessageReply } from '@/store/useChatMessage'
import { getMessageWith, getProfile } from '@/utils/requestApi'

export function ChatContentMessage({ data }: { data: ChatContentMessageType }) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const { address, isConnected } = useAccount()
  const [withMessageData, setWithMessageData] = useState<ProfileResponse>()
  const [profileData, setProfileData] = useState<ProfileResponse>()
  const setReplyMessage = useChatMessageReply(state => state.setReplyMessage)
  const Router = useRouter()
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
    setWithMessageData(undefined)
  }, [data])
  useEffect(() => {
    (async () => {
      setProfileData(await getProfile(data.sender))
    })()
    if (data.with !== '') {
      (async () => {
        if (window.location.search === '?type=group')
          setWithMessageData(await getMessageWith(data.with, 'group_message'))
        if (window.location.search === '?type=message')
          setWithMessageData(await getMessageWith(data.with, 'message'))
      })()
    }
  }, [])

  return <div className={`min-h-[100px] w-full flex ${data.sender !== address ? 'justify-start' : 'justify-end'}`} >
    <div className={`flex m-4  ${data.sender !== address ? '' : 'flex-row-reverse'}`}>
      {profileData && profileData?.image?.length > 0 && profileData?.image[0] !== 'ipfs://test' ? <img src={profileData?.image[0]} alt='' className='w-10 h-10 m-1 rounded-lg' /> : <div className={'relative w-10 m-2  h-10 rounded-xl bg-neutral-200 dark:bg-neutral-500'} />}
      <div className={`flex flex-col ${data.sender !== address ? '' : 'items-end'} group relative`}>
        {profileData?.text}
        <div className='max-w-[800px] text-sm'>
          <div className={`rounded-xl p-2   ${data.sender !== address ? 'bg-neutral-200 dark:bg-neutral-700' : 'bg-green-300 dark:bg-[#48BD67]'}`}>
            <div>
              {data.text}
            </div>
            {data?.image?.length > 1 && <br />}
            <div className='flex gap-2 flex-wrap'>
              {data?.image?.map((t, index) => {
                return <Image src={'https://i.pravatar.cc/150?u=a042581f4e29026704d'} alt='' className='rounded-xl' width={150} height={150}></Image>
              })}
            </div>
          </div>
          {withMessageData?.text && <div className='bg-neutral-300/20 text-gray-500/70 dark:text-gray-500 rounded-md p-1 mt-1'>{withMessageData?.text}</div>}

        </div>

        <Image onClick={() => Router.push(`https://etherscan.io/tx/${data.trxHash}`)} className={`w-10 h-10 cursor-pointer absolute top-10 ${data.sender !== address ? 'right-[-10px]' : 'left-0'}  group-hover:visible invisible`} src='/Ethereum.svg' alt='' width={20} height={20}></Image>
        <div onClick={() => { setReplyMessage({ text: data.text, txHash: data.trxHash }) }} className={`w-7 h-7 cursor-pointer absolute top-0 ${data.sender !== address ? 'right-0' : 'left-0'}  group-hover:visible invisible`}>
          <ReplyIcon fill={handleFillColor()}></ReplyIcon>
        </div>

      </div>

    </div>
    <EmojiDialog isOpen={isOpen} closeModal={closeModal} selectedOK={x => selectedOK(x)} type='emoji' />
  </div >
}
