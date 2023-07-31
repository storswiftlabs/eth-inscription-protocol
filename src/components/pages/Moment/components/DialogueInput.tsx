'use client'
import React, { ReactNode, useRef, useState } from 'react'
import Solid from './Solid'
import { Button, Row, Textarea, User } from '@nextui-org/react'
import { CloudIcon, EmojiIcon, LockIcon, PictureIcon, SpeechIcon } from '@/components/pages/Chat/Icons'
import Pictures from './Pictures'
import { useTheme } from 'next-themes'
import { FillColor } from '@/type/Moment'

/**
 * @DialogueInput - 评论回复的样式框
 * @param {string} value -  input 输入kuang数据
 * @param {string[]} pictureArr - 上传照片数据
 * 
 * @param {string} props.rowCss - 传进来tailwind css 写法 控制顶部对话框的顶部盒子
 * @param {boolean} props.isSolid - 控制上下的线条是否出现
 * @param {()=>vido} props.closeHandler - 点击提交
 * 
 * 
 * @Send 点击Send事件 外层传进来 
 */

interface Props {
  isSolid?: boolean;
  closeHandler?: () => void;
  rowCss?: string
}


function DialogueInput({ isSolid, closeHandler, rowCss }: Props) {

  const { theme } = useTheme()
  const [value, setValue] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const [pictureArr, setPictureArr] = useState<string[]>([])

  function removeSpaces(inputString: string): string {
    return inputString.replace(/\s/g, "");
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
      <Row className={`reply p-4 border-[#edecf3] dark:border-[#262626] ${rowCss}`}>
        <User css={{ padding: "0" }} src="https://i.pravatar.cc/150?u=a042581f4e29026704d" name="" />
        <Row wrap='wrap'>
          <div style={{ width: '100%' }}>
            <Textarea css={customTextareaStyles} size='xl' value={value} onChange={(e) => setValue(e.target.value)} fullWidth placeholder="Default Textarea!" />
            {pictureArr.map((src, index) => (
              <img key={index} className='my-2' src={src} alt={`image-${index}`} />
            ))}
            <Solid foll={'y'} />
          </div>

          <Row className='mt-2' align='center'>
            <Row className='cursor gap-4 '>
              <Pictures pictureArr={pictureArr} setPictureArr={setPictureArr} />
              <EmojiIcon fill={handleFillColor()} />
              <LockIcon fill={handleFillColor()} />
              <SpeechIcon fill={handleFillColor()} />
              <CloudIcon fill={handleFillColor()} />
            </Row>
            <Button disabled={!removeSpaces(value)} auto onPress={closeHandler}>
              Send</Button>
          </Row>
        </Row>
      </Row>
      {isSolid ? "" : <Solid foll={isSolid ? "" : 'y'} />}
    </>
  )
}

export default DialogueInput

