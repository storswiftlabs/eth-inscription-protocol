import { useEffect, useState } from 'react'
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
import { formatNumber } from '@/utils/AbbreviatedText'
import copy from 'copy-to-clipboard';
import { useHandleNotify } from '@/hooks/useNotify'


/**
 * @WhatsHappening - 动态内容卡片组件
 * @param {WelcomeTweet} props.item - 发布内容对象
 */

interface Props {
  item: WelcomeTweet
}

export default function DynamicCard({ item }: Props) {
  const { handleNewNotification } = useHandleNotify()
  const router = useRouter()
  const { profile, tweet } = item
  const [likeData, setUpLikeData] = useState<tweetLike>({
    type: ItemType.tweet_like,
    with: '',
  })

  const { data, isLoading, isSuccess, sendTransaction } = useSendMessageToChain(likeData)

  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  /**
   * 执行点赞操作或取消点赞操作
   * @param likeBool - 点赞或取消点赞的布尔值 如果 为true 代表要取消点赞 fales 反之
   */
  const likeFunction = (likeBool: boolean) => {
    const type = likeBool ? ItemType.un_like : ItemType.tweet_like;
    // 设置点赞数据
    setUpLikeData({ type, with: item.tweet.trxHash, });
  };

  useEffect(() => {
    likeData.with !== '' && sendTransaction();
  }, [likeData])


  const onFindformation = (item: WelcomeTweet) => {
    router.push(`${tweet.trxHash}`)
  }

  console.log(tweet.trxTime,'tweet.trxTime');
  
  console.log(getTimeDifference(tweet.trxTime),'getTimeDifference(tweet.trxTime)',tweet.trxTime);
  

  return (
    <div onClick={() => onFindformation(item)} className="DynamicCard-grid max-h-[37.5rem]  bg-[#f7f9f9] dark:bg-[#1e1e1e] hover:bg-[#edecf3] dark:hover:bg-[#262626]" >
      {isSuccess ? <Notifications data={data?.hash} /> : null}
      <img src={imageFormat(profile.image[0])} alt={''} width={35} height={35} ></img>
      <div className="flex ju367v10 w-[90%]">
        <div className=' w-full'>
          <div className="flex mb-1 gap-4">
            <span className='hover:underline text-[.8rem]' onClick={e => e.stopPropagation()}>{profile.text}</span>
            <span>·</span>
            <span className=' ml-[-.6rem]'>{getTimeDifference(tweet.trxTime)}</span>
          </div>
          {tweet.title && <h2 className=' text-[1.2rem]'>{tweet.title}</h2>}
          <div className="overflow-hidden overflow-ellipsis line-clamp-3 mb-2 ">
            <span>{tweet.text}</span>
            {
              tweet.at.map((m, h) => (
                <a className=' ml-4 text-[#51b2f3] hover:underline' href="#">{`@${m}`}</a>
              ))
            }
          </div>
          <div className='max-h-[22rem] overflow-hidden'>
            {
              tweet.image.slice(0, 3).map((i, j) => {
                return (
                  <div className=' w-full max-h-[20rem] overflow-hidden py-[0.5rem]' >
                    <img className='w-full h-full' src={imageFormat(i)} alt="" />
                  </div>
                )
              })
            }
          </div>
          <br />
          <div className="border-[1px] mb-4 border-[#cfd9de] dark:border-[#404040]"></div>
          <div className='text-[#536471] h-8' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='flex gap-1'><MessagesIcon fill={handleFillColor()} />
              {formatNumber(item.comments.length)}
            </div>
            <div className='flex gap-1' onClick={(e) => {
              e.stopPropagation()
              likeFunction(item.likeBool)
            }}>
              {item.likeBool ? <ILoveIcon fill={handleFillColor()} /> : <LoveIcon fill={handleFillColor()} />}
              {formatNumber(Number(item.likeNum))}
            </div>
            <div onClick={(e) => {
              e.stopPropagation()
              const herf = window.location.href
              const parts = herf.split('/')
              parts[parts.length - 1] = `${item.tweet.trxHash}`;
              let newUrl = parts.join("/");
              copy(newUrl)
              handleNewNotification('success', 'Success , Share It With Your Friends', 'Success')
            }}>
              <ShareIcon fill={handleFillColor()} />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
