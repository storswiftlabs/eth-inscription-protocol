'use client'
import type { CSSProperties } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Row, Textarea, User } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { EmojiDialog } from '../../Chat/EmojiDialog'
import Solid from './Solid'
import Pictures from './Pictures'
import { EmojiIcon } from '@/components/pages/Chat/Icons'
import { FillColor } from '@/type/Moment'
import { useChatMessageReply } from '@/store/useChatMessage'
import { imageFormat } from '@/utils/imageFormat'

/**
 * @DialogueInput - 评论回复的样式框
 * @param {string} value -  input 输入kuang数据
 * @param {string[]} pictureArr - 上传照片数据
 *
 * @param {string} props.rowCss - 传进来tailwind css 写法 控制顶部对话框的顶部盒子
 * @param {boolean} props.isSolid - 控制上下的线条是否出现
 * @param {({image,text}:tweetSend) => void;} props.closeHandler - 点击提交 接收图片数据 和 输入框数据
 * @param {boolean} props.isSuccess - 判断是否提交成功了
 *
 *
 * @Send 点击Send事件 外层传进来
 */

interface content {
  image: string[]
  text: string
}

interface Props {
  isSolid?: boolean
  closeHandler: ({ image, text }: content) => void
  rowCss?: CSSProperties
  isSuccess: boolean
}

function DialogueInput({ isSolid, closeHandler, rowCss, isSuccess }: Props) {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [pictureArr, setPictureArr] = useState<string[]>([])
  const chatInputRef = useRef<HTMLTextAreaElement>(null)
  const [inputData, setInputData] = useState('')
  const ownerProfile = useChatMessageReply(state => state.ownerProfile) // 存储一下给公共状态


  useEffect(() => {
    if (isSuccess) {
      setPictureArr([''])
      setInputData('')
    }
  }, [isSuccess])

  function removeSpaces(inputString: string): string {
    return inputString.replace(/\s/g, '')
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

    'color': '#fff',
    '.nextui-c-eXOOPO': { backgroundColor: theme === 'dark' ? '#000' : '#fff', boxShadow: 'none' },
    '.nextui-c-jeuecp': { color: theme === 'dark' ? '#fff' : '#000' },
    '.nextui-c-eXOOPO-gWufxv-underlined-true::after': { display: 'none' },
  }
  const svg = <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2338"
    width="50"
    height="50"
  >
    <path
      d="M827.392 195.584q65.536 65.536 97.792 147.456t32.256 167.936-32.256 167.936-97.792 147.456-147.456 98.304-167.936 32.768-168.448-32.768-147.968-98.304-98.304-147.456-32.768-167.936 32.768-167.936 98.304-147.456 147.968-97.792 168.448-32.256 167.936 32.256 147.456 97.792zM720.896 715.776q21.504-21.504 18.944-49.152t-24.064-49.152l-107.52-107.52 107.52-107.52q21.504-21.504 24.064-49.152t-18.944-49.152-51.712-21.504-51.712 21.504l-107.52 106.496-104.448-104.448q-21.504-20.48-49.152-23.04t-49.152 17.92q-21.504 21.504-21.504 52.224t21.504 52.224l104.448 104.448-104.448 104.448q-21.504 21.504-21.504 51.712t21.504 51.712 49.152 18.944 49.152-24.064l104.448-104.448 107.52 107.52q21.504 21.504 51.712 21.504t51.712-21.504z"
      p-id="2339"
    >
    </path>
  </svg>
  return (
    <>
      {isSolid ? '' : <Solid foll={isSolid ? '' : 'y'} />}
      <EmojiDialog dialogCss={{ position: 'absolute', zIndex: '19999' }} isOpen={isOpen} closeModal={closeModal} selectedOK={x => selectedOK(x)} type='emoji' />
      <Row className={'reply p-4 border-[#edecf3] dark:border-[#262626] '} css={{ ...rowCss }}>
        <User css={{ padding: '0' }} src={imageFormat(ownerProfile.image)} name="" />
        <Row wrap='wrap'>
          <div style={{ width: '100%' }}>
            <Textarea ref={chatInputRef} css={customTextareaStyles} size='xl' value={inputData} onChange={(e) => { setInputData(e.target.value) }} fullWidth placeholder="Default Textarea!" />
            {pictureArr.map((t, index) => (
              <div className=' relative'>
                <img key={index} className='my-2' src={t} alt={`image-${index}`} />
                <div className='absolute w-5 h-5 bg-neutral-400/90 cursor-pointer top-[-10px] right-[-10px] z-10 rounded-full flex items-center justify-center' onClick={() => setPictureArr([...pictureArr.filter(s => s !== t)])} >
                  {svg}
                </div>
              </div>
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
            <Button disabled={!removeSpaces(inputData)} auto onClick={() => closeHandler({ image: pictureArr, text: inputData })}>
              Send</Button>
          </Row>
        </Row>
      </Row>
      {isSolid ? '' : <Solid foll={isSolid ? '' : 'y'} />}
    </>
  )
}

export default DialogueInput
