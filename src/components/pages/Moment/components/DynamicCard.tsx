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
import { Notifications } from '@/components/Notifications'

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

  /**
   * 执行点赞操作或取消点赞操作
   * @param likeBool - 点赞或取消点赞的布尔值
   */
  const likeFunction = (likeBool: boolean) => {
    if (!sendTransaction) return;

    const type = likeBool ? ItemType.follow_unfollow : ItemType.tweet_like;
    // 设置点赞数据
    setUpLikeData({
      type,
      with: item.with.trxHash,
    });

    sendTransaction();
  };


  const onFindformation = (item: WelcomeTweet) => {
    router.push(`${tweet.trxHash}`)
  }



  return (
    <div onClick={() => onFindformation(item)} className="DynamicCard-grid bg-[#f7f9f9] dark:bg-[#1e1e1e] hover:bg-[#edecf3] dark:hover:bg-[#262626]" >
      {isSuccess ? <Notifications data={data?.hash} /> : null}
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
            <span>{tweet.text}</span>
            {
              tweet.at.map((m, h) => (
                <a className=' ml-4 text-[#51b2f3] hover:underline' href="#">{`@${m}`}</a>
              ))
            }
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
              likeFunction(item.likeBool)
            }}>
              {item.likeBool ? <ILoveIcon fill={handleFillColor()} /> : <LoveIcon fill={handleFillColor()} />}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
