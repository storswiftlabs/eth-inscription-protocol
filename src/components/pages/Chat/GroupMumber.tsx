import { Popover, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useGroupMember } from '@/store/useChatGroupMember'
import { getProfile } from '@/utils/api'
import { imageFormat } from '@/utils/imageFormat'
import { AbbreviatedText } from '@/utils/AbbreviatedText'

export default function GroupMember({ title }: { title: string }) {
  const [groupMemberAddress, setGroupMemberAddress] = useState<any[]>([])
  const [groupMember, setGroupMember] = useState<any[]>([])
  const GroupMemberList = useGroupMember(s => s.GroupMember)
  useEffect(() => {
    setGroupMemberAddress(GroupMemberList?.filter(t => t.title === decodeURIComponent(title))[0]?.receiver)
  }, [GroupMemberList])
  useEffect(() => {
    (async () => {
      setGroupMember(await Promise.all(groupMemberAddress?.map(item => getProfile(item).then(e => (e)))))
    })()
  }, [groupMemberAddress])

  return (
        <div className=" top-16 max-w-sm px-4">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'}
                `}
                        >
                            <div className='flex items-center ml-6 bg-slate-300/20 rounded-xl pr-2 cursor-pointer'>
                                <div className="flex items-center justify-between w-6 relative">
                                    <img
                                        src={imageFormat(groupMember[0]?.image[0])}
                                        className={'relative z-1 w-6 h-6 rounded-full'}
                                        alt=""
                                    />
                                    <img
                                        src={imageFormat(groupMember[1]?.image[0])}
                                        className={'absolute z-10 w-6 h-6 rounded-full -left-4'}
                                        alt=""
                                    />
                                    {groupMember[2]?.image[0]?.length > 0 && <img
                                        src={imageFormat(groupMember[2]?.image[0])}
                                        className={'absolute z-20 w-6 h-6 rounded-full -left-7'}
                                        alt=""
                                    />}
                                </div>

                                &nbsp; {groupMember?.length}
                            </div>

                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute shadow-xl overflow-y-scroll scroll-hide rounded-xl right-1/6 z-10 mt-3 max-h-[700px] w-[300px]  max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-8 grid-cols-1 bg-white p-7 lg:grid-cols-1">
                                        {groupMember?.map(item => (
                                            <a
                                                key={item.sender}
                                                href={`/chat/${item.sender}?type=message`}
                                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            >
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                                    <img src={imageFormat(item?.image[0])} alt='' className='w-10 h-10 m-1 rounded-lg' />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {item.text}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {AbbreviatedText(item.sender)}
                                                    </p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div >
  )
}
