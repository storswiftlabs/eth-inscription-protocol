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
  const limit = useState(5)[0]
  const [offset, setOffset] = useState(0)
  const [messageData, setMessageData] = useState<ChatContentMessageType[]>([])
  const { address } = useAccount()
  const timer = useRef<any>()

  useEffect(() => {
    if (messageData.length === 5)
      scrollToBottom()
  }, [messageData])

  function scrollToBottom() {
    if (messageRef.current)
      messageRef.current.scrollTop = messageRef.current.scrollHeight + 100
  }
  const getData = async () => {
    if (window.location.search === '?type=group') {
      setMessageData([...messageData, ...(await getMessageGroup(type, limit, offset)).messages])
      scrollToBottom()
    }

    if (window.location.search === '?type=message')
      setMessageData([...messageData, ...(await getMessagePerson(address!, type)).messages])
  }
  function checkVisibilityAndRequest() {
    if (document.visibilityState === 'visible')
      timer.current = setInterval(() => getData(), 10000)
    // 在这里执行您的请求操作

    else
      clearInterval(timer.current)
  }

  const handleScroll = async () => {
    if (messageRef.current?.scrollTop === 0) {
      if (window.location.search === '?type=group')
        setMessageData([...(await getMessageGroup(type, limit, messageData.length)).messages, ...messageData])

      if (window.location.search === '?type=message')
        setMessageData([...(await getMessagePerson(address!, type)).messages, ...messageData])
    }
  }
  useEffect(() => {
    getData()

    document.addEventListener('visibilitychange', checkVisibilityAndRequest)
  }, [])

  return (
    <div className='w-full h-screen flex flex-col'>
      <ChatHeader title={type} />
      <div ref={messageRef as React.MutableRefObject<HTMLDivElement>} onScroll={handleScroll} className="border border-neutral-200 dark:border-neutral-700 content-border m-2 rounded-xl flex-1 overflow-auto ">
        {messageData.length > 0
          ? messageData?.map((t) => {
            return <ChatContentMessage data={t} />
          })
          : <div className='w-full h-full flex justify-center items-center flex-col'>
            <Image src='/no-data.svg' alt='' width={200} height={200}></Image>
            NO DATA</div>}

      </div>

      <ChatInput type={type} />
    </div>
  )
}
