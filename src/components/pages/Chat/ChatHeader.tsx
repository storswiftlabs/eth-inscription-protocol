import { Input } from '@nextui-org/react'
import Image from 'next/image'
import { useWalletClient } from 'wagmi'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import GroupMember from './GroupMumber'
import { AddGroupIcon } from './Icons'
import { EmojiDialog } from './EmojiDialog'
import type { updateGroupAdd, updateGroupDel } from '@/utils/InterfaceType'
import { ItemType } from '@/utils/InterfaceType'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'
import { AbbreviatedText } from '@/utils/AbbreviatedText'
import { FillColor } from '@/type/Chat'

export function ChatHeader({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: walletClient } = useWalletClient()
  const Router = useSearchParams()

  const [data, setData] = useState<updateGroupAdd | updateGroupDel>({ type: ItemType.update_group_add, title, receiver: [''] })
  const { theme } = useTheme()

  const { sendTransaction, isSuccess } = useSendMessageToChain(data)
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black
  function closeModal() {
    setIsOpen(false)
  }
  function openModal() {
    setIsOpen(true)
  }
  const handleLeaveGroup = () => {
    setData({ type: ItemType.update_group_del, title, receiver: [walletClient?.account.address as string] })
  }
  function selectedOK(selected: string) {
    setData({ type: ItemType.update_group_add, title, receiver: [selected] })
    closeModal()
  }
  useEffect(() => {
  }, [walletClient])
  useEffect(() => {
    data.receiver[0].length > 0 && sendTransaction()
  }, [data])
  useEffect(() => {
    !isSuccess && setData({ type: ItemType.update_group_add, title, receiver: [''] })
  }, [isSuccess])
  return <div className="w-full flex items-center p-4 h-[100px] flex justify-between">
    <h1 className="text-xl font-bold">💬 #{AbbreviatedText(decodeURIComponent(title).toUpperCase())}</h1>
    {Router.toString() !== 'type=message'
      && <div className='flex items-center'>
        <Input clearable placeholder="History Message" initialValue="" />
        <GroupMember title={title} />
        {theme && <AddGroupIcon onClick={() => openModal()} fill={handleFillColor()} />}
        <Image onClick={handleLeaveGroup} src='/leave.svg' className='cursor-pointer ml-2' alt={''} width={20} height={20} ></Image>
        <EmojiDialog isOpen={isOpen} closeModal={closeModal} type={'addGroup'} selectedOK={x => selectedOK(x)} />

      </div>
    }

  </div>
}
