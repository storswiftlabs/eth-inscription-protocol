import { useEffect, useRef } from 'react'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import type { ChatContentMessageType } from '@/type/Chat'

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
  const ChatContentMessage = ({ data }: ChatContentMessageType) => {
    return <div className={`min-h-[100px] w-full flex ${data % 2 === 1 ? 'justify-start' : 'justify-end'}`} >
      <div className={`flex m-4  ${data % 2 === 1 ? '' : 'flex-row-reverse'}`}>
        <div className="relative w-10 m-2 h-10 rounded-xl bg-neutral-500" />
        <div className={`flex flex-col ${data % 2 === 1 ? '' : 'items-end'}`}>
          Nick
          <div className='max-w-[800px] rounded-xl p-2 bg-neutral-700'>
            NextUI needs to be wrapped in a provider to work properly. You need to set up the NextUIProvider at the root of your application.

            Go to pages/_app.js or pages/_app.tsx (create it if it doesn't exist) and add the following code:</div>
        </div>
      </div>

    </div >
  }
  return (
    <div className='w-full h-screen flex flex-col'>
      <ChatHeader />
      <div ref={messageRef as React.MutableRefObject<HTMLDivElement>} className="border border-green-100 m-2 rounded-xl flex-1 overflow-auto ">
        {Array.from(Array(10)).map((_, index) => {
          return <ChatContentMessage data={index} />
        })}
      </div>
      <ChatInput />
    </div>
  )
}
