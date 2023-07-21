import Image from 'next/image'
import Link from 'next/link'

export function ChatSideBar({ type = 'general' }) {
  return <div className="flex flex-col justify-start items-center w-[300px] h-full p-4 border-x border-gray-500">
        <div className='text-black dark:text-white w-full '>
            <h1 className='font-bold text-2xl mb-5 mt-10 text-center'>
                Chat
            </h1>
            <div className='w-full flex justify-center flex-col'>

                <Link href="/chat/general"> <div className={`m-2 rounded-lg p-2 ${type === 'general' ? 'bg-red-200' : ''}`}> 💬 General</div></Link>
                <Link href="/chat/group"><div className={`m-2 rounded-lg p-2 ${type === 'group' ? 'bg-red-200' : ''}`}> 👥 Group</div></Link>
            </div>

        </div>
        <div className=' text-black dark:text-white w-full '>
            <h1 className='font-bold text-2xl mb-5 mt-10 text-center'>
                Messages
            </h1>
            <div className='w-full flex justify-center flex-col'>

                <div className='flex'>&nbsp; <Image src='/logo.png' width={20} height={20} alt={''} />&nbsp; 0xEa...B65c</div>

            </div>

        </div>
    </div>
}
