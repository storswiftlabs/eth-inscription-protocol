import { useCallback, useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import { Loading } from '@nextui-org/react'
import { ChatHeader } from './ChatHeader'
import { ChatInput } from './ChatInput'
import { ChatContentMessage } from './ChatContentMessage'
import type { ChatContentMessageType } from '@/type/Chat'
import { getMessageGroup, getMessagePerson } from '@/utils/requestApi'

interface ContentData {
  type: string
}
export function ChatContent({ type }: ContentData) {
  const messageRef = useRef<HTMLDivElement | undefined>()
  const limit = useState(10)[0]
  const [offset, setOffset] = useState(0)
  const [messageData, setMessageData] = useState<ChatContentMessageType[]>([])
  const [newMessageData, setNewMessageData] = useState<ChatContentMessageType[]>([])
  const [loadingMessage, setLoadingMessage] = useState(false)
  const [scrollToBottomOnFirstLoad, setScrollToBottomOnFirstLoad] = useState(true)

  const { address } = useAccount()
  const timer = useRef<any>()

  useEffect(() => {
    if (messageData.length === 10)
      scrollToBottomOnFirstLoad && scrollToBottom()
  }, [messageData])

  function scrollToBottom() {
    if (messageRef.current)
      messageRef.current.scrollTop = messageRef.current.scrollHeight + 100
  }

  const getData = useCallback(async () => {
    if (window.location.search === '?type=group')
      setMessageData([...messageData, ...(await getMessageGroup(type, limit, offset)).messages])

    if (window.location.search === '?type=message')
      setMessageData([...messageData, ...(await getMessagePerson(address!, type, limit, offset)).messages])
  }, [])

  const getNewData = async () => {
    if (window.location.search === '?type=group')
      setNewMessageData((await getMessageGroup(type, limit, offset)).messages)

    if (window.location.search === '?type=message')
      setNewMessageData((await getMessagePerson(address!, type, limit, offset)).messages)
  }
  useEffect(() => {
    if (newMessageData.length > 0) {
      const newData = (newMessageData.filter(t => Number(t.height) > Number(messageData[messageData.length - 1].height)))
      setMessageData([...messageData, ...newData])
    }
  }, [newMessageData])
  function checkVisibilityAndRequest() {
    if (document.visibilityState === 'visible')
      timer.current = setInterval(() => getNewData(), 5000)
    else
      clearInterval(timer.current)
  }

  const handleScroll = async () => {
    if (messageRef.current?.scrollTop === 0) {
      setLoadingMessage(true)
      if (window.location.search === '?type=group') {
        setMessageData([...(await getMessageGroup(type, limit, messageData.length)).messages, ...messageData])
        setLoadingMessage(false)
        setScrollToBottomOnFirstLoad(false)
      }

      if (window.location.search === '?type=message') {
        setMessageData([...(await getMessagePerson(address!, type, limit, messageData.length)).messages, ...messageData])
        setLoadingMessage(false)
        setScrollToBottomOnFirstLoad(false)
      }
    }
  }
  useEffect(() => {
    getData()
    document.addEventListener('visibilitychange', checkVisibilityAndRequest)
  }, [])

  return (
    <div className='w-full h-screen flex flex-col'>
      <ChatHeader title={type} />
      <div ref={messageRef as React.MutableRefObject<HTMLDivElement>} onScroll={handleScroll} className="border border-neutral-200 dark:border-neutral-700 content-border m-2 rounded-xl flex-1 overflow-auto ">
        {loadingMessage && <div className='w-full flex items-center justify-center my-4'>
          <Loading />
        </div>}
        {messageData.length > 0
          ? messageData?.map((t) => {
            return <ChatContentMessage data={t} />
          })
          : <div className='w-full h-full flex justify-center items-center flex-col'>
            <Image src='/no-data.svg' alt='' width={200} height={200}></Image>
            NO DATA</div>}
      </div>

      <ChatInput type={type} />
    </div>
  )
}
