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
import { imageFormat } from '@/utils/imageFormat'
import { AbbreviatedText } from '@/utils/AbbreviatedText'

export function ChatContentMessage({ data }: {
  data: ChatContentMessageType | {
    text: string
    sender: string
    image: (File | string)[]
    with?: string
    trxHash?: string
  }
}) {
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
  function selectedOK(selected: string | { title: string; receiver: string }) {
    closeModal()
  }
  useEffect(() => {
    setWithMessageData(undefined)
  }, [data])
  useEffect(() => {
    (async () => {
      setProfileData(await getProfile(data.sender))
    })()
    if (data?.with !== '') {
      (async () => {
        if (window.location.search === '?type=group')
          setWithMessageData(await getMessageWith(data?.with ?? '', 'group_message'))
        if (window.location.search === '?type=message')
          setWithMessageData(await getMessageWith(data?.with ?? '', 'message'))
      })()
    }
  }, [])
  function generateNumberColor(number: number | string) {
    const colorClasses = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
      'bg-orange-500', 'bg-gray-500',
    ]
    if (typeof number === 'string')
      number = 0

    return colorClasses[number]
  }

  return <div className={`min-h-[100px] w-full flex ${data.sender !== address?.toUpperCase() ? 'justify-start' : 'justify-end'}`} >
    <div className={`flex m-4  ${data.sender !== address?.toUpperCase() ? '' : 'flex-row-reverse'}`}>
      {profileData && profileData?.image?.length > 0 && profileData?.image[0] !== '' && profileData?.image[0] !== 'ipfs://test' ? <img src={imageFormat(profileData?.image[0])} alt='' className='w-10 h-10 m-1 rounded-lg' /> : <div className={`relative w-10 m-2  h-10 rounded-xl ${generateNumberColor(Number(data?.sender.slice(-1)))}  dark:${generateNumberColor(Number(profileData?.sender.slice(-1)))}`} />}
      <div className={`flex flex-col ${data.sender !== address?.toUpperCase() ? '' : 'items-end'} group relative`}>
        {profileData?.text !== '' ? profileData?.text : <div className='text-gray-500/70 dark:text-gray-500'>{AbbreviatedText(data.sender)}</div>}
        <div className='max-w-[800px] text-sm'>
          <div className={`rounded-xl p-2   ${data.sender !== address?.toUpperCase() ? 'bg-neutral-200 dark:bg-neutral-700' : 'bg-green-300 dark:bg-[#48BD67]'}`}>
            <div>
              {data.text}
            </div>
            {data?.image?.length >= 1 && data?.image[0] !== '' && <br />}
            <div className='flex gap-2 flex-wrap'>
              {data?.image?.map((t) => {
                return t !== '' && <img src={typeof t === 'string' ? imageFormat(t) : ''} alt='' className='rounded-xl' width={150} height={150}></img>
              })}
            </div>
          </div>
          {withMessageData?.text && <div className='bg-neutral-300/20 text-gray-500/70 dark:text-gray-500 rounded-md p-1 mt-1'>{withMessageData?.text}</div>}

        </div>
        {data?.trxHash && <>
          <Image onClick={() => Router.push(`https://etherscan.io/tx/${data.trxHash}`)} className={`w-10 h-10 cursor-pointer absolute top-10 ${data.sender !== address?.toUpperCase() ? 'right-[-10px]' : 'left-0'}  group-hover:visible invisible`} src='/Ethereum.svg' alt='' width={20} height={20}></Image>
          <div onClick={() => { setReplyMessage({ text: data.text, txHash: data.trxHash ?? '' }) }} className={`w-7 h-7 cursor-pointer absolute top-0 ${data.sender !== address?.toUpperCase() ? 'right-0' : 'left-0'}  group-hover:visible invisible`}>
            <ReplyIcon fill={handleFillColor()}></ReplyIcon>
          </div>
        </>}

      </div>

    </div>
    <EmojiDialog isOpen={isOpen} closeModal={closeModal} selectedOK={x => selectedOK(x)} type='emoji' />
  </div >
}
