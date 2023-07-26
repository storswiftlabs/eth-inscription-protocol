'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Col, Grid, Image, Row, Text, Container, User, Spacer, Textarea, useModal, Modal, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { CloudIcon, EmojiIcon, LockIcon, PictureIcon, SpeechIcon } from '../../Chat/Icons'
import { FillColor } from '@/type/Chat'


interface Props {
  type: string | number
}

function FindInformation({ type }: Props) {

  const [dz, setDz] = useState(false) // 点赞和取消点赞
  const [ca, setCa] = useState(false) // 踩和取消踩
  const [value, setValue] = useState('') // 踩和取消踩
  const textareaRef = useRef(null);  // 聚焦

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const router = useRouter();
  const { theme } = useTheme()

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };


  console.log(value, 'value');

  function removeSpaces(inputString: string): string {
    return inputString.replace(/\s/g, "");
  }


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
    <Grid.Container css={{ minHeight: "100vh", padding: "1rem" }} id="yourElementId" className="FindInformation-container h-full">
      <Col >
        <Row align='center' css={{ height: "3.4rem" }}>
          <Grid onClick={() => router.back()} xs={1}>
            {svg}
          </Grid>
          <Text className=' font-bold' h2 size={'1.5rem'}>Tweet</Text>
        </Row>
        <Row css={{ marginTop: "2rem", marginBottom: "1rem" }} justify='space-between'>
          <Col className='flex items-center gap-4'>
            <Col>
              <User zoomed src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson" description="UI/UX Designer @Github" />
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
          <Image css={{ borderRadius: "1rem" }} src={'https://pbs.twimg.com/media/F1yrhJMX0AMqX8p?format=png&name=medium'} />
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
          <User css={{ padding: "0" }} src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="" />
          <Row wrap='wrap' justify='space-between'>
            <div style={{ width: '100%' }}>
              <Textarea bordered fullWidth placeholder="Default Textarea !" />
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
            <div>
              <Row wrap='wrap'>
                <User className='commentaries-div' css={{ padding: "0" }} zoomed src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson">
                  <p className='commentaries'>
                    Xbox Series X logo vs. Twitter's new X logo. Who did it better?1111111111111111
                    Xbox Series X logo vs. Twitter's new X logo. Who did it better?1111111111111111
                    Xbox Series X logo vs. Twitter's new X logo. Who did it better?1111111111111111
                  </p>
                  <p className='flex items-center gap-4 mt-1 s-'>
                    <span style={{ fontSize: "14px" }}> 2023-07-24 12:17 </span>
                    <span className='flex gap-1 items-center' onClick={() => setDz(!dz)}>{dz ? svg4 : svg3} <span>123</span></span>
                    <span className='flex gap-1 items-center' onClick={() => setCa(!ca)}>{ca ? svg5 : svg2} <span>44</span></span>
                    <span style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => {
                      handler()
                    }}>reply</span>
                  </p>
                  <User className='commentaries-div' css={{ padding: "0", marginTop: '1rem' }} zoomed src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson">
                    <p className='commentaries'>
                      Xbox Series X logo vs. Twitter's new
                      Xbox Series X logo vs. Twitter's new
                      Xbox Series X logo vs. Twitter's new
                      Xbox Series X logo vs. Twitter's new
                      Xbox Series X logo vs. Twitter's new
                    </p>
                    <p className='flex items-center gap-4 mt-1 s-'>
                      <span style={{ fontSize: "14px" }}> 2023-07-24 12:17 </span>
                      <span className='flex gap-1 items-center' onClick={() => setDz(!dz)}>{dz ? svg4 : svg3} <span>123</span></span>
                      <span className='flex gap-1 items-center' onClick={() => setCa(!ca)}>{ca ? svg5 : svg2} <span>44</span></span>
                      <span style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => {
                        handler()
                      }}>reply</span>
                    </p>
                  </User>
                </User>
              </Row>
              <Spacer y={1} />
            </div>
          ))
        }
      </Col>

      <Modal
        className='ijHtNE'
        closeButton
        width="50%"
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body className='commentaries-div'>
          <User css={{ padding: "0", alignItems: 'flex-start ' }} zoomed src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="Ariana Wattson">
            <p className='commentaries'>
              Xbox Series X logo vs. Twitter's new X logo. Who did it better?1111111111111111
              Xbox Series X logo vs. Twitter's new X logo. Who did it better?1111111111111111
              Xbox Series X logo vs. Twitter's new X logo. Who did it better?1111111111111111
            </p>
          </User>
          <div className="w-1 bg-gray-300 mt-2 ml-5 h-24 relative">
            <div className="mt-4 text-base absolute top-6 left-8 w-40">Replying to @Amelia</div>
          </div>

          <User css={{ padding: "0", width: "100%", alignItems: 'flex-start', justifyContent: 'inherit' }} zoomed src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="">
            <Row wrap='wrap' >
              <div style={{ width: '100%' }}>
                <Textarea value={value} onChange={(e) => setValue(e.target.value)} bordered fullWidth placeholder="Default Textarea !" />
              </div>
              <Row className='cursor gap-4 mt-2'>
                <EmojiIcon fill={handleFillColor()}></EmojiIcon>
                <LockIcon fill={handleFillColor()}></LockIcon>
                <PictureIcon fill={handleFillColor()}></PictureIcon>
                <SpeechIcon fill={handleFillColor()}></SpeechIcon>
                <CloudIcon fill={handleFillColor()}></CloudIcon>
              </Row>
            </Row>
          </User>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={removeSpaces(value) ? false : true} auto onPress={closeHandler}>
            Repyl
          </Button>
        </Modal.Footer>
      </Modal>
    </Grid.Container>
  )
}

