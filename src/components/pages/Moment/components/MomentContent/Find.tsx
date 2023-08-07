'use client'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import DynamicCard from '../DynamicCard/DynamicCard'
import DialogueInput from '../DialogueInput'
import type { tweetSend } from '@/utils/InterfaceType'
import { ItemType } from '@/utils/InterfaceType'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'
import { getTweet } from '@/utils/api'
import { TweetType, WelcomeTweet } from '@/constant/Apits'
import Image from 'next/image'
import { getTimeDifference } from '@/utils/timedifference'

interface Props {
  isUpper: string // 判断是推荐 还是 关注 Recommendation 推荐  Follow 关注
}

interface objtyle {
  owner: string
  limit: number
  offset: number
}

function Find({ isUpper }: Props) {
  const [data1, setData] = useState([] as any[])
  const [ownerObj, setOwnerObj] = useState<objtyle>({
    owner: '',
    limit: 10,
    offset: 0
  })
  const [tweetList, setTweetList] = useState([] as WelcomeTweet[])
  const { address, isConnected } = useAccount()
  const [uploadData, setUploadData] = useState<tweetSend>({
    type: ItemType.tweet_send,
    title: '',
    text: 'shouci',
    image: ['1', '2'],
    at: ['12'],
    with: '123',
  })

  useEffect(() => {

    if (isUpper === 'Follow') {
      setTweetList([])
    } else {
      getTweetFunction(ownerObj)
    }

  }, [isUpper])

  const { data, isLoading, isSuccess, sendTransaction } = useSendMessageToChain(uploadData)

  if (!isConnected)
    alert('Please connect your wallet first')

  const closeHandler = (tweetSendArr: { image: string[]; text: string }) => {
    setUploadData({ ...uploadData, image: tweetSendArr.image, text: tweetSendArr.text })
    sendTransaction()
  }

  const getTweetFunction = async (obj: objtyle) => {

    try {
      const tweetData = await getTweet(obj)
      console.log(tweetData);

      setTweetList(tweetData.tweets)
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <DialogueInput isSuccess={isSuccess} closeHandler={closeHandler} />
      {
        tweetList.length <= 0 ? <div className='w-full h-full flex justify-center items-center flex-col'>
          <Image src='/no-data.svg' alt='' width={200} height={200}></Image>
          NO DATA
        </div> : tweetList.map((i, index) => {
          return (
            <DynamicCard
              item={i}
              key={index}
            />
          )
        })
      }



    </div>

  )
}

export default Find
