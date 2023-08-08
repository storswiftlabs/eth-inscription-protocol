'use client'
import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { Focus, UnFollow } from '../Icons'
import { FillColor } from '@/type/Moment'

function ListFocusIcon() {
  const [isAdd, setIsAdd] = useState(false)
  const { theme } = useTheme()
  const handleFillColor = (): FillColor => theme === 'dark' ? FillColor.White : FillColor.Black

  return <div className='flex-1 flex text-right justify-end pr-[1rem] cursor-pointer' onClick={() => setIsAdd(!isAdd)}>
    {
      isAdd ? <Focus /> : <UnFollow fill={handleFillColor()} />
    }
  </div>
}

export default ListFocusIcon
