'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Col, Grid, Image, Row, Text, Container, User, Spacer, Textarea, useModal, Modal, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { CloudIcon, EmojiIcon, LockIcon, PictureIcon, SpeechIcon } from '../../Chat/Icons'
import { FillColor } from '@/type/Chat'
import { BackIcon, GreaterIcon, KudosIcon, PedalIcon, RemoveIcon, RemovePedalIcon } from './Icons'
import ReplyToComment from './ReplyToComment'


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
    <Grid.Container css={{ minHeight: "100vh", padding: "1rem" }} id="yourElementId" className="FindInformation-container h-full text-[#000] dark:text-[#fff]">
      <Col >
        <Row align='center' css={{ height: "3.4rem" }}>
          <Grid onClick={() => router.back()} xs={1}>
            <BackIcon fill={handleFillColor()} />
          </Grid>
          <div className='font-bold text-[1.5rem]'>
            Tweet
          </div>
        </Row>
        <Row css={{ marginTop: "2rem", marginBottom: "1rem" }} justify='space-between'>
          <Col className='flex items-center gap-4'>
            <Col>
              <User css={{
                '.nextui-c-eGlVTL': {
                  color: theme === 'dark' ? "#fff" : "#000"
                }
              }} zoomed src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" description="UI/UX Designer @Github" />
            </Col>
          </Col>
          <div>
            <GreaterIcon fill={handleFillColor()} />
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
          <Image css={{ borderRadius: "1rem" }} src={'https://pbs.twimg.com/media/F1yrhJMX0AMqX8p?format=png&name=medium'} />
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
        <Row className='reply border-b border-[#edecf3] dark:border-[#262626]' >
          <User css={{ padding: "0", }} src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="" />
          <Row wrap='wrap' justify='space-between'>
            <div style={{ width: '100%' }}>
              <Textarea css={{
                '.nextui-c-eXOOPO:hover': {
                  border: 'none',
                },
                color: "#fff",
                '.nextui-c-jeuecp': { color: theme === 'dark' ? "#fff" : "#000" },
                '.nextui-c-boZsAS': { border: theme === 'dark' ? "2px solid #edecf3" : "2px solid #262626" }, '.nextui-c-boZsAS:focus-visible': { border: theme === 'dark' ? "2px solid #edecf3" : "2px solid #262626" }
              }} bordered fullWidth placeholder="Default Textarea !" />
            </div>
            <Row className='cursor gap-4 mt-2'>
              <EmojiIcon fill={handleFillColor()}></EmojiIcon>
              <LockIcon fill={handleFillColor()}></LockIcon>
              <PictureIcon fill={handleFillColor()}></PictureIcon>
              <SpeechIcon fill={handleFillColor()}></SpeechIcon>
              <CloudIcon fill={handleFillColor()}></CloudIcon>
            </Row>
          </Row>
        </Row>
        <Spacer y={1} />
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i, j) => (
            <ReplyToComment
              children={i === 1 || i === 3 ? <ReplyToComment aimsAvatar={b} avatar={c} name={'djksh dwjk'} evaluation={'hahahha'} releaseTime={'2023-09-50 34:55'} agree={11} noAgree={33} /> : <></>}
              avatar={a}
              agree={123}
              noAgree={23}
              releaseTime={'2023-07-24 12:17'}
              aimsAvatar={a}
              name={"Ariana Wattson"}
              evaluation={'Xbox Series X logo vs. Twitters new X logo.Who did it better Xbox Series X logo vs. Xbox Series X logo vs. Twitters new X logo.Who did it bette Twitters new X logo.Who did it betteXbox Series X logo vs. Twitters new X logo.Who did it bette ? '} />
          ))
        }
      </Col>


    </Grid.Container>
  )
}

export default FindInformation

const a = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'

const b = 'https://console.xyz/cdn-cgi/image/width=40,height=40,fit=crop,quality=75,dpr=2/https://images.gamma.io/ipfs/Qmb84UcaMr1MUwNbYBnXWHM3kEaDcYrKuPWwyRLVTNKELC/3066.png'

const c = 'https://console.xyz/cdn-cgi/image/width=40,height=40,fit=crop,quality=75,dpr=2/https://lh3.googleusercontent.com/8qLJXIOm7S1v66pZGKdWNVB_souZGCAQ5GZHQQ8q0i1wiiILSYrbbhBBEYJ15qYApy2gzMhujkNBgTSBjDY2sQxoS1qoaalzOQ'