export default FindInformation

const svg = <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true" className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g></svg>

const svg1 = <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>

const svg2 = <svg width={16} height={16} className="r-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6644" ><path d="M294.4 645.12H122.88c-55.296 0-99.84-44.544-99.84-99.84v-394.24C23.04 95.744 67.584 51.2 122.88 51.2h171.52v593.92zM122.88 128c-12.8 0-23.04 10.24-23.04 23.04v394.24c0 12.8 10.24 23.04 23.04 23.04h94.72V128H122.88z" fill="#ffffff" p-id="6645" data-spm-anchor-id="a313x.7781069.0.i4" className="selected"></path><path d="M571.392 1018.88c-60.416 0-110.08-44.544-117.248-103.424-0.512-2.048-1.024-4.096-1.536-5.632-12.288-76.8-40.96-141.824-86.016-193.024-41.472-47.616-79.872-72.704-110.592-72.704-20.992 0-38.4-17.408-38.4-38.4V89.6c0-10.24 4.096-19.968 11.264-27.136C236.032 55.296 245.76 51.2 256 51.2h511.488c58.368 0 109.568 38.912 125.44 95.232l108.032 380.928c3.072 11.776 5.12 23.552 5.12 35.328 0 72.192-58.368 130.56-130.56 130.56h-185.856v207.36c-0.512 65.536-53.248 118.272-118.272 118.272z m-44.544-130.048c1.536 4.096 2.56 8.704 3.072 13.312 1.024 22.528 18.944 39.936 41.472 39.936 22.528 0 41.472-18.432 41.472-41.472v-245.76c0-20.992 17.408-38.4 38.4-38.4H875.52c29.696 0 53.76-24.064 53.76-53.76 0-5.12-0.512-9.728-2.048-14.848L819.2 166.912a53.76 53.76 0 0 0-51.712-38.912H294.4v444.416c42.496 11.776 84.992 42.496 130.048 93.184 52.736 60.416 87.04 135.68 102.4 223.232z" fill="#ffffff" p-id="6646" data-spm-anchor-id="a313x.7781069.0.i3" className="selected"></path></svg>

const svg3 = <svg width={16} height={16} className="r-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7772" data-spm-anchor-id="a313x.7781069.0.i7" ><path d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z" p-id="7773" data-spm-anchor-id="a313x.7781069.0.i6" className="selected" fill="#ffffff"></path></svg>

const svg4 = <svg width={18} height={18} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8119" ><path d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z" p-id="8120" fill="#00aeec"></path></svg>

const svg5 = <svg width={18} height={18} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9516" ><path d="M322.4 107.2v529.4c67.7 24.7 120.3 96 139.7 203.4 8.1 45.7 48.6 76.9 95.3 76.9 52.7 0 95.3-43.7 95.3-97.7V668.6h184.5c66.9 0 115.5-64.5 97.3-131l-91.4-338.9c-14.1-54-62.8-91.5-117.5-91.5H322.4z m-51.2 0H166.1c-44.6 0-81.1 37.5-81.1 83.2v351.4c0 45.7 36.5 85.2 81.1 85.2H271.2V107.2z" p-id="9517" fill="#00aeec"></path></svg>