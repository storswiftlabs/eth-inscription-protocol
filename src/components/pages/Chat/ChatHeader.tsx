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
            {/* <div className='flex items-center m-4 bg-slate-300/20 rounded-md pr-2 cursor-pointer'>
                <div className="flex items-center justify-between w-12">
                    <div className="relative w-6 h-6 rounded-full bg-blue-500"></div>
                    <div className="relative w-6 h-6 rounded-full bg-green-500 -ml-6"></div>
                    <div className="relative w-6 h-6 rounded-full bg-red-500 -ml-6"></div>
                </div>

                &nbsp; 456
            </div> */}
            <GroupMember />
            <Image onClick={handleLeaveGroup} src='/leave.svg' className='cursor-pointer' alt={''} width={20} height={20} ></Image>
        </div>

    </div>
}
