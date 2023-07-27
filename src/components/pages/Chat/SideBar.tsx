import { Collapse } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export function ChatSideBar({ path = 'general' }) {
  return <div className="flex flex-col justify-start items-center w-[300px] h-full bg-white dark:bg-black p-4 border-x dark:text-white border-gray-200 dark:border-gray-700">
        <div className=' w-full'>
            <h1 className='font-bold text-2xl mb-5 mt-10 text-center'>
                Chat
            </h1>
            <div className='w-full flex justify-center flex-col'>
                <Link href="/chat/general"> <div className={`m-2 rounded-lg p-2 ${path === 'general' ? 'bg-red-200 dark:bg-slate-500/40' : ''}`}> 💬 General</div></Link>
                <Collapse

                    css={{ border: 'none', padding: '0 16px' }}
                    title={<div className='text-black dark:text-white'>👥 Group</div>}
                >
                    <Link href="/chat/group"><div className={`m-2 rounded-lg p-2 ${path === 'group' ? 'bg-red-200 dark:bg-slate-500/40' : ''}`}> 👥 Group</div></Link>

                </Collapse>
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
}
