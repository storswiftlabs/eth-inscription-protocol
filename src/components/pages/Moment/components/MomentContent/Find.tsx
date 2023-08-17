'use client'
// eslint-disable-next-line no-console
import React, { useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import DynamicCard from '../DynamicCard'
import DialogueInput from '../DialogueInput'
import type { tweetSend } from '@/utils/InterfaceType'
import { ItemType } from '@/utils/InterfaceType'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'
import { getFollowTweet, getTweet } from '@/utils/api'
import type { WelcomeTweet } from '@/constant/Apits'
import { Loading } from '@nextui-org/react'
import { FillColor } from '@/type/Chat'
import { useTheme } from 'next-themes'
import { Notifications } from '@/components/Notifications'

interface Props {
  isUpper: string // 判断是推荐 还是 关注 Recommendation 推荐  Follow 关注
}

interface objtyle {
  owner: `0x${string}` | undefined
  limit: number
  offset: number
}

interface tweetSendType {
  image?: string[]
  text: string
  at?: string[]
}

function Find({ isUpper }: Props) {
  const { address, isConnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [ownerObj, setOwnerObj] = useState<objtyle>({
    owner: address,
    limit: 4,
    offset: 0,
  })
  const { theme } = useTheme()

  const resRef = useRef<any>({});
  const [tweetList, setTweetList] = useState([] as WelcomeTweet[])
  const [follow, setFollow] = useState([] as WelcomeTweet[])
  const [uploadData, setUploadData] = useState<tweetSend>({
    type: ItemType.tweet_send,
    text: '',
  })

  const { data, isLoading, isSuccess, sendTransaction } = useSendMessageToChain(uploadData)

  if (!isConnected)
    typeof window !== 'undefined' && alert('Please connect your wallet first')

  useEffect(() => {

    let timer: string | number | NodeJS.Timeout | undefined;
    var element = document.getElementById('gund');

    function handleScroll() {
      // 清除之前的计时器
      clearTimeout(timer);
      // 开始一个新的计时器
      timer = setTimeout(() => {
        // 获取页面高度
        const windowHeight = window.innerHeight;
        // 获取文档高度
        const documentHeight = document.documentElement.scrollHeight;
        // 获取滚动位置
        const scrollPosition = window.scrollY;

        // 判断是否接近页面底部
        if (documentHeight - scrollPosition <= windowHeight + 100 && resRef.current.a) {
          // 接近页面底部，增加 offset 值
          setPage((page) => page + 1)
        }
      }, 1500); // 设置延迟时间为1秒
    }


    // 监听滚动事件
    element && element.addEventListener('scroll', handleScroll);

    // 在组件卸载时移除滚动事件监听器
    return () => {
      clearTimeout(timer); // 清除计时器
      element && element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setOwnerObj({ ...ownerObj, offset: page * ownerObj.limit })
  }, [page])

  useEffect(() => {
    uploadData.text !== '' && sendTransaction()
  }, [uploadData])

  const getTweetFunction = async (obj: objtyle) => { // 获取 recommendation 数据
    setLoading(true)
    resRef.current.a = false
    try {
      const tweetData = await getTweet(obj)
      if (tweetData.tweets.length <= 0) { // 代表没有数据了
        setLoading(false)
        return
      } else {
        setTweetList([...tweetList, ...tweetData.tweets])
        resRef.current.a = true
      }
    }
    catch (error) {
      resRef.current.a = true
      console.log(error)
    }
  }

  const getFollowTweetFun = async (obj: objtyle) => {
    setLoading(true)
    resRef.current.a = false
    try {
      setLoading(false)
      const user = await getFollowTweet(obj)
      if (user.tweets.length <= 0) {
        return
      } else {
        setFollow({ ...user.tweets, ...follow })
        resRef.current.a = true
      }
    }
    catch (error) {
      resRef.current.a = true
      console.log(error);
    }
  }

  useEffect(() => {
    resRef.current.a = true;
    if (isUpper === 'Follow')
      getFollowTweetFun(ownerObj)
    else
      getTweetFunction(ownerObj)
  }, [ownerObj.offset])

  const closeHandler = ({ image, text, at }: tweetSendType) => {
    setUploadData({ ...uploadData, image, text, at })
  }

  const renderContent = () => {
    if (isUpper === 'Follow') {
      if (follow.length <= 0) {
        return (
          <div className='w-full h-full flex justify-center items-center flex-col'>
            <Image src='/no-data.svg' alt='' width={200} height={200}></Image>
            NO DATA
          </div>
        );
      }
      return tweetList.map((i, index) => (
        <DynamicCard
          item={i}
          key={index}
        />
      ));
    } else {
      if (tweetList.length <= 0) {
        return (
          <div className='w-full h-full flex justify-center items-center flex-col'>
            <Image src='/no-data.svg' alt='' width={200} height={200}></Image>
            NO DATA
          </div>
        );
      }
      return tweetList.map((i, index) => (
        <DynamicCard
          item={i}
          key={index}
        />
      ));
    }
  }

  const isLoadingFun = (arr: any[]) => {
    if (arr.length > 0) {
      return loading && <div className=' flex justify-center items-center h-[4rem]'>
        <Loading css={{
          '._2': {
            bg: theme === 'dark' ? '#000' : '#fff'
          }
        }} type="gradient" size="lg" />
      </div>
    } else {
      return <div>
      </div>
    }
  }

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black
  return (
    <div style={{ width: '100%', overflow: 'hidden', height: '100%' }}>
      {isSuccess ? <Notifications data={data?.hash} /> : null}
      <DialogueInput bottonText={'Post'} isSuccess={isSuccess} closeHandler={closeHandler} />
      {renderContent()}
      {
        isUpper === 'Follow' ? isLoadingFun(follow) : isLoadingFun(tweetList)
      }
    </div>
  )
}

export default Find
