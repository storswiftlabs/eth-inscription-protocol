import { useEffect, useRef, useState } from 'react'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import { ChatContentMessage } from './ChatContentMessage'
import type { ChatContentMessageType } from '@/type/Chat'
import { getMessageGroup } from '@/utils/requestApi'

interface ContentData {
  type: string
}
export function ChatContent({ type }: ContentData) {
  const messageRef = useRef<HTMLDivElement | undefined>()
  const [messageData, setMessageData] = useState<ChatContentMessageType[]>([])
  useEffect(() => {
    scrollToBottom()
  }, [messageData])

  function scrollToBottom() {
    if (messageRef.current)
      messageRef.current.scrollTop = messageRef.current.scrollHeight
  }

  useEffect(() => {
    (async () => {
      if (window.location.search === '?type=group')
        setMessageData((await getMessageGroup()).messages)

      if (window.location.search === '?type=message')
        setMessageData((await getMessageGroup()).messages)
    })()
  }, [])

  return (
    <div className='w-full h-screen flex flex-col'>
      <ChatHeader title={type} />
      <div ref={messageRef as React.MutableRefObject<HTMLDivElement>} className="border border-neutral-200 dark:border-neutral-700 content-border m-2 rounded-xl flex-1 overflow-auto ">
        {messageData?.map((t, index) => {
          return <ChatContentMessage data={t} me={index} />
        })}
      </div>

      <ChatInput type={type} />
    </div>
  )
}
