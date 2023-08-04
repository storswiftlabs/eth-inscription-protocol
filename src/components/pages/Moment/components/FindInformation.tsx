'use client'

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { Col, Dropdown, Grid, Image, Row, Spacer, Text, User } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { BackIcon, FocusIcon, GreaterIcon, UnfollowIcon } from './Icons'
import ReplyToComment from './ReplyToComment'
import DialogueInput from './DialogueInput'
import { FillColor } from '@/type/Chat'
import type { tweetComment, tweetFollow } from '@/utils/InterfaceType'
import { ItemType } from '@/utils/InterfaceType'

import { useSendMessageToChain } from '@/hooks/useSendMessageToChain'

interface Props {
  type: string | number
}

function FindInformation({ type }: Props) {
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

  const { address, isConnected } = useAccount()
  const router = useRouter()
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

  const a = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'

  const b = 'https://console.xyz/cdn-cgi/image/width=40,height=40,fit=crop,quality=75,dpr=2/https://images.gamma.io/ipfs/Qmb84UcaMr1MUwNbYBnXWHM3kEaDcYrKuPWwyRLVTNKELC/3066.png'

  const c = 'https://console.xyz/cdn-cgi/image/width=40,height=40,fit=crop,quality=75,dpr=2/https://lh3.googleusercontent.com/8qLJXIOm7S1v66pZGKdWNVB_souZGCAQ5GZHQQ8q0i1wiiILSYrbbhBBEYJ15qYApy2gzMhujkNBgTSBjDY2sQxoS1qoaalzOQ'

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
              }} zoomed src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" description="UI/UX Designer @Github" />
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
            Xbox Series X logo vs. Twitter's new X logo. Who did it better?
            Xbox Series X logo vs. Twitter's new X logo. Who did it better?
            Xbox Series X logo vs. Twitter's new X logo. Who did it better?
          </Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Image css={{ borderRadius: '1rem' }} src={'https://pbs.twimg.com/media/F1yrhJMX0AMqX8p?format=png&name=medium'} />
        </Row>
        <Spacer y={1} />
        <Row >
          <Text size={12}><span className='underline-on-hover'>5:29 PM · Jul 24, 2023</span> · 1.4M Views</Text>
        </Row>
        <Spacer y={1} />
        <Row className='data-presentation border-y-[1px] border-[#edecf3] dark:border-[#262626]'>
          <Col className='underline-on-hover'>1,227 Retweets</Col>
          <Col className='underline-on-hover'>263 Quotes</Col>
          <Col className='underline-on-hover'>21.2K Likes</Col>
          <Col>221 Bookmarks</Col>
        </Row>

        <DialogueInput isSuccess={false} closeHandler={closeHandler} />

        <Spacer y={1} />
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, j) => (
            <ReplyToComment
              // children={i === 1 || i === 3 ? <ReplyToComment aimsAvatar={b} avatar={c} name={'djksh dwjk'} evaluation={'hahahha'} releaseTime={'2023-09-50 34:55'} agree={11} noAgree={33} /> : <></>}
              avatar={a}
              agree={123}
              noAgree={23}
              releaseTime={'2023-07-24 12:17'}
              aimsAvatar={a}
              name={'Ariana Wattson'}
              evaluation={'Xbox Series X logo vs. Twitters new X logo.Who did it better Xbox Series X logo vs. Xbox Series X logo vs. Twitters new X logo.Who did it bette Twitters new X logo.Who did it betteXbox Series X logo vs. Twitters new X logo.Who did it bette ? '} />
          ))
        }
      </Col>

    </Grid.Container>
  )
}

export default FindInformation
