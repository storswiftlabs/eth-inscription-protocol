'use client'
import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { AddIcon, ChooseIcon } from '../Icons'
import { FillColor } from '@/type/Moment'

interface Props {
  // children: ReactNode
}

function ListAddIcon() {
  const [isAdd, setIsAdd] = useState(false)
  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  return <div className='flex-1 flex text-right justify-end pr-[1rem] cursor-pointer' onClick={() => setIsAdd(!isAdd)}>
    {
      isAdd ? <ChooseIcon fill={'#cfd9de'} fill1={theme === 'dark' ? '#cfd9de' : '#000'} /> : <AddIcon fill={handleFillColor()} />
    }
  </div>
}

export default ListAddIcon
