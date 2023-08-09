import { Input } from '@nextui-org/react'
import Image from 'next/image'
import { useWalletClient } from 'wagmi'
import GroupMember from './GroupMumber'
import { ItemType } from '@/utils/InterfaceType'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'
import { AbbreviatedText } from '@/utils/AbbreviatedText'

export function ChatHeader({ title }: { title: string }) {
  const { data: walletClient } = useWalletClient()
  const { sendTransaction } = useSendMessageToChain({ type: ItemType.update_group_del, title, receiver: [walletClient?.account.address as string] })

  const handleLeaveGroup = () => {
    sendTransaction()
  }
  return <div className="w-full flex items-center p-4 h-[100px] flex justify-between">
        <h1 className="text-xl font-bold">💬 #{AbbreviatedText(title.toUpperCase())}</h1>
        <div className='flex items-center'>
            <Input clearable placeholder="History Message" initialValue="" />
            <GroupMember />
            <Image onClick={handleLeaveGroup} src='/leave.svg' className='cursor-pointer' alt={''} width={20} height={20} ></Image>
        </div>

    </div>
}
