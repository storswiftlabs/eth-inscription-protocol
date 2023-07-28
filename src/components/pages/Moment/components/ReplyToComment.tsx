'use client'
import { Button, Modal, Row, Spacer, Textarea, User } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import React, { ReactNode, useState } from 'react'
import { KudosIcon, PedalIcon, RemoveIcon, RemovePedalIcon } from './Icons'
import { FillColor } from '@/type/Moment'
import { CloudIcon, EmojiIcon, LockIcon, PictureIcon, SpeechIcon } from '../../Chat/Icons'

/**
 * @用户信息评论组件
 * @param {string} props.aimsAvatar - 评论用户头像图片路径
 * @param {string} props.avatar - 用户头像图片路径
 * @param {string} props.name - 用户名称
 * @param {string} props.evaluation - 用户评价内容
 * @param {string} props.releaseTime - 评论时间
 * @param {string} props.agree - 点赞人数
 * @param {string} props.noAgree - 不觉得赞人数
 * @param {children} props.children - 二级评论
 */

interface Props {
  aimsAvatar: string
  avatar: string
  name: string
  evaluation: string
  releaseTime: string
  agree: number
  noAgree: number
  children?: ReactNode
}

function ReplyToComment({ children, aimsAvatar, name, evaluation, releaseTime, agree, noAgree, avatar }: Props) {
  const [dz, setDz] = useState(false) // 点赞和取消点赞
  const [ca, setCa] = useState(false) // 踩和取消踩
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = useState('') // 弹框的值
  const { theme } = useTheme()
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("value", value);
  };
  function removeSpaces(inputString: string): string {
    return inputString.replace(/\s/g, "");
  }
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black
  return (
    <>
      <div>
        <Row wrap='wrap'>
          <User src={aimsAvatar} name={name} zoomed className='commentaries-div' css={{ '.nextui-c-eGlVTL': { color: theme === 'dark' ? "#fff" : "#000" }, padding: "0" }}>
            <p className='commentaries text-[#000] dark:text-[#fff]'>
              {evaluation}
            </p>
            <p className='flex items-center gap-4 mt-1 s-'>
              <span style={{ fontSize: "14px" }}> {releaseTime} </span>
              <span className='flex gap-1 items-center' onClick={() => setDz(!dz)}>
                {dz ? <PedalIcon fill={handleFillColor()} /> : <RemoveIcon fill={handleFillColor()} />}
                <span>{agree}</span>
              </span>
              <span className='flex gap-1 items-center' onClick={() => setCa(!ca)}>
                {ca ? <RemovePedalIcon fill={handleFillColor()} /> : <KudosIcon fill={handleFillColor()} />}
                <span>{noAgree}</span>
              </span>
              <span style={{ fontSize: "14px", cursor: "pointer" }} onClick={() => handler()}>
                reply
              </span>
            </p>
            <Spacer y={0.4} />
            {children}
          </User>
        </Row>
      </div>
      <Spacer y={1} />
      <Modal
        className='ijHtNE'
        closeButton
        width="50%"
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body className='commentaries-div'>
          <User css={{ padding: "0", alignItems: 'flex-start ', '.nextui-c-eGlVTL': { color: "#000" } }} zoomed src={aimsAvatar} name={name}>
            <p className='commentaries'>
              {evaluation}
            </p>
          </User>
          <div className="w-[2px] bg-[#cfd9de] mt-2 ml-5 h-24 relative">
            <div className="mt-4 text-base absolute top-[1.2rem] left-[2rem] w-[15rem] max-w-[15rem] truncate">Replying to @{name + ""}</div>
          </div>
          <User css={{ padding: "0", width: "100%", alignItems: 'flex-start', justifyContent: 'inherit' }} zoomed src={avatar} name="">
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
          <Button disabled={!removeSpaces(value)} auto onPress={closeHandler}>
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default ReplyToComment