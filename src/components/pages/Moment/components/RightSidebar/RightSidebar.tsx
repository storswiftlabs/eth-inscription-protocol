import { Card, Dropdown, Row, Spacer } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { HotIcon } from '../Icons'
import { useAccount } from 'wagmi'
import { ItemType, tweetSend } from '@/utils/InterfaceType'
import { getFollowTweet, getTweet } from '@/utils/api'
import { WelcomeTweet } from '@/constant/Apits'
import { imageFormat } from '@/utils/imageFormat'
import { getTimeDifference } from '@/utils/timedifference'
import { AcronymWord } from '@/utils/AcronymWord'

interface objtyle {
  owner: `0x${string}` | any
  limit: number
  offset: number
}

function RightSidebar() {
  const { address, isConnected } = useAccount()
  const [tweetList, setTweetList] = useState([] as WelcomeTweet[])
  const [uploadData, setUploadData] = useState<tweetSend>({
    type: ItemType.tweet_send,
    text: '',
  })
  const [ownerObj, setOwnerObj] = useState<objtyle>({
    owner: address,
    limit: 6,
    offset: 0,
  })

  const getTweetFunction = async (obj: objtyle) => { // 获取 recommendation 数据
    try {
      const tweetData = await getTweet(obj)
      setTweetList([...tweetList, ...tweetData.tweets])
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTweetFunction(ownerObj)
  }, [])




  const cardData = (t: WelcomeTweet) => {
    return (
      <>
        {
          t ? <Card.Body>
            <Row className="right-sidebar-row flex pt-0 mb-0 truncate" align="center">
              <img
                style={{ width: '28px', height: '28px', borderRadius: '0.2rem' }}
                src={imageFormat(t.profile.image[0])}
                alt=""
              />
              <Spacer x={0.4} />
              <span>{AcronymWord(t.profile.trxHash, 6)}</span>
              <Spacer x={0.4} />
              <span>{getTimeDifference(t.tweet.trxTime)}</span>
            </Row>
            <div className="flex items-center ">
              <HotIcon />
              <span className="w-full truncate">
                {t.tweet.text}
              </span>
            </div>
          </Card.Body>
            : <>No Data</>
        }
      </>
    )
  }

  return (
    <div className="right-sidebar-nav h-screen  pl-4  pr-2 pt-14 mr-[10%]">
      <div className="mb-8  w-full pr-8">
        <Dropdown>
          <Dropdown.Button className="nav-button border-[1px] bg-tahiti-button-bg-w dark:bg-tahiti-button-bg-d border-tahiti-button-border-w dark:border-tahiti-button-border-d">
            Filter
          </Dropdown.Button>
          <Dropdown.Menu variant="solid" aria-label="Actions">
            <Dropdown.Item key="new">New file</Dropdown.Item>
            <Dropdown.Item key="copy">Copy link</Dropdown.Item>
            <Dropdown.Item key="edit">Edit file</Dropdown.Item>
            <Dropdown.Item key="delete" color="error" withDivider>
              Delete file
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <h2 className="text-2xl mb-4">Whats happening</h2>
      <Card className="sidebar-card bg-[#f7f9f9] dark:bg-[#121212] dark:border-[#696969] dark:border-[1px] text-[#000] dark:text-[#fff]" variant="bordered" css={{ padding: '1rem 1rem 1rem 0.2rem', borderRadius: '1.5rem' }} >
        {tweetList.map((t, j) => cardData(t))}
      </Card>
    </div>
  )
}

export default RightSidebar
