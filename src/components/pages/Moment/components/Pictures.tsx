import React, { useRef } from 'react'
import { useTheme } from 'next-themes'
import { PictureIcon } from '../../Chat/Icons'
import { FillColor } from '@/type/Chat'

interface Props {
  pictureArr: string[]
  setPictureArr: any
}

function Pictures({ pictureArr, setPictureArr }: Props) {
  const { theme } = useTheme()
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black
  console.log(pictureArr,'pictureArr');
  
  return (
    <>
      <input type="file" ref={fileRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files && e.target?.files[0]
        file && setPictureArr([...pictureArr, file])
        const reader = new FileReader()
        reader.onload = function (e) {
          const dataURL = reader.result as string
          // setPictureArr([...pictureArr, file])
        }
        file && reader.readAsDataURL(file)
        
      }} className='w-0 h-0 none' />
      <PictureIcon onClick={() => fileRef.current?.click()} fill={handleFillColor()}></PictureIcon>
    </>
  )
}

export default Pictures
