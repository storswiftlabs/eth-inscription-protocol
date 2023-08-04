import { useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import { ChatContentMessage } from './ChatContentMessage'
import type { ChatContentMessageType } from '@/type/Chat'
import { getMessageGroup, getMessagePerson } from '@/utils/requestApi'

interface ContentData {
  type: string
}
export function ChatContent({ type }: ContentData) {
  const messageRef = useRef<HTMLDivElement | undefined>()
  const [messageData, setMessageData] = useState<ChatContentMessageType[]>([])
  const { address, isConnected } = useAccount()

  useEffect(() => {
    scrollToBottom()
  }, [messageData])

  function scrollToBottom() {
    if (messageRef.current)
      messageRef.current.scrollTop = messageRef.current.scrollHeight + 100
  }

  useEffect(() => {
    (async () => {
      if (window.location.search === '?type=group')
        setMessageData((await getMessageGroup(type)).messages)

      if (window.location.search === '?type=message')
        setMessageData((await getMessagePerson(address!, type)).messages)
    })()
  }, [])

  return (
    <div className='w-full h-screen flex flex-col'>
      <ChatHeader title={type} />
      <div ref={messageRef as React.MutableRefObject<HTMLDivElement>} className="border border-neutral-200 dark:border-neutral-700 content-border m-2 rounded-xl flex-1 overflow-auto ">
        {messageData.length > 0
          ? messageData?.map((t, index) => {
            return <ChatContentMessage data={t} me={index} />
          })
          : <div className='w-full h-full flex justify-center items-center flex-col'>
            <Image src='/no-data.svg' alt='' width={200} height={200}></Image>
            NO DATA</div>}

      </div>

      <ChatInput type={type} />
    </div>
  )
}
