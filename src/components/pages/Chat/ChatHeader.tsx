import { Input } from '@nextui-org/react'
import Image from 'next/image'

export function ChatHeader() {
  return <div className="w-full flex items-center p-4 h-[100px] flex justify-between">
        <h1 className="text-xl font-bold">💬 #General</h1>
        <div className='flex items-center'>
            <Input clearable placeholder="History Message" initialValue="Search" />
            <div className='flex items-center m-4 bg-slate-300/20 rounded-md pr-2 cursor-pointer'>
                <div className="flex items-center justify-between w-12">
                    <div className="relative w-6 h-6 rounded-full bg-blue-500"></div>
                    <div className="relative w-6 h-6 rounded-full bg-green-500 -ml-6"></div>
                    <div className="relative w-6 h-6 rounded-full bg-red-500 -ml-6"></div>
                </div>

                &nbsp; 456
            </div>
            <Image src='/leave.svg' alt={''} width={20} height={20} ></Image>
        </div>

    </div>
}
