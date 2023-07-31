'use client'
import React, { useEffect, useRef, useState } from 'react'
import DynamicCard from '../DynamicCard/DynamicCard'
import { FillColor } from '@/type/Moment'
import { useTheme } from 'next-themes'
import DialogueInput from '../DialogueInput'

interface Props {
  isUpper: string //判断是推荐 还是 关注 Recommendation 推荐  Follow 关注
}

function Find({ isUpper }: Props) {

  const [data, setData] = useState([] as any[])

  useEffect(() => {
    if (isUpper === 'Recommendation') {
      setData([1, 2, 3])
    } else {
      setData([4, 5, 6])
    }
  }, [isUpper])

  const image = 'https://pbs.twimg.com/semantic_core_img/1376695792417693699/hpBiuH-q?format=jpg&name=360x360'
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <DialogueInput />
      {data.map((i, index) => (
        <DynamicCard
          key={index}
          img={image}
          text={text}
          time={`${i}h`}
          name={`Mewtru tuiie ${i}`}
          avatar={toux}
        />
      ))}
    </div>

  )
}

export default Find

const text = ' Playing the guitar has also taught me discipline and patience Learning new chords and songs takes time and practice.Its aconstant journey of improvement.When I finally master adifficult1difficult1difficult1difficult1difficult1difficult1123'

const toux = 'https://console.xyz/cdn-cgi/image/width=40,height=40,fit=crop,quality=75,dpr=2/https://images.gamma.io/ipfs/Qmb84UcaMr1MUwNbYBnXWHM3kEaDcYrKuPWwyRLVTNKELC/3066.png'