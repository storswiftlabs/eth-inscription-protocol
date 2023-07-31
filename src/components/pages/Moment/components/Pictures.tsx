import React, { useRef } from 'react'
import { PictureIcon } from '../../Chat/Icons'
import { FillColor } from '@/type/Chat'
import { useTheme } from 'next-themes'

interface Props {
  pictureArr: string[]
  setPictureArr: any
}

function Pictures({ pictureArr, setPictureArr }: Props) {

  const { theme } = useTheme()
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  return (
    <>
      <input type="file" ref={fileRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files && e.target?.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
          const dataURL = reader.result as string
          setPictureArr([...pictureArr, dataURL])
        }
        file && reader.readAsDataURL(file)
      }} className='w-0 h-0 none' />
      <PictureIcon onClick={() => fileRef.current?.click()} fill={handleFillColor()}></PictureIcon>
    </>
  )
}

export default Pictures