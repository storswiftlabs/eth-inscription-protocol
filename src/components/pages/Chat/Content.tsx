import { useEffect, useRef, useState } from 'react'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import { ChatContentMessage } from './ChatContentMessage'
import { getChatGeneral } from '@/utils/requestApi'
import type { ChatContentMessageType } from '@/type/Chat'

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
      setMessageData(await getChatGeneral())
    })()
  }, [])
  return (
    <div className='w-full h-screen flex flex-col'>
      <ChatHeader />
      <div ref={messageRef as React.MutableRefObject<HTMLDivElement>} className="border border-neutral-200 dark:border-neutral-700 content-border m-2 rounded-xl flex-1 overflow-auto ">
        {messageData.map((t, index) => {
          return <ChatContentMessage data={t} me={index} />
        })}
      </div>

      <ChatInput />
    </div>
  )
}
