'use client'
import Image from 'next/image'
import { useState } from 'react'
import { EmojiDialog } from './EmojiDialog'
import type { ChatContentMessageType } from '@/type/Chat'

export function ChatContentMessage({ data, me }: { data: ChatContentMessageType; me: number }) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  function selectedOK(selected: string) {
    closeModal()
  }

  return <div className={`min-h-[100px] w-full flex ${me % 2 === 1 ? 'justify-start' : 'justify-end'}`} >
        <div className={`flex m-4  ${me % 2 === 1 ? '' : 'flex-row-reverse'}`}>
            <div className="relative w-10 m-2  h-10 rounded-xl bg-neutral-200 dark:bg-neutral-500" />
            <div className={`flex flex-col ${me % 2 === 1 ? '' : 'items-end'} group relative`}>
                Nick
                <div className={`max-w-[800px] rounded-xl p-2  text-sm ${me % 2 === 1 ? 'bg-neutral-200 dark:bg-neutral-700' : 'bg-green-300 dark:bg-[#48BD67]'}`}>
                    <div>
                        {data.text}
                    </div>
                    <br />
                    <div className='flex gap-2 flex-wrap'>
                        {data.image.map((t, index) => {
                          return <Image src={t} alt='' className='rounded-xl' width={150} height={150}></Image>
                        })}
                    </div>
                </div>

                <Image onClick={openModal} className={`w-10 h-10 cursor-pointer absolute top-0 ${me % 2 === 1 ? 'right-0' : 'left-0'}  group-hover:visible invisible`} src='/emoji.svg' alt='' width={20} height={20}></Image>
                <Image onClick={() => { }} className={`w-10 h-10 cursor-pointer absolute top-10 ${me % 2 === 1 ? 'right-0' : 'left-0'}  group-hover:visible invisible`} src='/reply.svg' alt='' width={20} height={20}></Image>

            </div>

        </div>
        <EmojiDialog isOpen={isOpen} closeModal={closeModal} selectedOK={x => selectedOK(x)} type='emoji' />
    </div >
}
