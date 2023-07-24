import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'

interface ContentData {
  type: string
}
export function ChatContent({ type }: ContentData) {
  return (
    <div className='w-full h-screen flex flex-col'>
      <ChatHeader />
      <div className="border border-green-100 m-2 rounded-xl flex-1 ">
        {type}

      </div>
      <ChatInput />
    </div>
  )
}
