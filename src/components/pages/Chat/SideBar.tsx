import Image from 'next/image'
import Link from 'next/link'
import '@/style/chat.css'
import { ThemeProvider } from 'next-themes'

export function ChatSideBar({ path = 'general' }) {
  return <ThemeProvider attribute='class'>
        <div className="inscription-chat-font flex flex-col justify-start items-center w-[300px] h-full p-4 border-x border-gray-200 dark:border-red-500">
            <div className=' w-full'>
                <h1 className='font-bold text-2xl mb-5 mt-10 text-center'>
                    Chat
                </h1>
                <div className='w-full flex justify-center flex-col'>

                    <Link href="/chat/general"> <div className={`m-2 rounded-lg p-2 ${path === 'general' ? 'bg-red-200 dark:bg-slate-300' : ''}`}> 💬 General</div></Link>
                    <Link href="/chat/group"><div className={`m-2 rounded-lg p-2 ${path === 'group' ? 'bg-red-200 dark:bg-slate-300' : ''}`}> 👥 Group</div></Link>
                </div>

            </div>
            <div className='  w-full '>
                <h1 className='font-bold text-2xl mb-5 mt-10 text-center'>
                    Messages
                </h1>
                <div className='w-full flex justify-center flex-col'>

                    <div className='flex'>&nbsp; <Image src='/logo.png' width={20} height={20} alt={''} />&nbsp; 0xEa...B65c</div>

                </div>

            </div>
        </div>
    </ThemeProvider>
}
