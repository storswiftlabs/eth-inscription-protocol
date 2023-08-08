'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Col, Dropdown, Grid, Image, Row, Spacer, Text, User } from '@nextui-org/react'
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
import { WelcomeTweet } from '@/constant/Apits'
import { imageFormat } from '@/utils/imageFormat'

interface Props {
  type: string | number
}

interface objtyle {
  owner: `0x${string}` | undefined
  limit: number
  offset: number
}

function FindInformation({ type }: Props) {
  const router = useRouter()
  const params = useParams()
  const { address, isConnected } = useAccount()
  const [ownerObj, setOwnerObj] = useState<objtyle>({
    owner: address,
    limit: 10,
    offset: 0,
  })
  const [tweetDetails, setTweetDetails] = useState({} as WelcomeTweet)
  const { tweet, profile, withProfile } = tweetDetails
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

  console.log(tweetDetails, 'tweetList');

  const [tweetCommentData, setTweetCommentData] = useState<tweetComment>({
    type: ItemType.tweet_comment,
    text: '',
    image: [''],
    at: [''],
    with: '',
  })

  const [followUn, setFollowUn] = useState<tweetFollow>({
    type: ItemType.tweet_follow,
    with: '',
  })


  const { theme } = useTheme()

  const { data, isLoading, isSuccess, sendTransaction } = useSendMessageToChain(tweetCommentData)

  if (!isConnected)
    alert('Please connect your wallet first')

  const closeHandler = (tweetSendArr: { image: string[]; text: string }) => { //  直接评论
    setTweetCommentData({
      type: ItemType.tweet_comment,
      text: tweetSendArr.text,
      image: tweetSendArr.image,
      at: [''],
      with: '',
    })
    sendTransaction()
  }

  /**
   * 关注用户
   * @param withi - 要关注的用户
   */
  const followFunction = (withi: string) => {
    // TODO: 实现关注逻辑
    setFollowUn({ ...followUn, with: withi })
    sendTransaction()
  }

  /**
     * 取消关注用户
     * @param withi - 要取消关注的用户
     */
  const unfollowFunction = (withi: string) => {
    setFollowUn({ type: ItemType.follow_unfollow, with: withi })
    sendTransaction()
  }


  function extractDatetime(datetimeStr = '2010'): string | undefined {
    const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;
    const match = datetimeStr.match(regex);
    if (match !== null) {
      return match[0];
    } else {
      return undefined;
    }
  }

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black
  return (
    <Grid.Container css={{ minHeight: '100vh', padding: '1rem' }} id="yourElementId" className="FindInformation-container h-full text-[#000] dark:text-[#fff]">
      <Col >
        <Row align='center' css={{ height: '3.4rem' }}>
          <Grid onClick={() => router.back()} xs={1}>
            <BackIcon fill={handleFillColor()} />
          </Grid>
          <div className='font-bold text-[1.5rem]'>
            Tweet
          </div>
        </Row>
        <Row css={{ marginTop: '2rem', marginBottom: '1rem' }} justify='space-between'>
          <Col className='flex items-center gap-4'>
            <Col>
              <User css={{
                '.nextui-c-eGlVTL': {
                  color: theme === 'dark' ? '#fff' : '#000',
                },
              }} zoomed src={imageFormat(profile?.image[0])} name={profile?.text} description={profile?.sender} />
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
                  <div className='flex gap-4' onClick={() => followFunction('')}>
                    <FocusIcon />
                    <span>Follow this user</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item key="team_settings">
                  <div className=' flex gap-4' onClick={() => unfollowFunction('')}>
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
        <Row>
          <Text className='text-[#000]  dark:text-[#fff]'>
            {tweet?.text}
          </Text>
        </Row>
        <Spacer y={1} />
        <div>
          {
            tweet?.image.map((i, j) => (
              <Image css={{ borderRadius: '1rem', margin: "0.2rem 0" }} src={imageFormat(i)} />
            ))
          }
        </div>
        <Spacer y={1} />
        <Row >
          <Text size={12}><span className='underline-on-hover'>{extractDatetime(tweet?.trxTime)}</span> · {tweet?.height} Height</Text>
        </Row>
        <Spacer y={1} />
        <Row className='data-presentation border-y-[1px] border-[#edecf3] dark:border-[#262626]'>
          <Col className='underline-on-hover'>{tweetDetails.comments?.length} Recover</Col>
          <Col className='underline-on-hover'>{tweetDetails.likeNum} Likes</Col>
          <Col className='underline-on-hover'></Col>
          <Col className='underline-on-hover'></Col>
          {/* <Col className='underline-on-hover'>0 Retweets</Col> */}
          {/* <Col>0 Bookmarks</Col> */}
        </Row>

        <DialogueInput isSuccess={false} closeHandler={closeHandler} />

        <Spacer y={1} />
        {
          tweetDetails.comments?.length > 0 ? tweetDetails.comments?.map((i, j) => {
            const { comment, profile } = i
            return (
              <ReplyToComment
                // children={i === 1 || i === 3 ? <ReplyToComment aimsAvatar={b} avatar={c} name={'djksh dwjk'} evaluation={'hahahha'} releaseTime={'2023-09-50 34:55'} agree={11} noAgree={33} /> : <></>}
                avatar={imageFormat(comment?.image[0])}
                // agree={0}
                // noAgree={0}
                releaseTime={extractDatetime(comment?.trxTime)}
                aimsAvatar={''}
                name={profile?.text}
                evaluation={comment?.text} />
            )
          }): <div className='w-full  flex justify-center items-center flex-col'>
              <Image src='/no-data.svg' alt='' width={200} height={200}></Image>
              No message
            </div>
        }
      </Col>

    </Grid.Container>
  )
}

export default FindInformation
