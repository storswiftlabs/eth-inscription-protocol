'use client'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import DynamicCard from '../DynamicCard/DynamicCard'
import DialogueInput from '../DialogueInput'
import type { tweetSend } from '@/utils/InterfaceType'
import { ItemType } from '@/utils/InterfaceType'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'

interface Props {
  isUpper: string // 判断是推荐 还是 关注 Recommendation 推荐  Follow 关注
}

function Find({ isUpper }: Props) {
  const [data1, setData] = useState([] as any[])
  const { address, isConnected } = useAccount()
  const [uploadData, setUploadData] = useState<tweetSend>({
    type: ItemType.tweet_send,
    title: '',
    text: 'shouci',
    image: ['1', '2'],
    at: ['12'],
    with: '123',
  })

  // const { data: walletClient } = useWalletClient()

  useEffect(() => {

    // getMessageWindow({ owner: '123', to: "123", limit: 0, offset: 10 }).then((res) => {
    //   console.log(res, 'getMessageWindow');

    // }).catch((err) => { })

    // if (isUpper === 'Recommendation')
    //   setData([1, 2, 3])

    // else
    //   setData([4, 5, 6])
  }, [isUpper])

  const { data, isLoading, isSuccess, sendTransaction } = useSendMessageToChain(uploadData)

  if (!isConnected)
    alert('Please connect your wallet first')

  const closeHandler = (tweetSendArr: { image: string[]; text: string }) => {
    setUploadData({ ...uploadData, image: tweetSendArr.image, text: tweetSendArr.text })
    sendTransaction()
  }

  // console.log(uploadData, '123')
  // console.log(data, '123')
  // console.log(isSuccess, 'isSuccess')
  const text = ' Playing the guitar has also taught me discipline and patience Learning new chords and songs takes time and practice.Its aconstant journey of improvement.When I finally master adifficult1difficult1difficult1difficult1difficult1difficult1123'

  const toux = 'https://console.xyz/cdn-cgi/image/width=40,height=40,fit=crop,quality=75,dpr=2/https://images.gamma.io/ipfs/Qmb84UcaMr1MUwNbYBnXWHM3kEaDcYrKuPWwyRLVTNKELC/3066.png'

  const image = 'https://pbs.twimg.com/semantic_core_img/1376695792417693699/hpBiuH-q?format=jpg&name=360x360'
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <DialogueInput isSuccess={isSuccess} closeHandler={closeHandler} />
      {data1.map((i, index) => (
        <DynamicCard
          key={index}
          img={image}
          text={text}
          time={`${i}h`}
          name={`Mewtru tuiie ${i}`}
          avatar={toux}
        />
      ))}
    </div>

  )
}

export default Find
