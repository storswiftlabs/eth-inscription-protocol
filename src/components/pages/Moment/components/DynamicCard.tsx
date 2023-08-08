import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { ILoveIcon, LoveIcon, MessagesIcon, ShareIcon } from './Icons'
import { FillColor } from '@/type/Moment'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'
import type { tweetLike } from '@/utils/InterfaceType'
import { ItemType } from '@/utils/InterfaceType'
import type { WelcomeTweet } from '@/constant/Apits'
import { getTimeDifference } from '@/utils/timedifference'
import { imageFormat } from '@/utils/imageFormat'

/**
 * @WhatsHappening - 动态内容卡片组件
 * @param {WelcomeTweet} props.item - 发布内容对象
 */

interface Props {
  item: WelcomeTweet
}

export default function DynamicCard({ item }: Props) {
  const router = useRouter()
  const { profile, tweet } = item
  const [likeData, setUpLikeData] = useState<tweetLike>({
    type: ItemType.tweet_like,
    with: item.with.trxHash,
  })

  const { data, isLoading, isSuccess, sendTransaction } = useSendMessageToChain(likeData)

  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  const likeFunction = () => {
    if (sendTransaction)
      sendTransaction()
  }

  const onFindformation = (item: WelcomeTweet) => {
    router.push(`${tweet.trxHash}`)
  }

  return (
    <div onClick={() => onFindformation(item)} className="DynamicCard-grid bg-[#f7f9f9] dark:bg-[#1e1e1e] hover:bg-[#edecf3] dark:hover:bg-[#262626]" >
      <img src={imageFormat(profile.image[0])} alt={''} width={35} height={35} ></img>
      <div className="flex ju367v10 w-full">
        <div className=' w-full'>
          <div className="flex mb-1 gap-4">
            <span className='hover:underline text-[.8rem]' onClick={e => e.stopPropagation()}>{profile.text}</span>
            <span>·</span>
            <span className=' ml-[-.6rem]'>{getTimeDifference(tweet.trxTime)}</span>
          </div>
          {tweet.title && <h2 className=' text-[1.2rem]'>{tweet.title}</h2>}
          <div className="overflow-hidden overflow-ellipsis line-clamp-3 mb-2">
            {tweet.text}
          </div>
          {
            tweet.image.map((i, j) => {
              return (
                <div className=' w-full' >
                  <img className='w-full' src={imageFormat(i)} alt="" />
                </div>
              )
            })
          }
          <br />
          <div className="border-[1px] mb-4 border-[#cfd9de] dark:border-[#404040]"></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ShareIcon fill={handleFillColor()} />
            <MessagesIcon fill={handleFillColor()} />
            <div onClick={(e) => {
              e.stopPropagation()
              likeFunction()
            }}>
              {item.likeBool ? <ILoveIcon fill={handleFillColor()} /> : <LoveIcon fill={handleFillColor()} />}
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}
