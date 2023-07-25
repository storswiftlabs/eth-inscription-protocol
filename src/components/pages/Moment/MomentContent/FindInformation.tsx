'use client'

import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Col, Grid, Image, Row, Text ,Container, User, Spacer, Textarea} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { CloudIcon, EmojiIcon, LockIcon, PictureIcon, SpeechIcon } from '../../Chat/Icons'
import { FillColor } from '@/type/Chat'

interface Props {
  type: string | number
}

function FindInformation({ type }: Props) {
  const router = useRouter();
  const { theme } = useTheme()


  useEffect(() => { //  隐藏吸顶tab
    const currentElement = document.querySelector('#yourElementId')
    if (!currentElement) {
      return
    }
    const parentElement = currentElement.parentNode as Element as any
    const previousSiblingElement = parentElement.previousElementSibling
    if (!previousSiblingElement) {
      return
    }
    previousSiblingElement.style.display = 'none'
  }, [type])
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black
  return (
    <Grid.Container css={{minHeight:"100vh",padding:"1rem"}}  id="yourElementId" className="FindInformation-container h-full">
      <Col >
        <Row align='center' css={{height:"3.4rem"}}>
            <Grid onClick={()=>router.back()} xs={1}>
              {svg}
            </Grid>
            <Text className=' font-bold' h2 size={'1.5rem'}>Tweet</Text>
        </Row>
        <Row css={{marginTop:"2rem",marginBottom:"1rem"}} justify='space-between'>
          <Col className='flex items-center gap-4'>
            <Col>
              <User src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson"  description="UI/UX Designer @Github" />
            </Col>
          </Col>
          <div>
              {svg1}
          </div>
        </Row>
        <Row>
          <Text>
            Xbox Series X logo vs. Twitter's new X logo. Who did it better?
            Xbox Series X logo vs. Twitter's new X logo. Who did it better?
            Xbox Series X logo vs. Twitter's new X logo. Who did it better?
          </Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Image css={{borderRadius:"1rem"}} src={'https://pbs.twimg.com/media/F1yrhJMX0AMqX8p?format=png&name=medium'}/>
        </Row>
        <Spacer y={1} />
        <Row >
             <Text size={12}><span className='underline-on-hover'>5:29 PM · Jul 24, 2023</span> · 1.4M Views</Text>
        </Row>
        <Spacer y={1} />
        <Row className='data-presentation'>
          <Col className='underline-on-hover'>1,227 Retweets</Col>
          <Col className='underline-on-hover'>263 Quotes</Col>
          <Col className='underline-on-hover'>21.2K Likes</Col>
          <Col>221 Bookmarks</Col>
        </Row>
        <Row className='reply' >
          <User css={{padding:"0"}} src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="" />
          <Row wrap='wrap' justify='space-between'>
            <div style={{width:'100%'}}>
              <Textarea bordered fullWidth   placeholder="Default Textarea !" />
            </div>
            <Row className='cursor gap-4 mt-2'>
              <EmojiIcon  fill={handleFillColor()}></EmojiIcon>
              <LockIcon fill={handleFillColor()}></LockIcon>
              <PictureIcon fill={handleFillColor()}></PictureIcon>
              <SpeechIcon fill={handleFillColor()}></SpeechIcon>
              <CloudIcon fill={handleFillColor()}></CloudIcon>
            </Row>
          </Row>
        </Row>
      </Col>
    </Grid.Container>
  )
}

export default FindInformation

const svg = <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g></svg>

const svg1 = <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>