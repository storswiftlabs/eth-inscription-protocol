'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Col, Dropdown, Grid, Image, Pagination, Row, Spacer, Text, User } from '@nextui-org/react'
import { useAccount } from 'wagmi'
import { BackIcon, FocusIcon, GreaterIcon, UnfollowIcon } from './Icons'
import ReplyToComment from './ReplyToComment'
import DialogueInput from './DialogueInput'
import { FillColor } from '@/type/Chat'
import type { tweetComment, tweetFollow, tweetSend } from '@/utils/InterfaceType'
import { ItemType } from '@/utils/InterfaceType'
import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'
import { Tweet } from '@/constant/Global'
import { useRouter, useParams } from 'next/navigation'
import { getTweet } from '@/utils/api'
import { useChatMessageReply } from '@/store/useChatMessage'
import { WelcomeTweet, Comment } from '@/constant/Apits'
import { imageFormat } from '@/utils/imageFormat'
import { Notifications } from '@/components/Notifications'
import Solid from './Solid'
import { formatNumber } from '@/utils/AbbreviatedText'

interface Props {
  type: string | number
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

function FindInformation({ type }: Props) {
  const router = useRouter()
  const params = useParams()
  const { address, isConnected } = useAccount()
  const [pag, setPag] = useState({
    pageSize: 2, // 每页显示数据
    currentPage: 1, // 当前页
    totalPages: 10, // 总页数
    data: [] as Comment[]
  })
  const [tweetDetails, setTweetDetails] = useState({} as WelcomeTweet)
  const [ownerObj, setOwnerObj] = useState<objtyle>({
    owner: address,
    limit: 10,
    offset: 0,
  })

  const getTweetFunction = async (obj: objtyle) => {
    try {
      const tweetData = await getTweet(obj)
      const dist = tweetData.tweets.filter(t => t.tweet.trxHash === params.type)
      setTweetDetails(dist[0])
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTweetFunction(ownerObj)
  }, [params.type])

  const [tweetCommentData, setTweetCommentData] = useState<tweetComment | tweetFollow>({
    type: ItemType.tweet_comment,
    with: ''
  })

  const { theme } = useTheme()
  const { data, isLoading, isSuccess, sendTransaction } = useSendMessageToChain(tweetCommentData)


  if (!isConnected)
    alert('Please connect your wallet first')

  const closeHandler = ({ text, image, at }: tweetSendType) => { //  直接评论
    setTweetCommentData({ type: ItemType.tweet_comment, text, image, at, with: tweetDetails.tweet.trxHash })
  }

  useEffect(() => {
    tweetCommentData.with !== '' && sendTransaction()
  }, [tweetCommentData])


  /**
   * 进行用户关注或取消关注的操作
   * @param withi - 要关注或取消关注的用户
   * @param follow - 表示是否进行关注操作，默认为 true，即关注用户
   */
  const manageFollow = (follow: boolean) => {
    // 根据传入的参数 follow，确定 updateObj 的不同属性
    const updateObj = { type: follow ? ItemType.tweet_follow : ItemType.un_follow, with: tweetDetails.tweet.sender, } as tweetFollow;
    // 更新状态
    setTweetCommentData(updateObj);
    // 执行事务操作
  };


  function extractDatetime(datetimeStr = '2010'): string | undefined {
    const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;
    const match = datetimeStr.match(regex);
    if (match !== null) {
      return match[0];
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    const startIndex = (pag.currentPage - 1) * pag.pageSize;
    const endIndex = startIndex + pag.pageSize - 1;
    const data = tweetDetails?.comments?.slice(startIndex, endIndex + 1)
    setPag(s => ({ ...s, totalPages: Math.ceil(tweetDetails?.comments?.length / s.pageSize), data }))
  }, [pag.currentPage, tweetDetails])


  const pagFunction = (page: number) => {
    setPag(s => ({ ...s, currentPage: page }))
  }

  const tagClick = (trxHash: string): void => {
    window.open(`https://sepolia.etherscan.io/tx/${trxHash}`, '_blank');
  };

  const tagAddress = (address: string): void => {
    window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank');
  }

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black
  return (
    <Grid.Container css={{ minHeight: '100vh', padding: '1rem' }} id="yourElementId" className="FindInformation-container h-full text-[#000] dark:text-[#fff]">
      {isSuccess ? <Notifications data={data?.hash} /> : null}
      <Col >
        <Row align='center' css={{ height: '3.4rem' }}>
          <Grid onClick={() => router.back()} xs={1}>
            <BackIcon fill={handleFillColor()} />
          </Grid>
          <div className='font-bold text-[1.5rem]'>
            Tweet
          </div>
        </Row>
        <Row css={{ marginTop: '2rem', marginBottom: '1rem' }} justify='space-between' align='center'>
          <Col className='flex items-center gap-4'>
            <Col>
              <User css={{
                '.nextui-c-eGlVTL': {
                  color: theme === 'dark' ? '#fff' : '#000',
                },
              }} zoomed src={imageFormat(tweetDetails?.profile?.image[0])} name={tweetDetails?.profile?.text} >
                <p onClick={() => tagAddress(tweetDetails?.profile?.sender)} className='commentaries cursor-pointer hover:underline text-[#9ca3af] dark:text-[#9ca3af] text-[0.8rem]'>
                  {tweetDetails?.profile?.sender}
                </p>
              </User>
            </Col>
          </Col>
          <div>
            <Dropdown placement="right">
              <Dropdown.Trigger>
                <div> <GreaterIcon fill={handleFillColor()} /></div>
              </Dropdown.Trigger>
              <Dropdown.Menu color="secondary" aria-label="Avatar Actions">
                {/* <Dropdown.Item key="profile" css={{ height: '$18', display: "flex" }}>

                </Dropdown.Item> */}
                <Dropdown.Item key="settings" >
                  <div className='flex gap-4' onClick={() => manageFollow(true)}>
                    <FocusIcon />
                    <span>Follow this user</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item key="team_settings">
                  <div className=' flex gap-4' onClick={() => manageFollow(false)}>
                    <UnfollowIcon />
                    <span>Unfollow this user</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item key="analytics" withDivider>
                  Analytics
                </Dropdown.Item>
                <Dropdown.Item key="system">System</Dropdown.Item>
                <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key="logout" color="error" withDivider>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Row>
        <Solid foll={'y'} />
        <div onClick={() => tagClick(tweetDetails?.tweet?.trxHash)} className='cursor-pointer hover:underline py-[1rem]'>{tweetDetails?.tweet?.trxHash}</div>
        <Row>
          <Text className='text-[#000]  dark:text-[#fff]'>
            {tweetDetails?.tweet?.text}
            {
              tweetDetails?.tweet?.at?.map((m, h) => (
                <a className=' ml-4 text-[#51b2f3] hover:underline' href="#">{`@${m}`}</a>
              ))
            }
          </Text>
        </Row>
        <Spacer y={1} />
        <div>
          {
            tweetDetails?.tweet?.image.map((i, j) => (
              <Image css={{ borderRadius: '1rem', margin: "0.2rem 0" }} src={imageFormat(i)} />
            ))
          }
        </div>
        <Spacer y={1} />
        <Row >
          <Text size={12} className='text-[#000]  dark:text-[#fff]'><span className='underline-on-hover '>{extractDatetime(tweetDetails?.tweet?.trxTime)}</span> · {tweetDetails?.tweet?.height} Height</Text>
        </Row>
        <Spacer y={1} />

        <Row className='data-presentation border-y-[1px] border-[#edecf3] dark:border-[#262626]'>
          <Col className='underline-on-hover'>{formatNumber(tweetDetails?.comments?.length)} Recover</Col>
          <Col className='underline-on-hover'>{formatNumber(Number(tweetDetails?.likeNum))} Likes</Col>
          <Col className='underline-on-hover'></Col>
          <Col className='underline-on-hover'></Col>
          {/* <Col className='underline-on-hover'>0 Retweets</Col> */}
          {/* <Col>0 Bookmarks</Col> */}
        </Row>
        <DialogueInput bottonText='Reply' isSuccess={false} closeHandler={closeHandler} />
        <Spacer y={1} />
        {
          tweetDetails?.comments?.length > 0 ? <>
            {
              pag?.data?.map((i, j) => {
                const { comment, profile } = i
                return (
                  <>
                    <ReplyToComment
                      at={tweetDetails?.tweet?.at}
                      // children={i === 1 || i === 3 ? <ReplyToComment aimsAvatar={b} avatar={c} name={'djksh dwjk'} evaluation={'hahahha'} releaseTime={'2023-09-50 34:55'} agree={11} noAgree={33} /> : <></>}
                      avatar={imageFormat(comment?.image[0])}
                      // agree={0}
                      // noAgree={0}
                      releaseTime={extractDatetime(comment?.trxTime)}
                      aimsAvatar={''}
                      name={profile?.text}
                      evaluation={comment?.text} />
                  </>
                )
              })
            }
            <div className=' mb-4'>
              <Pagination onChange={(page) => pagFunction(page)} color="secondary" size={'xs'} total={pag.totalPages} />
            </div>
          </> : <div className='w-full  flex justify-center items-center flex-col'>
            <Image src='/no-data.svg' alt='' width={200} height={200}></Image>
            No message
          </div>
        }
      </Col>

    </Grid.Container>
  )
}

export default FindInformation
