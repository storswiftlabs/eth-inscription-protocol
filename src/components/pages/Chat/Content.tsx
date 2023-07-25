import { useEffect, useRef } from 'react'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import { ChatContentMessage } from './ChatContentMessage'

interface ContentData {
  type: string
}
export function ChatContent({ type }: ContentData) {
  const messageRef = useRef<HTMLDivElement | undefined>()
  useEffect(() => {
    scrollToBottom()
  }, [])

  function scrollToBottom() {
    if (messageRef.current)
      messageRef.current.scrollTop = messageRef.current.scrollHeight
  }

  return (
    <div className='w-full h-screen flex flex-col'>
      <ChatHeader />
      <div ref={messageRef as React.MutableRefObject<HTMLDivElement>} className="border border-neutral-300 dark:border-green-100 m-2 rounded-xl flex-1 overflow-auto ">
        {Array.from(Array(10)).map((_, index) => {
          return <ChatContentMessage data={index} />
        })}
      </div>

      <ChatInput />
    </div>
  )
}
