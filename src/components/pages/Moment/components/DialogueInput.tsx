'use client'
import React, { CSSProperties, ReactNode, useRef, useState } from 'react'
import Solid from './Solid'
import { Button, Row, Textarea, User } from '@nextui-org/react'
import { CloudIcon, EmojiIcon, LockIcon, PictureIcon, SpeechIcon } from '@/components/pages/Chat/Icons'
import Pictures from './Pictures'
import { useTheme } from 'next-themes'
import { FillColor } from '@/type/Moment'
import { EmojiDialog } from '../../Chat/EmojiDialog'
import { MessageOnChain } from '@/utils/sendMessageOnChain'

/**
 * @DialogueInput - 评论回复的样式框
 * @param {string} value -  input 输入kuang数据
 * @param {string[]} pictureArr - 上传照片数据
 * 
 * @param {string} props.rowCss - 传进来tailwind css 写法 控制顶部对话框的顶部盒子
 * @param {boolean} props.isSolid - 控制上下的线条是否出现
 * @param {(pictureArr,inputData)=>vido} props.closeHandler - 点击提交 接收图片数据 和 输入框数据
 * 
 * 
 * @Send 点击Send事件 外层传进来 
 */

interface Props {
  isSolid?: boolean;
  closeHandler: (pictureArr: string[], inputData: string) => void;
  rowCss?: CSSProperties
}


function DialogueInput({ isSolid, closeHandler, rowCss }: Props) {

  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [pictureArr, setPictureArr] = useState<string[]>([])
  const chatInputRef = useRef<HTMLInputElement>(null)
  const [inputData, setInputData] = useState('')


  function removeSpaces(inputString: string): string {
    return inputString.replace(/\s/g, "");
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function selectedOK(selected: string) {
    closeModal()
    const newValue = chatInputRef.current?.value.substring(0, chatInputRef.current?.selectionStart as number | undefined)
      + selected
      + chatInputRef.current?.value.substring(chatInputRef.current?.selectionEnd as number)
    setInputData(newValue)
  }

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  const customTextareaStyles = {
    '.nextui-c-eXOOPO:hover': {
      border: 'none',
    },

    color: "#fff",
    '.nextui-c-eXOOPO': { backgroundColor: theme === 'dark' ? "#000" : "#fff", boxShadow: "none", },
    '.nextui-c-jeuecp': { color: theme === 'dark' ? "#fff" : "#000" },
    '.nextui-c-eXOOPO-gWufxv-underlined-true::after': { display: "none", }
  }
  return (
    <>
      {isSolid ? "" : <Solid foll={isSolid ? "" : 'y'} />}
      <EmojiDialog dialogCss={{ position: "absolute", zIndex: "19999" }} isOpen={isOpen} closeModal={closeModal} selectedOK={x => selectedOK(x)} />
      <Row className={`reply p-4 border-[#edecf3] dark:border-[#262626] `} css={{ ...rowCss }}>
        <User css={{ padding: "0" }} src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="" />
        <Row wrap='wrap'>
          <div style={{ width: '100%' }}>
            {/* @ts-ignore */}
            <Textarea ref={chatInputRef} css={customTextareaStyles} size='xl' value={inputData} onChange={(e) => { setInputData(e.target.value) }} fullWidth placeholder="Default Textarea!" />
            {pictureArr.map((src, index) => (
              <img key={index} className='my-2' src={src} alt={`image-${index}`} />
            ))}
            <Solid foll={'y'} />
          </div>

          <Row className='mt-2' align='center'>
            <Row className='cursor gap-4 '>
              <Pictures pictureArr={pictureArr} setPictureArr={setPictureArr} />
              <EmojiIcon onClick={() => openModal()} fill={handleFillColor()}></EmojiIcon>
              {/* <LockIcon fill={handleFillColor()} /> */}
              {/* <SpeechIcon fill={handleFillColor()} /> */}
              {/* <CloudIcon fill={handleFillColor()} /> */}
            </Row>
            <Button disabled={!removeSpaces(inputData)} auto onClick={() => closeHandler(pictureArr, inputData)}>
              Send</Button>
          </Row>
        </Row>
      </Row>
      {isSolid ? "" : <Solid foll={isSolid ? "" : 'y'} />}
    </>
  )
}

export default DialogueInput

